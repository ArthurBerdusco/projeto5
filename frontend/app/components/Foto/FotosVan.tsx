import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import config from '@/app/config';

interface FotoVanProps {
    idMotorista: string;
    initialImage: string | null; // Nova prop para imagem inicial
}

const FotoVan: React.FC<FotoVanProps> = ({ idMotorista, initialImage }) => {
    const [image, setImage] = useState<string | null>(initialImage); // Usar a prop como valor inicial

    useEffect(() => {
        setImage(initialImage); // Atualizar a imagem se a prop mudar
    }, [initialImage]);

    const handleImageUpload = async (uri: string) => {
        if (!idMotorista) {
            Alert.alert("Erro", "ID do motorista não disponível!");
            return;
        }

        let formData = new FormData();
        formData.append('file', {
            uri: uri,
            name: `van-${idMotorista}.jpg`, // Ajuste o nome conforme necessário
            type: 'image/jpeg', // Tipo de arquivo
        });

        try {
            const response = await fetch(`${config.IP_SERVER}/van/motorista/${idMotorista}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.ok) {
                const responseData = await response.text();
                Alert.alert("Erro", `Falha ao enviar imagem. Código de status: ${response.status}. Resposta: ${responseData}`);
            }
        } catch (error) {
            console.error('Erro ao enviar imagem:', error);
            Alert.alert("Erro", `Ocorreu um erro durante o envio: ${error.message}`);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão para acessar a câmera é necessária!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            let imageUri = result.assets[0].uri;
            if (Platform.OS === 'android') {
                imageUri = imageUri.startsWith('file://') ? imageUri : `file://${imageUri}`;
            }
            setImage(imageUri);
            await handleImageUpload(imageUri);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await handleImageUpload(result.assets[0].uri);
        }
    };

    return (
        <View>
            <Button title="Foto da galeria" onPress={pickImage} />
            <Button title="Tirar foto" onPress={takePhoto} />

            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <View>
                    <Image source={require("../../screen/assets/icons/perfil.png")}
                        style={styles.image} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        borderColor: "#f6f6f6",
        borderWidth: 6,
        width: 'auto',
        height: 'auto',
        alignSelf: 'center'
    },
})

export default FotoVan;
