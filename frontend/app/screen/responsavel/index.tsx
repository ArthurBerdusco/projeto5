import { Link, useRouter } from "expo-router";
import { ScrollView, View, StyleSheet, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const [criancas, setCriancas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCriancas = async () => {
            try {

                const responsavel = await AsyncStorage.getItem('idResponsavel');

                // Fazendo a requisição com `fetch`
                const response = await fetch(`${config.IP_SERVER}/crianca/responsavel/${responsavel}`);


                // Convertendo a resposta para JSON
                const data = await response.json();

                setCriancas(data);
            } catch (err) {
                setError('Erro ao carregar as crianças.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

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
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.cardDados}>
                    <Image source={require('../assets/icons/icone6.png')} style={styles.iconDados} />
                    <View>
                        <Text style={styles.textoDados}>Nome: Samuel Braga</Text>
                        <Text style={styles.textoDados}>Idade: 21 Anos</Text>
                        <Text style={styles.textoDados}>Telefone: (11) 95323-2323</Text>
                    </View>
                </View>

                <Text style={styles.title}>Crianças</Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                {criancas.length > 0 ? (
                    <View style={styles.containerCards}>
                        {criancas.map(crianca => (

                            <Link
                                href={{
                                    pathname: `/screen/responsavel/crianca/[id]`,
                                    params: { id: crianca.id },
                                }}
                                style={styles.cardsCriancas}
                            >
                                <Text style={styles.cardText}>{crianca.id}</Text>
                                <Text style={styles.cardText}>{crianca.nome}</Text>
                                <Text style={styles.cardText}>{crianca.idade} anos</Text>
                            </Link>

                        ))}
                    </View>
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>Nenhuma criança cadastrada.</Text>
                        <Link href={"/screen/responsavel/crianca/cadastro"} style={styles.cadastrarLink}>
                            <Text style={styles.cadastrarTexto}>Cadastrar Criança</Text>
                        </Link>
                    </View>
                )}

                {criancas.length > 0 && (
                    <Link href={`/screen/responsavel/crianca/cadastro`}>
                        <Text style={styles.cadastrarTexto}>Cadastrar Criança</Text>
                    </Link>
                )}

                <View style={styles.botaoProcura}>
                    <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
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
        width: "48%", // Ajuste para responsividade
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
        textAlign: "center",
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
