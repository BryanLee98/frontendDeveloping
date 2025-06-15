"use client"

import { CreateUserDocument } from "@/commons/graphql/graphql"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

const CREATE_NEW_PROFILE_COMPO = () => {
  const router = useRouter()
  const [createUser] = useMutation(CreateUserDocument)

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  })
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event?.target.id]: event?.target.value,
    })
  }

  const onClickCreateNewProfile = async () => {
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
  }

  return (
    <>
      <div>
        <input
          onChange={onChangeInput}
          id="name"
          value={inputs.name}
          type="text"
          placeholder="사용할 이름을 입력해주세요"
        />
        <input
          onChange={onChangeInput}
          id="email"
          value={inputs.email}
          type="text"
          placeholder="이메일을 입력해주세요"
        />
        <input onChange={onChangeInput} id="password" value={inputs.password} type="password" placeholder="********" />

        <button onClick={onClickCreateNewProfile}>계정 생성하기</button>
      </div>
    </>
  )
}

export default CREATE_NEW_PROFILE_COMPO
