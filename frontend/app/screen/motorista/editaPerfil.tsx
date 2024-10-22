import config from "@/app/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import FotoPerfil from "@/app/components/Foto/FotoPerfil";

interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
}

interface Imagem {
    id: number;
    nome: string;
    dados: string | null;
}

interface Motorista {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: Endereco;
    experiencia: string;
    sobreMim: string;
    imagem: Imagem;
}

export default function Perfil() {
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
        },
        experiencia: '',
        sobreMim: '',
        imagem: {
            id: 0,
            nome: '',
            dados: '',
        }
    });

    const [loading, setLoading] = useState(false);
    const [idMotorista, setIdMotorista] = useState('');

    const fetchMotorista = async () => {
        setLoading(true);
        try {
            const motoristaId = (await AsyncStorage.getItem('idMotorista')) ?? "";
            setIdMotorista(motoristaId);

            const resultado = await fetch(`${config.IP_SERVER}/motorista/${motoristaId}`);
            if (!resultado.ok) {
                throw new Error(`Erro ao buscar motorista: ${resultado.statusText}`);
            }

            const dados = await resultado.json();
            setMotorista(dados);

        } catch (err) {
            Alert.alert(`Erro: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMotorista();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0d99ff" />
            </View>
        );
    }

    const handleDadosPessoaisChange = (field: keyof Omit<Motorista, 'endereco' | 'imagem'>, value: string) => {
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
            const idMotorista = await AsyncStorage.getItem('idMotorista');
            const response = await fetch(`${config.IP_SERVER}/motorista/atualizar/${idMotorista}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(motorista),
            });

            if (response.ok) {
                Alert.alert("Success", "Dados salvos com sucesso");
                router.back()
            } else {
                Alert.alert('Erro', 'Erro ao atualizar dados.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados.');
        }
    };

    return (
        <SafeAreaView style={styles.total}>

            <ScrollView contentContainerStyle={styles.scrollView}>
                <FotoPerfil
                    idEntidade={idMotorista}
                    entidade={"Motorista"}
                    initialImage={motorista.imagem?.dados ? `data:image/jpeg;base64,${motorista.imagem.dados}` : null}
                />
                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Dados Pessoais:</Text>
                    <Text style={styles.text}>Nome de preferência</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.nome}
                        onChangeText={(text) => handleDadosPessoaisChange('nome', text)}
                    />
                    <Text style={styles.text}>CPF</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.cpf}
                        onChangeText={(text) => handleDadosPessoaisChange('cpf', text)}
                    />
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.email}
                        onChangeText={(text) => handleDadosPessoaisChange('email', text)}
                        editable={false}
                    />
                    <Text style={styles.text}>Telefone</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.telefone}
                        onChangeText={(text) => handleDadosPessoaisChange('telefone', text)}
                    />
                </View>
                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Endereço:</Text>
                    <Text style={styles.text}>CEP</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.endereco.cep}
                        onChangeText={(text) => handleEnderecoChange('cep', text)}
                    />
                    <Text style={styles.text}>Rua</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.endereco.rua}
                        onChangeText={(text) => handleEnderecoChange('rua', text)}
                    />
                    <Text style={styles.text}>Número</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.endereco.numero}
                        onChangeText={(text) => handleEnderecoChange('numero', text)}
                    />
                    <Text style={styles.text}>Bairro</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.endereco.bairro}
                        onChangeText={(text) => handleEnderecoChange('bairro', text)}
                    />
                    <Text style={styles.text}>Complemento</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.endereco.complemento}
                        onChangeText={(text) => handleEnderecoChange('complemento', text)}
                    />
                </View>
                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Experiência:</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.experiencia}
                        onChangeText={(text) => handleDadosPessoaisChange('experiencia', text)}
                    />
                </View>
                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Sobre Mim:</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={motorista.sobreMim}
                        onChangeText={(text) => handleDadosPessoaisChange('sobreMim', text)}
                    />
                </View>
                <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f5f5f5",
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
    buttonSubmit: {
        backgroundColor: '#0d99ff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
