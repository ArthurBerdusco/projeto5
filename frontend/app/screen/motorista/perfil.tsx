import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.janela}>
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
                <View style={styles.janela}>
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
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.textButton}>Salvar</Text>
                </Pressable>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
    },
    janela: {
        flex: 0.3,
        backgroundColor: 'beige',
        borderWidth: 5,
        padding: 10
    },
    textTitle: {
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginTop: 10,
        marginBottom: 5,
    },
    textInputs: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft: 10
    },
    text: {
        marginTop: 10,
        marginBottom: 5,
    },
    button: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'black',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }, loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
})