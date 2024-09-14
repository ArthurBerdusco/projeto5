import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { View, StyleSheet, Text, Pressable, TextInput, SafeAreaView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";

export default function CadastroScreen() {
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [complemento, setComplemento] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://192.168.15.21:8080/cadastro", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    rua: rua,
                    numero: numero,
                    bairro: bairro,
                    cidade: cidade,
                    cep: cep,
                    estado: estado,
                    complemento: complemento,
                }),
            });

            Alert.alert(await response.text())

            if (response.ok) {
                Alert.alert("Success", "Cadastro feito com sucesso!");
            } else {
                Alert.alert("Error", "Não foi possível realizar o cadastro.");
            }
        } catch (error) {
            Alert.alert("Error", "Erro de conexão com o backend.");
        }
    };

    return (
        <SafeAreaView style={styles.total}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.containerInputs}>
                    <TextInput
                        placeholder="Rua"
                        style={styles.textInputs}
                        value={rua}
                        onChangeText={setRua}
                    />
                    <TextInput
                        placeholder="Número"
                        style={styles.textInputs}
                        value={numero}
                        onChangeText={setNumero}
                    />
                    <TextInput
                        placeholder="Bairro"
                        style={styles.textInputs}
                        value={bairro}
                        onChangeText={setBairro}

                    />
                    <TextInput
                        placeholder="Cidade"
                        style={styles.textInputs}
                        value={cidade}
                        onChangeText={setCidade}
                    />
                    <TextInput
                        placeholder="CEP"
                        style={styles.textInputs}
                        value={cep}
                        onChangeText={setCep}
                    />

                    <TextInput
                        placeholder="Estado"
                        style={styles.textInputs}
                        value={estado}
                        onChangeText={setEstado}
                    />

                    <TextInput
                        placeholder="Complemento"
                        style={styles.textInputs}
                        value={complemento}
                        onChangeText={setComplemento}
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
        margin: 10
    },
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    containerInputs: {
        flex: 1,
        justifyContent: 'center',
        gap: 15
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
    picker: {
        height: 50,
        width: '100%',
        borderColor: '#2B2B2B',
        borderWidth: 2,
        borderRadius: 20,
    },
    dropdown: {
        width: '100%',
        borderColor: '#2B2B2B',
        borderWidth: 2,
        borderRadius: 20,
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