import React, { useState } from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressArea,
    Text
} from './styles';
import logo from '../assets/logo.png';
import api from '../services/api';

export default function Home() {
    const [text, setText] = useState('');
    const [translate, setTranslate] = useState(null);

    async function handleTranslate() {
        try {
            const { status, data } = await api.get(`${text}/json/`);

            if (status != 200 || data.erro) {
                Alert.alert('Traduzir', 'Digite o texto em inglês.');
            } else {
                setAddress(data);
            }

        } catch (error) {
            Alert.alert('Traduzir', 'Digite o texto em inglês.');
        }
    };

    async function handleLimpar() {
        setTranslate(null);
        setCep('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image style={styles.logo} source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!translate &&
                    <Input
                        keyboardType="numeric"
                        maxLength={500}
                        onChangeText={setText}
                        onSubmitEditing={handleTranslate}
                        placeholder="Digite o  texto que deseja traduzir"
                        placeholderTextColor="#2F48D4"
                        value={text}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={translate ? handleLimpar : handleTranslate}>
                    <ButtonText>
                        {translate ? 'Limpar' : 'Traduzir'}
                    </ButtonText>
                </Button>
            </Animation>

            {translate &&
                <AddressArea>
                    <Text>TEXT: {text}</Text>
                    <Text>{translate.text}</Text>
                </AddressArea>
            }
        </Container>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: '40%',
        top: '10px',
    },
});