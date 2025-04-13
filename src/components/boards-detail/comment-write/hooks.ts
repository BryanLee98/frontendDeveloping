"use client"

import {
  CreateCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql"
import { useMutation } from "@apollo/client"
import { useParams } from "next/navigation"
import { ChangeEvent, useState } from "react"

export const USE_COMMENT_WRITE = () => {
  const params = useParams()
  const id = params.boardID

  const [newComment] = useMutation(CreateCommentDocument)

  //댓글을 작성할 때 요구되는 변수들
  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [comment, setComment] = useState("")

  //값이 없을 때에는 변경이 불가능하도록
  const isButtonDisabled = !writer || !comment

  const onChangeCommentWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value)
  }
  const onChangeCommentPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const onChangeCommentComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }
  const onClickSubmit = async () => {
    try {
      // 1. 댓글 등록 버튼을 누르면 작성자와, 비밀번호, 내용들이 그래프큐엘 서버로 전송되도록
      const { data } = await newComment({
        variables: {
          createBoardCommentInput: {
            writer: writer,
            password: password,
            contents: comment,
            rating: 0.0,
          },
          boardId: String(id),
        },
        // 2. 그 후에 쿼리 리패치를 이용하여 새로고침 없이 바로 등록된 댓글을 볼 수 있게 만들기
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { page: 1, boardId: String(id) },
          },
        ],
      })
      console.log("댓글에 담겨있는 내용:::", data)
      alert("댓글이 등록되었습니다.")
      // 3. 댓글이 등록된 후에, 댓글 입력창을 모두 초기화
      if (data?.createBoardComment) {
        setComment("")
        setPassword("")
        setWriter("")
      } else {
        console.log("댓글 등록에 실패했습니다.")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    newComment,
    writer,
    password,
    comment,
    isButtonDisabled,
    onChangeCommentComment,
    onChangeCommentPassword,
    onChangeCommentWriter,
    onClickSubmit,
  }
}
