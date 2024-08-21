import {Layout, Text, Button, Input} from '@ui-kitten/components';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView, State} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {API_URL, STAGE} from '@env';
import {useState} from 'react';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(true);
    const wasSuccesful = await login(form.email, form.password);
    setIsPosting(false);
    if (wasSuccesful) return;

    // mostrar alerta
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  };

  // imprimir variable de entorno
  console.log({apiUrl: API_URL, stage: STAGE});
  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            accessoryLeft={<MyIcon name="email-outline" />}
            placeholder="Correo"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{marginBottom: 10}}
            value={form.email}
            onChangeText={email => setForm({...form, email})}
          />
          <Input
            accessoryLeft={<MyIcon name="lock-outline" />}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={{marginBottom: 20}}
            value={form.password}
            onChangeText={password => setForm({...form, password})}
          />
          <Text>{JSON.stringify(form, null, 2)}</Text>
          {/* space */}
          <Layout style={{height: 20}} />

          <Layout>
            <Button
              disabled={isPosting}
              accessoryRight={<MyIcon name="arrow-forward-outline" white />}
              onPress={onLogin}>
              Ingresar
            </Button>
          </Layout>

          {/* space */}
          <Layout style={{height: 50}} />

          {/* informacion  */}

          <Layout
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text>No tienes cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('RegisterScreen')}>
              {''}
              Crea una{''}
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
