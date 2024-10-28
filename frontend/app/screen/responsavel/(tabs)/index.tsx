import { Link, Stack, useRouter, useNavigation } from "expo-router";
import { ScrollView, View, StyleSheet, Text, ActivityIndicator, Pressable } from "react-native";
import { useState, useEffect } from "react";
import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

interface Crianca {
    id: number;
    nome: string;
    idade: number;
  }

export default function Index() {
    const navigation = useNavigation();
   
    const [criancas, setCriancas] = useState<Crianca[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
  
    const fetchCriancas = async () => {
      setLoading(true); // Ativa o indicador de carregamento antes da requisição
      try {
        const responsavelId = await AsyncStorage.getItem('idResponsavel');
        if (responsavelId) {
          const response = await fetch(`${config.IP_SERVER}/crianca/responsavel/${responsavelId}`);
          if (response.status === 404) {
            throw new Error('Nenhuma criança cadastrada');
          }
          const data = await response.json();
          setCriancas(data);
        } else {
          setError('Nenhum ID de responsável encontrado.');
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false); // Desativa o indicador de carregamento após a requisição
      }
    };
  
    useEffect(() => {
        
        const unsubscribeFocus = navigation.addListener("focus", () => {
            fetchCriancas();
        });

        return () => {
            unsubscribeFocus();
        };
    }, [navigation]);
  
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0d99ff" />
        </View>
      );
    }

    return (
        <SafeAreaView style={styles.total}>
            <ScrollView style={styles.scrollView}>

                <View style={styles.container}>

                    <Text style={styles.title}>Crianças</Text>

                    {error && <Text style={styles.errorText}>{error}</Text>}

                   
                        <View style={styles.containerCards}>
                            {criancas.map(crianca => (
                                <Pressable
                                    onPress={() =>
                                        router.navigate({
                                            pathname: `/screen/responsavel/crianca/[id]`,
                                            params: { id: crianca.id }
                                        })
                                    }
                                    style={styles.cardsCriancas}
                                    key={crianca.id}
                                >
                                    <View style={{}}>
                                        <Text style={styles.cardText}>{crianca.nome}</Text>
                                        <Text style={styles.cardText}>{crianca.idade} anos</Text>
                                    </View>
                                </Pressable>

                            ))}
                        </View>
                    

                   
                        <Pressable onPress={() => router.navigate(`/screen/responsavel/crianca/form`)}>
                            <Text style={styles.cadastrarTexto}>Cadastrar Criança</Text>
                        </Pressable>
                    


                </View>
            </ScrollView >
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    total: {
        marginTop: 10,
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    container: {
        flex: 1,
        padding: 20,

    },
    cardDados: {
        backgroundColor: "#ffbf00",
        padding: 20,
        marginBottom: 20,
        borderRadius: 20,
        height: 120,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    iconDados: {
        resizeMode: "contain",
        height: 90,
        width: 90,
    },
    textoDados: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: "#0d99ff",
        fontWeight: "700",
    },
    containerCards: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10,
    },
    cardsCriancas: {
        height: 150,
        width: "48%",
        backgroundColor: "#0d99ff",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardText: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 16,
        textAlign: "center"
    },
    cadastrarTexto: {
        textAlign: "center",
        marginVertical: 20,
        fontWeight: "700",
        color: "#0d99ff",
        fontSize: 18,
    },
    botaoProcura: {
        alignSelf: "center",
        marginTop: 20,
    },
    searchIcon: {
        height: 80,
        width: 80,
    },
    noDataContainer: {
        alignItems: "center",
        marginTop: 40,
    },
    noDataText: {
        fontSize: 18,
        color: "#555",
        marginBottom: 10,
    },
    cadastrarLink: {
        textDecorationLine: 'underline',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
});
