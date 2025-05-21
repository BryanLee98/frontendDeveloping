"use client"

export interface TableData {
  id: number
  productName: string
  status: string
  quantity: string
  date: string
  balance: number
}

export interface IPropsTrade {
  data: any
  page: number
  isSoldout: boolean
  search: string
}
