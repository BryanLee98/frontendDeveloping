import { app } from "@/commons/libraries/firebase"
import { doc, DocumentData, getDoc, getFirestore } from "firebase/firestore"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const USE_API_BOARD_WRITE = () => {
  const router = useRouter()
  let pathName = usePathname()

  const fetchedDocumentId = pathName?.split("/")[2]

  const [documentData, setDocumentData] = useState<DocumentData>({})
  const [youtubeID, setYoutubeID] = useState("")

  const onClickListPage = () => {
    router.push("/openapi")
  }

  const onClickEditPage = () => {
    router.push(`/openapi/${fetchedDocumentId}/edit`)
  }
  useEffect(() => {
    let isFetched = false // 데이터가 이미 조회되었는지 확인하는 플래그

    const fetchDocument = async () => {
      if (!fetchedDocumentId || isFetched) return // ID가 없거나 이미 조회되었으면 실행하지 않음

      const db = getFirestore(app)
      const docRef = doc(db, "board", fetchedDocumentId) // Document ID로 참조 생성
      const result = await getDoc(docRef)

      if (result.exists()) {
        setDocumentData(result.data()) // Document 데이터를 상태로 저장
        isFetched = true // 데이터가 조회되었음을 표시
      } else {
        console.log("No such document!")
      }
    }

    fetchDocument()
  }, [fetchedDocumentId]) // ID가 변경될 때마다 실행

  const getYoutubeId = () => {
    setYoutubeID(documentData?.youtubeLink?.split("v=")[1] ?? "")
    console.log(youtubeID)
  }
  return {
    documentData,
    youtubeID,
    onClickListPage,
    onClickEditPage,
    getYoutubeId,
  }
}

export default USE_API_BOARD_WRITE
