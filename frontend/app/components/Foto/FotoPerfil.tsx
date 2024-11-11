import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import config from '@/app/config';

interface FotoPerfilProps {
  idEntidade: string;
  entidade: 'Motorista' | 'Responsavel' | 'Van'; // Definindo as entidades possíveis
  imagemInicial: string | null; // Nova prop para imagem inicial
}

const FotoPerfil: React.FC<FotoPerfilProps> = ({ idEntidade, entidade, imagemInicial }) => {
  const [imagem, setImagem] = useState<string | null>(imagemInicial); // Usar a prop como valor inicial

  useEffect(() => {
    setImagem(imagemInicial); // Atualizar a imagem se a prop mudar
  }, [imagemInicial]);

  // Função para fazer o upload da imagem
  const fazerUploadImagem = async (uri: string) => {
    if (!idEntidade) {
        Alert.alert("Erro", "ID da entidade não disponível!");
        return;
    }

    try {
        // Converter o URI para Blob
        const respostaImagem = await fetch(uri);
        const imagemBlob = await respostaImagem.blob();

        let formData = new FormData();
        formData.append('file', imagemBlob, `${entidade.toLowerCase()}-${idEntidade}.jpg`); // Passar o Blob e o nome do arquivo

        const resposta = await fetch(`${config.IP_SERVER}/${entidade.toLowerCase()}/${idEntidade}/upload`, {
            method: 'POST',
            body: formData,
            // Não defina manualmente o Content-Type
            headers: {
                // 'Content-Type': 'multipart/form-data', // Remova esta linha
            },
        });

        if (!resposta.ok) {
            const dadosResposta = await resposta.text();
            Alert.alert("Erro", `Falha ao enviar imagem. Código de status: ${resposta.status}. Resposta: ${dadosResposta}`);
        }
    } catch (erro: any) {
        console.error('Erro ao enviar imagem:', erro);
        Alert.alert("Erro", `Ocorreu um erro durante o envio: ${erro.message}`);
    }
};



  // Função para capturar foto com a câmera
  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a câmera é necessária!');
      return;
    }

    let resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!resultado.canceled) {
      let uriImagem = resultado.assets[0].uri;
      if (Platform.OS === 'android') {
        uriImagem = uriImagem.startsWith('file://') ? uriImagem : `file://${uriImagem}`;
      }
      setImagem(uriImagem);
      await fazerUploadImagem(uriImagem);
    }
  };

  // Função para escolher imagem da galeria
  const escolherImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
      await fazerUploadImagem(resultado.assets[0].uri);
    }
  };

  return (
    <View>
      <Button title="Escolher foto da galeria" onPress={escolherImagem} />
      <Button title="Tirar foto" onPress={tirarFoto} />

      {imagem ? (
        <Image source={{ uri: imagem }} style={styles.imagem} />
      ) : (
        <View>
          <Image source={require("@/app/assets/icons/perfil.png")} style={styles.imagem} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imagem: {
    borderRadius: 75,
    borderColor: "#f6f6f6",
    borderWidth: 6,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});

export default FotoPerfil;
