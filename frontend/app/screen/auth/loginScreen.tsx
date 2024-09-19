import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function loginScreen() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const router = useRouter();  // Adicione isso para usar o roteamento


    const handleSubmit = async () => {
        try {
            const response = await fetch("http://192.168.15.161:8080/loginapi", {

                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha,
                }),

            });

            if (response.ok) {


                
                Alert.alert("Success", "Login feito com sucesso!");

                const resultado = await response.json();
                try { //GRAVANDO ID DO USUARIO PARA USAR DENTRO DO APP
                    await AsyncStorage.setItem('idUsuario', resultado.id.toString());
                } catch (e) {

                }


                if (resultado.role == "MOTORISTA") {
                    router.push('/screen/motorista/cadastro');
                }
                if (resultado.role == "RESPONSAVEL") {
                    router.push('/screen/responsavel/cadastro');
                }

            } else {
                Alert.alert("Error", "Não foi possível fazer login.");
            }
        } catch (error) {
            Alert.alert("Error", "Erro de conexão com o backend.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.containerInputs}>
                    <View style={styles.logo}>
                        <Image source={require('../assets/logo/logovan.png')} />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu email"
                            placeholderTextColor={"gray"}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor={"gray"}
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                        />
                    </View>
                </View>

                <View style={styles.containerPressables}>

                    <Pressable style={styles.botaoLogin} onPress={handleSubmit}>
                        <Text style={{ color: "black", fontWeight: "700" }}>
                            Entrar
                        </Text>
                    </Pressable>


                    <Link style={styles.botaoCadastro} href={"/screen/auth/registerScreen"}>
                        Cadastre-se
                    </Link>


                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "#ffffff",
    },
    logo: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
    }
    ,

    input: {
        display: "flex",
        backgroundColor: "none",
        borderColor: "#2B2B2B",
        width: 350,
        height: 50,
        borderRadius: 20,
        textAlign: "center",
        color: "#ff0000",
        borderWidth: 2
    },

    containerPressables: {
        display: "flex",
        gap: 15,
        margin: 20,
        alignItems: "center",
        justifyContent: "center",



    },

    botaoCadastro: {
        padding: 15,
        backgroundColor: "#0d99ff",
        width: 350,
        alignItems: "center",
        textAlign: "center",
        borderRadius: 20,
        fontWeight: "700"
    },



    botaoLogin: {
        backgroundColor: "#ffbf00",
        display: "flex",
        width: 350,
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"

    },

    containerInputs: {
        display: "flex",
        gap: 20,
        alignItems: "center",
        alignContent: "center",
        marginTop: 'auto', // Centraliza verticalmente
        marginBottom: 'auto',
    }
})