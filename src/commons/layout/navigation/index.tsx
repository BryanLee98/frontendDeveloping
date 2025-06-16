"use client"
import "@ant-design/v5-patch-for-react-19"
import Image from "next/image"
import styles from "./styles.module.css"
import USE_NAVIGATION_HOOK from "./hooks"
import { createFromIconfontCN } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Button, Menu } from "antd"
import Menus from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useNavigationStore } from "@/commons/store/navigation_stores/store"
import { useQuery } from "@apollo/client"
import { FetchUserLoggedInDocument } from "@/commons/graphql/graphql"
import { useRouter } from "next/navigation"

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

type NavigationStore = {
  current: string
  setCurrent: (current: string) => void
}

type MenuItem = Required<MenuProps>["items"][number]

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
})

const LAYOUT_NAVIGATION = () => {
  const router = useRouter()
  const {
    open,
    anchorEl,
    onClickMyPage,
    onClickTripTalk,
    onClickShoppingPage,
    handleClick,
    handleClose,
    onClickLogout,
  } = USE_NAVIGATION_HOOK()
  const { data } = useQuery(FetchUserLoggedInDocument)
  const { current, setCurrent } = useNavigationStore() as NavigationStore

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
      label: (
        <div className={styles.TapContents} onClick={onClickShoppingPage}>
          숙박권 구매
        </div>
      ),
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
          {data ? (
            <div className={styles.profileNavFrame}>
              <div className={styles.ProfileWrapper}>
                <Image src={HeaderImageSrc.profileIcon.src} alt={HeaderImageSrc.profileIcon.alt}></Image>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Image
                      src={HeaderImageSrc.downArrow.src}
                      alt={HeaderImageSrc.downArrow.alt}
                      width={15}
                      height={15}
                    />
                  </Button>
                  <Menus
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>{data ? data.fetchUserLoggedIn.userPoint?.amount : 0} P</MenuItem>
                    <MenuItem onClick={handleClose}>포인트 충전</MenuItem>
                    <MenuItem onClick={onClickLogout} style={{ gap: "5px" }}>
                      <IconFont type="icon-tuichu" />
                      로그아웃
                    </MenuItem>
                  </Menus>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <Button onClick={() => router.push("/login")} shape="round" color="default" size="large">
                  로그인
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default LAYOUT_NAVIGATION
