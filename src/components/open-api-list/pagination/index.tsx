import { Pagination, PaginationProps } from "antd"
import { DocumentData } from "firebase/firestore"
import { useState } from "react"
import styles from "./styles.module.css"
interface IPropsAPIPage {
  currentData: DocumentData[]
  currentPage: number
  totalCount: number
  itemsPerPage: number
  handlePageChange: (page: number) => void
}

const API_PAGINATION_COMPO = (props: IPropsAPIPage) => {
  return (
    <div className={styles.pagination}>
      {props?.currentData.length && (
        <Pagination
          align="center"
          current={props.currentPage}
          total={props.totalCount}
          pageSize={props.itemsPerPage}
          onChange={props.handlePageChange}
        />
      )}
    </div>
  )
}
export default API_PAGINATION_COMPO
