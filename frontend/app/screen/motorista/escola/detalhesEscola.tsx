import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams, useRouter, } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import config from "@/app/config";

export default function DetalhesEscola() {
  const router = useRouter();
  const { escolaId } = useLocalSearchParams();
  const [criancas, setCriancas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCriancas = async () => {
    try {
      const idMotorista = await AsyncStorage.getItem("idMotorista");
      if (!idMotorista) {
        console.error("ID do motorista não encontrado");
        return;
      }

      const response = await fetch(
        `${config.IP_SERVER}/api/escolas/${escolaId}/motorista/${idMotorista}/criancas`
      );

      if (!response.ok) {
        console.error(`Erro: ${response.status} - ${response.statusText}`);
        setCriancas([]);
        return;
      }

      const data = await response.json();
      setCriancas(data);
    } catch (err) {
      console.error("Erro ao carregar as crianças", err);
      setCriancas([]);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchCriancas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0d99ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Detalhes',
          headerStyle: { backgroundColor: '#ffbf00' },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />
      <Text style={styles.title}>Crianças na Escola</Text>
      {criancas.length === 0 ? (
        <Text>Nenhuma criança encontrada</Text>
      ) : (
        criancas.map((crianca) => (
          <View key={crianca.id} style={styles.criancaCard}>
            <Text>Criança: {crianca.nome}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  criancaCard: {
    backgroundColor: "#00a2ff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
});
