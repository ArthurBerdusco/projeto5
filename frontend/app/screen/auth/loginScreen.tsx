import { Link, Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from "@/app/config";



export default function loginScreen() {

    const [email, setEmail] = useState("mika@email.com.br");
    const [senha, setSenha] = useState("1234");

    const router = useRouter();  // Adicione isso para usar o roteamento


    const handleSubmit = async () => {
        try {
            alert('ola')
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

                const resultado = await response.json();

                if (resultado.usuario.role === "MOTORISTA") {
                    await AsyncStorage.setItem('motorista', resultado.toString());
                    await AsyncStorage.setItem('idMotorista', resultado.id.toString());
                    if (resultado.status === "Pendente ativação") {
                        router.push('/screen/motorista/cadastro');
                    } else {
                        router.push('/screen/motorista');
                    }
                }

                if (resultado.usuario.role === "RESPONSAVEL") {
                    await AsyncStorage.setItem('responsavel', resultado.toString());
                    await AsyncStorage.setItem('idResponsavel', resultado.id.toString());
                    if (resultado.status === "DESATIVADO") {
                        router.push('/screen/responsavel/cadastro');
                    } else {
                        router.push('/screen/responsavel');
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
            <Stack.Screen
                options={{
                    headerTitle: 'Login',
                    headerStyle: { backgroundColor: '#0d99ff' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />

            <View style={styles.logo}>
                <Image source={require('../assets/logo/logovan.png')} />
            </View>

            <View style={styles.containerInputs}>

                <TextInput
                    style={styles.textInputs}
                    placeholder="Digite seu email"
                    placeholderTextColor={"gray"}
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.textInputs}
                    placeholder="Senha"
                    placeholderTextColor={"gray"}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />

                <Pressable style={styles.botaoLogin} onPress={handleSubmit}>
                    <Text style={{ color: "white", fontWeight: "700" }}>
                        Entrar
                    </Text>
                </Pressable>

            </View>

            <View style={styles.containerPressables}>

                <Text style={{ color: "gray", fontWeight: "600" }}>
                    Não possui cadastro?
                </Text>
                <Link style={styles.botaoCadastro} href={"/screen/auth/registerScreen"}>
                    <Text style={{ color: "white", fontWeight: "600" }}>
                        Cadastre-se
                    </Text>
                </Link>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "#ffffff",
        paddingLeft: 10,
        paddingRight: 10
    },
    logo: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        marginVertical: 20
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
        borderRadius: 10,
        fontWeight: "700"
    },



    botaoLogin: {
        backgroundColor: "#ffbf00",
        display: "flex",

        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"

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
})