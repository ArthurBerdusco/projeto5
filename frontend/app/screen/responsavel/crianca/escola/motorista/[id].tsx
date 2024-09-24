import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import config from '@/app/config';

export default function Motorista() {
    const [motorista, setMotorista] = useState(null); // Iniciar com 'null'
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { id } = useLocalSearchParams();

    // Função para buscar as informações do motorista
    const fetchMotorista = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/motorista/${id}`);
            const data = await response.json();
            setMotorista(data); // Armazenar os dados corretamente
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as informações do motorista.');
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchMotorista();
            setLoading(false);
        })();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    // Verificar se o motorista foi carregado antes de renderizar as informações
    if (!motorista) {
        return <Text>Motorista não encontrado.</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Informações do motorista */}
            <Text style={styles.name}>{motorista.nome}</Text>
            <Text style={styles.info}>Idade: {motorista.idade} anos</Text>
            <Text style={styles.info}>Email: {motorista.email}</Text>
            <Text style={styles.info}>CPF: {motorista.cpf}</Text>
            <Text style={styles.info}>Telefone: {motorista.telefone}</Text>
            <Text style={styles.status}>Status: {motorista.status}</Text>

            {/* Botão para solicitar valor */}
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Solicitação enviada!', 'Você solicitou o valor que o motorista cobrará.')}>
                <Text style={styles.buttonText}>Solicitar valor</Text>
            </TouchableOpacity>
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f2f2f2',
        flex: 1,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    info: {
        fontSize: 18,
        marginVertical: 5,
        color: '#555',
    },
    status: {
        fontSize: 18,
        marginVertical: 5,
        color: 'green', // Exibir o status corretamente
    },
    button: {
        marginTop: 30,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
