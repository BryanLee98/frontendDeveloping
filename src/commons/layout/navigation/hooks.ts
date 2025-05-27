"use client"

import { useRouter } from "next/navigation"

const USE_NAVIGATION_HOOK = () => {
  const router = useRouter()

  const onClickMyPage = () => {
    router.push("/profile/")
  }
  const onClickTripTalk = () => {
    router.push("/boards/")
  }

  const onClickShoppingPage = () => {
    router.push("/shop/")
  }
  return {
    onClickMyPage,
    onClickTripTalk,
    onClickShoppingPage,
  }
}
export default USE_NAVIGATION_HOOK
