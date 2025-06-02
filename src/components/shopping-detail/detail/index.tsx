"use client"
import Image from "next/image"
import styles from "./styles.module.css"
import { CopyOutlined, DeleteOutlined, EnvironmentOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Tooltip } from "antd"
import USE_PRODUCT_DETAIL_PAGE from "./hooks"

const IMAGES = {
  profileImage: {
    src: require("@/images/asset/header profile icon.png"),
    alt: "프로필 이미지",
  },
}
const PRODUCT_DETAIL_PAGE_COMPO = () => {
  const { data } = USE_PRODUCT_DETAIL_PAGE()
  console.log(data?.fetchTravelproduct)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <div className={styles.icons}>
            <DeleteOutlined />
            <CopyOutlined />
            <Tooltip title={data?.fetchTravelproduct.travelproductAddress?.address || "hello"}>
              <EnvironmentOutlined />
            </Tooltip>
          </div>
          <div className={styles.title}>{data?.fetchTravelproduct.name}</div>
          <div className={styles.packaging}>{data?.fetchTravelproduct.remarks}</div>
          <p className={styles.subtitle}>{data?.fetchTravelproduct.tags}</p>

          <div className={styles.productImageNInfo}>
            {data?.fetchTravelproduct.images?.map((image, index) => (
              <div key={`${image}_${index}`}>
                <Image
                  unoptimized={true}
                  src={`https://storage.googleapis.com/${image}`}
                  alt=""
                  style={{ objectFit: "cover" }}
                  width={800}
                  height={300}
                />
              </div>
            ))}

            <div className={styles.productInfoContainer}>
              <div className={styles.priceSection}>{data?.fetchTravelproduct.price?.toLocaleString()} 원</div>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.</li>
                <li className={styles.infoItem}>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
              </ul>
              <button className={styles.buyButton}>구매하기</button>
              <div className={styles.sellerSection}>
                <span className={styles.sellerLabel}>판매자</span>
                <div className={styles.sellerInfo}>
                  {data?.fetchTravelproduct.seller?.picture ? (
                    <Image
                      unoptimized={true}
                      src={`https://storage.googleapis.com/${data?.fetchTravelproduct.seller?.picture}`}
                      alt={IMAGES.profileImage.alt}
                      className={styles.profileImage}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Avatar size={30} icon={<UserOutlined />} />
                  )}

                  <span className={styles.sellerName}>{data?.fetchTravelproduct.seller?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <h2>상세 설명</h2>
          <div className={styles.descriptionContent}>{data?.fetchTravelproduct.contents}</div>
        </div>
      </div>
    </>
  )
}

export default PRODUCT_DETAIL_PAGE_COMPO
