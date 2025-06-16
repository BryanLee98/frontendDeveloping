"use client"
import styles from "./styles.module.css"
import { CreateUserDocument } from "@/commons/graphql/graphql"
import { useMutation } from "@apollo/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { Input, Button } from "antd"

const LOGIN_IMAGES = {
  LoginBanner: {
    src: require("@/images/asset/Login_Banner.png"),
    alt: "로그인배너",
  },
}

const CREATE_NEW_PROFILE_COMPO = () => {
  const router = useRouter()
  const [createUser] = useMutation(CreateUserDocument)

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  })

  const [validation, setValidation] = useState<boolean>(false)

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event?.target.id]: event?.target.value,
    })
  }

  const onClickCreateNewProfile = async () => {
    if (inputs.password !== inputs.passwordCheck) {
      setValidation(false)
    } else {
      setValidation(true)
    }
    if (validation === true) {
      try {
        await createUser({
          variables: {
            createUserInput: {
              name: inputs.name,
              email: inputs.email,
              password: inputs.password,
            },
          },
        })
        router.push("/login")
        alert("계정이 생성되었습니다.")
      } catch (error) {
        console.log(error)
        alert("계정 생성에 실패했습니다.")
      }
    } else if (!validation) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
  }
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
