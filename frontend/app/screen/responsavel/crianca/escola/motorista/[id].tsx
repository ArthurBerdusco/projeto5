import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import config from '@/app/config';

export default function Motorista() {
    const [motorista, setMotorista] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState("");
    const { id, escolaId, crianca: criancaString, responsavelId } = useLocalSearchParams();
    const crianca = JSON.parse(criancaString); // Fazendo o parse corretamente
    console.log("Dados da Criança na envia oferta:", JSON.stringify(crianca)); // Log do objeto completo
    console.log("ID da Criança na envia oferta:", crianca?.id); // Acessando o ID diretamente


    console.log("ID do Responsável:", responsavelId); // Agora você pode ver o ID do responsável


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
            {/* Informações do motorista */}
            <Text style={styles.name}>{motorista.nome}</Text>
            <Text style={styles.info}>Idade: {motorista.idade} anos</Text>
            <Text style={styles.info}>Email: {motorista.email}</Text>
            <Text style={styles.info}>CPF: {motorista.cpf}</Text>
            <Text style={styles.info}>Telefone: {motorista.telefone}</Text>
            <Text style={styles.status}>Status: {motorista.status}</Text>

            {/* Campo para a mensagem */}
            <TextInput
                style={styles.input}
                placeholder="Digite sua mensagem..."
                value={mensagem}
                onChangeText={setMensagem}
            />

            {/* Botão para solicitar valor */}
            <TouchableOpacity style={styles.button} onPress={enviarOferta}>
                <Text style={styles.buttonText}>Enviar Oferta</Text>
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
        color: 'green',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#ffbf00',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
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
});
