import { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import config from '@/app/config';
import { Link, useLocalSearchParams } from 'expo-router';

export default function ListaOfertas() {
    const { id, idCrianca } = useLocalSearchParams(); // Obter o ID da criança
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOfertas = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/oferta/crianca/${idCrianca}`);
            const data = await response.json();
            setOfertas(data);
        } catch (error) {
            console.error('Erro ao buscar a oferta:', error);
            Alert.alert('Erro', 'Não foi possível carregar as ofertas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOfertas(); // Chama a função quando o componente é montado
    }, []);

    const renderItem = ({ item }) => (
        <Link
            href={{
                pathname: '/screen/responsavel/crianca/ofertas/[id]',
                params: { id: item.id },
            }}
            style={styles.offerItem}
        >
            <View style={styles.offerContent}>
                <Text style={styles.offerMotorista}>Motorista: {item.motoristaNome}</Text>
                <Text style={styles.offerValue}>R$ {item.valor.toFixed(2)}</Text>
                <Text style={styles.offerStatus}>Status: {item.status}</Text>
                <Text style={styles.offerMessage}>{item.mensagem || 'Sem mensagem'}</Text>
            </View>
        </Link>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Carregando ofertas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Ofertas</Text>
            <FlatList
                data={ofertas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id} // Supondo que cada oferta tenha um ID único
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    offerItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        elevation: 2, // Sombra
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    offerContent: {
        flexDirection: 'column', // Define que os itens devem ser dispostos em coluna
    },
    offerMotorista: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 3,
    },
    offerValue: {
        fontSize: 16,
        color: '#27ae60',
        marginBottom: 5,
    },
    offerStatus: {
        fontSize: 14,
        color: '#e67e22',
        marginBottom: 3,
    },
    offerMessage: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 5,
    },
});
