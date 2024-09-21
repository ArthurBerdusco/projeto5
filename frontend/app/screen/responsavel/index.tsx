import { Link } from "expo-router";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import { useState } from "react";

export default function Index( route:any ) {
    const { responsavelId } = route.params; // Asegura que o ID do responsável está disponível

    const [criancas, setCriancas] = useState([
        { id: 1, nome: "Criança 1", idade: "5 anos" },
        { id: 2, nome: "Criança 2", idade: "7 anos" },
        { id: 3, nome: "Criança 3", idade: "6 anos" },
    ]);

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.container}>
                <View style={styles.cardDados}>
                    <Image source={require('../assets/icons/icone6.png')} style={{ resizeMode: "contain", height: 90, width: 90 }} />
                    <View>
                        <Text style={styles.textoDados}>Nome: Samuel Braga</Text>
                        <Text style={styles.textoDados}>Idade: 21 Anos</Text>
                        <Text style={styles.textoDados}>Telefone: (11) 95323-2323</Text>
                    </View>
                </View>
                
                <Text style={styles.title}>Crianças</Text>
                
                <View style={styles.containerCards}>
                    {criancas.map(crianca => (
                        <View key={crianca.id} style={styles.cardsCriancas}>
                            <Text style={styles.cardText}>{crianca.nome}</Text>
                            <Text style={styles.cardText}>{crianca.idade}</Text>
                        </View>
                    ))}
                </View>

                <Link href={`/screen/crianca/cadastro/${String(responsavelId)}`}>
                    <Text style={styles.cadastrarTexto}>Cadastrar Criança</Text>
                </Link>

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
    title: {
        fontSize: 20,
        marginLeft: 20,
        marginTop: 20,
    },
    containerCards: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10,
    },
    cardsCriancas: {
        height: 150,
        width: 150,
        backgroundColor: "#a5a5a5",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    cardText: {
        color: "white",
        fontWeight: "600",
    },
    textoDados: {
        fontSize: 15,
        fontWeight: "600",
    },
    cadastrarTexto: {
        textAlign: "center",
        marginVertical: 20,
        fontWeight: "700",
        color: "#0d99ff",
    },
    botaoProcura: {
        alignSelf: "center",
        marginTop: 20,
    },
});
