import { Injectable } from '@angular/core';

@Injectable()

export class Enmascara {

  constructor() { }

  public ofuscarTC(tc: string){
    const ofuscado = '**** **** **** ';
    let ultimosDigitos: string;
    let tarjetaOfuscada: string;
    ultimosDigitos = tc.substring(tc.length - 4 );
    tarjetaOfuscada = ofuscado + ultimosDigitos;
    return tarjetaOfuscada;
  }
}
