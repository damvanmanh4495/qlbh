import ImageType from "./ImageType";

interface ProductType {
    id?: number;
    name?: string;
    code?: string;
    barcode?: string;
    net_weight?: number;
    quantity?: number;
    price?: number
    image_id?: number
    color?: string,
    size?: string
    material?: string,
    category_id?: number,
    brand_id?: number,
    category?: any
    brand?: any
    variants?: {id: number, color?: string, marterial?: string, size?: string, image?: string}[]
    allow_sell?: boolean
    images?: ImageType[]
}

export default ProductType;