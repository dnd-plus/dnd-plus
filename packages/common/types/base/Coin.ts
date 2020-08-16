export type Coin = {
  type: CoinType
  value: number
}

export type CoinType = 'cp' | 'sp' | 'ep' | 'gp' | 'pp'
