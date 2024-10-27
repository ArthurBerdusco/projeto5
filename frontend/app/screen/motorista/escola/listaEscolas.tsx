import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Alert, TextInput, ImageBackground } from 'react-native';
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@/app/config';

export default function ListaEscolas() {
    const [escolas, setEscolas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchEscolas = async () => {
        try {
            const escolasResponse = await fetch(`${config.IP_SERVER}/api/escolas`);
            const escolasData = await escolasResponse.json();
            setEscolas(escolasData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEscolas();
    }, []);

    const renderItem = ({ item }: any) => {
        // Verifica se os dados da imagem estão disponíveis
        const imagemUrl = item.imagem && item.imagem.dados ? `data:image/jpeg;base64,${item.imagem.dados}` : 'URL_IMAGEM_PADRAO'; // Substitua por uma URL de imagem padrão

        return (
            <ImageBackground 
                source={{ uri: imagemUrl }} // Usar imagem padrão se a imagem não existir
                style={styles.escolaAtendida}
                imageStyle={styles.imageStyle} // Estilo da imagem
            >
                <Link
                    href={{
                        pathname: '/screen/motorista/escola/[id]',
                        params: { id: item.id },
                    }}
                    style={styles.buttonEscola}
                >
                   <View style={styles.textContainer}> {/* View para organizar os textos */}
                    <Text style={styles.textNome}>{item.nome}</Text>
                    <Text style={styles.textRua}>{item.rua}</Text>
                </View>
                </Link>
            </ImageBackground>
        );
    };

    // Filtra escolas com base na consulta de pesquisa
    const filteredEscolas = escolas.filter(escola => {
        const nomeMatch = escola.nome.toLowerCase().includes(searchQuery.toLowerCase());
        const ruaMatch = escola.rua.toLowerCase().includes(searchQuery.toLowerCase());
        return nomeMatch || ruaMatch;
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nome ou endereço"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredEscolas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text>Nenhuma escola encontrada</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    searchInput: {
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
    },
    escolaAtendida: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden', // Garante que a imagem não ultrapasse o limite
        height: 150, // Define uma altura fixa para os itens
        backgroundColor: 'black'
    },
    textContainer: {
        flexDirection: 'column', // Organiza os textos em coluna
    },
    
    imageStyle: {
        borderRadius: 10,
        opacity: 0.5, // Opacidade para melhorar a legibilidade do texto
    },
    buttonEscola: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'transparent', // Fundo transparente para a área do link
    },
    textNome: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#ffffff',
    },
    textRua: {
        fontSize: 14,
        lineHeight: 20,
        color: '#ffffff',
        marginTop: 4,
    },
});