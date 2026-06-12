<script setup>
defineProps({
  accountSummary: {
    type: Object,
    required: true,
  },
  canSubmit: {
    type: Boolean,
    required: true,
  },
  draft: {
    type: Object,
    required: true,
  },
  maxAffordableQuantity: {
    type: Number,
    required: true,
  },
  submitting: {
    type: Boolean,
    required: true,
  },
  symbols: {
    type: Array,
    required: true,
  },
  validationMessages: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update', 'quick-fill', 'submit', 'reset'])

function onNumberChange(field, event) {
  emit('update', field, Number(event.target.value))
}

function onTextChange(field, event) {
  emit('update', field, event.target.value)
}

function onCheckboxChange(field, event) {
  emit('update', field, event.target.checked)
}

const quickFillOptions = [
  { label: '25%', ratio: 0.25 },
  { label: '50%', ratio: 0.5 },
  { label: '75%', ratio: 0.75 },
]
</script>

<template>
  <section class="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.92))] p-6 shadow-2xl shadow-slate-950/40">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.3em] text-emerald-300">
          委託單
        </p>
        <h3 class="mt-3 text-2xl font-semibold text-white">
          建立委託
        </h3>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
        <p class="text-xs uppercase tracking-[0.25em] text-slate-400">
          可用額度
        </p>
        <p class="mt-2 text-lg font-semibold text-white">
          ${{ accountSummary.buyingPower.toLocaleString() }}
        </p>
      </div>
    </div>

    <div class="mt-8 space-y-6">
      <div class="grid gap-5 md:grid-cols-2">
        <label class="space-y-2">
          <span class="text-sm text-slate-300">商品代號</span>
          <select
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50"
            :value="draft.symbol"
            @change="onTextChange('symbol', $event)"
          >
            <option
              v-for="item in symbols"
              :key="item.symbol"
              :value="item.symbol"
            >
              {{ item.symbol }} / {{ item.name }}
            </option>
          </select>
        </label>

        <label class="space-y-2">
          <span class="text-sm text-slate-300">委託類型</span>
          <select
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50"
            :value="draft.orderType"
            @change="onTextChange('orderType', $event)"
          >
            <option value="市價">市價</option>
            <option value="限價">限價</option>
            <option value="停損限價">停損限價</option>
          </select>
        </label>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <button
          class="rounded-2xl px-5 py-3 text-sm font-semibold transition"
          :class="draft.side === '買進'
            ? 'bg-emerald-400 text-slate-950'
            : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20'"
          type="button"
          @click="emit('update', 'side', '買進')"
        >
          買進
        </button>

        <button
          class="rounded-2xl px-5 py-3 text-sm font-semibold transition"
          :class="draft.side === '賣出'
            ? 'bg-rose-400 text-slate-950'
            : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20'"
          type="button"
          @click="emit('update', 'side', '賣出')"
        >
          賣出
        </button>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <label class="space-y-2">
          <span class="text-sm text-slate-300">委託數量</span>
          <input
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50"
            min="1"
            step="1"
            type="number"
            :value="draft.quantity"
            @input="onNumberChange('quantity', $event)"
          >
        </label>

        <label
          v-if="draft.orderType !== '市價'"
          class="space-y-2"
        >
          <span class="text-sm text-slate-300">限價價格</span>
          <input
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50"
            min="0"
            step="0.01"
            type="number"
            :value="draft.limitPrice"
            @input="onNumberChange('limitPrice', $event)"
          >
        </label>

        <label
          v-else
          class="space-y-2"
        >
          <span class="text-sm text-slate-300">價格來源</span>
          <div class="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-300">
            即時市價
          </div>
        </label>
      </div>

      <div
        v-if="draft.orderType === '停損限價'"
        class="grid gap-5 md:grid-cols-2"
      >
        <label class="space-y-2">
          <span class="text-sm text-slate-300">停損價格</span>
          <input
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50"
            min="0"
            step="0.01"
            type="number"
            :value="draft.stopPrice"
            @input="onNumberChange('stopPrice', $event)"
          >
        </label>

        <label class="space-y-2">
          <span class="text-sm text-slate-300">委託效期</span>
          <select
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50"
            :value="draft.timeInForce"
            @change="onTextChange('timeInForce', $event)"
          >
            <option value="DAY">當日有效</option>
            <option value="GTC">取消前有效</option>
            <option value="IOC">立即成交否則取消</option>
          </select>
        </label>
      </div>

      <div
        v-else
        class="grid gap-5 md:grid-cols-2"
      >
        <label class="space-y-2">
          <span class="text-sm text-slate-300">委託效期</span>
          <select
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50"
            :value="draft.timeInForce"
            @change="onTextChange('timeInForce', $event)"
          >
            <option value="DAY">當日有效</option>
            <option value="GTC">取消前有效</option>
            <option value="IOC">立即成交否則取消</option>
          </select>
        </label>

        <label class="space-y-2">
          <span class="text-sm text-slate-300">快速帶入</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in quickFillOptions"
              :key="option.label"
              class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
              type="button"
              @click="emit('quick-fill', option.ratio)"
            >
              {{ option.label }}
            </button>
            <span class="self-center text-xs text-slate-500">
              最多可下 {{ maxAffordableQuantity }} 股
            </span>
          </div>
        </label>
      </div>

      <label class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
        <input
          class="h-4 w-4 accent-emerald-400"
          type="checkbox"
          :checked="draft.allowExtendedHours"
          @change="onCheckboxChange('allowExtendedHours', $event)"
        >
        允許盤前盤後交易時段成交
      </label>

      <label class="space-y-2">
        <span class="text-sm text-slate-300">交易備註</span>
        <textarea
          class="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50"
          placeholder="輸入策略說明或委託備註..."
          :value="draft.notes"
          @input="onTextChange('notes', $event)"
        />
      </label>

      <div
        v-if="validationMessages.length"
        class="rounded-2xl border border-amber-400/25 bg-amber-400/8 px-4 py-4"
      >
        <p class="text-sm font-medium text-amber-200">
          送出前請先確認
        </p>
        <ul class="mt-2 space-y-2 text-sm text-amber-100/90">
          <li
            v-for="message in validationMessages"
            :key="message"
          >
            {{ message }}
          </li>
        </ul>
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          class="rounded-full px-5 py-3 text-sm font-semibold transition"
          :class="draft.side === '買進'
            ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
            : 'bg-rose-400 text-slate-950 hover:bg-rose-300'"
          :disabled="!canSubmit"
          type="button"
          @click="emit('submit')"
        >
          {{ submitting ? '送出中...' : `${draft.side} ${draft.symbol}` }}
        </button>

        <button
          class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
          type="button"
          @click="emit('reset')"
        >
          重設委託單
        </button>
      </div>
    </div>
  </section>
</template>
