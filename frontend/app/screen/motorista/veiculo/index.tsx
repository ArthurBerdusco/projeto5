import FotoPerfil from '@/app/components/Foto/FotoPerfil';
import config from '@/app/config';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Switch, Button, Image, ScrollView, TouchableOpacity, SafeAreaView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';

interface Imagem {
    id: number;
    nome: string;
    dados: string | null;
}

interface Van {
    placa: string;
    renavam: string;
    anoFabricacao: string;
    modelo: string;
    fabricante: string;
    cor: string;
    quantidadeAssentos: string;
    acessibilidade: boolean;
    arCondicionado: boolean;
    cortinas: boolean;
    tvEntretenimento: boolean;
    camerasSeguranca: boolean;
    cintoSeguranca: boolean;
    extintorIncendio: boolean;
    cnh: string;
    antecedentesCriminais: boolean;
    imagem: Imagem;
}


export default function Index() {
    const router = useRouter();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [idMotorista, setIdMotorista] = useState("");

    const [van, setVan] = useState<Van>({
        placa: '',
        renavam: '',
        anoFabricacao: '',
        modelo: '',
        fabricante: '',
        cor: '',
        quantidadeAssentos: '',
        acessibilidade: false,
        arCondicionado: false,
        cortinas: false,
        tvEntretenimento: false,
        camerasSeguranca: false,
        cintoSeguranca: false,
        extintorIncendio: false,
        cnh: '',
        antecedentesCriminais: false,
        imagem: {
            id: 0,
            nome: '',
            dados: null,
        },
    });

    const fetchVan = async () => {
        setLoading(true);
        try {
            const motorista = (await AsyncStorage.getItem('idMotorista')) ?? "";
            setIdMotorista(motorista);

            const resultado = await fetch(`${config.IP_SERVER}/motorista/van/${motorista}`);
            const dados = await resultado.json();
            setVan(dados);
            console.log("IMAGEM VAN INFO: " + dados.imagem)

        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const unsubscribeFocus = navigation.addListener("focus", () => {
            fetchVan();
        });

        return () => {
            unsubscribeFocus();
        };
    }, [navigation]);



    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0d99ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.total}>
            <ScrollView style={styles.scrollView}>
                {/* Identificação do Veículo */}
                <View style={styles.containerInputs}>
                    <View style={styles.titleContainer}>
                        <FontAwesome name="car" size={24} color="#333" style={styles.icon} />
                        <Text style={styles.textTitle}>Identificação do Veículo</Text>
                    </View>
                    <Text style={styles.text}>Fabricante: {van.fabricante}</Text>
                    <Text style={styles.text}>Modelo: {van.modelo}</Text>
                    <Text style={styles.text}>Ano de Fabricação: {van.anoFabricacao}</Text>
                    <Text style={styles.text}>Cor: {van.cor}</Text>
                    <Text style={styles.text}>Placa: {van.placa}</Text>
                    <Text style={styles.text}>Renavam: {van.renavam}</Text>
                </View>

                {/* Capacidade e Conforto */}
                <View style={styles.containerInputs}>
                    <View style={styles.titleContainer}>
                        <FontAwesome name="users" size={24} color="#333" style={styles.icon} />
                        <Text style={styles.textTitle}>Capacidade e Conforto</Text>
                    </View>
                    <Text style={styles.text}>Quantidade de Assentos: {van.quantidadeAssentos}</Text>
                    <Text style={styles.text}>Acessibilidade: {van.acessibilidade ? 'Sim' : 'Não'}</Text>
                    <Text style={styles.text}>Ar Condicionado: {van.arCondicionado ? 'Sim' : 'Não'}</Text>
                    <Text style={styles.text}>Cortinas: {van.cortinas ? 'Sim' : 'Não'}</Text>
                    <Text style={styles.text}>TV Entretenimento: {van.tvEntretenimento ? 'Sim' : 'Não'}</Text>
                </View>

                {/* Segurança */}
                <View style={styles.containerInputs}>
                    <View style={styles.titleContainer}>
                        <FontAwesome name="shield" size={24} color="#333" style={styles.icon} />
                        <Text style={styles.textTitle}>Segurança</Text>
                    </View>
                    <Text style={styles.text}>Câmeras de Segurança: {van.camerasSeguranca ? 'Sim' : 'Não'}</Text>
                    <Text style={styles.text}>Cinto de Segurança: {van.cintoSeguranca ? 'Sim' : 'Não'}</Text>
                    <Text style={styles.text}>Extintor de Incêndio: {van.extintorIncendio ? 'Sim' : 'Não'}</Text>
                </View>

                {/* Documentação do Motorista */}
                <View style={styles.containerInputs}>
                    <View style={styles.titleContainer}>
                        <FontAwesome name="id-card" size={24} color="#333" style={styles.icon} />
                        <Text style={styles.textTitle}>Documentação do Motorista</Text>
                    </View>
                    <Text style={styles.text}>CNH: {van.cnh}</Text>
                    <Text style={styles.text}>Antecedentes Criminais: {van.antecedentesCriminais ? 'Sim' : 'Não'}</Text>
                </View>

                <Image
                    source={van.imagem?.dados ? { uri: `data:image/jpeg;base64,${van.imagem.dados}` } : require('@/app/assets/icons/take-a-picture.png')}
                    style={styles.image}
                />

                {/* Botão para edição */}
                <TouchableOpacity style={styles.buttonSubmit} onPress={() => router.push("/screen/motorista/vanForm")}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    total: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingBottom: 50,
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
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: "#666",
    },
    buttonSubmit: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        backgroundColor: 'white',
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
        marginVertical: 15,
    },
});