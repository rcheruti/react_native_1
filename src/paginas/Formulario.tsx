import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { Paginas, navigate } from '../Util';
import { Video } from 'expo-av';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 40,
    },
    botao: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: '100%' ,
        height: '100%' ,
        position: "absolute",
    },
});

export class Formulario extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Video source={ require('../../assets/Clouds.mp4') } 
                    style={styles.background}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    isMuted
                    />

                <View style={styles.texto}>
                    <Text style={ { fontSize: 24 } }>Formulário</Text>
                </View>
                <View style={styles.botao}>
                    <Button title="Voltar para Home" onPress={ ev => navigate( Paginas.Home.toString() ) } />
                </View>

            </View>
        );
    }
}