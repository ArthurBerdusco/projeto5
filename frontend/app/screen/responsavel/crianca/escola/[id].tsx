import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams, Link, Stack } from "expo-router";
import config from '@/app/config';

export default function Escola() {
    const [escola, setEscola] = useState(null);
    const [motoristas, setMotoristas] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { id, crianca: criancaString } = useLocalSearchParams();
    const crianca = JSON.parse(criancaString); // Parseando a string para objeto
    // console.log("ID da criança na lisa de motorista", crianca?.id); // Usando optional chaining

    const responsavelId = crianca.responsavel.id;
    // console.log("ID da criança:", crianca?.id);
    // console.log("ID do responsável:", responsavelId); // Exibindo o ID do responsável

    const fetchEscola = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/api/escolas/${id}`);
            const data = await response.json();
            setEscola(data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as informações da escola.');
        }
    };

    // Função para buscar os motoristas que atendem a escola
    const fetchMotoristas = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/api/motoristas/escola/${id}`);
            const data = await response.json();
            setMotoristas(data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os motoristas.');
        }
    };

    // Carregar as informações da escola e os motoristas ao montar o componente
    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchEscola();
            await fetchMotoristas();
            setLoading(false);
        })();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerTitle: 'Encontrar Perueiros',
                    headerStyle: { backgroundColor: '#0d99ff' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />


            <View style={{ padding: 20 }}>

                {escola && (
                    <>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', color: "#FEA407" }}>{escola.nome}</Text>
                        <Text>{escola.endereco}</Text>
                    </>
                )}

                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Perueiros nesta escola:</Text>

                <FlatList
                    data={motoristas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginVertical: 10 }}>


                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: `/screen/responsavel/crianca/escola/motorista/${item.id}`,
                                        params: {
                                            crianca: JSON.stringify(crianca),
                                            escolaId: id,
                                            responsavelId: responsavelId,
                                        }
                                    })
                                }
                                style={styles.buttonMotorista}
                            >
                                <Text style={styles.textNome}>{item.nome}</Text>
                                <Text>{item.telefone}</Text>
                            </Pressable>

                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    buttonMotorista: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 15,
        elevation: 3,
        backgroundColor: '#ffbf00',
        height: 80,
        flexDirection: 'column'

    },
    textNome: {
        fontWeight: '900',
        fontSize: 20
    }
})