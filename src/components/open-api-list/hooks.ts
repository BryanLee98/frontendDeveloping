import { useEffect, useState } from "react"
import axios from "axios"
import { CatImage } from "./type"

export const USE_CAT_API_HOOKS = () => {
  const [images, setImages] = useState<CatImage[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const fetchMoreData = () => {
    axios
      .get(`https://cataas.com/api/cats?skip=${page * 10}&limit=10`)
      .then((response) => {
        const newImages: CatImage[] = response.data.map((cat: any) => ({
          id: cat.id,
          url: `https://cataas.com/cat/${cat.id}`,
        }))

        setImages([...images, ...newImages])
        setPage(page + 1)
        if (response.data.length < 10) setHasMore(false)
      })
      .catch((error) => {
        console.error("Error fetching cats:", error)
        setHasMore(false)
      })
  }

  useEffect(() => {
    fetchMoreData()
  }, [])

  //   useEffect(() => {
  //     fetchMoreData()
  //   }, [])

  return {
    images,
    setImages,
    hasMore,
    setHasMore,
    page,
    setPage,
    fetchMoreData,
  }
}
