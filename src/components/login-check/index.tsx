"use client"
import styles from "./styles.module.css"
import Image from "next/image"
import { Button, Input } from "antd"
import USE_LOGIN_PAGE_COMPO from "./hook"

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
  const {
    router,
    email,
    password,
    passwordVisible,
    setPasswordVisible,
    onChangeEmail,
    onChangePassword,
    onClickLogin,
  } = USE_LOGIN_PAGE_COMPO()

  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.LoginFrame}>
          <Image src={LOGIN_IMAGES.LoginLogo.src} alt="로그인 로고" width={100} height={100} />
          <div className={styles.LoginText}>
            <h1 className={styles.LoginTitle}>트립트립에 오신 것을 환영합니다.</h1>
            <h6 className={styles.LoginHello}>트립트립에 로그인 하세요</h6>
          </div>
          <div className={styles.InputContainer}>
            <Input
              size="large"
              placeholder="이메일을 입력해주세요"
              onChange={onChangeEmail}
              value={email}
              type="text"
            />
            <Input.Password
              size="large"
              placeholder="비밀번호를 입력해주세요"
              visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              onChange={onChangePassword}
              value={password}
              type="password"
            />
            <Button color="blue" type="primary" size="large" onClick={onClickLogin}>
              로그인
            </Button>
          </div>
          <div className={styles.ButtonContainer}>
            <Button type="link" size="large" onClick={() => router.push("/signup")}>
              회원가입
            </Button>
            <Button type="text" onClick={() => router.push("/boards")}>
              홈으로
            </Button>
          </div>
        </div>
        <div className={styles.ImageFrame}>
          <div className={styles.ImageContainer}>
            <Image src={LOGIN_IMAGES.LoginBanner.src} alt="로그인배너" />
          </div>
        </div>
      </div>
    </>
  )
}

export default LOGIN_PAGE_COMPO
