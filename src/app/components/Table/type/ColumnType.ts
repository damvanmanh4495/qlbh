import { ReactNode } from "react";

type ColumnType = {
    field: string | number,
    showField?: string | number,
    label?: string
    align?: "left" | "center" | "right" | "justify" | "char",
    minWidth?: number
    type?: "link" | "date" | "image" | "status" | "variants" | "money" | "children" | "images",
    valueField?:string,
    link?:string,
    format?: string,
    mapper?: {
        value: any,
        label: ReactNode,
        color?: "red" | "green" | "blue" | string
    }[],
    onClick?: (id: number) => void
};

export default ColumnType;