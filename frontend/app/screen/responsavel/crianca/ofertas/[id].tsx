import { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import config from '@/app/config';
import { useLocalSearchParams } from 'expo-router';

// Definindo a interface para a oferta
interface Oferta {
    id: number;
    nomeEscola: string;
    nomeMotorista: string;
    valor: number;
    mensagem: string;
    escolaNome: string;
    sobreMimMotorista: string;
    experienciaMotorista: string;
    imagemMotorista: string;
    imagemVan: string;
}

export default function OfertaId() {
    const { id } = useLocalSearchParams();
    const [oferta, setOferta] = useState<Oferta | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Função para buscar a oferta
    const fetchOfertas = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/oferta/${id}`);

            if (response.status === 204) {
                console.warn('Nenhum dado encontrado para esta oferta.');
                return;
            }

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const data: Oferta = await response.json();
            setOferta(data);
        } catch (error) {
            console.error('Erro ao buscar a oferta:', error);
            Alert.alert('Erro', 'Não foi possível carregar a oferta.');
        } finally {
            setLoading(false);
        }
    };

    // Função para aceitar a oferta
    const aceitarOferta = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/oferta/aceitar/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Oferta aceita com sucesso!');
            } else {
                Alert.alert('Erro', 'Erro ao aceitar a oferta.');
            }
        } catch (error) {
            console.error('Erro ao aceitar a oferta:', error);
            Alert.alert('Erro', 'Não foi possível aceitar a oferta.');
        }
    };

    useEffect(() => {
        fetchOfertas();
    }, [id]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {oferta ? (
                <View style={styles.ofertaContainer}>
                    {/* Imagem de Perfil */}
                    <View style={styles.profileContainer}>
                        <Image
                            source={oferta.imagemMotorista ? { uri: `data:image/jpeg;base64,${oferta.imagemMotorista}` } : require('@/app/assets/icons/perfil.png')}
                            style={styles.profileImage}
                        />
                        <View style={styles.profileInfo}>
                            <Text style={styles.motoristaName}>{oferta.nomeMotorista}</Text>
                            <Text style={styles.infoText}>Experiência: {oferta.experienciaMotorista}</Text>
                        </View>
                    </View>

                    {/* Detalhes da Oferta */}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.sectionTitle}>Detalhes da Oferta</Text>

                        <Text style={styles.infoText}>Escola: <Text style={styles.boldText}>{oferta.nomeEscola}</Text></Text>
                        <Text style={styles.infoText}>Valor: <Text style={styles.boldText}>R$ {oferta.valor.toFixed(2)}</Text></Text>
                        <Text style={styles.infoText}>Mensagem: <Text style={styles.boldText}>{oferta.mensagem}</Text></Text>
                    </View>

                    {/* Foto da Van */}
                    <View style={styles.imageContainer}>
                        <Text style={styles.sectionTitle}>Imagem da Van</Text>
                        <Image
                            source={oferta.imagemVan ? { uri: `data:image/jpeg;base64,${oferta.imagemVan}` } : require('@/app/assets/icons/take-a-picture.png')}
                            style={styles.vanImage}
                        />
                    </View>

                    {/* Botão Aceitar Oferta */}
                    <View style={styles.buttonContainer}>
                        <Button title="Aceitar Oferta" onPress={aceitarOferta} color="#28a745" />
                    </View>

                </View>
            ) : (
                <Text style={styles.noDataText}>Nenhuma oferta encontrada.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    ofertaContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        marginBottom: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#ddd',
        marginRight: 15,
    },
    profileInfo: {
        justifyContent: 'center',
        flex: 1,
    },
    motoristaName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    infoText: {
        fontSize: 16,
        color: '#555',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    detailsContainer: {
        marginBottom: 20,
    },
    imageContainer: {
        marginBottom: 20,
    },
    vanImage: {
        backgroundColor: 'white',
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
        marginVertical: 15,
    },
    buttonContainer: {
        marginTop: 20,
    },
    noDataText: {
        fontSize: 18,
        color: '#f00',
        textAlign: 'center',
    },
});