"use client"

import {
  CreateCommentDocument,
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from "@/commons/graphql/graphql"
import { useMutation, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { notification, NotificationArgsProps } from "antd"
import { ChangeEvent, MouseEvent, useState } from "react"
import { IPropsCommentWrite } from "./types"

type NotificationPlacement = NotificationArgsProps["placement"]

export const USE_COMMENT_WRITE = ({
  isEdit,
  setIsEdit,
  el,
}: IPropsCommentWrite) => {
  const params = useParams()
  const id = params.boardID
  const [api, contextHolder] = notification.useNotification()

  const [newComment] = useMutation(CreateCommentDocument)
  const [updateComment] = useMutation(UpdateBoardCommentDocument)
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: String(id),
    },
  })
  //댓글을 작성할 때 요구되는 상태들
  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [comment, setComment] = useState("")
  const [starRate, setStarRate] = useState<number>()

  //댓글 수정시 에러를 담을 상태들
  const [isWriterErr, setIsWriterErr] = useState("")
  const [isCommentErr, setIsCommentErr] = useState("")

  //값이 없을 때에는 변경이 불가능하도록
  const isButtonDisabled = !writer || !comment
  const isEditButtonDisabled = !comment

  const onChangeCommentWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value)
  }
  const onChangeCommentPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const onChangeCommentComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }
  const onChangeStarRate = (e: number) => {
    setStarRate(e)
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
            rating: Number(starRate),
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

  const onClickEditComment = async () => {
    try {
      const { data } = await updateComment({
        variables: {
          updateBoardCommentInput: {
            contents: comment,
            rating: starRate,
          },
          boardCommentId: String(el._id),
          password: password,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { page: 1, boardId: String(id) },
          },
        ],
      })
      if (data) {
        alert("댓글 수정 완료!")
        setIsEdit(false)
      }
    } catch (err) {
      alert("댓글 수정에 실패했습니다.")
    }
  }

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `등록 성공`,
      description: `댓글이 성공적으로 등록되었습니다!`,
      placement,
    })
  }

  return {
    newComment,
    starRate,
    writer,
    password,
    comment,
    isButtonDisabled,
    isEditButtonDisabled,
    contextHolder,
    api,
    onChangeCommentComment,
    onChangeCommentPassword,
    onChangeCommentWriter,
    onChangeStarRate,
    onClickSubmit,
    onClickEditComment,
    openNotification,
  }
}
