"use client"
import styles from "./styles.module.css"
import Image from "next/image"
import { Input, Button } from "antd"
import USE_NEW_PROFILE_COMPO from "./hooks"

const LOGIN_IMAGES = {
  LoginBanner: {
    src: require("@/images/asset/Login_Banner.png"),
    alt: "로그인배너",
  },
}

const CREATE_NEW_PROFILE_COMPO = () => {
  const { inputs, router, onChangeInput, onClickCreateNewProfile } = USE_NEW_PROFILE_COMPO()

  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.SignUpFrame}>
          <div className={styles.SignUpText}>
            <h1 className={styles.SignUpTitle}>회원가입</h1>
            <h4 className={styles.SignUpHello}>회원가입을 위해 아래 정보를 입력해주세요.</h4>
          </div>
          <div className={styles.SignUpInputContainer}>
            <div>
              이메일 <span style={{ color: "red" }}>*</span>
            </div>

            <Input
              size="large"
              onChange={onChangeInput}
              id="email"
              value={inputs.email}
              type="text"
              placeholder="example123@mail.com"
            />
            <div>
              사용할 이름 <span style={{ color: "red" }}>*</span>
            </div>
            <Input
              size="large"
              onChange={onChangeInput}
              id="name"
              value={inputs.name}
              type="text"
              placeholder="사용할 이름을 입력해주세요"
            />
            <div>
              비밀번호 <span style={{ color: "red" }}>*</span>
            </div>
            <Input.Password
              size="large"
              onChange={onChangeInput}
              id="password"
              value={inputs.password}
              type="password"
              placeholder="* * * * * * *"
            />
            <div>
              비밀번호 확인 <span style={{ color: "red" }}>*</span>
            </div>
            <Input.Password
              size="large"
              onChange={onChangeInput}
              id="passwordCheck"
              value={inputs.passwordCheck}
              type="password"
              placeholder="비밀번호를 확인해주세요"
            />
          </div>

          <Button
            className={styles.SignUpButtonContainer}
            size="large"
            type="primary"
            onClick={onClickCreateNewProfile}
          >
            계정 생성하기
          </Button>
          <Button
            className={styles.SignUpButtonContainer}
            size="large"
            type="link"
            onClick={() => {
              router.push("/login")
            }}
          >
            이전으로
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

export default CREATE_NEW_PROFILE_COMPO
