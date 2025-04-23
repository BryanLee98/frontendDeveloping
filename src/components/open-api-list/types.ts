import { DocumentData } from "firebase/firestore"

export interface IOpenApiPageProps {
  data?: any
  dataList?: DocumentData[]
  setDataList?: React.Dispatch<React.SetStateAction<DocumentData[]>>
}
