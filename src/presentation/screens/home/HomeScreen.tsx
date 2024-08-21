import {useAuthStore} from '../../store/auth/useAuthStore';
import {getProductsByPage} from '../../../actions/auth/products/get-products-by-page';
import {useInfiniteQuery} from '@tanstack/react-query';
import {MainLayout} from '../../layouts/MainLayout';
import {FullScreenLoder} from '../../components/ui/FullScreenLoader';
import {ProductList} from '../../components/productos/ProductList';

export const HomeScreen = () => {
  const {logout} = useAuthStore();

  // const {isLoading, data: products = []} = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60, // 1 hora
  //   queryFn: () => getProductsByPage(0),
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hora

    initialPageParam: 0,

    queryFn: async params => {
      console.log({params});
      return await getProductsByPage(params.pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      allPages.length;
    },
  });

  return (
    <MainLayout title="TesloShop - Products" subTitle="App Administrativa">
      {isLoading ? (
        <FullScreenLoder />
      ) : (
        <ProductList
          fetchNextPage={fetchNextPage}
          products={data?.pages.flat() ?? []}
        />
      )}
    </MainLayout>
  );
};
