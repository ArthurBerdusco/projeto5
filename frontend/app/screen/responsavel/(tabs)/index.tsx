import { Link, Stack, useRouter, useNavigation } from "expo-router";
import { ScrollView, View, StyleSheet, Text, ActivityIndicator, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

interface Crianca {
    id: number;
    nome: string;
    idade: number;
    periodo: string;
    status: string;
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
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={styles.cardText}>{crianca.nome}</Text>
                                    <Text style={styles.cardText}>{crianca.idade} anos</Text>
                                    <Text style={styles.cardPeriodo}>{crianca.periodo}</Text>
                                    <Text style={styles.cardTextsegundo}>{crianca.status}</Text>


                                </View>
                            </Pressable>

                        ))}
                    </View>


                    <View style={{ alignItems: "center", marginTop: 130 }}>
                        <Pressable onPress={() => router.navigate(`/screen/responsavel/crianca/form`)} style={{ backgroundColor: "#0d99ff", alignItems: "center", borderRadius: 100, width: 70, height: 70, justifyContent: "center", }}>
                            <Image source={require('@/app/assets/icons/add.png')} />
                        </Pressable>
                    </View>




                </View>
            </ScrollView >
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    total: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollView: {
        backgroundColor: 'white',
        paddingBottom: 50,
    },
    container: {
        padding: 20,
        justifyContent: "space-between",
        flexDirection: "column",



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
        fontSize: 18,
        textAlign: "left",
        margin: 1
    },

    cardTextsegundo: {
        textTransform: "uppercase",
        backgroundColor: "#ffa600f0",
        margin: 2,
        textAlign: "center",
        borderRadius: 15,
        fontSize: 11,
        width: 80,
        color: "black"


    },
    cardPeriodo: {

        textTransform: "uppercase",
        backgroundColor: "#fffffff0",
        margin: 2,
        textAlign: "center",
        borderRadius: 15,
        fontSize: 11,
        width: 50,
        color: "black"

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
