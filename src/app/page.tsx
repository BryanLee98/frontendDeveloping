"use client"

import { useState, useEffect } from "react"
import OPEN_API_CAT_COMPO from "@/components/open-api-cat-scroll"
import OPEN_API_PAGE_LIST_COMPONENT from "@/components/open-api-list"
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  query,
  orderBy,
} from "firebase/firestore"
import { app } from "@/commons/libraries/firebase"

const OPEN_API_PAGE = () => {
  const [dataList, setDataList] = useState<DocumentData[]>([])

  const fetchRecentData = async () => {
    const db = getFirestore(app)
    const boardCollection = collection(db, "board")

    // date 필드를 기준으로 내림차순 정렬
    const boardQuery = query(
      boardCollection,
      orderBy("date", "desc"),
      limit(10)
    )
    const snapshot = await getDocs(boardQuery)

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log(data) // 가장 최근 데이터부터 출력
    setDataList(data) // 상태에 저장
  }

  useEffect(() => {
    fetchRecentData()
  }, []) // 컴포넌트가 마운트될 때 실행

  return (
    <>
      <OPEN_API_PAGE_LIST_COMPONENT
        dataList={dataList}
        setDataList={setDataList}
      />
      <OPEN_API_CAT_COMPO />
    </>
  )
}

export default OPEN_API_PAGE
