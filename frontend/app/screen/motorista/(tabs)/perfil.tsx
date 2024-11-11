import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
}

interface Motorista {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: Endereco;
    experiencia: string;
    sobreMim: string;
    imagem: string;
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
    fotosVeiculo: string[]; // Array para armazenar URLs ou paths das fotos do veículo
}


export default function Perfil() {

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const [motorista, setMotorista] = useState<Motorista>({
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
        experiencia: '',
        sobreMim: '',
        imagem: ''
    });

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
        fotosVeiculo: []
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const idMotorista = await AsyncStorage.getItem('idMotorista');

            const [motoristaResponse, vanResponse] = await Promise.all([
                fetch(`${config.IP_SERVER}/motorista/${idMotorista}`),
                fetch(`${config.IP_SERVER}/motorista/van/${idMotorista}`)
            ]);

            const motoristaDados = await motoristaResponse.json();
            const vanDados = await vanResponse.json();

            setMotorista(motoristaDados);
            setVan(vanDados);

        } catch (err) {
            alert("Erro ao carregar dados: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener("focus", () => {
            fetchData();
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

                <View style={styles.parteSuperiorPerfil}>
                    {motorista.imagem && motorista.imagem ? (
                        <Image
                            source={{
                                uri: motorista.imagem.startsWith('data:image/')
                                    ? motorista.imagem
                                    : `data:image/jpeg;base64,${motorista.imagem}`
                            }}
                            style={{ width: 120, height: 120, borderRadius: 60 }} // Estilize a imagem conforme necessário
                        />
                    ) : (
                        <Image source={require('@/app/assets/icons/perfil.png')} style={{ width: 120, height: 120 }} />
                    )}
                    <View style={styles.containerInformacoes}>
                        <Text style={styles.name}>{motorista.nome}</Text>
                        <Text style={styles.info}>Idade: {motorista.idade} anos</Text>
                        <Text style={styles.info}>Email: {motorista.email}</Text>
                        <Text style={styles.info}>Telefone: {motorista.telefone}</Text>
                    </View>
                </View>
                <View style={styles.barraSeletor}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={styles.seletorTexto}>Perfil</Text>
                        <Text style={styles.seletorTexto}>Avaliações</Text>
                        <Text style={styles.seletorTexto}>Fotos</Text>
                    </View>
                    <View style={styles.linha} />
                </View>

                <View style={styles.informacoes}>
                    <View>
                        <Text style={styles.titulo}>Experiência</Text>
                        {motorista.experiencia ? (
                            <Text style={styles.descricao}>{motorista.experiencia}</Text>
                        ) : (
                            <Text style={styles.aviso}>Informação não preenchida.</Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.titulo}>Van Escolar</Text>
                        <Text style={styles.descricao}>- Acentos: {van.quantidadeAssentos}</Text>
                        <Text style={styles.descricao}>- Modelo: {van.modelo}</Text>
                        <Text style={styles.descricao}>- Fabricante: {van.fabricante}</Text>
                        <Text style={styles.descricao}>- Ano de Fabricação: {van.anoFabricacao}</Text>
                    </View>

                    <View>
                        <Text style={styles.titulo}>Sobre mim</Text>
                        {motorista.sobreMim ? (
                            <Text style={styles.descricao}>{motorista.sobreMim}</Text>
                        ) : (
                            <Text style={styles.aviso}>Informação não preenchida.</Text>
                        )}
                    </View>
                </View>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={() => router.navigate("/screen/motorista/editaPerfil")}>
                        <Text style={styles.buttonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.vanButton} onPress={() => router.navigate("/screen/motorista/veiculo")}>
                        <Text style={styles.buttonText}>Minha Van</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => router.navigate("/screen/auth/loginScreen")}>
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    total: {
        marginTop: 10,
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
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
    textInputs: {
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
    },
    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: "#666",
    },
    
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center', // Centraliza os botões
    },
    editButton: {
        backgroundColor: '#4CAF50', // Cor verde para ação primária
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 10, // Espaçamento vertical entre os botões
        width: '80%', // Largura para que o botão não fique muito largo
    },
    vanButton: {
        backgroundColor: '#2196F3', // Cor azul para ação secundária
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
    },
    logoutButton: {
        backgroundColor: '#f44336', // Cor vermelha para sair
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center', // Centraliza o texto dentro do botão
    },

    container: {
        padding: 20,
        backgroundColor: '#f2f2f2',
        flex: 1,
        justifyContent: 'space-around'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',

    },
    info: {
        fontSize: 15,
        marginVertical: 5,
        color: '#555',
    },
    status: {
        fontSize: 18,
        marginVertical: 5,
        color: 'green',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    parteSuperiorPerfil: {
        // backgroundColor: "#a3a3a3",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10

    },
    containerInformacoes: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    barraSeletor: {
        marginTop: 20,
        marginBottom: 10
    },
    seletorTexto: {
        fontWeight: 'bold',
        color: "black",
        fontSize: 17
    },
    linha: {
        width: '100%',
        height: 4,
        backgroundColor: '#0d99ff',
        marginVertical: 5,

    },
    informacoes: {
        justifyContent: 'space-evenly',
        flex: 1,
        gap: 20

    },
    titulo: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    descricao: {
        fontWeight: '500',
        color: "#5a5a5a"
    },

    list: {
        marginLeft: 10, // Espaçamento para parecer com lista indentada
    },
    listItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    aviso: {
        color: '#c50000',
        fontStyle: 'italic',
    }


})