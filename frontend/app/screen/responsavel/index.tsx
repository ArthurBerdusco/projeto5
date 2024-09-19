import { ScrollView, View, StyleSheet, Text, Image } from "react-native";

export default function Index() {
    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.container}>
                {/* <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 20 }}>
                    Meus dados
                </Text> */}
                <View style={styles.cardDados}>
                    <Image source={require('../assets/icons/icone6.png')} style={{ resizeMode: "contain", height: 90, width: 90 }} />
                    <View>
                        <Text style={styles.textoDados}>Nome: Samuel Braga</Text>
                        <Text style={styles.textoDados}>Idade: 21 Anos</Text>
                        <Text style={styles.textoDados}>Telefone: (11)95323232</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 20, marginLeft: 20 }}>Crianças</Text>
                <View style={styles.containerCards}>

                    <View style={styles.cardsCriancas}>

                    </View>
                    <View style={styles.cardsCriancas}>

                    </View>
                    <View style={styles.cardsCriancas}>

                    </View>
                    <View style={styles.cardsCriancas}>

                    </View>
                </View>


                <View style={styles.botaoProcura}>
                    <Image source={require('../assets/icons/search.png')} style={{ height: 80, width: 80 }} />
                </View>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
    ,

    cardDados: {
        backgroundColor: "#0d99ff",
        padding: 20,
        margin: 20,
        borderRadius: 20,
        height: 120,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    containerCards: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10
    },
    cardsCriancas: {
        height: 150,
        width: 150,
        backgroundColor: "#a5a5a5",
        borderRadius: 10
    },

    textoDados: {
        fontSize: 15,
        fontWeight: "600"
    },

    botaoProcura: {
        alignSelf: "center",
        marginTop: 20
    }


})