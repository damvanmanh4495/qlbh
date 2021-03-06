interface GroupType {
    id?: number
    name?: string
    description?: string
    tenant_roles?: TenantRole[]
}

export type TenantRole = {
    page_id: number,
    roles_id: number[],
}

export default GroupType;