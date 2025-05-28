"use client"

import styles from "./styles.module.css"
import _ from "lodash"
import { ISearch } from "./type"
import "@ant-design/v5-patch-for-react-19"
import { Button, DatePicker } from "antd"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Images = {
  newPost: {
    src: require("@/images/asset/newPost.png"),
    alt: "이미지 추가",
  },
}
const { RangePicker } = DatePicker
const dateFormat = "YYYY/MM/DD"

const SHOPPING_SEARCHBAR_COMPO = (props: ISearch) => {
  const router = useRouter()
  const onClickNewPost = () => {
    router.push(`/shop/new`)
  }

  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.searchBarFrame}>
          <div className={styles.searchBarInnerBody}>
            <div className={styles.mainHeadText}>여기서만 예약할 수 있는 숙소</div>
            <div className={styles.searchBarContainer}>
              <div className={styles.datePicker}>
                <RangePicker
                  size="large"
                  defaultValue={[dayjs("0000/00/00", dateFormat), dayjs("0000/00/00", dateFormat)]}
                  format={dateFormat}
                  onChange={(date: any) => {
                    date && (props.setPrevDate(date[0]), props.setEndDate(date[1]))
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
                <Button size="large" color="cyan" variant="solid" onClick={onClickNewPost}>
                  <Image src={Images.newPost.src} alt="" />
                  숙박권 판매하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SHOPPING_SEARCHBAR_COMPO
