import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Linking, Alert, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import config from "@/app/config";

export default function DetalhesEscola() {

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

  const ligarParaResponsavel = (telefone) => {
    if (!telefone) {
      Alert.alert("Erro", "Número de telefone do responsável não disponível.");
      return;
    }

    const url = `tel:${telefone}`;
    Linking.openURL(url).catch((err) =>
      Alert.alert("Erro", "Não foi possível fazer a chamada.")
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0d99ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Crianças na Escola</Text>
      {criancas.length === 0 ? (
        <Text>Nenhuma criança encontrada</Text>
      ) : (
        criancas.map((crianca) => (
          <View key={crianca.id} style={styles.criancaCard}>
            <Text>Criança: {crianca.nome}</Text>
            <Text>Idade: {crianca.idade}</Text>
            <Text>Responsável: {crianca.responsavel?.nome || "N/A"}</Text>
            <Text>Telefone do Responsável: {crianca.responsavel?.telefone || "N/A"}</Text>
            <Button
              title="Ligar para Responsável"
              onPress={() => ligarParaResponsavel(crianca.responsavel?.telefone)}
              disabled={!crianca.responsavel?.telefone}
              color={"#ffbf00"}
            ></Button>
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
    backgroundColor: "#a3a3a355",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
});
