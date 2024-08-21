import { tesloApi } from "../../../config/api/tesloApi";
import { TesloProducts } from "../../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../../infraestructure/mappers/product.mapper";

export const getProductsByPage = async(page: number, limit: number = 20) => {


    console.log({page, limit});
    try {
        const { data } = await tesloApi.get<TesloProducts[]>(`/products?offset=${page * 10}&limit=${limit}`);
        const products = data.map(tesloProduct => ProductMapper.tesloProductToEntity(tesloProduct));
        return products;
    } catch (error) {
        console.log(error);
    }

}