"use client"
import { FetchBoardsQuery } from "@/commons/graphql/graphql"
import { ApolloQueryResult, OperationVariables } from "@apollo/client"

export interface IPaginationProps {
  page: number
  setPage: (page: number) => void
  refetch: () => void
  data: FetchBoardsQuery
}
