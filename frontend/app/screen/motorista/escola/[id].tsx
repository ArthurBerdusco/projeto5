import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Escola() {
    const [escola, setEscola] = useState(null);
    const [loading, setLoading] = useState(true);
    const [atende, setAtende] = useState(false);
    const router = useRouter();
    const { id } = useLocalSearchParams();



    // Função para buscar os dados da escola pelo ID
    const fetchEscola = async () => {
        try {
            const response = await fetch(`http://192.168.15.161:8080/api/escolas/${id}`);
            const data = await response.json();
            setEscola(data);
            setAtende(data.atendido); // Ajusta o status inicial
        } catch (error) {
            console.error('Erro ao buscar os detalhes da escola:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEscola();
    }, []);

    const confirmarAtendimento = async () => {
        try {
            const idUsuario = await AsyncStorage.getItem('idUsuario');
            const idEscola = id;
    
            Alert.alert(`Dados enviados: { ${idUsuario}, ${idEscola} }`);
    
            const response = await fetch(`http://192.168.15.161:8080/api/escolas/motorista`, {
                method: atende ? 'DELETE' : 'POST', // POST para atender, DELETE para parar de atender
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUsuario: idUsuario,
                    idEscola: idEscola,
                }),
            });
    
            const result = await response.text(); // Captura a resposta como texto
    
            if (response.ok) {
                setAtende(!atende); // Inverte o status de atendimento
                Alert.alert('Sucesso', atende ? 'Você não atende mais essa escola.' : 'Você agora atende essa escola.');
            } else {
                Alert.alert('Erro', result); // Exibe a mensagem de erro do backend
            }
        } catch (error) {
            console.error('Erro ao atualizar o status:', error);
            Alert.alert('Erro de conexão.');
        }
    };
    
    

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ padding: 20 }}>
            {escola ? (
                <>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{escola.nome}</Text>
                    <Text>Endereço: {escola.rua}</Text>

                    <Button
                        title={atende ? "Parar de atender" : "Atender esta escola"}
                        onPress={confirmarAtendimento}
                        color={atende ? "red" : "green"}
                    />
                </>
            ) : (
                <Text>Escola não encontrada</Text>
            )}
        </View>
    );
}
