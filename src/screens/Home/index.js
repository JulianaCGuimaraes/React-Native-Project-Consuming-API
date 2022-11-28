import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    Text,
    ProductArea
} from './styles';
// import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [id, setId] = useState('');
    const [product, setProduct] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`/${id}`);

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um id válido.');
            } else {
                setProduct(data);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um id válido.');
        }
    };

    async function handleLimpar() {
        setProduct(null);
        setText('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Text style={styles.topoTitulo}>Platzi Fake Store API</Text>
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!product &&
                    <Input
                        keyboardType="numeric"
                        maxLength={300}
                        onChangeText={setId}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o  texto que deseja traduzir"
                        placeholderTextColor="#2F48D4"
                        value={id}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={product ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {product ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {product &&
                <ProductArea>
                    <Text>ID: {id}</Text>
                    <Text>TITLE: {product.title}</Text>
                    <Text>PRICE: {product.price}</Text>
                    <Text>DESCRIPTION: {product.description}</Text>
                </ProductArea>
            }
        </Container>
    );
}

const styles = StyleSheet.create({
    topoTitulo: { 
        marginTop: 300,
        fontSize: 20, 
        fontWeight: "bold",
        marginBottom: 10, 
        color: '#fff', 
        textAlign: 'center'}
});