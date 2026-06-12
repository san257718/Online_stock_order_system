<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'

import BaseModal from '../../components/common/BaseModal.vue'
import FloatingNotice from '../../components/common/FloatingNotice.vue'
import PageSection from '../../components/common/PageSection.vue'
import OrderBlotter from '../../components/order/OrderBlotter.vue'
import OrderInsightCard from '../../components/order/OrderInsightCard.vue'
import OrderTicketForm from '../../components/order/OrderTicketForm.vue'
import { useOrdersStore } from '../../stores'

const ordersStore = useOrdersStore()
const showMessageModal = ref(false)
const showTradeNotice = ref(false)
let tradeNoticeTimer = null

const {
  accountSummary,
  draft,
  symbols,
  selectedSymbol,
  estimatedNotional,
  estimatedFees,
  estimatedTotal,
  maxAffordableQuantity,
  validationMessages,
  canSubmit,
  activeOrdersCount,
  filteredOrders,
  selectedStatus,
  selectedSide,
  searchTerm,
  lastSubmissionMessage,
  lastTradeNotice,
  submitting,
  positions,
} = storeToRefs(ordersStore)

function handleUpdate(field, value) {
  ordersStore.updateDraft(field, value)
}

async function handleSubmit() {
  await ordersStore.submitDraft()

  if (ordersStore.lastTradeNotice.title) {
    showTradeNotice.value = true

    window.clearTimeout(tradeNoticeTimer)
    tradeNoticeTimer = window.setTimeout(() => {
      showTradeNotice.value = false
      ordersStore.clearTradeNotice()
    }, 3200)
  }
}

function closeTradeNotice() {
  window.clearTimeout(tradeNoticeTimer)
  showTradeNotice.value = false
  ordersStore.clearTradeNotice()
}

onBeforeUnmount(() => {
  window.clearTimeout(tradeNoticeTimer)
})

const modalMessage = computed(() => {
  const selectedPrice = selectedSymbol.value?.price?.toFixed(2) ?? '--'

  return [
    `目前準備送出的是 ${draft.value.side} ${draft.value.symbol} 的委託單。`,
    `委託類型：${draft.value.orderType}`,
    `委託數量：${draft.value.quantity} 股`,
    `參考市價：$${selectedPrice}`,
    '',
    '你之後可以把這個視窗拿來顯示提醒訊息、送單確認、成交回報，或任何重要訊息。',
  ].join('\n')
})
</script>

<template>
  <div class="space-y-6">
    <PageSection
      eyebrow="委託"
      title="下單執行工作區"
      description="這是一個可互動的前端下單模組，包含委託輸入、即時試算、列表篩選與模擬送單流程。"
    >
      <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div class="text-sm leading-7 text-slate-400">
          已加入一個可重用的漂亮 Modal 視窗元件，按下按鈕就能展示訊息內容。
        </div>

        <button
          class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
          type="button"
          @click="showMessageModal = true"
        >
          開啟訊息視窗
        </button>
      </div>

      <div class="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <OrderTicketForm
          :account-summary="accountSummary"
          :can-submit="canSubmit"
          :draft="draft"
          :max-affordable-quantity="maxAffordableQuantity"
          :submitting="submitting"
          :symbols="symbols"
          :validation-messages="validationMessages"
          @quick-fill="ordersStore.applyQuickFill"
          @reset="ordersStore.resetDraft"
          @submit="handleSubmit"
          @update="handleUpdate"
        />

        <OrderInsightCard
          :account-summary="accountSummary"
          :active-orders-count="activeOrdersCount"
          :estimated-fees="estimatedFees"
          :estimated-notional="estimatedNotional"
          :estimated-total="estimatedTotal"
          :last-submission-message="lastSubmissionMessage"
          :selected-symbol="selectedSymbol"
        />
      </div>
    </PageSection>

    <section class="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
      <OrderBlotter
        :orders="filteredOrders"
        :search-term="searchTerm"
        :selected-side="selectedSide"
        :selected-status="selectedStatus"
        @cancel="ordersStore.cancelOrder"
        @update:search="ordersStore.updateFilter('searchTerm', $event)"
        @update:side="ordersStore.updateFilter('selectedSide', $event)"
        @update:status="ordersStore.updateFilter('selectedStatus', $event)"
      />

      <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/20">
        <p class="text-xs font-medium uppercase tracking-[0.3em] text-amber-300">
          持倉快照
        </p>
        <h3 class="mt-3 text-2xl font-semibold text-white">
          庫存檢查
        </h3>

        <div class="mt-6 space-y-3">
          <div
            v-for="position in positions"
            :key="position.symbol"
            class="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
          >
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="font-semibold text-white">
                  {{ position.symbol }}
                </p>
                <p class="mt-1 text-sm text-slate-400">
                  持有 {{ position.quantity }} 股，均價 {{ position.averageCost.toFixed(2) }}
                </p>
              </div>

              <p
                class="text-sm font-semibold"
                :class="position.pnl >= 0 ? 'text-emerald-300' : 'text-rose-300'"
              >
                {{ position.pnl >= 0 ? '+' : '' }}${{ position.pnl.toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <BaseModal
      :message="modalMessage"
      :open="showMessageModal"
      close-text="關閉視窗"
      eyebrow="訊息預覽"
      title="委託提醒視窗"
      @close="showMessageModal = false"
    />

    <FloatingNotice
      :message="lastTradeNotice.message"
      :open="showTradeNotice"
      :title="lastTradeNotice.title"
      :tone="lastTradeNotice.tone"
      @close="closeTradeNotice"
    />
  </div>
</template>
