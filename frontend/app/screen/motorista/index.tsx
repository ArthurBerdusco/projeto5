import { Link, useRouter } from "expo-router";
import { ScrollView, View, StyleSheet, Text, Image, Pressable, SafeAreaView } from "react-native";

export default function Index() {

    const router = useRouter();

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "space-around"
        }}>
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

                <Link style={styles.cardsMotoristas} href={"/screen/motorista/escola/escolasAtendidas"}>
                    <Text style={styles.buttonText}>Ver escolas</Text>
                </Link>
                <View style={styles.cardsMotoristas}>

                </View>
                <View style={styles.cardsMotoristas}>

                </View>
                <View style={styles.cardsMotoristas}>

                </View>
            </View>


            <View style={{ justifyContent: "space-around", alignItems: "center", flexDirection: "row", marginTop: 70 }}>
                <Pressable
                    style={styles.botaoOferta}
                    onPress={() => router.push("/screen/motorista/ofertas/verOfertas")}
                >
                    <Image source={require('../assets/icons/ofertas.png')} style={styles.image} />
                </Pressable>
                <View style={styles.botaoProcura}>
                    <Image source={require('../assets/icons/search.png')} style={{ height: 80, width: 80 }} />
                </View>
                <Pressable
                    style={styles.botaoOferta}
                    onPress={() => router.push("/screen/motorista/escola/escolasAtendidas")}
                >
                    <Image source={require('../assets/icons/editar.png')} style={styles.image} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 20,
        alignItems: "center",
        alignContent: "center",
        marginTop: 'auto', // Centraliza verticalmente
        marginBottom: 'auto',
        backgroundColor: "#0d99ff"


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
        gap: 20
    },
    containerCards: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10
    },
    cardsMotoristas: {
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
    },
    buttonText: {
        color: "black",
        fontWeight: "700",
    },

    botaoOferta: {
        display: 'flex',
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        height: 80, // Ajuste a altura conforme necessário
        width: 80,  // Ajuste a largura conforme necessário
        borderRadius: 10, // Arredonda o botão se necessário
    },
    image: {
        width: 80, // Ajuste o tamanho da imagem
        height: 80, // Ajuste o tamanho da imagem
        resizeMode: 'contain', // Garante que a imagem não será cortada
    },


})