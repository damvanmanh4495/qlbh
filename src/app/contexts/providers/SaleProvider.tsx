import React, { useState } from "react";
import { initTab } from "../../modules/Sale/components/Tab";

import SaleContext from "../SaleContext";

export type Product = {
  id?: number,
  name?: string,
  code?: string,
  description?: string,
  quantity?: number,
  category_id?: number,
  inventory_id?: number,
  category_name?: string,
  inventory_name?: string,
  image_url?: string,
  quantity_sold?: number,
  created_on?: string,
  modified_on?: string,
  amount?: number,
  discount?: number,
  tax?: number,
  note?: string,
  price?: number
}

export type Order = {
  products: Product[],
  tab: number,
  discount: number,
  deposit: number,
  note: string
}

export const defaultOrder = [{ products: [], discount: 0, deposit: 0, note: "", tab: 1 }]


const SaleProvider: React.FC = (props) => {
  const [productChosen, setProductChosen] = useState({});
  const [customerChosen, setCustomerChosen] = useState({
    id: 0
  })

  let initTabChosen = JSON.parse(localStorage.getItem("tab") || JSON.stringify(initTab))
  const [tabChosen, setTabChosen] = useState(initTabChosen.current.index)

  let initOrders = JSON.parse(localStorage.getItem("order") || JSON.stringify(defaultOrder))
  const [orderItems, setOrderItems] = useState<Order[]>(initOrders)

  const saveOrder = (orders: Order[]) => {
    localStorage.setItem("order", JSON.stringify(orders))
    setOrderItems(orders)
  }

  const handleChoose = (type: string, value: any) => {
    switch (type) {
      case "product":
        setProductChosen(value);
        let newList = orderItems
        newList.map(x => {
          if (x.tab == tabChosen) {
            let indexOfProduct = isContainProduct(x.products, value)
            if (indexOfProduct < 0) {
              x.products = [...x.products, { ...value, amount: 1, discount: 0, tax: 0}]
            }
            else {
              x.products[indexOfProduct] = { ...x.products[indexOfProduct], amount: x.products[indexOfProduct].amount! + 1 }
            }
          }
        })
        saveOrder(newList)
        break;
      case "customer":
        setCustomerChosen(value);
        break;
      default:
        break;
    }
  }

  const setProducts = (products: []) => {
    let newListItems = orderItems
    newListItems.forEach(x => {
      if (x.tab == tabChosen)
        x.products = products
    })
    saveOrder(newListItems)
  }

  let handleDelProductItem = (id: number) => {
    let newListItems: Order[] = orderItems
    newListItems.forEach(x => {
      if (x.tab == tabChosen) {
        x.products = x.products.filter(item => item.id != id);
      }
    })
    saveOrder([...newListItems])
  }

  const handleChangeItem = (id: number, field: string, value: number) => {
    let newList = orderItems
    newList.map(x => {
      if (x.tab == tabChosen) {
        let index = x.products.findIndex((product) => product.id === id)
        x.products[index] = { ...x.products[index], [field]: value }
      }
    })
    saveOrder([...newList])
  }

  const isContainProduct = (products: Product[], product: Product) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == product.id) {
        return i;
      }
    }
    return -1;
  }

  const handleChangeOrderField = (fieldName: string, value: any) => {
    let newList = orderItems
    for (let i=0;i<newList.length;i++){
      if (newList[i].tab == tabChosen) {
        newList[i] = {...newList[i],[fieldName]:value}
      }
    }
    saveOrder([...newList])
  }

  return (
    <SaleContext.Provider
      value={{
        productChosen: productChosen,
        customerChosen: customerChosen,
        setTabChosen,
        setChosen: handleChoose,
        tabChosen,
        orderItems,
        setOrderItems: saveOrder,
        setProducts: setProducts,
        handleDelProductItem,
        setChangeItem: handleChangeItem,
        setOrderField: handleChangeOrderField
      }}
    >
      {props.children}
    </SaleContext.Provider>
  );
}

export default SaleProvider;