"use client"
import "@ant-design/v5-patch-for-react-19"
import styles from "./styles.module.css"
import { TableData } from "../../types"

const TRADE_LIST_ITEM = () => {
  const tableData: TableData[] = [
    {
      id: 1,
      productName: "파트너스 호텔 제주",
      status: "판매 완료",
      quantity: "326,000원",
      date: "2024.12.16",
      balance: 0,
    },
    { id: 2, productName: "파트너스 호텔 제주", status: "", quantity: "326,000원", date: "2024.12.16", balance: 0 },
    { id: 3, productName: "파트너스 호텔 제주", status: "", quantity: "326,000원", date: "2024.12.16", balance: 0 },
    { id: 4, productName: "파트너스 호텔 제주", status: "", quantity: "326,000원", date: "2024.12.16", balance: 0 },
    { id: 5, productName: "파트너스 호텔 제주", status: "", quantity: "326,000원", date: "2024.12.16", balance: 0 },
    { id: 6, productName: "파트너스 호텔 제주", status: "", quantity: "326,000원", date: "2024.12.16", balance: 0 },
    { id: 7, productName: "파트너스 호텔 제주", status: "", quantity: "326,000원", date: "2024.12.16", balance: 0 },

    // ...나머지 데이터 추가
  ]
  return (
    <>
      <div className={styles.listSection}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>상품 명</th>
              <th>상태</th>
              <th>금액</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.status}</td>
                <td>{item.quantity}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TRADE_LIST_ITEM
