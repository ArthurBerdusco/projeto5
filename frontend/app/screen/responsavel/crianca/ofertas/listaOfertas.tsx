import { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import config from '@/app/config';

// Definindo o tipo da oferta
interface Oferta {
    id: number;
    nomeMotorista: string;
    nomeEscola: string;
    valor: number;
    mensagem: string;
    imagemMotorista: string;
}

export default function ListaOfertas() {
    const { id, idCrianca } = useLocalSearchParams();
    const [ofertas, setOfertas] = useState<Oferta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Função para buscar ofertas
    const fetchOfertas = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/oferta/crianca/${idCrianca}`);
            const data: Oferta[] = await response.json();
            setOfertas(data);
        } catch (error) {
            console.error('Erro ao buscar ofertas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as ofertas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOfertas();
    }, [idCrianca]);

    // Função para renderizar cada item
    const renderItem = ({ item }: { item: Oferta }) => (
        <Link
            href={{
                pathname: '/screen/responsavel/crianca/ofertas/[id]',
                params: { id: item.id },
            }}
            style={styles.link} asChild
        >
            <View style={styles.row}>

                {item.imagemMotorista ? (
                    <Image source={{ uri: `data:image/jpeg;base64,${item.imagemMotorista}` }} style={styles.pic} />
                ) : (
                    <View>
                        <Image source={require("@/app/assets/icons/perfil.png")} style={styles.pic} />
                    </View>
                )}

                <View >
                    <Text style={styles.cardTitle}>{item.nomeMotorista}</Text>
                    <Text style={styles.cardText}>{item.nomeEscola}</Text>
                </View>


                <View style={styles.cardValue}>
                    <Text style={styles.cardTitle}>R$ {item.valor.toFixed(2)}</Text>
                </View>


            </View>
        </Link>
    );

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={ofertas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    link: {
        margin: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#bcbcbc',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    cardCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pic: {
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardValue: {
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5,
        borderColor: '#a5a5a5',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    cardText: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },

});
