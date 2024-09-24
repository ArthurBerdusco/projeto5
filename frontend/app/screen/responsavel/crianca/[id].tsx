import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { View, StyleSheet, Text, TextInput, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import config from '@/app/config';
import { Link, useLocalSearchParams } from 'expo-router';

export default function CadastroCrianca() {

    const [crianca, setCrianca] = useState({ nome: '', idade: 0 });
    const [loading, setLoading] = useState(false);
    const { id } = useLocalSearchParams();


    const fetchCrianca = async () => {
        try {
            alert(id)
            const response = await fetch(`${config.IP_SERVER}/criancas/${id}`);
            const data = await response.json();
            setCrianca(data);

        } catch (error) {
            console.error('Erro ao buscar os detalhes da criança:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const carregarDados = async () => {
            setLoading(true);
            await fetchCrianca();
            setLoading(false);
        };
        carregarDados();
    }, []);

    const handleSubmit = async () => {
        // try {
        //     const response = await fetch(`${config.IP_SERVER}/cadastro-crianca/${escolaId}/${responsavelId}`, {
        //         method: "POST",
        //         headers: {
        //             "Content-type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             nome,
        //             idade,
        //         }),
        //     });

        //     const message = await response.text();
        //     Alert.alert(message);

        //     if (response.ok) {
        //         Alert.alert("Sucesso", "Criança cadastrada com sucesso!");
        //         router.push("/screen/crianca"); // Navega para a tela de crianças
        //     } else {
        //         Alert.alert("Erro", "Não foi possível realizar o cadastro.");
        //     }
        // } catch (error) {
        //     Alert.alert("Erro", "Erro de conexão com o backend.");
        // }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <SafeAreaView style={styles.total}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={{ fontWeight: '800', textAlign: 'center', fontSize: 20 }}>Cadastrar Criança</Text>
                <View style={styles.containerInputs}>
                    <TextInput
                        placeholder="Nome da criança"
                        style={styles.textInputs}
                        value={crianca.nome}
                        onChangeText={(text) => setCrianca({ ...crianca, nome: text })} // Atualiza apenas o nome
                    />
                    <TextInput
                        placeholder="Idade da criança"
                        style={styles.textInputs}
                        value={crianca.idade}
                        onChangeText={(text) => setCrianca({ ...crianca, idade: text })} // Atualiza apenas a idade
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerButton}>
                    <Link href={"/screen/responsavel/crianca/escola/listaEscolas"}>
                        <Text style={styles.buttonText}>Procurar perueiro</Text>
                    </Link>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
    }
});
