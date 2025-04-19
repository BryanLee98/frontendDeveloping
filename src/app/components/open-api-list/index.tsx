"use client"
import styles from "./styles.module.css"
import InfiniteScroll from "react-infinite-scroll-component"
import { USE_CAT_API_HOOKS } from "./hooks"

const OPEN_API_COMPO = () => {
  const {
    images,
    setImages,
    hasMore,
    setHasMore,
    page,
    setPage,
    fetchMoreData,
  } = USE_CAT_API_HOOKS()

  return (
    <div className={styles.app}>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className={styles.loadingIndicator}>Loading more cats...</div>
        }
        endMessage={
          <div className={styles.endMessage}>You've seen all the cats! 😺</div>
        }
      >
        <div className={styles.imageGrid}>
          {images.map((image) => (
            <div key={image.id} className={styles.imageContainer}>
              <img
                src={image.url}
                alt="cat"
                className={styles.catImage}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default OPEN_API_COMPO
