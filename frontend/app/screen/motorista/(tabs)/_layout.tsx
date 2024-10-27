import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: '#1BA0F2', // Cor de fundo do header
      },
      headerTintColor: '#fff', // Cor do texto e ícones do header
      headerTitleStyle: {
        fontWeight: 'bold', // Definindo a fonte do título como negrito
        fontSize: 20, // Tamanho da fonte do título
        // fontFamily: '', // Defina a fonte desejada
      },
      headerTitleAlign: 'center', // Centraliza o título
    }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="verOfertas"
        options={{
          title: 'Minhas Ofertas',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />

      <Tabs.Screen
        name="escolasAtendidas"
        options={{
          title: 'Escolas Atendidas',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Meu perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />

    </Tabs>
  );
}
