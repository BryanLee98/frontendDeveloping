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
  return {
    onClickMyPage,
    onClickTripTalk,
  }
}
export default USE_NAVIGATION_HOOK
