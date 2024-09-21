import { Alert, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { View, StyleSheet, Text, TextInput, SafeAreaView } from "react-native";
import { useState } from "react";
import { useRouter } from 'expo-router';
import config from '@/app/config';

export default function CadastroCrianca( route: any ) {
    const { escolaId, responsavelId } = route.params; // Recebe os IDs da escola e do responsável
    const router = useRouter(); // Usando o hook para navegação

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

            const message = await response.text();
            Alert.alert(message);

            if (response.ok) {
                Alert.alert("Sucesso", "Criança cadastrada com sucesso!");
                router.push("/screen/crianca"); // Navega para a tela de crianças
            } else {
                Alert.alert("Erro", "Não foi possível realizar o cadastro.");
            }
        } catch (error) {
            Alert.alert("Erro", "Erro de conexão com o backend.");
        }
    };

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
                <View style={styles.containerButton}>
                    <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </Pressable>
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
