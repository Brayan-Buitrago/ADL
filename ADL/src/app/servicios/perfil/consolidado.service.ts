import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsolidadoService {

  private contentEmitter = new ReplaySubject<any>();
  private bancos = new BehaviorSubject<boolean>(false);
  private detalle = new BehaviorSubject<any>({});

  constructor() { }

  cargarContenido(json: any){
    this.contentEmitter.next(json);
  }

  obtenerJson()  {
    return this.contentEmitter.asObservable();
  }

  activarBancos(activar: boolean) {
    this.bancos.next(activar);
  }

  obtenerBancos() {
    return this.bancos.asObservable();
  }
}
