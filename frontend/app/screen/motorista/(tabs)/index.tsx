import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";


interface Imagem {
  id: number;
  nome: string;
  dados: string | null;
}

interface Motorista {
  nome: string;
  telefone: string;
  idade: number;
  imagem: Imagem;
}
export default function Index() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [escolasAtendidas, setEscolasAtendidas] = useState([]);

  const fetchEscolasAtendidas = async (idMotorista) => {
    const response = await fetch(`${config.IP_SERVER}/api/escolas/atendidas/${idMotorista}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Erro ao buscar escolas atendidas');
    }
  
    return response.json();
  };
  


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const idMotorista = await AsyncStorage.getItem('idMotorista');
        const escolasData = await fetchEscolasAtendidas(idMotorista);
        setEscolasAtendidas(escolasData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0d99ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>

      <ScrollView style={styles.container}>

        <Text style={{ fontSize: 20, marginLeft: 20 }}>Escolas de atuação</Text>

        <View style={styles.containerCards}>
          {escolasAtendidas.length === 0 ? (
            <Text>Nenhuma escola atendida</Text>
          ) : (
            escolasAtendidas.map((escola) => (
              <Pressable
                key={escola.id}
                style={styles.cardsMotoristas}
                onPress={() =>
                  router.navigate(
                    `/screen/motorista/escola/detalhesEscola?escolaId=${escola.id}`
                  )
                } // Navega para a nova tela passando o ID da escola
              >
                <Text>{escola.nome}</Text>
                <Text>{escola.rua}</Text>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  cardDados: {
    backgroundColor: "#ffbf00",
    padding: 20,
    margin: 20,
    borderRadius: 20,
    height: 120,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  containerCards: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  cardsMotoristas: {
    height: 150,
    width: 150,
    backgroundColor: "#a5a5a5",
    borderRadius: 10,
  },

  textoDados: {
    fontSize: 15,
    fontWeight: "600",
  },

  buttonText: {
    color: "black",
    fontWeight: "700",
  },

  botaoMenu: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  fixedFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  image: {
    borderRadius: 75,
    borderColor: "#ff0000",
    borderWidth: 2,
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  icon: {
    height: 60,
    width: 60,
    borderRadius: 50
  }
});
