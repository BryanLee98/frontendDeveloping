import { Dispatch, SetStateAction } from "react"

export interface IPropsCommentWrite {
  isEdit: boolean
  el: {
    __typename?: "BoardComment"
    _id: string
    writer?: string | null
    contents: string
    rating: number
    createdAt: any
    updatedAt: any
  }
  setIsEdit: Dispatch<SetStateAction<boolean>>
}
