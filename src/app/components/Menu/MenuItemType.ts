type MenuItem = {
    id: number;
    name: string;
    url: string;
    icon?: string;
    children: undefined
} | {
    id: number;
    name: string;
    icon?: string;
    url: undefined;
    children: {
        id: number;
        name: string;
        url: string;
    }[];
}

export default MenuItem;