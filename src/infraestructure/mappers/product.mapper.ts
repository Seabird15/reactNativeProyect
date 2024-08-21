import { API_URL } from '@env';
import { Products } from '../../domain/entities/product';
import { TesloProducts } from '../interfaces/teslo-products.response';
export class ProductMapper {
    static tesloProductToEntity(tesloProducts: TesloProducts): Products {
        return {
            id: tesloProducts.id,
            title: tesloProducts.title,
            price: tesloProducts.price,
            description: tesloProducts.description,
            slug: tesloProducts.slug,
            stock: tesloProducts.stock,
            sizes: tesloProducts.sizes,
            gender: tesloProducts.gender,
            tags: tesloProducts.tags,
            images: tesloProducts.images.map(
                image => `${API_URL}/files/product/${image}`)
    }

}
}