import React, { useRef } from 'react';
import { StyleSheet, View, Text, Animated, Button, Easing } from 'react-native';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State, TapGestureHandler } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    linha: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    tapMargin: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    tapMarginItem: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%', 
        width:'100%',
    }
});

type MyState = {
    tapColor: Array<number>,
    tapcolors: Array<string>,
    stateTap: string,
};

export class Pan extends React.Component<any, MyState> {
    state = {
        tapColor: [0,1,2],
        tapcolors: ['blue', 'red', 'green'],
        stateTap: ''
    };

    // --------------------------------------------------------
    // Animar para centro de outros elementos

    refViews: Array<View|null> = [null , null];
    refPanView: View|null = null;
    refPan = new Animated.ValueXY( { x: 0 , y: 0 } );
    lastRefPan = { x: 0 , y: 0 };
    refEventPan = Animated.event([{ nativeEvent: { translationX: this.refPan.x, translationY: this.refPan.y } }], { useNativeDriver: true });

    refPanHandler(event: PanGestureHandlerStateChangeEvent) {
        if( event.nativeEvent.oldState === State.ACTIVE ) {
            let xEv = event.nativeEvent.translationX;
            let yEv = event.nativeEvent.translationY;

            this.refViews[0]?.measure( (x, y, w, h, pX, pY) => {
                let p1Centro = {
                    x: pX + (w / 2) ,
                    y: pY + (h / 2) ,
                };

                this.refViews[1]?.measure( (x, y, w, h, pX, pY) => {
                    let p2Centro = {
                        x: pX + (w / 2) ,
                        y: pY + (h / 2) ,
                    };

                    this.refPanView?.measure( (x, y, w, h, pX, pY) => {
                        let pPCentro = {
                            x: pX + (w / 2) ,
                            y: pY + (h / 2) ,
                        };
                        let difP1 = Math.abs( pPCentro.x - p1Centro.x ) ;
                        let difP2 = Math.abs( pPCentro.x - p2Centro.x ) ;
                        let pFinal = null;
                        if( difP1 < difP2 ) pFinal = p1Centro ; // ir para P1
                        else pFinal = p2Centro ; // ir para P2

                        let xF = pFinal.x - pPCentro.x + xEv + this.lastRefPan.x ;
                        let yF = pFinal.y - pPCentro.y + yEv + this.lastRefPan.y ;
                        let nvX = pPCentro.x - pFinal.x  ;
                        let nvY = pPCentro.y - pFinal.y  ;

                        this.lastRefPan = { x: xF , y: yF };
                        this.refPan.setOffset(this.lastRefPan);
                        this.refPan.setValue({ x: nvX , y: nvY });
                        Animated.timing( this.refPan, { toValue: { x: 0 , y: 0 }, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true } ).start();
                    });
                });
            });
        }
    }

    // --------------------------------------------------------
    // Animar para ponto inicial quando o botão for clicado

    xyPan = new Animated.ValueXY( { x: 0 , y: 0 } );
    lastPan = { x: 0 , y: 0 };
    eventPan = Animated.event([{ nativeEvent: { translationX: this.xyPan.x, translationY: this.xyPan.y } }], { useNativeDriver: true });

    panHandler(event: PanGestureHandlerStateChangeEvent) {
        if( event.nativeEvent.oldState === State.ACTIVE ) {
            this.lastPan.x += event.nativeEvent.translationX ;
            this.lastPan.y += event.nativeEvent.translationY ;
            this.xyPan.setOffset({ x: this.lastPan.x , y: this.lastPan.y });
            this.xyPan.setValue({ x: 0 , y: 0 });
        }
    }
    panHandlerRetornar() {
        this.xyPan.setOffset({ x: 0 , y: 0 });
        this.xyPan.setValue({ x: this.lastPan.x , y: this.lastPan.y });
        this.lastPan = { x: 0 , y: 0 };
        Animated.timing( this.xyPan, { toValue: { x: 0 , y: 0 }, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true } ).start();
    }

    // --------------------------------------------------------
    // Trocar cor de elemento quando o elemento for clicado

    tapChangeColor(idx: number, state: State) { 
        if( state != State.ACTIVE ) return;
        let copia = this.state.tapColor.slice();
        let temp = copia[ idx ] + 1;
        if( temp > 2 ) temp = 0;
        copia[ idx ] = temp;
        this.setState({ tapColor: copia });
    }

    // --------------------------------------------------------


    render() {
        return (
            <View style={styles.center}>
                <View style={styles.linha}>
                    <Text style={styles.center}>Tap { this.state.stateTap }</Text>

                    <TapGestureHandler numberOfTaps={ 1 } onHandlerStateChange={ (state) => this.tapChangeColor(0, state.nativeEvent.state) } >
                        <View style={styles.tapMargin}><View style={ Object.assign({ backgroundColor: this.state.tapcolors[ this.state.tapColor[0] ] }, styles.tapMarginItem) }><Text style={{ color: '#fff' }}>1</Text></View></View>
                    </TapGestureHandler>
                    <TapGestureHandler numberOfTaps={ 2 } onHandlerStateChange={ (state) => this.tapChangeColor(1, state.nativeEvent.state) } > 
                        <View style={styles.tapMargin}><View style={ Object.assign({ backgroundColor: this.state.tapcolors[ this.state.tapColor[1] ] }, styles.tapMarginItem) }><Text style={{ color: '#fff' }}>2</Text></View></View>
                    </TapGestureHandler>
                    <TapGestureHandler numberOfTaps={ 3 } onHandlerStateChange={ (state) => this.tapChangeColor(2, state.nativeEvent.state) } >
                        <View style={styles.tapMargin}><View style={ Object.assign({ backgroundColor: this.state.tapcolors[ this.state.tapColor[2] ] }, styles.tapMarginItem) }><Text style={{ color: '#fff' }}>3</Text></View></View>
                    </TapGestureHandler>
                    
                </View>
                

                <View style={styles.linha}>
                    <PanGestureHandler onGestureEvent={this.eventPan} onHandlerStateChange={ (ev) => this.panHandler(ev) }>
                        <Animated.View style={{ backgroundColor: '#CC07', zIndex: 100, alignSelf:'center', transform: [{ translateX: this.xyPan.x }, { translateY: this.xyPan.y }] }}>
                            <Ionicons name={ 'ios-alarm' } size={ 80 } color={ '#990000' } />
                        </Animated.View>
                    </PanGestureHandler>
                    <Button  title="Retornar" onPress={ () => this.panHandlerRetornar() } />
                </View>
                

                <View style={styles.linha} >
                    <View ref={ el => { this.refViews[0] = el; } } style={[ styles.center, { height: 20, width: 20, backgroundColor: '#f00' } ]}></View>
                    
                    <PanGestureHandler onGestureEvent={this.refEventPan} onHandlerStateChange={ (ev) => this.refPanHandler(ev) } >
                        <Animated.View ref={ (el: View) => { this.refPanView = el; } } style={{ backgroundColor: '#CC07', zIndex: 100, alignSelf:'center', transform: [{ translateX: this.refPan.x }, { translateY: this.refPan.y }] }}>
                            <Ionicons name={ 'ios-aperture' } size={ 80 } color={ '#990000' } />
                        </Animated.View>
                    </PanGestureHandler>
                    
                    <View ref={ el => { this.refViews[1] = el; } } style={[ styles.center, { height: 20, width: 20, backgroundColor: '#00f' } ]}></View>
                </View>
                
            </View>
        );
    }
}