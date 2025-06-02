"use client"

import { CreateTravelproductDocument } from "@/commons/graphql/graphql"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { ChangeEvent, MouseEvent, useState } from "react"

const USE_SHOPPING_NEW_POST = () => {
  const router = useRouter()
  const [createTravelproduct] = useMutation(CreateTravelproductDocument)
  const [inputs, setInputs] = useState({
    name: "",
    remarks: "",
    contents: "",
    file: null,
    tags: [],
    price: 0,
  })
  const [address, setAddress] = useState({
    zipcode: "",
    address: "",
    addressDetail: "",
    lat: [],
    lng: [],
  })
  // 이미지 미리보기 데이터를 담은 배열
  const [images, setImages] = useState(["", "", ""])
  //이미지 업로드를 위한 url주소 배열
  const [imageUrl, setImageUrl] = useState(["", "", ""])

  const [showLocationFinder, setShowLocationFinder] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    })
    // const { name, value } = event.target
    // setInputs((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }))
  }

  //   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0] || null
  //     setInputs((prev) => ({
  //       ...prev,
  //       file,
  //     }))
  //   }

  const onClickPost = async (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    let hasError = false
    if (hasError === false) {
      const { data } = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: String(inputs.name),
            contents: String(inputs.contents),
            price: Number(inputs.price),
            remarks: String(inputs.remarks),
            tags: inputs.tags,
          },
        },
      })
      console.log("상품이 등록되었습니다. :: ", data?.createTravelproduct)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", inputs)
  }

  const toggleLocationFinder = () => {
    setShowLocationFinder(!showLocationFinder)
  }

  const onClickCancel = () => {
    router.push(`/shop`)
  }

  return {
    inputs,
    address,
    showLocationFinder,
    handleInputChange,
    // handleFileChange,
    handleSubmit,
    toggleLocationFinder,
    onClickPost,
    onClickCancel,
  }
}

export default USE_SHOPPING_NEW_POST
