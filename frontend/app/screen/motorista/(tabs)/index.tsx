import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { FontAwesome } from '@expo/vector-icons';


import {
  Animated,
  PanResponder,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DraggableFlatList from 'react-native-draggable-flatlist';

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

interface Crianca {
  id: number;
  nome: string;
  confirmado: boolean;
}


import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [escolasAtendidas, setEscolasAtendidas] = useState([]);
  const [criancas, setCriancas] = useState<Crianca[]>([]);
  const [criancaAtual, setCriancaAtual] = useState(0);

  const [page, setPage] = useState(0);

  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 20,
    onPanResponderMove: (evt, gestureState) => {
      translateX.setValue(-page * windowWidth + gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50 && page > 0) {
        setPage(page - 1);
      } else if (gestureState.dx < -50 && page < 1) {
        setPage(page + 1);
      } else {
        Animated.spring(translateX, {
          toValue: -page * windowWidth,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: -page * windowWidth,
      useNativeDriver: true,
    }).start();
  }, [page]);


  const confirmarEmbarque = () => {
    if (criancaAtual < criancas.length) {
      setCriancas(prevCriancas =>
        prevCriancas.map((crianca, index) =>
          index === criancaAtual ? { ...crianca, confirmado: true } : crianca
        )
      );
      setCriancaAtual(prev => prev + 1);
    }
  };


  //5MB escolas atendidas (3 imagens) // 4Byte count
  const fetchEscolasAtendidas = async (idMotorista: string | null) => {
    if (!idMotorista) return [];
    try {
      const response = await fetch(`${config.IP_SERVER}/api/escolas/atendidas/${idMotorista}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Erro ao buscar escolas atendidas');
      const escolasData = await response.json();
      return await Promise.all(
        escolasData.map(async (escola: any) => {
          const countResponse = await fetch(`${config.IP_SERVER}/api/escolas/${escola.id}/motorista/${idMotorista}/criancas/count`);
          const quantidadeCriancas = await countResponse.json();
          return { ...escola, quantidadeCriancas };
        })
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const fetchCriancas = async (idMotorista: string | null) => {
    if (!idMotorista) return [];
    try {
      const response = await fetch(`${config.IP_SERVER}/motorista/${idMotorista}/criancas`);
      if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar as crianças", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const idMotorista = await AsyncStorage.getItem("idMotorista");
        const escolasData = await fetchEscolasAtendidas(idMotorista);
        const criancasData = await fetchCriancas(idMotorista);
        setEscolasAtendidas(escolasData);
        setCriancas(criancasData);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }} {...panResponder.panHandlers}>

        <Pressable style={styles.cardControle} onPress={confirmarEmbarque}>
          <Text style={styles.title}>Buscar</Text>
          <Text style={styles.schoolName}>(ENDERECO DA CRIANÇA)</Text>

          <View style={styles.progressContainer}>
            {criancas.map((crianca, index) => (
              <View
                key={crianca.id}
                style={[
                  styles.progressBar,
                  crianca.confirmado ? styles.confirmed : styles.notConfirmed,
                ]}
              />
            ))}
          </View>

          <View style={styles.childContainer}>
            <Text style={styles.childName}>
              {criancaAtual < criancas.length ? criancas[criancaAtual].nome : "Todas confirmadas"}
            </Text>
            {criancaAtual < criancas.length && criancas[criancaAtual].confirmado && (
              <View style={styles.confirmedContainer}>
                <FontAwesome name="check-square" size={16} color="green" />
                <Text style={styles.confirmedText}>Confirmado</Text>
              </View>
            )}
          </View>
        </Pressable>

        <Animated.View style={[styles.slideContainer, { transform: [{ translateX }] }]}>
          <View style={[styles.page, { width: windowWidth }]}>
            <Text style={styles.titulo}>Escolas de atuação</Text>
            <View style={styles.containerCards}>
              {escolasAtendidas.length === 0 ? (
                <Text>Nenhuma escola atendida</Text>
              ) : (
                escolasAtendidas.map((escola) => (
                  <Pressable
                    key={escola.id}
                    style={styles.cardsMotoristas}
                    onPress={() =>
                      router.navigate({
                        pathname: `/screen/motorista/escola/detalhesEscola`,
                        params: { nomeEscola: escola.nome, escolaId: escola.id }
                      })
                    }
                  >
                    <Text style={styles.quantidadeCrianca}>{escola.quantidadeCriancas} Crianças</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                      <Image source={require('@/app/assets/icons/school.png')} />
                      <Text style={styles.nomeEscola}>{escola.nome}</Text>
                    </View>
                  </Pressable>

                ))
              )}
            </View>
          </View>

          <View style={[styles.page, { width: windowWidth }]}>
            <Text style={styles.titulo}>Organize as crianças</Text>
            <View style={styles.containerCards}>

              <DraggableFlatList
                data={criancas}
                onDragEnd={({ data }) => setCriancas(data)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, drag, isActive }) => (
                  <Pressable
                    style={[styles.cardsCriancas, isActive && { backgroundColor: '#007bff' }]}
                    onLongPress={drag}
                  >
                    <Text style={styles.nomeEscola}>{item.nome}</Text>
                  </Pressable>
                )}
              />
            </View>
          </View>


        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  slideContainer: {
    flexDirection: "row",
    width: "200%",
  },
  page: {
    width: windowWidth,
    padding: 10,
  },
  titulo: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "bold",
  },
  containerCards: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  cardControle: {
    backgroundColor: "#0EAFFF",
    margin: 10,
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  cardsMotoristas: {
    height: 120,
    width: 160,
    backgroundColor: "#0EAFFF",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  cardsCriancas: {
    height: 100,
    width: 320,
    backgroundColor: "#0EAFFF",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    margin: '1%',
  },
  nomeEscola: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  quantidadeCrianca: {
    fontWeight: "400",
    color: "white",
    fontSize: 15,
    textAlign: "right",
  },


  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  schoolName: {
    fontWeight: "300",
    color: "white",
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  confirmed: {
    backgroundColor: "orange",
  },
  notConfirmed: {
    backgroundColor: "white",
  },
  childContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  childName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  confirmedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  confirmedText: {
    color: "green",
    fontSize: 14,
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
