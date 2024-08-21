import {Layout, Spinner} from '@ui-kitten/components';
import {Text, View} from 'react-native';

export const LoadingScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner size="large" status="primary" />
    </Layout>
  );
};
