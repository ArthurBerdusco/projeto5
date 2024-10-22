import { Link, Stack, useRouter } from "expo-router";
import { ScrollView, View, StyleSheet, Text, Image, ActivityIndicator, TouchableOpacity, Alert, Pressable } from "react-native";
import { useState, useEffect } from "react";
import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Imagem {
    id: number;
    nome: string;
    dados: string | null;
  }
  
  interface Responsavel {
    nome: string;
    telefone: string;
    idade: number;
    imagem: Imagem;
  }

export default function Index() {


    const [responsavel, setResponsavel] = useState<Responsavel>(
        {
            nome: '',
            telefone: '',
            idade: 0,
            imagem: {
                id: 0,
                nome: '',
                dados: null,
            }
        }
    )
    const [criancas, setCriancas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();


    const fetchResponsavel = async () => {
        try {
            const responsavel = await AsyncStorage.getItem('idResponsavel');

            const response = await fetch(`${config.IP_SERVER}/responsavel/${responsavel}`);


            const data = await response.json();

            setResponsavel(data)
        } catch (err) {
            setError('Erro ao carregar o responsavel');
            console.error(err)
        }


    }

    const fetchCriancas = async () => {
        try {

            const responsavel = await AsyncStorage.getItem('idResponsavel');


            const response = await fetch(`${config.IP_SERVER}/crianca/responsavel/${responsavel}`);


            const data = await response.json();

            setCriancas(data);
        } catch (err) {
            setError('Erro ao carregar as crianças.');
            console.error(err);
        }

    };

    useEffect(() => {

        setLoading(true);
        fetchResponsavel();
        fetchCriancas();

        setLoading(false);

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
                <Pressable onPress={() => router.navigate('/screen/responsavel/perfil')} style={styles.cardDados}>
                    {responsavel.imagem && responsavel.imagem.dados ? (
                        <Image
                            source={{
                                uri: responsavel.imagem.dados.startsWith('data:image/')
                                    ? responsavel.imagem.dados // Se já estiver no formato base64 completo, usa como está
                                    : `data:image/jpeg;base64,${responsavel.imagem.dados}` // Caso contrário, adiciona o prefixo
                            }}
                            style={styles.image}
                        />
                    ) : (
                        <View>
                            <Image
                                source={require("@/app/assets/icons/perfil.png")}
                                style={styles.image}
                            />
                        </View>
                    )}
                    <View>
                        <View>
                            <Text style={styles.textoDados}>Nome: {responsavel.nome}</Text>
                            <Text style={styles.textoDados}>Idade: {responsavel.idade}</Text>
                            <Text style={styles.textoDados}>Telefone: {responsavel.telefone}</Text>
                        </View>
                    </View>
                </Pressable>

                <Text style={styles.title}>Crianças</Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                {criancas.length > 0 ? (
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
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>Nenhuma criança cadastrada.</Text>
                        <Link href={"/screen/responsavel/crianca/cadastro"} style={styles.cadastrarLink}>
                            <Text style={styles.cadastrarTexto}>Cadastrar Criança</Text>
                        </Link>
                    </View>
                )}

                {criancas.length > 0 && (
                    <Pressable onPress={() => router.navigate(`/screen/responsavel/crianca/cadastro`)}>
                        <Text style={styles.cadastrarTexto}>Cadastrar Criança</Text>
                    </Pressable>
                )}


            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "white",
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
    image: {
        borderRadius: 75,
        borderColor: "#f6f6f6",
        borderWidth: 6,
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
});
