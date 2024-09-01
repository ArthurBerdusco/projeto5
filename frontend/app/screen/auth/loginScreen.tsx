import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TextInput, Pressable, Alert } from "react-native";

export default function loginScreen() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://192.168.15.21:8080/login", {
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
            } else {
                Alert.alert("Error", "Não foi possível fazer login.");
            }
        } catch (error) {
            Alert.alert("Error", "Erro de conexão com o backend.");
        }
    };



    return (
        <SafeAreaView style={styles.container}>



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
                        <Text style={styles.textCadastro}>
                            Cadastrar
                        </Text>
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
        </SafeAreaView >
    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: "#ffffff"

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
        width: "100%",
        height: 50,
        borderRadius: 20,
        textAlign: "center",
        color: "#ff0000",
        borderWidth: 2
    },

    containerPressables: {
        display: "flex",
        gap: 15,
        top: 120,
        margin: 20

    },

    botaoCadastro: {
        backgroundColor: "#ffbf00",
        width: "100%",
        height: 50,
        borderRadius: 20,
        alignContent: "center",
        textAlign: "center"
    },
    textCadastro: {
        color: "black",
        fontWeight: "700",
        textAlign: "center",
        justifyContent: "center"
    },


    botaoLogin: {
        backgroundColor: "#0d99ff",
        display: "flex",
        width: "100%",
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },

    containerInputs: {
        display: "flex",
        gap: 20,
        margin: 20
    }




})