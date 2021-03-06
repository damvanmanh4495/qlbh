import GroupType from "../../modules/Permission/type/GroupType";

type UserType = {
    address?: string
    birthdate?: any
    email?: string
    id?: number
    name?: string
    note?: string,
    phone_no?: string
    status?: 0 | 1
    username?: string
    roles_id?: number[],
    gender?: boolean,
    created_by?: string
    modified_by?: string
    created_on?: any,
    modified_on?: any
    group?: GroupType
}

export default UserType;