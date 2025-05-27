"use client"
import { FetchBoardsQuery } from "@/commons/graphql/graphql"
import { MouseEvent } from "react"

export interface IPaginationProps {
  // page: number
  // setPage: (page: number) => void
  refetch: () => void
  data: FetchBoardsQuery | undefined
  onClickPage: (event: MouseEvent<HTMLSpanElement>) => void
}
