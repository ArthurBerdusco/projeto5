import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    return(
        <View>
            <Text>Olá motorista</Text>
            <Link href={"/screen/motorista/meusclientes"}>
                <Text>Meus alunos</Text>
            </Link>
        </View>
    )
}