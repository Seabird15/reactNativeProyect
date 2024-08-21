import {Layout, Spinner} from '@ui-kitten/components';

export const FullScreenLoder = () => {
  return (
    <Layout
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
      <Spinner size="giant" />
    </Layout>
  );
};
