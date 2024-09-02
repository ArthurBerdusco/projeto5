import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform } from "react-native";

export default function loginScreen() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const router = useRouter();  // Adicione isso para usar o roteamento


    const handleSubmit = async () => {
        try {
<<<<<<< refs/remotes/origin/samuel
            const response = await fetch("http://192.168.15.21:8080/login", {
=======
            const response = await fetch("http://192.168.15.21:8080/loginapi", {
>>>>>>> local
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
<<<<<<< refs/remotes/origin/samuel
                Alert.alert("Success", "Login feito com sucesso!");
=======
                const resultado = await response.json();
                if (resultado.role == "MOTORISTA") {
                    router.push('/screen/motorista');
                }

                if (resultado.role == "RESPONSAVEL") {
                    Alert.alert("NAVEGA PARA TELA RESPONSAVEL")
                    router.push('/screen/responsavel');

                }

>>>>>>> local
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
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.containerInputs}>
                    <View style={styles.logo}>
                        <Image source={require('../assets/logo/logovan.png')} />
                    </View>
                    <View>
                        <TextInput style={styles.input} placeholder="Digite seu email" placeholderTextColor={"gray"} value={email} onChangeText={setEmail}>
                        </TextInput>
                    </View>
                    <View>
                        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={"gray"} value={senha} onChangeText={setSenha}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.containerPressables}>
                    <View>
                        <Link style={styles.botaoCadastro} href={"/screen/auth/registerScreen"}>
                            Cadastre-se
                        </Link>
                    </View>

                    <View>
                        <Pressable style={styles.botaoLogin} onPress={handleSubmit}>
                            <Text style={{ color: "black", fontWeight: "700" }}>
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
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
        backgroundColor: "#ffbf00",
        width: 350,
        alignItems: "center",
        textAlign: "center",
        borderRadius: 20,
        fontWeight: "700"
    },



    botaoLogin: {
        backgroundColor: "#0d99ff",
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
        margin: 20,
        alignItems: "center"

    }
})