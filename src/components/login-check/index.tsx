"use client"

import { useMutation } from "@apollo/client"
import styles from "./styles.module.css"
import { ChangeEvent, useState } from "react"
import { useAccessToken } from "@/commons/store/accessToken_stores/stores"
import { useRouter } from "next/navigation"
import { LoginUserDocument } from "@/commons/graphql/graphql"
import Image from "next/image"
import { Button, Input } from "antd"

// type AccessTokenStore = {
//   accessToken: string
//   setAccessToken: (accessToken: string) => void
// }

const LOGIN_IMAGES = {
  LoginBanner: {
    src: require("@/images/asset/Login_Banner.png"),
    alt: "로그인배너",
  },
  LoginLogo: {
    src: require("@/images/asset/Login_icon.png"),
    alt: "로그인 로고",
  },
}

const LOGIN_PAGE_COMPO = () => {
  const router = useRouter()
  const [loginUser] = useMutation(LoginUserDocument)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setAccessToken } = useAccessToken() as any

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

  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.LoginFrame}>
          <Image src={LOGIN_IMAGES.LoginLogo.src} alt="로그인 로고" />
          <h1>트립트립에 오신 것을 환영합니다.</h1>
          <h6>트립트립에 로그인 하세요</h6>
          <Input placeholder="이메일을 입력해주세요" onChange={onChangeEmail} value={email} type="text" />
          <Input.Password
            placeholder="비밀번호를 입력해주세요"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            onChange={onChangePassword}
            value={password}
            type="password"
          />
          <Button size="large" onClick={onClickLogin}>
            로그인
          </Button>
          <Button size="large" onClick={() => router.push("/signup")}>
            회원가입
          </Button>
        </div>
        <div>
          <div>
            <Image src={LOGIN_IMAGES.LoginBanner.src} alt="로그인배너" />
          </div>
        </div>
      </div>
    </>
  )
}

export default LOGIN_PAGE_COMPO
