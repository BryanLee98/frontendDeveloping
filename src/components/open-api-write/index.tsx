"use client"
import React, { ChangeEvent, useEffect, useState } from "react"
import styles from "./styles.module.css"
import USE_API_BOARD_WRITE from "./hooks"
import { usePathname } from "next/navigation"
import { doc, DocumentData, getDoc, getFirestore } from "firebase/firestore"
import { app } from "@/commons/libraries/firebase"

interface I_API_BOARD_WRITE_COMPO {
  isEdit: boolean
}
const API_BOARD_WRITE_COMPO = (props: I_API_BOARD_WRITE_COMPO) => {
  const { isEdit } = props
  const {
    onClickSubmit,
    onClickEdit,
    onClickCancel,
    onChangeContents,
    onChangeWriter,
    onChangeTitle,
    onChangePassword,
    onChangeYoutubeLink,
    onChangeAddress,
    onChangeZipcode,
    onChangeDetailAddress,
    documentData,
    writer,
    password,
    contents,
    title,
    address,
    zipcode,
    youtubeLink,
    detailAddress,
  } = USE_API_BOARD_WRITE(isEdit)

  return (
    <div className={styles.darkContainer}>
      <div className={styles.darkFormSurface}>
        <h1 className={styles.formTitle}>
          {isEdit ? "게시글 수정" : "게시글 등록"}
        </h1>

        <div className={styles.inputGroup}>
          <div className={styles.inputRow}>
            {/* 작성자 입력 섹션 */}
            <div className={styles.inputColumn}>
              <span className={styles.inputLabel}>작성자 ▶</span>
              <input
                type="text"
                placeholder="작성자 명을 입력하세요"
                defaultValue={isEdit ? documentData?.writer : writer}
                readOnly={isEdit}
                className={styles.darkInput}
                onChange={onChangeWriter}
              />
            </div>

            {/* 비밀번호 입력 섹션 */}
            <div className={styles.inputColumn}>
              <span className={styles.inputLabel}>비밀번호 ▶</span>
              <input
                type="password"
                disabled={isEdit}
                placeholder=" ************ "
                className={styles.darkInput}
                onChange={onChangePassword}
              />
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.inputLabel}>제목 ▶</span>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            defaultValue={isEdit ? documentData?.title : title}
            className={styles.darkInput}
            onChange={onChangeTitle}
          />
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.inputLabel}>내용 ▶</span>
          <textarea
            onChange={onChangeContents}
            defaultValue={isEdit ? documentData?.contents : contents}
            placeholder="내용을 입력하세요"
            className={styles.darkTextarea}
            rows={6}
          />
        </div>

        <div className={styles.imageUploadSection}>
          <span className={styles.inputLabel}>이미지 업로드</span>
          <input
            type="file"
            id="imageUpload"
            className={styles.imageUploadInput}
          />
        </div>

        <div className={styles.addressSection}>
          <span className={styles.inputLabel}>주소 ▶</span>
          <div className={styles.addressZipcode}>
            <input
              type="text"
              readOnly
              placeholder="우편번호"
              className={styles.zipCodeInput}
              onChange={onChangeZipcode}
            />
            <button className={styles.zipCodeButton}>우편번호 검색</button>
          </div>
          <div className={styles.addressInputs}>
            <input
              type="text"
              placeholder="기본 주소"
              defaultValue={
                isEdit ? documentData?.address?.basicAddress : address
              }
              className={styles.basicAddressInput}
              onChange={onChangeAddress}
            />
            <input
              type="text"
              placeholder="상세 주소"
              defaultValue={
                isEdit ? documentData?.address?.detailAddress : detailAddress
              }
              className={styles.detailAddressInput}
              onChange={onChangeDetailAddress}
            />
          </div>
        </div>

        <div className={styles.youtubeLinkSection}>
          <span className={styles.inputLabel}>유튜브 링크</span>
          <input
            type="text"
            id="youtubeLink"
            placeholder="유튜브 링크를 입력하세요"
            defaultValue={isEdit ? documentData?.youtubeLink : youtubeLink}
            className={styles.youtubeLinkInput}
            onChange={onChangeYoutubeLink}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.darkCancelButton} onClick={onClickCancel}>
            취소하기
          </button>
          <button
            className={styles.darkSubmitButton}
            onClick={isEdit ? onClickEdit : onClickSubmit}
          >
            {isEdit ? "수정하기" : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default API_BOARD_WRITE_COMPO
