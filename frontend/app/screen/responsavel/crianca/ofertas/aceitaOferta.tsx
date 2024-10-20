import { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import config from '@/app/config';
import { useLocalSearchParams } from 'expo-router';

export default function AceitarOferta() {
    const { ofertaId } = useLocalSearchParams(); // Obter o ID da oferta corretamente
    const [oferta, setOferta] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOfertas = async () => {
        try {
            alert("ID CRIANÇA: " + ofertaId)
            const response = await fetch(`${config.IP_SERVER}/oferta/${ofertaId}`);

            if (response.status === 204) {
                console.warn('Nenhum dado encontrado para esta oferta.');
                return; // Retorna se a resposta for vazia
            }

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const data = await response.json();
            setOferta(data);
        } catch (error) {
            console.error('Erro ao buscar a oferta:', error);
            console.log('ofertaId:', ofertaId); // Log do ofertaId

        } finally {
            setLoading(false);
        }
    };


    const aceitarOferta = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/oferta/aceitar/${ofertaId}`, {
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
        }
    };

    useEffect(() => {
        fetchOfertas();
    }, []);

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes da Oferta</Text>
            {oferta && (
                <>
                    <Text>Motorista: {oferta.motoristaNome}</Text>
                    <Text>Valor: R$ {oferta.valor}</Text>
                    <Text>Mensagem: {oferta.mensagem}</Text>
                    <Text>Escola: {oferta.escolaNome}</Text>

                    <Button title="Aceitar Oferta" onPress={aceitarOferta} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
