import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import config from '@/app/config';
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
export default function Motorista() {
    const [motorista, setMotorista] = useState(null);
    const [van, setVan] = useState<Van | null>(null); // Inicializa o estado da van

    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState("");
    const { id, escolaId, crianca: criancaString, responsavelId } = useLocalSearchParams();
    const crianca = JSON.parse(criancaString); // Fazendo o parse corretamente
    console.log("Dados da Criança na envia oferta:", JSON.stringify(crianca)); // Log do objeto completo
    console.log("ID da Criança na envia oferta:", crianca?.id); // Acessando o ID diretamente

    console.log("ID do Responsável:", responsavelId); // Agora você pode ver o ID do responsável


    const buscarVan = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/motorista/van/${id}`); // Substitua `id` pelo identificador da van
            const data = await response.json();
            setVan(data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar van:', error);
            setLoading(false);
        }
    };

    // Função para buscar as informações do motorista
    const buscarMotorista = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/motorista/${id}`);
            const data = await response.json();
            setMotorista(data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar motorista:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarMotorista(); // Chama a função para buscar dados do motorista
        buscarVan(); // Chama a função para buscar os dados da van

    }, [id]);

    // Função para enviar a oferta
    const enviarOferta = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/oferta/enviar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    motoristaId: id,
                    escolaId: escolaId,
                    criancaId: crianca?.id, // Adicionando ID da criança no corpo da requisição
                    mensagem,
                    responsavelId: responsavelId

                }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Oferta enviada com sucesso');
            } else {
                Alert.alert('Erro ao enviar a oferta');
                console.log(response);
            }
        } catch (error) {
            console.error('Erro ao enviar a oferta:', error);
            console.log("la")

        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!motorista) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Motorista não encontrado</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'Detalhes do Perueiro',
                    headerStyle: { backgroundColor: '#0d99ff' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />

            <View style={styles.parteSuperiorPerfil}>
                <Image source={require('@/app/screen/assets/icons/motorista.png')} style={{ width: 120, height: 120 }} />
                <View style={styles.containerInformacoes}>
                    <Text style={styles.name}>{motorista.nome}</Text>
                    <Text style={styles.info}>Idade: {motorista.idade} anos</Text>
                    <Text style={styles.info}>Email: {motorista.z}</Text>
                    <Text style={styles.info}>Telefone: {motorista.telefone}</Text>
                    <Text style={styles.info}>Nota:  4.5</Text>
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
                    <Text style={styles.descricao}>Atua em 5 escolas no aplicativo</Text>
                </View>

                <View>
                    <Text style={styles.titulo}>Van Escolar</Text>
                    {/* <Text style={styles.descricao}>- Modelo: {van.modelo}</Text>
                    <Text style={styles.descricao}>- Fabricante: {van.fabricante}</Text>
                    <Text style={styles.descricao}>- Ano de Fabricação: {van.anoFabricacao}</Text> */}


                </View>

                <View>
                    <Text style={styles.titulo}>Sobre mim</Text>
                    <Text style={styles.descricao}>Olá! Sou um motorista de perua apaixonado pelo que faço. Com mais de 5 anos de experiência nas estradas, conheço cada atalho e sempre busco o caminho mais seguro e rápido para levar você ao seu destino.

                        Sou uma pessoa tranquila, que adora ouvir músicas durante o trajeto e criar um ambiente amigável para os passageiros. Minha prioridade é garantir que você chegue bem e feliz! Além disso, sou flexível e estou sempre disposto a ajudar no que for preciso.
                        Vamos juntos nessa viagem! 🚐✨</Text>
                </View>
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={enviarOferta}>
                    <Text style={styles.buttonText}>Fazer orçamento</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
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
    button: {
        marginTop: 30,
        backgroundColor: '#ffbf00',
        padding: 10,
        borderRadius: 55,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
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
        marginTop: 10,
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
        color: "#434343"
    },

    list: {
        marginLeft: 10, // Espaçamento para parecer com lista indentada
    },
    listItem: {
        fontSize: 16,
        marginBottom: 5,
    },



});
