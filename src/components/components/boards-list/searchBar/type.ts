import {
  Dispatch,
  ForwardRefExoticComponent,
  MouseEvent,
  RefAttributes,
  SetStateAction,
  useState,
} from "react"
import { SearchProps } from "antd/es/input"
import type { GetProps, InputRef } from "antd"

export interface ISearch {
  keyword: string
  setKeyword: Dispatch<SetStateAction<string>>
  setPrevDate: Dispatch<SetStateAction<Date | null>>
  setEndDate: Dispatch<SetStateAction<Date | null>>
  Search: ForwardRefExoticComponent<SearchProps & RefAttributes<InputRef>>
  onSearch:
    | ((
        value: string,
        event?:
          | React.ChangeEvent<HTMLInputElement>
          | React.MouseEvent<HTMLElement>
          | React.KeyboardEvent<HTMLInputElement>,
        info?: {
          source?: "clear" | "input"
        }
      ) => void)
    | undefined
}
