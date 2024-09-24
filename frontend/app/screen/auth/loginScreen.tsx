import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from "@/app/config";



export default function loginScreen() {

    const [email, setEmail] = useState("ryu@email.com.br");
    const [senha, setSenha] = useState("1234");

    const router = useRouter();  // Adicione isso para usar o roteamento


    const handleSubmit = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/loginapi`, {

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

                if (resultado.usuario.role === "MOTORISTA") {
                    await AsyncStorage.setItem('idMotorista', resultado.id.toString());
                    if (resultado.status === "DESATIVADO") {
                        router.push('/screen/motorista/cadastro');
                    } else {
                        router.push('/screen/motorista/');
                    }
                }

                if (resultado.usuario.role === "RESPONSAVEL") {
                    alert("CAI AQUI")
                    await AsyncStorage.setItem('idResponsavel', resultado.id.toString());
                    if (resultado.status === "DESATIVADO") {
                        router.push('/screen/responsavel/cadastro');
                    } else {
                        router.push('/screen/responsavel/');
                    }
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