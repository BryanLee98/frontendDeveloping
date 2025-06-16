"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LogoutUserDocument } from "@/commons/graphql/graphql"

const USE_NAVIGATION_HOOK = () => {
  const router = useRouter()
  const [logoutUser] = useMutation(LogoutUserDocument)
  const onClickMyPage = () => {
    router.push("/profile/")
  }
  const onClickTripTalk = () => {
    router.push("/boards/")
  }

  const onClickShoppingPage = () => {
    router.push("/shop/")
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const onClickLogout = async () => {
    localStorage.removeItem("accessToken")
    const result = await logoutUser()
    console.log(result.data?.logoutUser)
    router.push("/login")
  }

  return {
    open,
    anchorEl,
    onClickMyPage,
    onClickTripTalk,
    onClickShoppingPage,
    handleClick,
    handleClose,
    onClickLogout,
  }
}
export default USE_NAVIGATION_HOOK
