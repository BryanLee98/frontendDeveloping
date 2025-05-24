import { Exact, FetchTravelproductsQuery, InputMaybe, Scalars } from "@/commons/graphql/graphql"
import { FetchMoreQueryOptions, OperationVariables } from "@apollo/client"
import { Dispatch, SetStateAction } from "react"

export interface IPropsTradeList {
  data: any
  isSoldout: boolean
  hasMore: boolean
  setHasMore: Dispatch<SetStateAction<boolean>>
  fetchMore: <
    TFetchData = FetchTravelproductsQuery,
    TFetchVars extends OperationVariables = Exact<{
      isSoldout?: InputMaybe<Scalars["Boolean"]["input"]>
      search?: InputMaybe<Scalars["String"]["input"]>
      page?: InputMaybe<Scalars["Int"]["input"]>
    }>,
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchData, TFetchVars>
  ) => Promise<any>
}
