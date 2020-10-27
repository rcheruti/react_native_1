import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Pressable, ImageBackground } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        resizeMode: "cover",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%' ,
        height: '100%' ,
        tintColor: 'rgba(255,255,255, 0.3)',
    },
});

type State = {
    textoBtn: string ,
    contador: number ,
    lastPress: string ,
};

export class Home extends React.Component {
    state: State;

    constructor(props: any) {
        super(props);
        this.state = {
            textoBtn: 'Click Aqui!',
            contador: 1 ,
            lastPress: ''
        };
    }

    clickBtn(ev: any) {
        this.setState({ 
            textoBtn: 'Contagem: '+ this.state.contador, 
            contador: this.state.contador + 1 ,
            lastPress: ''
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={ require('../../assets/bg.jpg') } style={ styles.background } blurRadius={ 5 }>

                    <View style={styles.container}>
                        <Text>Open up App.tsx to start working on your app!</Text>
                        <Text>Eveto: { this.state.lastPress }</Text>
                    </View>
                    <View style={styles.container}>
                        <Pressable
                            onPressIn={ ev => this.setState({ lastPress: 'onPressIn' }) }
                            onPress={ ev => this.setState({ lastPress: 'onPress' }) }
                            onPressOut={ ev => this.setState({ lastPress: 'onPressOut' }) }
                            onLongPress={ ev => this.setState({ lastPress: 'onLongPress' }) }
                            >
                            <Image source={ require('../../assets/package.jpg') } resizeMode="cover" />
                        </Pressable>
                    </View>
                    <View style={styles.container}>
                        <Button title={ this.state.textoBtn } onPress={ (ev) => this.clickBtn(ev) } />
                    </View>

                </ImageBackground>

                <StatusBar hidden={true} />
            </View>
        );
    }
}