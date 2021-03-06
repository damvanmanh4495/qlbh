interface PageType {
    id: number
    icon?: string
    name?: string
    url?: string
    parent_id?: number
    menu_index?: number
    page?: PageType
    roles: Role[]
}

export type Role = {
    id: number,
    name?: string,
}

export default PageType;