import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

import { marketSymbols, initialOrderDraft, seededOrders, seededPositions } from '../../mock/orderMockData'
import { orderService } from '../../services/order/orderService'

function cloneDraft() {
  return {
    ...initialOrderDraft,
  }
}

export const useOrdersStore = defineStore('orders', () => {
  const accountSummary = reactive({
    availableCash: 125480.22,
    buyingPower: 382900,
    intradayPnl: 1842.66,
    openRisk: 24150,
  })

  const draft = reactive(cloneDraft())
  const symbols = ref(marketSymbols)
  const positions = ref(seededPositions)
  const orders = ref(seededOrders)
  const selectedStatus = ref('全部')
  const selectedSide = ref('全部')
  const searchTerm = ref('')
  const submitting = ref(false)
  const lastSubmissionMessage = ref('')

  const selectedSymbol = computed(() => {
    return symbols.value.find((item) => item.symbol === draft.symbol) ?? symbols.value[0]
  })

  const executionPrice = computed(() => {
    if (draft.orderType === '市價') {
      return selectedSymbol.value?.price ?? 0
    }

    if (draft.orderType === '停損限價') {
      return Number(draft.limitPrice) || selectedSymbol.value?.price || 0
    }

    return Number(draft.limitPrice) || 0
  })

  const estimatedNotional = computed(() => Number(draft.quantity || 0) * executionPrice.value)
  const estimatedFees = computed(() => {
    if (!estimatedNotional.value) {
      return 0
    }

    return Math.max(estimatedNotional.value * 0.0008, 1.5)
  })
  const estimatedTotal = computed(() => {
    if (draft.side === '買進') {
      return estimatedNotional.value + estimatedFees.value
    }

    return estimatedNotional.value - estimatedFees.value
  })
  const maxAffordableQuantity = computed(() => {
    const price = executionPrice.value || selectedSymbol.value?.price || 0
    if (!price) {
      return 0
    }

    return Math.floor(accountSummary.buyingPower / price)
  })
  const validationMessages = computed(() => {
    const messages = []

    if (!draft.symbol) {
      messages.push('請先選擇交易商品。')
    }

    if (!Number(draft.quantity) || Number(draft.quantity) <= 0) {
      messages.push('委託數量必須大於 0。')
    }

    if (draft.orderType !== '市價' && (!Number(draft.limitPrice) || Number(draft.limitPrice) <= 0)) {
      messages.push('限價價格必須大於 0。')
    }

    if (draft.orderType === '停損限價' && (!Number(draft.stopPrice) || Number(draft.stopPrice) <= 0)) {
      messages.push('停損限價單必須填寫停損價格。')
    }

    if (draft.side === '買進' && estimatedTotal.value > accountSummary.buyingPower) {
      messages.push('預估成交金額已超過可用買進額度。')
    }

    if (draft.side === '賣出') {
      const currentPosition = positions.value.find((item) => item.symbol === draft.symbol)
      if (!currentPosition || Number(draft.quantity) > currentPosition.quantity) {
        messages.push('賣出數量超過目前持倉。')
      }
    }

    return messages
  })
  const canSubmit = computed(() => validationMessages.value.length === 0 && !submitting.value)
  const filteredOrders = computed(() => {
    return orders.value.filter((order) => {
      const matchesStatus = selectedStatus.value === '全部' || order.status === selectedStatus.value
      const matchesSide = selectedSide.value === '全部' || order.side === selectedSide.value
      const normalizedSearch = searchTerm.value.trim().toUpperCase()
      const matchesSearch = !normalizedSearch
        || order.symbol.includes(normalizedSearch)
        || order.id.includes(normalizedSearch)

      return matchesStatus && matchesSide && matchesSearch
    })
  })
  const activeOrdersCount = computed(() => {
    return orders.value.filter((item) => ['委託中', '排隊中', '部分成交'].includes(item.status)).length
  })

  function updateDraft(field, value) {
    draft[field] = value

    if (field === 'symbol' && draft.orderType !== '市價') {
      draft.limitPrice = Number(selectedSymbol.value?.ask ?? draft.limitPrice)
      draft.stopPrice = Number(selectedSymbol.value?.bid ?? draft.stopPrice)
    }

    if (field === 'orderType' && value === '市價') {
      draft.limitPrice = Number(selectedSymbol.value?.ask ?? 0)
    }
  }

  function applyQuickFill(ratio) {
    draft.quantity = Math.max(1, Math.floor(maxAffordableQuantity.value * ratio))
  }

  function resetDraft() {
    Object.assign(draft, cloneDraft())
    lastSubmissionMessage.value = ''
  }

  function updateFilter(field, value) {
    if (field === 'selectedStatus') {
      selectedStatus.value = value
    }

    if (field === 'selectedSide') {
      selectedSide.value = value
    }

    if (field === 'searchTerm') {
      searchTerm.value = value
    }
  }

  async function submitDraft() {
    if (!canSubmit.value) {
      return
    }

    submitting.value = true
    try {
      const payload = {
        symbol: draft.symbol,
        side: draft.side,
        orderType: draft.orderType,
        quantity: Number(draft.quantity),
        limitPrice: draft.orderType === '市價' ? null : Number(draft.limitPrice),
        stopPrice: draft.orderType === '停損限價' ? Number(draft.stopPrice) : null,
        timeInForce: draft.timeInForce,
        allowExtendedHours: draft.allowExtendedHours,
        notes: draft.notes,
      }

      await orderService.submit(payload)

      orders.value.unshift({
        id: `ORD-${Date.now()}`,
        symbol: draft.symbol,
        side: draft.side,
        orderType: draft.orderType,
        quantity: Number(draft.quantity),
        limitPrice: payload.limitPrice,
        status: draft.orderType === '市價' ? '已成交' : '排隊中',
        submittedAt: new Date().toISOString(),
      })

      if (draft.side === '買進') {
        accountSummary.buyingPower = Math.max(0, accountSummary.buyingPower - estimatedTotal.value)
      }

      if (draft.side === '賣出') {
        accountSummary.buyingPower += estimatedTotal.value
      }

      lastSubmissionMessage.value = `已成功送出 ${draft.side} ${draft.quantity} 股 ${draft.symbol} 的委託單。`
    } finally {
      submitting.value = false
    }
  }

  function cancelOrder(orderId) {
    const target = orders.value.find((item) => item.id === orderId)
    if (!target || !['委託中', '排隊中', '部分成交'].includes(target.status)) {
      return
    }

    target.status = '已取消'
  }

  return {
    accountSummary,
    draft,
    symbols,
    positions,
    orders,
    selectedStatus,
    selectedSide,
    searchTerm,
    submitting,
    lastSubmissionMessage,
    selectedSymbol,
    executionPrice,
    estimatedNotional,
    estimatedFees,
    estimatedTotal,
    maxAffordableQuantity,
    validationMessages,
    canSubmit,
    filteredOrders,
    activeOrdersCount,
    updateDraft,
    applyQuickFill,
    resetDraft,
    updateFilter,
    submitDraft,
    cancelOrder,
  }
})
