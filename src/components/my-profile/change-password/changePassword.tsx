"use client"
import { Button, Input, Space } from "antd"
import styles from "./styles.module.css"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { useState } from "react"
const CHANGE_PASSWORD_COMPO = () => {
  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.section}>
          <div className={styles.headerText}>비밀번호 변경</div>
          <div className={styles.passwordContainer}>
            <div className={styles.passwordTextFrame}>
              <span>기존 비밀번호 확인</span>
              <span className={styles.essentialFill}>*</span>
            </div>
            <Space direction="vertical">
              <Input.Password
                size="large"
                placeholder="기존 비밀번호를 입력하세요."
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Space>
          </div>
          <div className={styles.passwordContainer}>
            <div className={styles.passwordTextFrame}>
              <span>새 비밀번호</span>
              <span className={styles.essentialFill}>*</span>
            </div>

            <Space direction="vertical">
              <Input.Password
                size="large"
                placeholder="새 비밀번호를 입력하세요."
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Space>
          </div>
          <div className={styles.passwordContainer}>
            <div className={styles.passwordTextFrame}>
              <span>새 비밀번호 확인</span>
              <span className={styles.essentialFill}>*</span>
            </div>
            <Space direction="vertical">
              <Input.Password
                size="large"
                placeholder="새 비밀번호를 확인하세요."
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Space>
          </div>

          <div className={styles.passwordButtonContainer}>
            <Button className={styles.changePasswordButton} size="large" type="primary">
              비밀번호 변경
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CHANGE_PASSWORD_COMPO
