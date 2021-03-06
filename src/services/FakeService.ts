import Service from "./base/Service";
import products from "../data_test/products.json";
import productItem from "../data_test/product_item.json";

export default class FakeService implements Service {

    public save = async (domain: any): Promise<any> => {
        return {
            data: { id: 17 },
            status: 201
        }
    }

    public getList = async (page: number, size: number, params?: {}): Promise<any> => {
        return {
            data: products,
            status: 200
        }
    }

    public getOne = async (id: number): Promise<any> => {
        return {
            status: 200,
            data: productItem
        };
    };

    public delete = async (id: number): Promise<any> => {
        return {
            status: 200,
        };
    }

    public deleteList = async (ids: number[]): Promise<any> => {
        return {
            status: 200,
        };
    }
}