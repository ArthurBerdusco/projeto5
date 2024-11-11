import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TextInput, Button, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@/app/config';

// Definindo as interfaces para as ofertas
interface Oferta {
  id: number;
  idCrianca: number;
  nomeCrianca: string;
  nomeEscola: string;
  nomeResponsavel: string;
  endereco: string;
  mensagem: string;
  status: string;
  dataPedido: string;
}

interface MostraOfertasProps {}

const MostraOfertas: React.FC<MostraOfertasProps> = () => {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [valor, setValor] = useState<{ [key: number]: number }>({});

  // Função para buscar as ofertas
  const fetchOfertas = async () => {
    try {
      const idMotorista = await AsyncStorage.getItem('idMotorista');
      if (!idMotorista) {
        throw new Error('ID do motorista não encontrado');
      }

      const response = await fetch(`${config.IP_SERVER}/oferta/motorista/${idMotorista}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setOfertas(data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar ofertas.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Função para responder a oferta
  const responderOferta = async (id: number) => {
    const ofertaValor = valor[id];

    if (typeof ofertaValor !== 'number' || isNaN(ofertaValor)) {
        Alert.alert('Erro', 'Valor inválido.');
        return;
    }

    try {
        const response = await fetch(`${config.IP_SERVER}/oferta/responder/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ofertaValor),
        });

        fetchOfertas();
    } catch (error) {
        Alert.alert('Erro', 'Erro ao responder a oferta.');
        console.log(error);
    }
};


  // Carregar ofertas ao montar o componente
  useEffect(() => {
    fetchOfertas();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ofertas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.offerContainer}>
            <Text style={styles.title}>Data do Pedido</Text>
            <Text style={styles.infoText}>{item.dataPedido}</Text>

            <Text style={styles.title}>Nome da Criança</Text>
            <Text style={styles.infoText}>{item.nomeCrianca}</Text>

            <Text style={styles.title}>Escola</Text>
            <Text style={styles.infoText}>{item.nomeEscola}</Text>

            <Text style={styles.title}>Responsável</Text>
            <Text style={styles.infoText}>{item.nomeResponsavel}</Text>

            <Text style={styles.title}>Endereço</Text>
            <Text style={styles.infoText}>{item.endereco}</Text>

            <Text style={styles.title}>Mensagem</Text>
            <Text style={styles.infoText}>{item.mensagem}</Text>

            <Text style={styles.title}>Status</Text>
            <Text style={styles.infoText}>{item.status}</Text>

            {/* Verificação de status para exibir o campo de valor */}
            {(item.status !== 'Aceita' && item.status !== 'Valor enviado' && item.status !== 'Recusado') && (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite o valor que deseja enviar"
                  keyboardType="numeric"
                  onChangeText={(text) => setValor({ ...valor, [item.id]: parseFloat(text) })}
                />
                <Button
                  title="Responder"
                  onPress={() => responderOferta(item.id)}
                />
              </>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  offerContainer: {
    margin: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default MostraOfertas;
