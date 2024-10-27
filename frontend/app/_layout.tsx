import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
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
      }}
    >
      {/* NAVEGAÇÕES DE AUTENTICAÇÃO */}
      <Stack.Screen
        name="index"
        options={{ title: 'Início' }} // Definir título personalizado
      />
      <Stack.Screen
        name="screen/auth/loginScreen"
        options={{ title: 'Login', headerBackVisible: false, }} 
      />
      <Stack.Screen
        name="screen/auth/registerScreen"
        options={{ title: 'Cadastro' }} 
      />

      <Stack.Screen name="screen/motorista/(tabs)" options={{ headerShown: false }} />
      
      <Stack.Screen
        name="screen/motorista/editaPerfil"
        options={{ title: 'Editar Perfil' }} 
      />
      <Stack.Screen
        name="screen/motorista/vanForm"
        options={{ title: 'Formulário Van Escolar' }} 
      />

      {/* NAVEGAÇÕES MOTORISTA/ESCOLA */}
      <Stack.Screen
        name="screen/motorista/escola/[id]"
        options={{ title: 'Escola - Detalhes' }} 
      />
      <Stack.Screen
        name="screen/motorista/escola/detalhesEscola"
        options={{ title: 'Detalhes da Escola' }} 
      />
      {/* <Stack.Screen
        name="screen/motorista/escola/escolasAtendidas"
        options={{ title: 'Escolas Atendidas' }} 
      /> */}
      <Stack.Screen
        name="screen/motorista/escola/listaEscolas"
        options={{ title: 'Lista de Escolas' }} 
      />


      {/* NAVEGAÇÕES MOTORISTA/VEÍCULOS */}
      <Stack.Screen
        name="screen/motorista/veiculo/index"
        options={{ title: 'Veículos do Motorista' }} 
      />

      {/* NAVEGAÇÕES RESPONSÁVEL */}

      <Stack.Screen name="screen/responsavel/(tabs)" options={{ headerShown: false }} />


      <Stack.Screen
        name="screen/responsavel/editaPerfil"
        options={{ title: 'Editar perfil' }} 
      />

      {/* NAVEGAÇÕES RESPONSÁVEL/CRIANÇA */}
      <Stack.Screen
        name="screen/responsavel/crianca/[id]"
        options={{ title: 'Detalhes da Criança' }} 
      />
      <Stack.Screen
        name="screen/responsavel/crianca/form"
        options={{ title: 'Cadastro de Criança' }} 
      />

      {/* NAVEGAÇÕES RESPONSÁVEL/CRIANÇA/ESCOLA */}
      <Stack.Screen
        name="screen/responsavel/crianca/escola/[id]"
        options={{ title: 'Escola da Criança' }} 
      />
      <Stack.Screen
        name="screen/responsavel/crianca/escola/listaEscolas"
        options={{ title: 'Lista de Escolas' }} 
      />

      {/* NAVEGAÇÕES RESPONSÁVEL/CRIANÇA/ESCOLA/MOTORISTA */}
      <Stack.Screen
        name="screen/responsavel/crianca/escola/motorista/[id]"
        options={{ title: 'Motorista da Escola' }} 
      />

      {/* NAVEGAÇÕES RESPONSÁVEL/CRIANÇA/OFERTAS */}
      <Stack.Screen
        name="screen/responsavel/crianca/ofertas/listaOfertas"
        options={{ title: 'Ofertas recebidas' }} 
      />
      <Stack.Screen
        name="screen/responsavel/crianca/ofertas/[id]"
        options={{ title: 'Ver oferta' }} 
      />
    </Stack>
  );
}
