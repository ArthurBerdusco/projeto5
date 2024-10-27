import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import config from '@/app/config';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';

export default function CadastroCrianca() {

    const navigation = useNavigation();

    const [ausenciaDetalhes, setAusenciaDetalhes] = useState(null);
    const [crianca, setCrianca] = useState({ id: 0, nome: '', idade: '', periodo: '' });
    const [loading, setLoading] = useState(true);
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDates, setSelectedDates] = useState(new Set());
    const [modalVisible, setModalVisible] = useState(false);
    const [modalExcluirVisible, setModalExcluirVisible] = useState(false);

    const [motivo, setMotivo] = useState('');
    const { id } = useLocalSearchParams();


    const fetchCrianca = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/criancas/${id}`);
            const data = await response.json();
            setCrianca(data);
        } catch (error) {
            console.error('Erro ao buscar os detalhes da criança:', error);
        }
    };

    const fetchOfertas = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/oferta/crianca/${id}`);
        } catch (error) {
            console.error('Erro ao buscar as ofertas:', error);
        }
    };

    const fetchMotorista = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/crianca/${id}/motorista`);
            if (response.ok) {
                const data = await response.json();
                // Processar dados do motorista, se necessário
            } else {
                console.log("Motorista não encontrado");
            }
        } catch (error) {
            console.error('Erro ao buscar motorista:', error);
        }
    };



    const handleDayPress = (day) => {
        const date = day.dateString;
        const ausencia = markedDates[date]; // Verifica se a data possui uma ausência marcada

        if (ausencia && ausencia.marked) {
            // Se já houver ausência, mostra detalhes
            setAusenciaDetalhes(ausencia);

            setModalExcluirVisible(true); // Mostra o modal
        } else {
            setSelectedDates((prev) => {
                const newDates = new Set(prev);
                if (newDates.has(date)) {
                    newDates.delete(date); // Remove a data se já estiver selecionada
                } else {
                    newDates.add(date); // Adiciona a data selecionada
                }
                return newDates;
            });
        }
    };



    const handleAlertPress = () => {
        if (selectedDates.size === 0) {
            Alert.alert("Nenhuma data selecionada", "Por favor, selecione pelo menos uma data.");
            return;
        }
        setModalVisible(true);
    };

    const carregarDados = async () => {
        setLoading(true);
        await Promise.all([fetchCrianca(), fetchOfertas(), fetchMotorista()]);
        setLoading(false);
    };


    useEffect(() => {
        const unsubscribeFocus = navigation.addListener("focus", () => {
            carregarDados();
        });

        return () => {
            unsubscribeFocus();
        };
    }, [navigation]);

    useEffect(() => {
        const fetchAusencias = async () => {
            if (!crianca.id) return; // Previne chamada sem ID

            try {
                const response = await fetch(`${config.IP_SERVER}/ausencias/crianca/${crianca.id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar ausências');
                }
                const ausencias = await response.json();

                const newMarkedDates = {};
                ausencias.forEach((ausencia) => {
                    newMarkedDates[ausencia.data] = { marked: true, dotColor: 'red', motivo: ausencia.motivo, id: ausencia.id, data: ausencia.data };
                });

                setMarkedDates(newMarkedDates);
            } catch (error) {
                console.error('Erro ao buscar ausências:', error);
            }
        };

        fetchAusencias();
    }, [crianca.id]);


    // Função para buscar as ausências
    const fetchAusencias = async () => {
        try {

            const response = await fetch(`${config.IP_SERVER}/ausencias/crianca/${crianca.id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar ausências');
            }
            const ausencias = await response.json();

            // Reinicia o estado de markedDates
            const newMarkedDates = {};

            ausencias.forEach((ausencia) => {
                // Certifique-se de que a data está no formato correto
                newMarkedDates[ausencia.data] = { marked: true, dotColor: 'red', motivo: ausencia.motivo, id: ausencia.id, data: ausencia.data };
            });

            setMarkedDates(newMarkedDates); // Atualiza o estado com as ausências

        } catch (error) {
            console.error('Erro ao buscar ausências:', error);
        }
    };

    const confirmarAusencia = async () => {
        const ausencias = Array.from(selectedDates).map(date => ({
            data: date,
            motivo: motivo,
        }));

        try {
            await fetch(`${config.IP_SERVER}/crianca/${crianca.id}/ausencias`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ausencias),
            });
            Alert.alert("Ausência registrada com sucesso!");
            await fetchAusencias();
            setModalVisible(false);
            setMotivo('');
            setSelectedDates(new Set()); // Limpa as datas selecionadas
        } catch (error) {
            console.error('Erro ao registrar ausência:', error);
        }
    };

    const excluirAusencia = async () => {
        try {
            await fetch(`${config.IP_SERVER}/ausencias/${ausenciaDetalhes.id}`, { // Corrigido para DELETE
                method: 'DELETE',
            });

            Alert.alert("Ausência excluída com sucesso!");
            // Atualiza as ausências novamente após exclusão
            await fetchAusencias();
            setModalExcluirVisible(false); // Fecha o modal
            setAusenciaDetalhes(null); // Limpa detalhes da ausência

        } catch (error) {
            console.error('Erro ao excluir ausência:', error);
            Alert.alert("Erro ao excluir ausência.");
        }
    };


    if (loading) {
        return <ActivityIndicator size="large" color="#0d99ff" />;
    }

    return (
        <SafeAreaView style={styles.total}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Dados Pessoais</Text>
                    <Text style={styles.textLabel}>Nome</Text>
                    <Text style={styles.textValue}>{crianca.nome}</Text>
                    <Text style={styles.textLabel}>Idade</Text>
                    <Text style={styles.textValue}>{crianca.idade}</Text>
                    <Text style={styles.textLabel}>Período</Text>
                    <Text style={styles.textValue}>{crianca.periodo || 'Não definido'}</Text>
                    <Link style={styles.buttonSecondary} href={`/screen/responsavel/crianca/form?id=${crianca.id}`}>
                        <Text style={styles.buttonText}>Editar Informações</Text>
                    </Link>
                </View>

                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Perueiro</Text>
                    <Pressable
                        style={styles.buttonSecondary}
                        onPress={() =>
                            router.push({
                                pathname: `/screen/responsavel/crianca/escola/listaEscolas`,
                                params: { crianca: JSON.stringify(crianca) },
                            })}
                    >
                        <Text style={styles.buttonText}>Procurar perueiro</Text>
                    </Pressable>

                    <Link style={styles.buttonSecondary}
                        href={{
                            pathname: `/screen/responsavel/crianca/ofertas/listaOfertas`,
                            params: { idCrianca: id }, // Passa a ID da oferta, não a ID da criança
                        }}
                    >
                        <Text style={styles.buttonText}>Procurar ofertas</Text>
                    </Link>
                </View>

                <View style={styles.containerCalendar}>
                    <Text style={styles.textTitle}>Ausência</Text>

                    <Calendar
                        onDayPress={handleDayPress}
                        markedDates={{
                            ...markedDates, // Aqui você adiciona as ausências marcadas
                            ...[...selectedDates].reduce((acc, date) => {
                                acc[date] = { selected: true, selectedColor: '#ff4d4d' };
                                return acc;
                            }, {})
                        }}
                        theme={{
                            selectedDayBackgroundColor: '#0d99ff',
                            todayTextColor: '#ffbf00',
                            arrowColor: '#0d99ff',
                        }}
                    />

                    <View style={styles.containerButton}>
                        <Pressable style={styles.buttonAlert} onPress={handleAlertPress}>
                            <Text style={styles.buttonText}>Alertar Ausência</Text>
                        </Pressable>
                    </View>
                </View>



                {/* Modal de confirmação */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Motivo da Ausência</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Insira o motivo..."
                                value={motivo}
                                onChangeText={setMotivo}
                            />
                            <Pressable style={styles.buttonConfirm} onPress={confirmarAusencia}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </Pressable>
                            <Pressable style={styles.buttonCancel} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>


                {/* Modal para excluir ausencia */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalExcluirVisible}
                    onRequestClose={() => setModalExcluirVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Ausência</Text>
                            <Text style={styles.modalText}>Motivo: {ausenciaDetalhes?.motivo || ''}</Text>
                            <Text style={styles.modalText}>Data: {ausenciaDetalhes?.data || ''}</Text>
                            <Pressable style={styles.buttonConfirm} onPress={excluirAusencia}>
                                <Text style={styles.buttonText}>Excluir</Text>
                            </Pressable>
                            <Pressable style={styles.buttonCancel} onPress={() => setModalExcluirVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    total: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    containerInputs: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 5,
    },
    textValue: {
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
    },
    containerCalendar: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    containerButton: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    buttonAlert: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    buttonConfirm: {
        backgroundColor: '#0d99ff',
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonCancel: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#0d99ff',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        textAlign: 'center'
    },
    modalText: {
        fontSize: 16,
        margin: 5
    }
});
