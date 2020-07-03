import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsolidadoService } from '../../../servicios/perfil/consolidado.service';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Globales } from '../../globales';


@Component({
  selector: 'app-cdt',
  templateUrl: './cdt.component.html',
  styleUrls: ['./cdt.component.css'],
})
export class CdtComponent implements OnInit {
  @ViewChild('modalDetalle') modal: ElementRef;
  productos: any;
  cdts = [];
  activarCdt = false;
  activarBancos = false;
  modaResulDetalle: any;
  detalleCdtModal: any;
  globales: any;

  constructor(
    private consolidadoService: ConsolidadoService,
    public translate: TranslateService,
    private modalService: NgbModal,
    global: Globales
  ) {
    translate.setDefaultLang('en');
    this.globales = global;
    this.cargarJson();
  }

  ngOnInit() {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck() {
    this.consolidadoService.obtenerBancos().subscribe((data) => {
      this.activarBancos = data;
      this.cargarProductos(this.activarBancos);
    });
  }

  cargarJson = () => {
    this.consolidadoService.obtenerBancos().subscribe((data) => {
      this.cargarProductos(data);
    });

    this.consolidadoService.obtenerJson().subscribe((data) => {
      this.productos = data.product;
    });
  }

  cargarProductos = (activarBancos) => {
    const cdts = [];
    let activarCdt = false;
    const banco = this.globales.banco;
    const productoCDT = this.globales.tipoCuentas.cdt;
    if (this.productos) {
      this.productos.map( (obj: any) => {
        if (obj.accountInformation.bank ===  banco && !activarBancos) {
          if (obj.typeAccount === productoCDT) {
            activarCdt = true;
            cdts.push(obj);
          }
        } else {
          if (obj.typeAccount === productoCDT && activarBancos) {
            activarCdt = true;
            cdts.push(obj);
          }
        }
      });
    }
    this.activarCdt = activarCdt;
    this.cdts = cdts;
  }

  verDetalle = (cdt) => {
    this.detalleCdtModal = cdt;
    this.modaResulDetalle = this.modalService.open(this.modal);
    this.modaResulDetalle.result.then(
      (result) => {
        if (result === 'Cerrar') {
          this.modaResulDetalle.close();
        }
      },
      (reason) => {
        this.modaResulDetalle.close();
      }
    );
  }
}
