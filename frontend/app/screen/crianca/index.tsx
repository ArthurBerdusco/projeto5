import { Link } from "expo-router";
import { ScrollView, View, StyleSheet, Text, Image, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import config from '@/app/config';

export default function Index( route: any) {
    const { escolaId, responsavelId } = route.params; // Recebe os IDs da escola e do responsável

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/cadastro-crianca/${escolaId}/${responsavelId}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    idade,
                }),
            });

            Alert.alert(await response.text());

            if (response.ok) {
                Alert.alert("Success", "Criança cadastrada com sucesso!");
                setNome(''); // Limpa os campos após o cadastro
                setIdade('');
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
                <View style={styles.cardDados}>
                    <Image source={require('../assets/icons/icone6.png')} style={{ resizeMode: "contain", height: 90, width: 90 }} />
                    <View>
                        <Text style={styles.textoDados}>Nome: Samuel Braga</Text>
                        <Text style={styles.textoDados}>Idade: 21 Anos</Text>
                        <Text style={styles.textoDados}>Telefone: (11)95323232</Text>
                    </View>
                </View>
                
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
                    <Link style={styles.cardsMotoristas} href={"/screen/motorista/escola/escolasAtendidas"}>
                        <Text style={styles.buttonText}>Ver escolas</Text>
                    </Link>
                    {/* Outros cards de crianças podem ser adicionados aqui */}
                </View>

                <View style={styles.botaoProcura}>
                    <Image source={require('../assets/icons/search.png')} style={{ height: 80, width: 80 }} />
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
