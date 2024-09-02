import { ScrollView, View, StyleSheet, Text } from "react-native";

export default function Index() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.total}>

                <View>
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>Meus dados</Text>
                    <View style={styles.cardDados}>

                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    total: {
        display: "flex",
        alignItems: "center",
        margin: 20
    },

    cardDados: {
        backgroundColor: "#464646",
        width: 400,
        height: 150,
        borderRadius: 20
    }


})