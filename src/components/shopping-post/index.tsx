"use client"

import { useState } from "react"
import styles from "./styles.module.css"
interface SurveyFormData {
  name: string
  koreanName: string
  content: string
  file: File | null
  tags: string[]
  coordinates: string
  latitude: string
  longitude: string
}

const SHOPPING_NEW_POST_COMPO = () => {
  const [formData, setFormData] = useState<SurveyFormData>({
    name: "",
    koreanName: "",
    content: "",
    file: null,
    tags: [],
    coordinates: "",
    latitude: "",
    longitude: "",
  })

  const [showLocationFinder, setShowLocationFinder] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      file,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const toggleLocationFinder = () => {
    setShowLocationFinder(!showLocationFinder)
  }

  return (
    <>
      {/* <div className={styles.Layout}>
        <div className={styles.boxContainer}>
          <div className={styles.titleTextStyle}>숙박권 판매하기</div>

          <div className={styles.enrollText}>
            <div className={styles.enrollHalf}>
              <div className={styles.textAlignColumn}>
                <div className={styles.textStyle}>상품명</div>
                <span className={styles.essentialFill}>*</span>
              </div>
              <input className={styles.enrollInput} id="name" />
              <div className={styles.errorText}></div>
            </div>
          </div>

          <div className={styles.enrollBorder}></div>
        </div>
      </div> */}

      <div className={styles.container}>
        <h1 className={styles.title}>숙박권 판매하기</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              상품명 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="상품명을 입력해 주세요."
              className={styles.input}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              한줄 요약 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="shorten"
              value={formData.koreanName}
              onChange={handleInputChange}
              placeholder="상품을 한 줄로 요약해주세요."
              className={styles.input}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              상품 설명 <span className={styles.required}>*</span>
            </label>
            <div className={styles.toolbar}>
              <button type="button" className={styles.toolbarBtn}>
                B
              </button>
              <button type="button" className={styles.toolbarBtn}>
                I
              </button>
              <button type="button" className={styles.toolbarBtn}>
                U
              </button>
              <button type="button" className={styles.toolbarBtn}>
                Ai
              </button>
              <button type="button" className={styles.toolbarBtn}>
                ≡
              </button>
              <button type="button" className={styles.toolbarBtn}>
                ≣
              </button>
              <button type="button" className={styles.toolbarBtn}>
                ⋮
              </button>
              <button type="button" className={styles.toolbarBtn}>
                ⊡
              </button>
              <button type="button" className={styles.toolbarBtn}>
                🔗
              </button>
              <button type="button" className={styles.toolbarBtn}>
                📷
              </button>
              <button type="button" className={styles.toolbarBtn}>
                😊
              </button>
              <button type="button" className={styles.toolbarBtn}>
                +
              </button>
            </div>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="내용을 입력해 주세요."
              className={styles.textarea}
              rows={10}
              required
            />
          </div>
          <div className={styles.enrollBorder}></div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              현재 가격 <span className={styles.required}>*</span>
            </label>
            <input type="text" placeholder="현째 가격을 입력해 주세요. (원 단위)" className={styles.input} required />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>태그 입력</label>
            <input type="text" placeholder="태그를 입력해 주세요." className={styles.input} />
          </div>

          <div className={styles.locationSection}>
            <div className={styles.locationHeader}>
              <label className={styles.label}>
                주소 <span className={styles.required}>*</span>
              </label>
              <div className={styles.locationFinder}>
                <input
                  type="text"
                  placeholder="01234"
                  className={styles.coordinateInput}
                  value={formData.coordinates}
                  onChange={handleInputChange}
                  name="coordinates"
                />
                <button type="button" className={styles.locationBtn} onClick={toggleLocationFinder}>
                  우편번호 찾기
                </button>
              </div>
            </div>

            <input type="text" placeholder="상세주소를 입력해 주세요." className={styles.input} />

            <div className={styles.coordsSection}>
              <div className={styles.coordsRow}>
                <div className={styles.coordGroup}>
                  <label className={styles.coordLabel}>위도(LAT)</label>
                  <input
                    type="text"
                    placeholder="추소를 먼저 업력해 주세요."
                    className={styles.coordInput}
                    value={formData.latitude}
                    onChange={handleInputChange}
                    name="latitude"
                    disabled
                  />
                  <label className={styles.coordLabel}>경도(LNG)</label>
                  <input
                    type="text"
                    placeholder="추소를 먼저 업력해 주세요."
                    className={styles.coordInput}
                    value={formData.longitude}
                    onChange={handleInputChange}
                    name="longitude"
                    disabled
                  />
                </div>

                <div className={styles.mapPreview}>
                  <label className={styles.coordLabel}>상세 위치</label>
                  <div className={styles.mapContainer}>
                    <span className={styles.mapPlaceholder}>주소를 먼저 업력해 주세요.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>사전 첨부</label>
            <div className={styles.fileUpload}>
              <div className={styles.uploadIcon}>+</div>
              <span className={styles.uploadText}>클릭하여 사진 업로드</span>
              <input type="file" onChange={handleFileChange} className={styles.fileInput} accept="image/*" />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancelBtn}>
              취소
            </button>
            <button type="submit" className={styles.submitBtn}>
              등록
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SHOPPING_NEW_POST_COMPO
