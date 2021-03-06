interface Service {
    save(domain: any): Promise<any>
    getList(page: number, size: number, params?: {}): Promise<any>
    getOne(id: number): Promise<any>
    delete(id: number): Promise<any>
}

export default Service;