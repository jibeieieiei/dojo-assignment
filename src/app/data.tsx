import { CoinType } from '@/types/CoinType'
import { ContainerType } from '@/types/ContainerType'
import { PriceType } from '@/types/PriceType'

export const COINS: CoinType[] = [
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    image: '/eth.png',
    status: 'UnWatch',
  },
  {
    id: '2',
    name: 'Bitcoin',
    symbol: 'BTC',
    image: '/btc.png',
    status: 'UnWatch',
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    image: '/sol.png',
    status: 'UnWatch',
  },
  {
    id: '4',
    name: 'Tether',
    symbol: 'USDT',
    image: '/usdt.png',
    status: 'UnWatch',
  },

  {
    id: '5',
    name: 'Dogecoin',
    symbol: 'DOGE',
    image: '/doge.jpeg',
    status: 'UnWatch',
  },
  {
    id: '6',
    name: 'XRP',
    symbol: 'XRP',
    image: '/xrp.png',
    status: 'UnWatch',
  },
  {
    id: '7',
    name: 'BNB',
    symbol: 'BNB',
    image: '/bnb.png',
    status: 'UnWatch',
  },
]

export const CONTAINERS: ContainerType[] = [
  {
    id: 'unwatch',
    title: 'Possible Coins',
    coins: COINS,
  },
  {
    id: 'watch',
    title: 'Watch List',
    coins: [],
  },
]

export const PRICE: PriceType[] = [
  {
    index: '1',
    name: 'ETH',
    value: { data: [100000, 120000, 95000], label: 'ETH' },
    date: ['2010', '2011', '2012'],
  },
  {
    index: '2',
    name: 'BTC',
    value: { data: [1000000, 1200000, 14000000], label: 'BTC' },
    date: ['2010', '2011', '2012'],
  },
  {
    index: '3',
    name: 'SOL',
    value: { data: [2000, 4000, 2000], label: 'SOL' },
    date: ['2010', '2011', '2012'],
  },
  {
    index: '4',
    name: 'USDT',
    value: { data: [30, 30, 30], label: 'USDT' },
    date: ['2010', '2011', '2012'],
  },
  {
    index: '6',
    name: 'XRP',
    value: { data: [300, 230, 240], label: 'XRP' },
    date: ['2010', '2011', '2012'],
  },
  {
    index: '7',
    name: 'BNB',
    value: { data: [150, 200, 250], label: 'BNB' },
    date: ['2010', '2011', '2012'],
  },
]
