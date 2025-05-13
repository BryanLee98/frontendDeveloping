export interface IPageWriteProps {
  isEdit: boolean
}

export interface IHandleEnrollProps {
  isEdit: boolean
  inputs: {
    name: string
    title: string
    content: string
  }
  password: string
  youtubeLink: string
  address: string
  detailAddress: string
  zipcode: string
  targetId: string | null
  createBoard: any
  updateBoard: any
  data: any
  setNameError: (error: string) => void
  setPasswordError: (error: string) => void
  setTitleError: (error: string) => void
  setContextError: (error: string) => void
  setModalContent: (content: string) => void
  setIsModalOpen: (isOpen: boolean) => void
  setTargetId: (id: string) => void
}
