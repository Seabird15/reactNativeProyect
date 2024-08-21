import {Products} from '../../../domain/entities/Product';
import {Layout, List} from '@ui-kitten/components';
import {ProductCard} from './ProductCard';

interface Props {
  products: Products[];
  fetchNextPage: () => void;
}

export const ProductList = ({products, fetchNextPage}: Props) => {
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{height: 150}} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
    />
  );
};
