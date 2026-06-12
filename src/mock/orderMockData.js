export const marketSymbols = [
  {
    symbol: 'AAPL',
    name: '蘋果公司',
    price: 214.83,
    change: 1.82,
    changePercent: 0.85,
    bid: 214.8,
    ask: 214.91,
    dayRange: '212.40 - 215.37',
  },
  {
    symbol: 'NVDA',
    name: '輝達公司',
    price: 141.28,
    change: -0.64,
    changePercent: -0.45,
    bid: 141.22,
    ask: 141.33,
    dayRange: '139.60 - 142.18',
  },
  {
    symbol: 'TSLA',
    name: '特斯拉',
    price: 186.47,
    change: 3.24,
    changePercent: 1.77,
    bid: 186.42,
    ask: 186.54,
    dayRange: '181.21 - 187.02',
  },
  {
    symbol: 'MSFT',
    name: '微軟公司',
    price: 468.14,
    change: 2.35,
    changePercent: 0.5,
    bid: 468.02,
    ask: 468.22,
    dayRange: '463.10 - 469.00',
  },
]

export const seededOrders = [
  {
    id: 'ORD-240612-001',
    symbol: 'AAPL',
    side: '買進',
    orderType: '限價',
    quantity: 20,
    limitPrice: 213.5,
    status: '委託中',
    submittedAt: '2026-06-12T09:31:00+08:00',
  },
  {
    id: 'ORD-240612-002',
    symbol: 'NVDA',
    side: '賣出',
    orderType: '市價',
    quantity: 8,
    limitPrice: null,
    status: '已成交',
    submittedAt: '2026-06-12T10:06:00+08:00',
  },
  {
    id: 'ORD-240612-003',
    symbol: 'TSLA',
    side: '買進',
    orderType: '停損限價',
    quantity: 12,
    limitPrice: 184.5,
    status: '排隊中',
    submittedAt: '2026-06-12T10:44:00+08:00',
  },
]

export const seededPositions = [
  { symbol: 'AAPL', quantity: 120, averageCost: 198.44, pnl: 1966.8 },
  { symbol: 'MSFT', quantity: 35, averageCost: 452.12, pnl: 560.7 },
  { symbol: 'TSLA', quantity: 18, averageCost: 191.03, pnl: -82.08 },
]

export const initialOrderDraft = {
  symbol: 'AAPL',
  side: '買進',
  orderType: '限價',
  quantity: 10,
  limitPrice: 214.5,
  stopPrice: 213.8,
  timeInForce: 'DAY',
  allowExtendedHours: false,
  notes: '',
}
