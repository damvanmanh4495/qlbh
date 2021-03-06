import React, { ReactNode } from "react"
import Moment from "react-moment";
import { formatCash } from "../../../../components/ultis";
import { Product } from "./../../../../contexts/providers/SaleProvider"

export interface Props {
  title: string,
  data: OrderBill,
  footer: {
    label: ReactNode,
    value: ReactNode
  }[]
}

type OrderBill = {
  customer_id?: number,
  customer_name?: string,
  customer_phone?: string,
  deposit?: number,
  discount?: number,
  note: string,
  status?: number,
  tax?: number,
  money?: number
  total_money: number,
  return_money?: number,
  created_on?: string,
  code?: string,
  products: Array<any>
}

class Bill extends React.Component<Props>{

  render() {
    let { data, title, footer } = this.props

    return (
      <div className="d-none d-print-block bill-zzz" id="bill">
        <div className="container">
          <h1 style={{ textAlign: "center" }}>{title}</h1>
          <table width="100%">
            <tbody>
              <tr>
                {data.code && (<td>{data.code}</td>)}
                <td >
                  <Moment date={data.created_on ? data.created_on : Date.now()} format="DD/MM/YYYY HH:mm" />
                </td>
              </tr>
              <tr>
                <td>{`Khách hàng: ${data.customer_name || "Khách lẻ"}`}</td>
              </tr>
              {data.customer_phone &&
                (<tr>
                  <td>{`Điện thoại: ${data.customer_phone} `}</td>
                </tr>)}
            </tbody>
          </table>
          <hr />
          <table width="100%">
            <thead>
              <tr style={{ fontWeight: "bold" }}>
                <td width="30%">Tên</td>
                <td width="20%" style={{ textAlign: "right" }}>Đơn giá</td>
                <td width="30%" style={{ textAlign: "center" }}>Số lượng</td>
                <td width="20%" style={{ textAlign: "right" }}>Thành tiền</td>
              </tr>
            </thead>
            <tbody>
              {data.products.map(product => {
                let unitPrice = product.price - product.discount || product.unit_price
                let amount = product.amount || product.quantity
                return(
                  <tr key={product.id}>
                    <td>{product.name || product.product_name}</td>
                    <td style={{ textAlign: "right" }}>{formatCash(unitPrice)}</td>
                    <td style={{ textAlign: "center" }}>{amount}</td>
                    <td style={{ textAlign: "right" }}>{formatCash(unitPrice * amount)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <hr />
          <table width="100%">
            <tbody>
              {footer.map(line => (
                <tr>
                  <td >{line.label}</td>
                  <td style={{ textAlign: "right" }}>{line.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Bill;