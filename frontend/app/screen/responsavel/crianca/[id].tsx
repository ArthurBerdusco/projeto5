import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native';
import { View, StyleSheet, Text, TextInput, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import config from '@/app/config';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';

export default function CadastroCrianca() {

    const [crianca, setCrianca] = useState({ nome: '', idade: '', status: '' });
    const [loading, setLoading] = useState(false);
    const [ofertas, setOfertas] = useState([]);
    const [motorista, setMotorista] = useState(null);

    const { id } = useLocalSearchParams();


    const fetchCrianca = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/criancas/${id}`);
            const data = await response.json();
            setCrianca(data);

        } catch (error) {
            console.error('Erro ao buscar os detalhes da criança:', error);
        } finally {
            setLoading(false);
        }
    };


    const fetchOfertas = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/oferta/crianca/${id}`);
            const data = await response.json();
            setOfertas(data);
            console.log(`ID OFERTA${id}`)
        } catch (error) {
            console.error('Erro ao buscar as ofertas:', error);
        } finally {
            setLoading(false);
        }
    };


    const fetchMotorista = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/crianca/${id}/motorista`);
            if (response.ok) {
                const data = await response.json();
                setMotorista(data);
            } else {
                console.error("Motorista não encontrado");
                setMotorista(null);
            }
        } catch (error) {
            console.error('Erro ao buscar motorista:', error);
        }
    };

    useEffect(() => {
        const carregarDados = async () => {
            setLoading(true);
            await fetchCrianca();
            await fetchOfertas();
            await fetchMotorista();
            setLoading(false);
        };
        carregarDados();
    }, []);


    return (
        <SafeAreaView style={styles.total}>

            <ScrollView contentContainerStyle={styles.scrollView}>

                <View style={styles.containerInputs}>
                    <Text style={styles.text}>Nome</Text>
                    <TextInput
                        placeholder="Nome da criança"
                        style={styles.textInputs}
                        value={crianca.nome}
                        onChangeText={(text) => setCrianca({ ...crianca, nome: text })} // Atualiza apenas o nome
                    />

                    <Text style={styles.text}>Idade</Text>
                    <TextInput
                        placeholder="Idade da criança"
                        style={styles.textInputs}
                        value={crianca.idade ? crianca.idade.toString() : ''} // Converte para string
                        onChangeText={(text) => setCrianca({ ...crianca, idade: parseInt(text) || '' })} // Converte para número
                        keyboardType="numeric"
                        editable={false}
                        
                    />

                </View>



                {crianca.status !== 'ATIVO' && (
                    <View style={styles.containerButton}>
                        <Pressable style={styles.button2}
                            onPress={() =>
                                router.navigate({
                                    pathname: `/screen/responsavel/crianca/escola/listaEscolas`,
                                    params: { crianca: JSON.stringify(crianca) },
                                })}
                        >
                            <Text style={styles.buttonText}>Procurar perueiro</Text>
                        </Pressable>

                        <Link style={styles.button}
                            href={{
                                pathname: `/screen/responsavel/crianca/ofertas/aceitaOferta`,
                                params: { ofertaId: id }, // Passa a ID da oferta, não a ID da criança
                            }}
                        >
                            <Text style={styles.buttonText}>Procurar ofertas</Text>
                        </Link>
                    </View>
                )}

                {motorista && (
                    <View style={styles.cardMotorista}>
                        <Text>Nome do Motorista: {motorista.nome}</Text>
                        <Text>Telefone: {motorista.telefone}</Text>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    total: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },

    cardMotorista: {
        backgroundColor: "#ffbf00",
        padding: 20,
        marginBottom: 20,
        borderRadius: 20,
        height: 120,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    cardDados: {
        backgroundColor: "#0d99ff",
        padding: 20,
        marginBottom: 20,
        borderRadius: 20,
        height: 120,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    containerCards: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10,
    },
    textoDados: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },

    containerInputs: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    textInputs: {
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
    },
    buttonSubmit: {
        backgroundColor: "#ffbf00",
        width: "100%",
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "black",
        fontWeight: "700",
    },
    containerButton: {
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 20,
        gap: 20
    },
    button: {
        padding: 15,
        backgroundColor: "#ffbf00",
        width: 350,
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        fontWeight: "700"
    },
    button2: {
        padding: 15,
        backgroundColor: "#0d99ff",
        width: 350,
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        fontWeight: "700"
    }, text: {
        fontSize: 14,
        marginBottom: 5,
        color: "#666",
    }
});
