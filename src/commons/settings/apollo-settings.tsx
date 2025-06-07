"use client"

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"
import { use, useEffect } from "react"
import { useAccessToken } from "../store/accessToken_stores/stores"

interface IApolloSetting {
  children: React.ReactNode
}

//캐시가 초기화 되지 않기 위해서
const GLOBAL_STATE = new InMemoryCache()

type AccessTokenStore = {
  accessToken: string
  setAccessToken: (accessToken: string) => void
}

export default function ApolloHeaderSetting(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessToken() as AccessTokenStore

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken") ?? "")
  }, [])
  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken} `,
    },
  })

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE,
  })

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
