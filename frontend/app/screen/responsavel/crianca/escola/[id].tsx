import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import config from '@/app/config';

export default function Escola() {
    const [escola, setEscola] = useState(null);
    const [motoristas, setMotoristas] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { id, crianca: criancaString } = useLocalSearchParams();
    const crianca = JSON.parse(criancaString); // Parseando a string para objeto
    console.log("ID da criança na lisa de motorista", crianca?.id); // Usando optional chaining

    const responsavelId = crianca.responsavel.id;
    console.log("ID da criança:", crianca?.id);
    console.log("ID do responsável:", responsavelId); // Exibindo o ID do responsável

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
        <View style={{ padding: 20 }}>
            {escola && (
                <>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{escola.nome}</Text>
                    <Text>{escola.endereco}</Text>
                </>
            )}

            <Text style={{ marginTop: 20, fontSize: 20 }}>Motoristas que atendem esta escola:</Text>

            <FlatList
                data={motoristas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 10 }}>
                        <Text>{item.nome}</Text>
                        <Text>{item.telefone}</Text>

                        <Link
                            href={{
                                pathname: `/screen/responsavel/crianca/escola/motorista/[id]`,
                                params: {
                                    id: item.id,
                                    crianca: JSON.stringify(crianca), // Passando o objeto 'crianca'
                                    escolaId: id, // Passa também o ID da escola
                                    responsavelId: responsavelId,
                                },
                            }}
                        >
                            <Text style={{ color: 'blue', fontSize: 25 }}>{item.nome}</Text>
                        </Link>
                    </View>
                )}
            />
        </View>
    );
}
