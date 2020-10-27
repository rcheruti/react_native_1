import { NavigationContainerRef } from '@react-navigation/native';
import React, { RefObject } from 'react';

export const navRef: RefObject<NavigationContainerRef> = React.createRef() ;

export function navigate(name: string) {
    navRef.current?.navigate(name);
}

// --------------------------
// Paginas

export enum Paginas {
    Home,
    Formulario,
    Pan,
}
