"use client"
import { ConfigProvider, GetProps, Radio, Space, Input } from "antd"
import "@ant-design/v5-patch-for-react-19"
import styles from "./styles.module.css"
import Search from "antd/es/input/Search"
import BOOKMARK_ITEM from "./bookmark-item/page"
import { TableData } from "../types"
import TRADE_LIST_ITEM from "./trade-list-item/page"
import { useState } from "react"

type SearchProps = GetProps<typeof Input.Search>

const TRADE_LIST_N_BOOKMARK = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value)

  const [isListButtonClicked, setIsListButtonClicked] = useState(false)

  const isShownListToggle = () => {
    setIsListButtonClicked((prev) => !prev)
  }
  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.searchSwitchSection}>
          <div className={styles.searchBarContainer}>
            <div className={styles.switchButton}>
              <Radio.Group size="large" defaultValue="a" buttonStyle="solid">
                <Radio.Button onClick={isShownListToggle} disabled={!isListButtonClicked} value="a">
                  나의 상품
                </Radio.Button>
                <Radio.Button onClick={isShownListToggle} disabled={isListButtonClicked} value="b">
                  북마크
                </Radio.Button>
              </Radio.Group>
            </div>
            <div className={styles.searchBar}>
              <Search size="large" placeholder="필요한 내용을 검색해 주세요." onSearch={onSearch} enterButton />
            </div>
          </div>
        </div>
        {/* 테이블 섹션 */}
        {!isListButtonClicked ? <TRADE_LIST_ITEM /> : <BOOKMARK_ITEM />}
      </div>
    </>
  )
}

export default TRADE_LIST_N_BOOKMARK
