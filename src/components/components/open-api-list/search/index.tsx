"use client"
import styles from "./styles.module.css"
import _ from "lodash"
import "@ant-design/v5-patch-for-react-19"
import { Button, DatePicker } from "antd"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { ISearch } from "./type"

const { RangePicker } = DatePicker
const dateFormat = "YYYY/MM/DD"

const SEARCH_HEADER_COMPONENT = (props: ISearch) => {
  const router = useRouter()
  const onClickNewPost = () => {
    router.push("/openapi/new")
  }
  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.searchBarFrame}>
          <div className={styles.searchBarInnerBody}>
            <div className={styles.mainHeadText}>트립토크 게시판</div>
            <div className={styles.searchBarContainer}>
              <div className={styles.datePicker}>
                <RangePicker
                  size="large"
                  defaultValue={[
                    dayjs("0000/00/00", dateFormat),
                    dayjs("0000/00/00", dateFormat),
                  ]}
                  format={dateFormat}
                  onChange={(date: any) => {
                    date &&
                      (props.setPrevDate(date[0]), props.setEndDate(date[1]))
                  }}
                />
              </div>
              <div className={styles.searchBar}>
                <props.Search
                  placeholder="검색할 제목을 입력해주세요"
                  allowClear
                  enterButton="검색"
                  size="large"
                  onSearch={props.onSearch}
                />
              </div>
              <div className={styles.newPost}>
                <Button
                  size="large"
                  color="cyan"
                  variant="solid"
                  onClick={onClickNewPost}
                >
                  새 게시글 등록하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SEARCH_HEADER_COMPONENT
