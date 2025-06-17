"use client"
import { CreateUserDocument } from "@/commons/graphql/graphql"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
const USE_NEW_PROFILE_COMPO = () => {
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
  return {
    inputs,
    router,
    onChangeInput,
    onClickCreateNewProfile,
  }
}

export default USE_NEW_PROFILE_COMPO
