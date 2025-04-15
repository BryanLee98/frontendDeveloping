export interface IPropsCommentItem {
  el: {
    __typename?: "BoardComment"
    _id: string
    writer?: string | null
    contents: string
    rating: number
    createdAt: any
    updatedAt: any
  }
  length: number
  index: number
}
