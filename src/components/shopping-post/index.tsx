"use client"

import USE_SHOPPING_NEW_POST from "./hooks"
import styles from "./styles.module.css"

const SHOPPING_NEW_POST_COMPO = () => {
  const {
    images,
    inputs,
    address,
    handleInputChange,
    handleSubmit,
    toggleLocationFinder,
    onClickPost,
    onClickCancel,
    handleFileChange,
  } = USE_SHOPPING_NEW_POST()
  return (
    <>
      <div className={styles.Layout}>
        <h1 className={styles.title}>숙박권 판매하기</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              상품명 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              value={inputs.name}
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
              id="remarks"
              value={inputs.remarks}
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
              id="contents"
              value={inputs.contents}
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
            <input
              id="price"
              value={inputs.price}
              onChange={handleInputChange}
              type="text"
              placeholder="현째 가격을 입력해 주세요. (원 단위)"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>태그 입력</label>
            <input
              id="tags"
              value={inputs.tags}
              onChange={handleInputChange}
              type="text"
              placeholder="태그를 입력해 주세요."
              className={styles.input}
            />
          </div>

          <div className={styles.locationSection}>
            <div className={styles.locationHeader}>
              <label className={styles.label}>
                주소 <span className={styles.required}>*</span>
              </label>
              <div className={styles.locationFinder}>
                <input
                  type="text"
                  id="zipcode"
                  placeholder="01234"
                  className={styles.addressInput}
                  // value={address.address}
                />
                <button type="button" className={styles.locationBtn} onClick={toggleLocationFinder}>
                  우편번호 찾기
                </button>
              </div>
            </div>

            <input
              id="addressDetail"
              // value={address.addressDetail}
              type="text"
              placeholder="상세주소를 입력해 주세요."
              className={styles.input}
            />

            <div className={styles.coordsSection}>
              <div className={styles.coordsRow}>
                <div className={styles.coordGroup}>
                  <label className={styles.coordLabel}>위도(LAT)</label>
                  <input
                    type="text"
                    placeholder="주소를 먼저 업력해 주세요."
                    className={styles.coordInput}
                    value={address.lat}
                    onChange={handleInputChange}
                    id="lat"
                  />
                  <label className={styles.coordLabel}>경도(LNG)</label>
                  <input
                    type="text"
                    placeholder="주소를 먼저 업력해 주세요."
                    className={styles.coordInput}
                    value={address.lng}
                    onChange={handleInputChange}
                    id="lng"
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
              {images.map((image, index) => (
                <div key={index} className={styles.imagePreview}>
                  <input
                    onChange={(event) => handleFileChange(event, index)}
                    type="file"
                    className={styles.fileInput}
                    accept="image/*"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.cancelBtn} onClick={onClickCancel}>
              취소
            </button>
            <button className={styles.submitBtn} onClick={onClickPost}>
              등록
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SHOPPING_NEW_POST_COMPO
