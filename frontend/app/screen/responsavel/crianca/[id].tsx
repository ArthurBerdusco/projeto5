import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
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
            console.log(`Buscando dados para a criança com ID: ${id}`);
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
            <Stack.Screen
                options={{
                    headerTitle: 'Perfil Criança',
                    headerStyle: { backgroundColor: '#0d99ff' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.cardDados}>

                
                    <Text style={styles.textoDados}> Nome: {crianca.nome}</Text>
                    <Text style={styles.textoDados}> Idade: {crianca.idade}</Text>
                    <Text style={styles.textoDados}> Status: {crianca.status}</Text>

                </View>



                {crianca.status !== 'ATIVO' && (
                    <View style={styles.containerButton}>
                        <Pressable style={styles.button2}
                            onPress={() =>
                                router.push({
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
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    total: {
        flex: 1,
        margin: 10,
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
        flex: 1,
        justifyContent: 'center',
        gap: 20
    },
    textInputs: {
        backgroundColor: "transparent",
        width: "100%",
        height: 50,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        textAlign: "center"
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
    },
});
