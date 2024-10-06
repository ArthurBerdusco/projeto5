import { Link, useRouter } from "expo-router";
import { ScrollView, View, StyleSheet, Text, Image, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import config from '@/app/config';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cadastro() {

    const router = useRouter();

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');

    const handleSubmit = async () => {

        try {
            const idResponsavel = await AsyncStorage.getItem('idResponsavel');

            alert("ID KKKKK: " + idResponsavel)
            const response = await fetch(`${config.IP_SERVER}/crianca`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    idade,
                    idResponsavel,
                }),
            });

            if (response.ok) {
                Alert.alert("Success", "Criança cadastrada com sucesso!");
                router.push('/screen/responsavel');
            } else {
                Alert.alert("Error", "Não foi possível realizar o cadastro.");
            }
        } catch (error) {
            Alert.alert("Error", "Erro de conexão com o backend.");
        }
    };

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginLeft: 20 }}>Cadastrar Criança</Text>
                <View style={styles.containerInputs}>
                    <TextInput
                        placeholder="Nome da criança"
                        style={styles.textInputs}
                        value={nome}
                        onChangeText={setNome}
                    />
                    <TextInput
                        placeholder="Idade da criança"
                        style={styles.textInputs}
                        value={idade}
                        onChangeText={setIdade}
                        keyboardType="numeric"
                    />
                </View>

                <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </Pressable>

                <Text style={{ fontSize: 20, marginLeft: 20 }}>Crianças</Text>
                <View style={styles.containerCards}>

                    {/* Outros cards de crianças podem ser adicionados aqui */}
                </View>

                <View style={styles.botaoProcura}>
                    <Image source={require('../../assets/icons/search.png')} style={{ height: 80, width: 80 }} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    cardDados: {
        backgroundColor: "#ffbf00",
        padding: 20,
        margin: 20,
        borderRadius: 20,
        height: 120,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    containerCards: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10,
    },
    cardsMotoristas: {
        height: 150,
        width: 150,
        backgroundColor: "#a5a5a5",
        borderRadius: 10,
    },
    textoDados: {
        fontSize: 15,
        fontWeight: "600",
    },
    containerInputs: {
        margin: 20,
        gap: 10,
    },
    textInputs: {
        backgroundColor: "transparent",
        width: "100%",
        height: 50,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        textAlign: "center",
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
    botaoProcura: {
        alignSelf: "center",
        marginTop: 20,
    },
});
