"use client"
import { TableData } from "../../types"
import styles from "./styles.module.css"

const POINT_USAGE_ITEM = () => {
  const tableData: TableData[] = [
    {
      id: 1,
      productName: "파트너스 호텔 제주",
      status: "충전",
      quantity: "+ 326,000원",
      date: "2024.12.16",
      balance: 100000,
    },
    {
      id: 2,
      productName: "파트너스 호텔 제주",
      status: "구매",
      quantity: "- 116,000원",
      date: "2024.12.16",
      balance: 100000,
    },
    {
      id: 3,
      productName: "파트너스 호텔 제주",
      status: "구매",
      quantity: "- 6,000원",
      date: "2024.12.16",
      balance: 100000,
    },
    {
      id: 4,
      productName: "파트너스 호텔 제주",
      status: "판매",
      quantity: "+ 326,000원",
      date: "2024.12.16",
      balance: 0,
    },
    {
      id: 5,
      productName: "파트너스 호텔 제주",
      status: "충전",
      quantity: "+ 326,000원",
      date: "2024.12.16",
      balance: 0,
    },
    {
      id: 6,
      productName: "파트너스 호텔 제주",
      status: "구매",
      quantity: "- 326,000원",
      date: "2024.12.16",
      balance: 0,
    },
    {
      id: 7,
      productName: "파트너스 호텔 제주",
      status: "충전",
      quantity: "+ 100,000원",
      date: "2024.12.16",
      balance: 0,
    },

    // ...나머지 데이터 추가
  ]
  return (
    <>
      <div className={styles.listSection}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>날짜</th>
              <th>내용</th>
              <th>거래 및 충전 내역</th>
              <th>잔액</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.status}</td>
                <td>{item.quantity}</td>
                <td>{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default POINT_USAGE_ITEM
