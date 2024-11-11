import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Linking, Alert, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

import config from "@/app/config";

interface Crianca {
  id: number;
  nome: string;
  idade: number;
  nomeResponsavel: string; 
  telefoneResponsavel: string;
  nomeEscola: string;
}


export default function DetalhesEscola() {
  const { escolaId, nomeEscola } = useLocalSearchParams();
  const [criancas, setCriancas] = useState<Crianca[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar as crianças
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

      const data: Crianca[] = await response.json();
      setCriancas(data);
    } catch (err) {
      console.error("Erro ao carregar as crianças", err);
      setCriancas([]);
    } finally {
      setLoading(false);
    }
  };

  // Chamada inicial
  useEffect(() => {
    fetchCriancas();
  }, []);

  // Função para fazer a chamada para o responsável
  const ligarParaResponsavel = (telefone: string) => {
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
      <Text style={styles.title}>{nomeEscola}</Text>
      {criancas.length === 0 ? (
        <Text style={styles.noChildrenText}>Nenhuma criança encontrada</Text>
      ) : (
        criancas.map((crianca) => (
          <View key={crianca.id} style={styles.criancaCard}>
            <Text style={styles.criancaName}>{crianca.nome}</Text>
            <Text style={styles.criancaDetails}>Idade: {crianca.idade}</Text>
            {/* Verificando se 'responsavel' existe antes de acessar suas propriedades */}
            <Text style={styles.criancaDetails}>Responsável: {crianca.nomeResponsavel}</Text>
            <Text style={styles.criancaDetails}>Telefone do Responsável: {crianca.telefoneResponsavel}</Text>
            {/* Verificando se 'responsavel' existe e possui telefone antes de exibir o botão */}
            {crianca.telefoneResponsavel && (
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => ligarParaResponsavel(crianca.telefoneResponsavel)}
              >
                <FontAwesome name="phone" size={20} color="white" />
                <Text style={styles.callButtonText}>Ligar para Responsável</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#6f6f6f",
    textAlign: "center",
  },
  noChildrenText: {
    fontSize: 18,
    textAlign: "center",
    color: "#777",
  },
  criancaCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  criancaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: 'center'
  },
  criancaDetails: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
  },
  callButtonText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    textAlign: "center",
  },
});
