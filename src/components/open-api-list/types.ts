import { DocumentData } from "firebase/firestore"

export interface IOpenApiPageProps {
  keyword: string
  data?: any
  dataList?: DocumentData[]
  setDataList?: React.Dispatch<React.SetStateAction<DocumentData[]>>
  currentData?: DocumentData[]
}
