"use client"
import styles from "./styles.module.css"
import { FetchBoardsCountDocument } from "@/commons/graphql/graphql"
import { useQuery } from "@apollo/client"
import { Pagination, PaginationProps } from "antd"
import { IPaginationProps } from "./type"
import { MouseEvent } from "react"

const PAGINATION_COMPO = (props: IPaginationProps) => {
  const { data, refetch } = useQuery(FetchBoardsCountDocument)

  const onChangePage: PaginationProps["onChange"] = (page) => {
    props.setPage(page)
  }

  return (
    <div className={styles.PaginationFrame}>
      {(props?.data?.fetchBoards?.length ?? 0 > 0) ? (
        <Pagination
          align="center"
          defaultPageSize={10}
          onChange={onChangePage}
          current={props.page}
          total={data?.fetchBoardsCount}
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default PAGINATION_COMPO
