import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { View, StyleSheet, Text, Pressable, TextInput, SafeAreaView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";

export default function CadastroScreen() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [idade, setIdade] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Motorista', value: 'MOTORISTA' },
        { label: 'Responsavel', value: 'RESPONSAVEL' }
    ]);

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://192.168.15.21:8080/cadastro", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                    idade: idade,
                    cpf: cpf,
                    telefone: telefone,
                    role: role,
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
                        placeholder="Nome completo"
                        style={styles.textInputs}
                        value={nome}
                        onChangeText={setNome}
                    />
                    <TextInput
                        placeholder="Digite o seu email"
                        style={styles.textInputs}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="Senha"
                        style={styles.textInputs}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="Idade"
                        style={styles.textInputs}
                        value={idade}
                        onChangeText={setIdade}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="CPF"
                        style={styles.textInputs}
                        value={cpf}
                        onChangeText={setCpf}
                    />
                    <TextInput
                        placeholder="Telefone"
                        style={styles.textInputs}
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                    <DropDownPicker
                        open={open}
                        value={role}
                        items={items}
                        setOpen={setOpen}
                        setValue={setRole}
                        setItems={setItems}
                        placeholder="Selecione o tipo de usuário"
                        style={styles.picker}
                        dropDownContainerStyle={styles.dropdown} />
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