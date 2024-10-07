import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
}

interface Motorista {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: Endereco;
}

export default function Perfil() {

    const [loading, setLoading] = useState(false);

    const [motorista, setMotorista] = useState<Motorista>({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        endereco: {
            cep: '',
            rua: '',
            numero: '',
            bairro: '',
            complemento: ''
        }
    });


    const fetchmotorista = async () => {
        setLoading(true);
        try {
            const motorista = await AsyncStorage.getItem('idMotorista')

            const resultado = await fetch(`${config.IP_SERVER}/motorista/${motorista}`);
            const dados = await resultado.json();
            setMotorista(dados);

        } catch (err) {
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchmotorista();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0d99ff" />
            </View>
        );
    }

    const handleDadosPessoaisChange = (field: keyof Omit<Motorista, 'endereco'>, value: string) => {
        setMotorista(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleEnderecoChange = (field: keyof Endereco, value: string) => {
        setMotorista(prevState => ({
            ...prevState,
            endereco: {
                ...prevState.endereco,
                [field]: value
            }
        }));
    };

    const handleSubmit = async () => {
        try {
            const idMotorista = await AsyncStorage.getItem('idMotorista')
            const response = await fetch(`${config.IP_SERVER}/motorista/atualizar/${idMotorista}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(motorista),
            });

            if (response.ok) {
                alert('Dados alterados com sucesso!');
            } else {
                alert('Erro ao atualizar dados.');
            }
        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao enviar os dados.');
        }
    };




    return (
        <SafeAreaView style={styles.total}>
            <Stack.Screen
                options={{
                    headerTitle: 'Perfil',
                    headerStyle: { backgroundColor: '#ffbf00' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Dados Pessoais: </Text>
                    <View>
                        <Text style={styles.text}>Nome de preferência</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={motorista.nome}
                            onChangeText={(text) => handleDadosPessoaisChange('nome', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>CPF</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={motorista.cpf}
                            onChangeText={(text) => handleDadosPessoaisChange('cpf', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={motorista.email}
                            onChangeText={(text) => handleDadosPessoaisChange('email', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Telefone</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={motorista.telefone}
                            onChangeText={(text) => handleDadosPessoaisChange('telefone', text)}
                        />
                    </View>
                </View>
                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Endereço: </Text>
                    <View>
                        <Text style={styles.text}>CEP</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={motorista.endereco.cep}
                            onChangeText={(text) => handleEnderecoChange('cep', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Rua</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={motorista.endereco.rua}
                            onChangeText={(text) => handleEnderecoChange('rua', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Número</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={motorista.endereco.numero}
                            onChangeText={(text) => handleEnderecoChange('numero', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Bairro</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={motorista.endereco.bairro}
                            onChangeText={(text) => handleEnderecoChange('bairro', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Complemento</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={motorista.endereco.complemento}
                            onChangeText={(text) => handleEnderecoChange('complemento', text)}
                        />
                    </View>
                </View>
                <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </Pressable>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    total: {
        marginTop: 10,
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    containerInputs: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    textInputs: {
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
    },
    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: "#666",
    },
    containerButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    buttonSubmit: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})