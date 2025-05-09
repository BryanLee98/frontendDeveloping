"use client"

import { Exact, FetchBoardsQuery, InputMaybe } from "@/commons/graphql/graphql"
import { ApolloQueryResult, OperationVariables } from "@apollo/client"

export interface IBoardListProps {
  keyword: string
  data: FetchBoardsQuery | undefined
  page: number
  refetch: (
    variables?:
      | Partial<Exact<{ page?: InputMaybe<number> | undefined }>>
      | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>
}
