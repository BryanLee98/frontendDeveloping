"use client"

import Image from "next/image"
import styles from "./styles.module.css"

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
const LAYOUT_NAVIGATION = () => {
  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.HeaderWrapper}>
          <div className={styles.TapWrapper}>
            <Image
              src={HeaderImageSrc.tripIcon.src}
              alt={HeaderImageSrc.tripIcon.alt}
            ></Image>
            <div className={styles.TapContents}>
              <div>트립토크</div>
              <div>숙박권 구매</div>
              <div>마이 페이지</div>
            </div>
          </div>
          <div className={styles.ProfileWrapper}>
            <Image
              src={HeaderImageSrc.profileIcon.src}
              alt={HeaderImageSrc.profileIcon.alt}
            ></Image>
            <button>
              <Image
                src={HeaderImageSrc.downArrow.src}
                alt={HeaderImageSrc.downArrow.alt}
              ></Image>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LAYOUT_NAVIGATION
