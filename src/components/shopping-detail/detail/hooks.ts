"use client"
import { useQuery } from "@apollo/client"
import { FetchTravelproductDocument } from "@/commons/graphql/graphql"
import { useParams } from "next/navigation"

const USE_PRODUCT_DETAIL_PAGE = () => {
  const params = useParams()
  const productID = params?.productId

  const { data } = useQuery(FetchTravelproductDocument, {
    variables: {
      travelproductId: String(productID),
    },
  })

  return {
    data,
  }
}

export default USE_PRODUCT_DETAIL_PAGE
