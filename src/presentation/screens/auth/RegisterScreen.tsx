import {Layout, Text, Button, Input} from '@ui-kitten/components';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useState} from 'react';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {register} = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const onRegister = async () => {
    if (
      form.email.length === 0 ||
      form.password.length === 0 ||
      form.fullName.length === 0
    ) {
      return;
    }
    setIsPosting(true);
    const wasSuccesful = await register(
      form.email,
      form.password,
      form.fullName,
    );
    setIsPosting(false);
    if (wasSuccesful) return;

    // mostrar alerta
    Alert.alert('Complete todos los datos');
  };

  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Crear Cuenta</Text>
          <Text category="p2">Ingresa tus datos</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            accessoryLeft={<MyIcon name="person-outline" />}
            placeholder="Nombre y Apellido"
            style={{marginBottom: 10}}
            value={form.fullName}
            onChangeText={fullName => setForm({...form, fullName})}
          />
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
              onPress={onRegister}>
              Crear
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
            <Text>Ya tienes una cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.pop()}>
              {''}
              Ingresar{''}
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
