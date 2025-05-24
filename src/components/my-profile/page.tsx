"use client"
import Image from "next/image"
import styles from "./styles.module.css"
import profileIcon from "@/images/asset/header profile icon.png"
import PointIcon from "@/images/asset/myPointIcon.png"
import arrowRight from "@/images/asset/arrowRight.png"
import TRADE_LIST_N_BOOKMARK from "./my-trade-list & bookmark/page"
import POINT_USAGE_COMPO from "./point-usage/page"
import CHANGE_PASSWORD_COMPO from "./change-password/changePassword"
import { useState } from "react"
import { FloatButton } from "antd"

const MY_PROFILE_COMPO = () => {
  // 0: 거래내역&북마크, 1: 포인트 사용내역, 2: 비밀번호 변경
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className={styles.Layout}>
        {/* 내 정보 섹션 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>마이 페이지</h2>

          <div>
            <h3 className={styles.sectionTitle}>내 정보</h3>
            <ul className={styles.userInfoList}>
              <div className={styles.userProfileContainer}>
                <Image src={profileIcon} alt="프로필 이미지" width={40} height={40} />
                <li className={styles.userInfoItem}>홍길동</li>
              </div>

              <div className={styles.border}> </div>
              <div className={styles.pointContainer}>
                <Image src={PointIcon} alt="포인트 아이콘" width={20} height={30} />
                <li className={styles.userInfoItem}>23,000 P</li>
              </div>
            </ul>
            <div className={styles.userItemContainer}>
              <div className={styles.border}> </div>
              <button className={styles.itemList} onClick={() => setActiveTab(0)}>
                <a className={styles.actionLink}>거래내역 & 북마크</a>
                <Image src={arrowRight} alt="화살표 아이콘" style={{ width: "8px", height: "18px" }} />
              </button>
              <button className={styles.itemList} onClick={() => setActiveTab(1)}>
                <a className={styles.actionLink}>포인트 사용 내역</a>
                <Image src={arrowRight} alt="화살표 아이콘" style={{ width: "8px", height: "18px" }} />
              </button>
              <button className={styles.itemList} onClick={() => setActiveTab(2)}>
                <a className={styles.actionLink}>비밀번호 변경</a>
                <Image src={arrowRight} alt="화살표 아이콘" style={{ width: "8px", height: "18px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <FloatButton.BackTop />
      {activeTab === 0 && <TRADE_LIST_N_BOOKMARK />}
      {activeTab === 1 && <POINT_USAGE_COMPO />}
      {activeTab === 2 && <CHANGE_PASSWORD_COMPO />}
    </>
  )
}

export default MY_PROFILE_COMPO
