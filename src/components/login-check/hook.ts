"use client"
import { useMutation } from "@apollo/client"
import { ChangeEvent, useState } from "react"
import { useAccessToken } from "@/commons/store/accessToken_stores/stores"
import { useRouter } from "next/navigation"
import { LoginUserDocument } from "@/commons/graphql/graphql"

type AccessTokenStore = {
  accessToken: string
  setAccessToken: (accessToken: string) => void
}
const USE_LOGIN_PAGE_COMPO = () => {
  const router = useRouter()
  const [loginUser] = useMutation(LoginUserDocument)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setAccessToken } = useAccessToken() as AccessTokenStore

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onClickLogin = async () => {
    // 1. 로그인 mutation 날려서 access Token 받아오기
    const result = await loginUser({
      variables: {
        email: email,
        password: password,
      },
    })
    const accessToken = result.data?.loginUser.accessToken
    // 2. 받아온 액서스 토큰을 글로벌 스테이트로 저장해두기(zustand)
    console.log(accessToken)
    setAccessToken(accessToken ?? "")
    // 3. 받아온 액서스 토큰을 로컬 스토리지에 저장을 한다.
    // 개발자 도구에 있는 애플리케이션 메뉴에 key, value의 객체 형태로 들어간다.
    localStorage.setItem("accessToken", accessToken ?? "")
    if (accessToken) {
      alert("로그인 성공")
      router.push(`/boards/`)
    } else {
      alert("로그인 실패")
    }
  }
  return {
    router,
    email,
    password,
    passwordVisible,
    setPasswordVisible,
    onChangeEmail,
    onChangePassword,
    onClickLogin,
  }
}

export default USE_LOGIN_PAGE_COMPO
