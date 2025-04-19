"use client"
import "@ant-design/v5-patch-for-react-19"
import styles from "./styles.module.css"
import addImage from "../../images/asset/add_image.png"
import Image from "next/image"
import { USE_BOARD_WRITE } from "./hooks"
import { IPageWriteProps } from "./types"
import { Button, Modal } from "antd"
import DaumPostcodeEmbed from "react-daum-postcode"

const PAGE_WRITE_COMPO = (props: IPageWriteProps) => {
  const { isEdit } = props
  const {
    address,
    youtubeLink,
    detailAddress,
    data,
    inputs,
    password,
    nameError,
    passwordError,
    titleError,
    contextError,
    isButtonDisabled,
    isModalOpen,
    modalContent,
    isAddressModalOpen,
    zipcode,
    handleOk,
    handleCancel,
    onToggleAddressModal,
    onChangeInputs,
    onChangePassword,
    onClickEnroll,
    onChangeDetailAddress,
    onChangeYoutubeLink,
    enrollButtonStyle,
    onClickCancel,
    handleComplete,
  } = USE_BOARD_WRITE(isEdit)

  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.boxContainer}>
          {/* 제목 */}
          <div className={styles.titleTextStyle}>
            {props.isEdit ? "게시글 수정" : "게시글 등록"}
          </div>

          {/* 작성자 및 비밀번호 입력 */}
          <div className={styles.enrollText}>
            <div className={styles.enrollHalf}>
              <div className={styles.textAlignColumn}>
                <div className={styles.textStyle}>작성자</div>
                <span className={styles.essentialFill}>*</span>
              </div>
              <input
                id="name"
                className={
                  props.isEdit ? styles.disabled_input : styles.enrollInput
                }
                disabled={isEdit}
                value={
                  props.isEdit ? data?.fetchBoard.writer ?? "" : inputs.name
                }
                type="text"
                placeholder="작성자 명을 입력하세요."
                onChange={onChangeInputs}
              />
              <div className={styles.errorText}>{nameError}</div>
            </div>
            <div className={styles.enrollHalf}>
              <div className={styles.textAlignColumn}>
                <div className={styles.textStyle}>비밀번호</div>
                <span className={styles.essentialFill}>*</span>
              </div>
              <input
                className={
                  props.isEdit ? styles.disabled_input : styles.enrollInput
                }
                disabled={isEdit}
                defaultValue={props.isEdit ? "*********" : password}
                type="password"
                placeholder="비밀번호를 입력하세요."
                onChange={onChangePassword}
              />
              <div className={styles.errorText}>{passwordError}</div>
            </div>
          </div>

          <div className={styles.enrollBorder}></div>
          {/* 제목 입력 */}
          <div className={styles.containerBox}>
            <div className={styles.textAlignColumn}>
              <div className={styles.textStyle}>제목</div>
              <span className={styles.essentialFill}>*</span>
            </div>
            <input
              id="title"
              className={styles.enrollInput}
              defaultValue={isEdit ? data?.fetchBoard.title : inputs.title}
              type="text"
              placeholder="제목을 입력하세요."
              onChange={onChangeInputs}
            />
            <div className={styles.errorText}>{titleError}</div>
          </div>
          <div className={styles.enrollBorder}></div>

          {/* 내용 입력 */}
          <div className={styles.containerBox}>
            <div className={styles.textAlignColumn}>
              <div className={styles.textStyle}>내용</div>
              <span className={styles.essentialFill}>*</span>
            </div>
            <input
              id="content"
              className={`${styles.enrollInput} ${styles.enrollTextArea}`}
              defaultValue={
                props.isEdit ? data?.fetchBoard?.contents : inputs.content
              }
              type="text"
              placeholder="내용을 입력하세요."
              onChange={onChangeInputs}
            />
            <div className={styles.errorText}>{contextError}</div>
          </div>

          {/* 주소 입력 */}
          <div className={styles.addressBox}>
            <div className={styles.textStyle}>주소</div>
            <div className={styles.addressSearch}>
              <input
                readOnly
                value={zipcode}
                id="zipcode-input"
                className={styles.zipCodeInput}
                type="text"
                placeholder="012345"
              />

              <button
                className={`${styles.addressButton} ${styles.buttonTextStyle}`}
                onClick={onToggleAddressModal}
              >
                우편번호 검색
              </button>
            </div>
            <input
              value={address}
              readOnly
              className={styles.enrollInput}
              type="text"
              placeholder="주소를 입력하세요."
            />
            <input
              value={detailAddress}
              id="detail-address-input"
              className={styles.enrollInput}
              type="text"
              placeholder="상세주소를 입력하세요."
              onChange={onChangeDetailAddress}
            />
          </div>

          {isAddressModalOpen && (
            <Modal
              open={isAddressModalOpen}
              onCancel={onToggleAddressModal}
              onOk={onToggleAddressModal}
              footer={<></>}
            >
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </Modal>
          )}
          <div className={styles.enrollBorder}></div>

          {/* 유튜브 링크 입력 */}
          <div className={styles.containerBox}>
            <div className="textStyle">유튜브 링크</div>
            <input
              value={youtubeLink}
              className={styles.enrollInput}
              type="text"
              placeholder="링크를 입력하세요."
              onChange={onChangeYoutubeLink}
            />
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.imgBox}>
            <div className={styles.textStyle}>사진 첨부</div>
            <div className={styles.imgUpload}>
              <Image src={addImage} alt="이미지추가" />
              <Image src={addImage} alt="이미지추가" />
              <Image src={addImage} alt="이미지추가" />
            </div>
          </div>
        </div>
        <div className={styles.enrollButtonContainer}>
          <button
            className={`${styles.cancelButton} ${styles.buttonTextStyle}`}
            onClick={onClickCancel}
          >
            취소
          </button>
          <button
            disabled={!isEdit && isButtonDisabled}
            className={`${styles.enrollButton} ${styles.buttonTextStyle}`}
            style={enrollButtonStyle}
            onClick={onClickEnroll}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </button>
          <Modal open={isModalOpen} onOk={handleOk}>
            <p>{modalContent}</p>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default PAGE_WRITE_COMPO
