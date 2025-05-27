"use client"
import { GetProps, Radio, Input } from "antd"
import "@ant-design/v5-patch-for-react-19"
import styles from "./styles.module.css"
import Search from "antd/es/input/Search"
import BOOKMARK_ITEM from "./bookmark-item"
import TRADE_LIST_ITEM from "./trade-list-item"
import { useState } from "react"

type SearchProps = GetProps<typeof Input.Search>

const TRADE_LIST_N_BOOKMARK = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value)
  const [activeTab, setActiveTab] = useState<"trade" | "bookmark">("trade")
  const handleTabChange = (tab: "trade" | "bookmark") => setActiveTab(tab)

  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.searchSwitchSection}>
          <div className={styles.searchBarContainer}>
            <div className={styles.switchButton}>
              <Radio.Group size="large" value={activeTab} buttonStyle="solid">
                <Radio.Button onClick={() => handleTabChange("trade")} value="trade">
                  나의 상품
                </Radio.Button>
                <Radio.Button onClick={() => handleTabChange("bookmark")} value="bookmark">
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
        {activeTab === "trade" && <TRADE_LIST_ITEM />}
        {activeTab === "bookmark" && <BOOKMARK_ITEM />}
      </div>
    </>
  )
}

export default TRADE_LIST_N_BOOKMARK
