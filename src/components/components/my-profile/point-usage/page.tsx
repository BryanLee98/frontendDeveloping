"use client"
import { ConfigProvider, GetProps, Radio, Space, Input } from "antd"
import "@ant-design/v5-patch-for-react-19"
import styles from "./styles.module.css"
import { useState } from "react"
import POINT_USAGE_ITEM from "./point-usage-item/page"

type SearchProps = GetProps<typeof Input.Search>

const POINT_USAGE_COMPO = () => {
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
                <Radio.Button value="a">전체</Radio.Button>
                <Radio.Button value="b">충전내역</Radio.Button>
                <Radio.Button value="c">구매내역</Radio.Button>
                <Radio.Button value="d">판매내역</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
        {/* 테이블 섹션 */}
        <POINT_USAGE_ITEM />
      </div>
    </>
  )
}

export default POINT_USAGE_COMPO
