import FotoPerfil from "@/app/components/Foto/FotoPerfil";
import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
}

interface Responsavel {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: Endereco;
    imagem: Imagem;
}

interface Imagem {
    id: number;
    nome: string;
    dados: string;
}


export default function Perfil() {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [responsavel, setResponsavel] = useState<Responsavel>({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        endereco: {
            cep: '',
            rua: '',
            numero: '',
            bairro: '',
            complemento: ''
        },
        imagem: {
            id: 0,
            nome: '',
            dados: '',
        }
    });


    const fetchResponsavel = async () => {
        setLoading(true);
        try {
            const responsavel = (await AsyncStorage.getItem('idResponsavel')) ?? "";

            const resultado = await fetch(`${config.IP_SERVER}/responsavel/${responsavel}`);
            const dados = await resultado.json();
            setResponsavel(dados);

        } catch (err) {
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const unsubscribeFocus = navigation.addListener("focus", () => {
            fetchResponsavel();
        });

        return () => {
            unsubscribeFocus();
        };
    }, [navigation]);


    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0d99ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.total}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {responsavel.imagem && responsavel.imagem.dados ? (
                    <Image
                        source={responsavel.imagem ? { uri: `data:image/jpeg;base64,${responsavel.imagem.dados}` } : require('@/app/assets/icons/take-a-picture.png')}
                        style={styles.image}
                    />
                ) : (
                    <Image source={require('@/app/assets/icons/perfil.png')} style={styles.image} />
                )}

                <View style={styles.containerInfo}>
                    <Text style={styles.textTitle}>Dados Pessoais</Text>
                    <View>
                        <Text style={styles.text}>Nome de preferência:</Text>
                        <Text style={styles.info}>{responsavel.nome}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>CPF:</Text>
                        <Text style={styles.info}>{responsavel.cpf}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Email:</Text>
                        <Text style={styles.info}>{responsavel.email}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Telefone:</Text>
                        <Text style={styles.info}>{responsavel.telefone}</Text>
                    </View>
                </View>

                <View style={styles.containerInfo}>
                    <Text style={styles.textTitle}>Endereço</Text>
                    <View>
                        <Text style={styles.text}>CEP:</Text>
                        <Text style={styles.info}>{responsavel.endereco.cep}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Rua:</Text>
                        <Text style={styles.info}>{responsavel.endereco.rua}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Número:</Text>
                        <Text style={styles.info}>{responsavel.endereco.numero}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Bairro:</Text>
                        <Text style={styles.info}>{responsavel.endereco.bairro}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Complemento:</Text>
                        <Text style={styles.info}>{responsavel.endereco.complemento}</Text>
                    </View>
                </View>

                <View style={styles.containerInfo}>
                    <TouchableOpacity style={styles.buttonEdit} onPress={() => router.navigate("/screen/responsavel/editaPerfil")}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => router.navigate("/screen/auth/loginScreen")}>
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    total: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: 'center',
        marginVertical: 20,
    },
    containerInfo: {
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
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    text: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    info: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#ff4444',
        padding: 10,
        borderRadius: 55,
        alignItems: 'center',
    },
    buttonEdit: {
        backgroundColor: '#ffbf00',
        padding: 10,
        borderRadius: 55,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});