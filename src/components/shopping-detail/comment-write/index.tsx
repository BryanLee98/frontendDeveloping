"use client"
import styles from "./styles.module.css"
import "@ant-design/v5-patch-for-react-19"
import commentIcon from "../../../images/detail_assets/comment icon.png"
import Image from "next/image"
import { ChangeEvent, createContext, useMemo, useState } from "react"
import { useMutation } from "@apollo/client"
import { CreateTravelproductQuestionDocument } from "@/commons/graphql/graphql"
import { useParams } from "next/navigation"

const Context = createContext({ name: "Default" })

const PRODUCT_COMMENT_WRITE_COMPO = () => {
  const params = useParams()
  const id = params?.productId
  const contextValue = useMemo(() => ({ name: "Ant Design" }), [])
  const [createTravelproductQuestion] = useMutation(CreateTravelproductQuestionDocument)
  const [question, setQuestion] = useState("")

  const onChangeQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value)
  }

  const onClickPostQuestion = async () => {
    try {
      const { data } = await createTravelproductQuestion({
        variables: {
          createTravelproductQuestionInput: {
            contents: String(question),
          },
          travelproductId: String(id),
        },
      })
      if (data?.createTravelproductQuestion) {
        setQuestion("")
        console.log(data.createTravelproductQuestion.contents)
        alert("문의가 등록되었습니다.")
      }
    } catch (err) {
      console.log(err)
      alert("문의 등록에 실패했습니다.")
    }
  }

  return (
    <>
      <div className={styles.commentListFrame}>
        <div className={styles.commentListContainer}>
          <div className={styles.commentListBody}>
            <div className={styles.borderLine}></div>
            <div className={styles.title}>
              <Image src={commentIcon} alt="" />
              <div>문의하기</div>
            </div>

            <div className={styles.commentInputBody}>
              <textarea
                value={question}
                onChange={onChangeQuestion}
                className={styles.commentInput}
                placeholder="문의사항을 입력해 주세요."
                maxLength={200}
              />
              <div className={styles.inputTextCount}>{question.length}/ 200</div>
            </div>
            <div className={styles.buttonBody}>
              {/* <Context.Provider value={contextValue}> */}
              <button className={styles.commentEnrollButton} onClick={onClickPostQuestion}>
                문의 하기
              </button>
              {/* </Context.Provider> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PRODUCT_COMMENT_WRITE_COMPO
