<script setup>
import { formatCurrency, formatDateTime } from '../../utils/formatters'

defineProps({
  orders: {
    type: Array,
    required: true,
  },
  searchTerm: {
    type: String,
    required: true,
  },
  selectedSide: {
    type: String,
    required: true,
  },
  selectedStatus: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:search', 'update:side', 'update:status', 'cancel'])

const statuses = ['全部', '排隊中', '委託中', '已成交', '已取消']
const sides = ['全部', '買進', '賣出']

function statusClass(status) {
  if (status === '已成交') {
    return 'bg-emerald-400/10 text-emerald-200 border-emerald-400/20'
  }

  if (status === '已取消') {
    return 'bg-slate-400/10 text-slate-300 border-slate-400/20'
  }

  if (status === '委託中' || status === '排隊中') {
    return 'bg-sky-400/10 text-sky-200 border-sky-400/20'
  }

  return 'bg-amber-400/10 text-amber-200 border-amber-400/20'
}
</script>

<template>
  <section class="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/20">
    <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.3em] text-sky-300">
          委託列表
        </p>
        <h3 class="mt-3 text-2xl font-semibold text-white">
          進行中與近期委託
        </h3>
      </div>

      <div class="grid gap-3 sm:grid-cols-3">
        <label class="space-y-2">
          <span class="text-xs uppercase tracking-[0.2em] text-slate-500">搜尋</span>
          <input
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
            placeholder="輸入股票代號或委託編號"
            :value="searchTerm"
            @input="emit('update:search', $event.target.value)"
          >
        </label>

        <label class="space-y-2">
          <span class="text-xs uppercase tracking-[0.2em] text-slate-500">買賣別</span>
          <select
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
            :value="selectedSide"
            @change="emit('update:side', $event.target.value)"
          >
            <option
              v-for="side in sides"
              :key="side"
              :value="side"
            >
              {{ side }}
            </option>
          </select>
        </label>

        <label class="space-y-2">
          <span class="text-xs uppercase tracking-[0.2em] text-slate-500">狀態</span>
          <select
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
            :value="selectedStatus"
            @change="emit('update:status', $event.target.value)"
          >
            <option
              v-for="status in statuses"
              :key="status"
              :value="status"
            >
              {{ status }}
            </option>
          </select>
        </label>
      </div>
    </div>

    <div class="mt-6 overflow-hidden rounded-3xl border border-white/10">
      <div class="hidden grid-cols-[1.1fr_0.8fr_0.8fr_0.9fr_0.9fr_0.8fr] gap-4 bg-slate-950/80 px-5 py-3 text-xs uppercase tracking-[0.2em] text-slate-500 lg:grid">
        <span>委託單</span>
        <span>類型</span>
        <span>數量</span>
        <span>價格</span>
        <span>狀態</span>
        <span class="text-right">操作</span>
      </div>

      <div
        v-if="orders.length"
        class="divide-y divide-white/10"
      >
        <article
          v-for="order in orders"
          :key="order.id"
          class="grid gap-4 bg-white/3 px-5 py-4 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.9fr_0.9fr_0.8fr] lg:items-center"
        >
          <div>
            <p class="font-semibold text-white">
              {{ order.symbol }} / {{ order.side }}
            </p>
            <p class="mt-1 text-xs text-slate-500">
              {{ order.id }} · {{ formatDateTime(order.submittedAt) }}
            </p>
          </div>

          <p class="text-sm text-slate-300">
            {{ order.orderType }}
          </p>

          <p class="text-sm text-slate-300">
            {{ order.quantity }} 股
          </p>

          <p class="text-sm text-slate-300">
            {{ order.limitPrice ? formatCurrency(order.limitPrice) : '市價' }}
          </p>

          <div>
            <span
              class="inline-flex rounded-full border px-3 py-1 text-xs font-medium"
              :class="statusClass(order.status)"
            >
              {{ order.status }}
            </span>
          </div>

          <div class="lg:text-right">
            <button
              v-if="['委託中', '排隊中', '部分成交'].includes(order.status)"
              class="rounded-full border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-400/20"
              type="button"
              @click="emit('cancel', order.id)"
            >
              取消委託
            </button>
            <span
              v-else
              class="text-xs text-slate-500"
            >
              無可用操作
            </span>
          </div>
        </article>
      </div>

      <div
        v-else
        class="px-5 py-12 text-center text-sm text-slate-400"
      >
        沒有符合目前篩選條件的委託單。
      </div>
    </div>
  </section>
</template>
