import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import {LoginScreen} from '../screens/auth/LoginSreen';
import {LoadingScreen} from '../screens/loading/LoadingScreen';
import {HomeScreen} from '../screens/home/HomeScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {ProductScreen} from '../screens/products/ProductScreen';

export type RootStackParams = {
  LoginScreen: undefined;
  LoadingScreen: undefined;
  HomeScreen: undefined;
  RegisterScreen: undefined;
  ProductScreen: {productId: string};
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: fadeAnimation,
      }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
