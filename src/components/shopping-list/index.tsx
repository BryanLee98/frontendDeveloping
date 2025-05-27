"use client"
import styles from "./styles.module.css"
import Image from "next/image"
import InfiniteScroll from "react-infinite-scroll-component"
import USE_SHOPPING_LIST from "./hooks"

const IMAGES = {
  profileImage: {
    src: require("@/images/asset/header profile icon.png"),
    alt: "프로필 이미지",
  },
}

const SHOPPING_LIST_PAGE_COMPO = () => {
  const { isSoldout, search, hasMore, data, sliceContentText, fetchData } = USE_SHOPPING_LIST()

  return (
    <>
      <InfiniteScroll
        next={fetchData}
        hasMore={hasMore}
        loader={<h3 style={{ textAlign: "center" }}>상품 로딩중...</h3>}
        dataLength={data?.fetchTravelproducts.length ?? 0}
        endMessage={
          <p style={{ textAlign: "center", padding: "20px" }}>
            <b>마지막 상품입니다.</b>
          </p>
        }
      >
        <div className={styles.gridContainer}>
          {data?.fetchTravelproducts.slice(0, 8).map((el, index) => (
            <div key={`${el}_${index}`} className={styles.gridItem}>
              <img src={`https://storage.googleapis.com/${el.images?.[0]}` || ""} className={styles.itemImage} />
              <h3 className={styles.itemTitle}>{el?.name}</h3>
              <div className={styles.itemContent}>{sliceContentText(el.contents)}</div>
              <div className={styles.tagContainer}>
                {el?.tags?.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.sellerInfo}>
                <div className={styles.seller}>
                  <Image src={IMAGES.profileImage.src} alt={IMAGES.profileImage.alt} className={styles.profileImage} />
                  <span className={styles.authorName}>{el.seller?.name}</span>
                </div>
                <div className={styles.price}>₩{el?.price?.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  )
}

export default SHOPPING_LIST_PAGE_COMPO
