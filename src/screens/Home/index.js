import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    TranslateArea,
    Text
} from './styles';
// import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [text, setText] = useState('');
    const [translate, setTranslate] = useState(null);

    async function handleTranslate() {
        try {
            const { status, data } = await api.get(`?text=${inputValue}`);

            if (status != 200 || data.erro) {
                Alert.alert('Traduzir', 'Digite o texto em inglês.');
            } else {
                setTranslate(data);
            }

        } catch (error) {
            Alert.alert('Traduzir', 'Digite o texto em inglês.');
        }
    };

    async function handleLimpar() {
        setTranslate(null);
        setText('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={''} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!translate &&
                    <Input
                        class = 'inputValue'
                        keyboardType="text"
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
                        {translate ? 'Limpar' : 'Translate'}
                    </ButtonText>
                </Button>
            </Animation>

            {translate &&
                <TranslateArea>
                    <Text>TEXT: {text}</Text>
                    <Text>TRADUÇÃO: {translate}</Text>
                </TranslateArea>
            }
        </Container>
    );
}