"use client"

import { CreateTravelproductDocument, UploadFileDocument } from "@/commons/graphql/graphql"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { ChangeEvent, MouseEvent, useState } from "react"
import { IMAGE_FILE_VALIDATION } from "../boards-write/ImageFileValidation"

const USE_SHOPPING_NEW_POST = () => {
  const router = useRouter()
  const [createTravelproduct] = useMutation(CreateTravelproductDocument)
  const [uploadFile] = useMutation(UploadFileDocument)
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
      [event.target.id]: event.target.value,
    })
    // const { name, value } = event.target
    // setInputs((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }))
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0]
    // const file = fileRef.current?.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      console.log("images", images)
      const updatedImages = [...(images ? images : ["", "", ""])]
      console.log("updatedImages::", updatedImages)
      updatedImages[index] = reader.result as string
      setImages(updatedImages)
    }
    reader.readAsDataURL(file)

    //파일 검증
    const isValid = IMAGE_FILE_VALIDATION(file)
    if (!isValid) {
      alert("파일의 형식이 유효하지 않습니다.")
      return
    }
    //index값이 유효한지 검증
    if (!images) return
    if (index < 0 || index >= images.length) {
      console.error("유효하지 않은 index 값입니다:", index)
      return
    }

    try {
      const result = await uploadFile({ variables: { file } })
      const uploadedUrl = result.data?.uploadFile.url ?? ""
      console.log("URL업로드::", uploadedUrl)

      // if (isEdit) {
      //   //수정상태일 때, 이미지를 조회해서 가져온다.
      //   const updatedEditImages = [...(editImages || ["", "", ""])]
      //   updatedEditImages[index] = uploadedUrl
      //   console.log("업로드 주소 updatedEditImages::", updatedEditImages)
      //   setImageUrl(updatedEditImages)
      // } else {
      const updatedImageUrl = [...(imageUrl || ["", "", ""])]
      updatedImageUrl[index] = uploadedUrl
      setImageUrl(updatedImageUrl)
      // }
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error)
    }
  }

  const onClickPost = async (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    let hasError = false
    try {
      const { data } = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: String(inputs.name),
            contents: String(inputs.contents),
            price: Number(inputs.price),
            remarks: String(inputs.remarks),
            tags: inputs.tags,
            images: imageUrl,
            travelproductAddress: {
              zipcode: address.zipcode,
              address: address.address,
              addressDetail: address.addressDetail,
              lat: Number(address.lat),
              lng: Number(address.lng),
            },
          },
        },
      })
      if (data?.createTravelproduct) {
        console.log("상품이 등록되었습니다. :: ", data?.createTravelproduct)
        alert("상품이 등록되었습니다")
        router.push(`/shop/${data?.createTravelproduct._id}`)
      }
    } catch (err) {
      console.log(err)
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
    images,
    inputs,
    address,
    showLocationFinder,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    toggleLocationFinder,
    onClickPost,
    onClickCancel,
  }
}

export default USE_SHOPPING_NEW_POST
