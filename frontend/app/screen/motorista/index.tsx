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
                <Text style={{ fontSize: 20, marginLeft: 20 }}>Escola de atuação</Text>


                <View style={styles.cardEscola}>
                    <View style={{ flexDirection: "row", gap: 20, alignSelf: "flex-end", marginRight: 20 }}>
                        <Text style={styles.textoDados}>Horário: 08:00 </Text>

                    </View>

                    <View>
                        <Text style={styles.textoEscola}>Colégio Paulicéia</Text>
                        <Text style={styles.textoEndereco}>R. Zacarias de Góis, 1419 - São Paulo - SP</Text>
                    </View>


                    <View style={{ flexDirection: "row", alignSelf: "flex-end", marginRight: 20, gap: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Image source={require('../assets/icons/ativado.png')} />
                            <Text style={styles.textoDados}>12</Text>
                        </View>


                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Image source={require('../assets/icons/desativado.png')} />
                            <Text style={styles.textoDados}>2</Text>
                        </View>
                    </View>
                </View>




                <View style={styles.cardEscola}>
                    <View style={{ flexDirection: "row", gap: 20, alignSelf: "flex-end", marginRight: 20 }}>
                        <Text style={styles.textoDados}>Horário: 12:00 </Text>

                    </View>

                    <View>
                        <Text style={styles.textoEscola}>Escola Bem Querer</Text>
                        <Text style={styles.textoEndereco}>R. Dr. Jesuíno Maciel, 1833 - São Paulo - SP</Text>
                    </View>


                    <View style={{ flexDirection: "row", alignSelf: "flex-end", marginRight: 20, gap: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Image source={require('../assets/icons/ativado.png')} />
                            <Text style={styles.textoDados}>8</Text>
                        </View>


                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Image source={require('../assets/icons/desativado.png')} />
                            <Text style={styles.textoDados}>5</Text>
                        </View>
                    </View>
                </View>




                <View style={styles.cardEscola}>
                    <View style={{ flexDirection: "row", gap: 20, alignSelf: "flex-end", marginRight: 20 }}>
                        <Text style={styles.textoDados}>Horário: 12:00 </Text>

                    </View>

                    <View style={{ flexDirection: "column", width: "90%" }}>
                        <Text style={styles.textoEscola}>Colégio Guararapes</Text>
                        <Text style={styles.textoEndereco}>R. Maria de Lourdes Salomão</Text>
                    </View>


                    <View style={{ flexDirection: "row", alignSelf: "flex-end", marginRight: 20, gap: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Image source={require('../assets/icons/ativado.png')} />
                            <Text style={styles.textoDados}>8</Text>
                        </View>


                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Image source={require('../assets/icons/desativado.png')} />
                            <Text style={styles.textoDados}>5</Text>
                        </View>
                    </View>
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
        margin: 10,
        borderRadius: 20,
        height: 120,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },

    cardEscola: {
        backgroundColor: "#ffbf00",
        margin: 10,
        borderRadius: 20,
        height: 120,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 10
    },
    textoDados: {
        fontSize: 15,
        fontWeight: "600"
    },

    textoEscola: {
        fontSize: 20,
        fontWeight: "900"
    },

    textoEndereco: {
        fontSize: 15,
        fontWeight: "400",
        flexWrap: "wrap"

    },

    botaoProcura: {
        alignSelf: "center",
        marginTop: 20
    }


})