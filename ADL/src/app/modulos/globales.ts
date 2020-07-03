import { Injectable } from '@angular/core';

@Injectable()
export class Globales {
  banco = 'BANCO_1';
  tipoCuentas = {
    cdt : 'CERTIFIED_DEPOSIT_TERM',
    credito: 'CREDIT',
    cuentaAhorros: 'DEPOSIT_ACCOUNT',
    cuentaCorriente: 'CURRENT_ACCOUNT',
    tc: 'CREDIT_CARD'
  };

}
