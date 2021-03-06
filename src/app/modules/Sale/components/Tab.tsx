import { Button, IconButton, Tooltip } from "@material-ui/core";
import React, { useContext, useState } from "react"
import { defaultOrder, Order } from "../../../contexts/providers/SaleProvider";
import SaleContext from "../../../contexts/SaleContext";

export const initTab = {
    list: [{ name: "Đơn 1", index: 1 }],
    current: { name: "Đơn 1", index: 1 }
}

const Tab = () => {
    const defaultTabs = JSON.parse(localStorage.getItem("tab") || '{}')

    let initTabs = initTab;
    if (JSON.stringify(defaultTabs) != '{}') initTabs = defaultTabs

    const [tab, setTab] = useState(
        initTabs
    )

    const { setTabChosen, setOrderItems, orderItems } = useContext(SaleContext)

    const handleSelectTab = (selectedTab: any) => {
        setTab({ ...tab, current: selectedTab })
        localStorage.setItem("tab", JSON.stringify({ ...tab, current: selectedTab }))
        setTabChosen(selectedTab.index)
    };

    const handleAddTab = () => {
        let list = tab.list
        const newTab = {
            name: `Đơn ${list[list.length - 1].index + 1}`,
            index: list[list.length - 1].index + 1
        };

        saveTabs({
            list: [...tab.list, newTab],
            current: newTab
        })
        setOrderItems([...orderItems, { products: [], tab: newTab.index , discount: 0, deposit: 0, note: ""}])
        setTabChosen(newTab.index)

    };

    const handleDelTab = (id: number) => {
        let index = 0;
        let newList = tab.list;

        if (newList.length <= 1) {
            saveTabs(initTab)
            setTabChosen(1)
            setOrderItems(defaultOrder)
        }
        else {
            for (let i = 0; i < newList.length; i++) {
                if (newList[i].index == id) {
                    newList.splice(i, 1);
                    index = i;
                }
            }
            if (id == tab.current.index) {
                let newCurrent = index - 1
                if (index == 0) newCurrent = index

                setTabChosen(tab.list[newCurrent].index)
                saveTabs({
                    list: newList,
                    current: tab.list[newCurrent]
                })
            } else {
                // setTab({ ...tab, list: newList });
                saveTabs({ ...tab, list: newList })
            }
            setOrderItems(handleDelOrderTab(id))
        }
    }

    let saveTabs = (tabs: any) => {
        setTab(tabs)
        localStorage.setItem("tab", JSON.stringify(tabs))
    }

    let handleDelOrderTab = (tabIndex: number) => {
        let newListItems: Order[] = orderItems

        newListItems = newListItems.filter(item => {
            return item.tab != tabIndex
        })
        return newListItems
    }

    return (
        <>
            <div className="tab-header  ">

                <ul className="tab-list">
                    {tab.list.map(t => (
                        <li key={t.index} className={tab.current.name == t.name ? "tab-active" : "tab-n-active"}>
                            <button
                                onClick={() => handleSelectTab(t)}
                            >
                                {t.name}
                            </button>
                            <button className="bt-del" aria-label="delete" onClick={() => handleDelTab(t.index)} >
                                <i className="fas fa-times-circle"></i>
                            </button>
                        </li>
                    ))}
                </ul>
                <Tooltip title="Thêm mới đơn hàng" >
                    <button className="bt-add" onClick={handleAddTab}>
                        <i className="fas fa-plus"></i>
                    </button>
                </Tooltip>
            </div>
        </>
    );
}

export default Tab;