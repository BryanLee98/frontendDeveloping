"use client"

import Image from "next/image"
import "swiper/css"
import { Carousel } from "antd"

const BannerImageSrc = {
  banner1: {
    src: require("@/images/asset/banner 1.png"),
    alt: "banner1",
  },
  banner2: {
    src: require("@/images/asset/banner 2.png"),
    alt: "banner2",
  },
  banner3: {
    src: require("@/images/asset/banner 3.png"),
    alt: "banner3",
  },
}

const contentStyle: React.CSSProperties = {
  height: "500px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
}

const PAGE_BANNER = () => {
  return (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>
          <Image
            src={BannerImageSrc.banner1.src}
            alt={BannerImageSrc.banner1.alt}
            sizes="100vw"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image
            src={BannerImageSrc.banner2.src}
            alt={BannerImageSrc.banner2.alt}
            sizes="100vw"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image
            src={BannerImageSrc.banner3.src}
            alt={BannerImageSrc.banner3.alt}
            sizes="100vw"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </h3>
      </div>
    </Carousel>
  )
}

export default PAGE_BANNER
