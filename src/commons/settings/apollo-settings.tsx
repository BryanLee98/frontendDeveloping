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
    // 캐시는 액서스토큰이 변경되어 rerendering 될 떼, 새로 만들어진다.
    // cache: new InMemoryCache(),
    // 컴포넌트는 새로 만들어져도 global state는 그대로 유지된다.
    cache: GLOBAL_STATE,
  })

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
