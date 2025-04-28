"use client"

import { useState, useEffect } from "react"
import {
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore"
import { Pagination } from "antd"
import OPEN_API_PAGE_LIST_COMPONENT from "@/components/open-api-list"
import { app } from "@/commons/libraries/firebase"
import API_PAGINATION_COMPO from "@/components/open-api-list/pagination"
import SEARCH_HEADER_COMPONENT from "@/components/open-api-list/search"

const OPEN_API_PAGE = () => {
  const [dataList, setDataList] = useState<DocumentData>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app)
      const boardCollection = collection(db, "board")

      // 데이터를 날짜별로 내림차순 정렬
      const boardQuery = query(boardCollection, orderBy("date", "desc"))
      const snapshot = await getDocs(boardQuery)

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setDataList(data)
      setTotalCount(data.length) // 총 데이터 개수 설정
    }

    fetchData()
  }, [])

  // 현재 페이지에 해당하는 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = dataList.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <SEARCH_HEADER_COMPONENT />
      <OPEN_API_PAGE_LIST_COMPONENT currentData={currentData} />
      <API_PAGINATION_COMPO
        currentData={currentData}
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  )
}

export default OPEN_API_PAGE
