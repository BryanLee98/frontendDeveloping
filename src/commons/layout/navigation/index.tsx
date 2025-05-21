"use client"

import Image from "next/image"
import styles from "./styles.module.css"
import USE_NAVIGATION_HOOK from "./hooks"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import { useState } from "react"

const HeaderImageSrc = {
  tripIcon: {
    src: require("@/images/asset/trip icon.png"),
    alt: "트립토크 아이콘",
  },
  profileIcon: {
    src: require("@/images/asset/header profile icon.png"),
    alt: "프로필 아이콘",
  },
  downArrow: {
    src: require("@/images/asset/down arrow.png"),
    alt: "아래 화살표",
  },
}

type MenuItem = Required<MenuProps>["items"][number]

const LAYOUT_NAVIGATION = () => {
  const { onClickMyPage, onClickTripTalk } = USE_NAVIGATION_HOOK()
  const [current, setCurrent] = useState("mail")

  const items: MenuItem[] = [
    {
      label: (
        <div className={styles.TapContents} onClick={onClickTripTalk}>
          트립토크
        </div>
      ),
      key: "mail",
    },
    {
      label: <div className={styles.TapContents}>숙박권 구매</div>,
      key: "app",
    },

    {
      key: "alipay",
      label: (
        <div className={styles.TapContents} onClick={onClickMyPage}>
          마이 페이지
        </div>
      ),
    },
  ]
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e)
    setCurrent(e.key)
  }
  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.TapWrapper}>
          <Image src={HeaderImageSrc.tripIcon.src} alt={HeaderImageSrc.tripIcon.alt} />
          <Menu
            className={styles.Navigation}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          <div className={styles.profileNavFrame}>
            <div className={styles.ProfileWrapper}>
              <Image src={HeaderImageSrc.profileIcon.src} alt={HeaderImageSrc.profileIcon.alt}></Image>
              <button>
                <Image src={HeaderImageSrc.downArrow.src} alt={HeaderImageSrc.downArrow.alt}></Image>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LAYOUT_NAVIGATION
