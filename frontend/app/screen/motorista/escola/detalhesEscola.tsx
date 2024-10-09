import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import config from "@/app/config";

export default function DetalhesEscola() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [criancas, setCriancas] = useState([]);
  const [error, setError] = useState(null);

  // Função para buscar as crianças associadas a uma escola
  const fetchCriancas = async () => {
    try {
      const idEscola = router.query.idEscola; // Pegando o ID da escola pela URL

      const response = await fetch(`${config.IP_SERVER}/api/criancas/escola/${idEscola}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar crianças');
      }
      
      const data = await response.json();
      setCriancas(data);
    } catch (err) {
      setError('Erro ao carregar as crianças');
      console.error("Erro ao carregar as crianças", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCriancas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0d99ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Crianças associadas a esta escola:</Text>
      {criancas.length === 0 ? (
        <Text>Nenhuma criança vinculada a esta escola</Text>
      ) : (
        <View style={styles.containerCards}>
          {criancas.map((crianca) => (
            <View key={crianca.id} style={styles.cardsCriancas}>
              <Text>Nome: {crianca.nome}</Text>
              <Text>Idade: {crianca.idade} anos</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerCards: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  cardsCriancas: {
    height: 100,
    width: 150,
    backgroundColor: "#a5a5a5",
    borderRadius: 10,
    padding: 10,
  },
  titulo: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
