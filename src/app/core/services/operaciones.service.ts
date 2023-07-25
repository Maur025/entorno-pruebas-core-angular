import { Injectable } from '@angular/core';
import { DEDUCCIONES_CF,DESCUENTOS_CF } from 'src/app/core/datos/general';
import { FormatodecimalesPipe } from 'src/app/core/pipes/formatodecimales.pipe';

@Injectable({ providedIn: 'root' })
export class OperacionesService {

  deducciones = DEDUCCIONES_CF;
  descuentos = DESCUENTOS_CF;

  constructor(
    private formatodecimales: FormatodecimalesPipe,
  ){}

  importeTotalCompra(cantidad,precioUnitario, functionCallback): void {
    functionCallback(this.formatodecimales.transform(cantidad*precioUnitario));
  }

  importeSubTotal(total,deducciones, functionCallback): void {
    let subtotal = total;
    deducciones.forEach(deduccion => {
      subtotal = subtotal - deduccion;
    });
    functionCallback(subtotal);
  }

  importeBaseCf(total,descuentos, functionCallback): void {
    let subtotal = total;
    descuentos.forEach(descuento => {
      subtotal = subtotal - descuento;
    });
    functionCallback(subtotal);
  }

  importeCreditoFiscal(total, functionCallback): void {
    //aqui poner el porcentaje 13% datos desde variables de configuración
    functionCallback(total*0.13);
  }

  calcularTotales(items, functionCallback): void {
    //sumatoria datos items
    let response = {};
    response['precioTotal'] = 0;
    response['subtotal'] = 0;
    response['baseCf'] = 0;
    response['creditoFiscal'] = 0;
    items.forEach(element => {
      response['precioTotal'] += parseFloat(element['precioTotal']);
      this.deducciones.forEach(deduccion => {
        if(!response[deduccion['label']]){
          response[deduccion['label']] = 0;
        }
        response[deduccion['label']] += parseFloat(element[deduccion['label']]?element[deduccion['label']]:0);
      });
      response['subtotal'] += parseFloat(element['subtotal']);
      this.descuentos.forEach(descuento => {
        if(!response[descuento['label']]){
          response[descuento['label']] = 0;
        }
        response[descuento['label']] += parseFloat(element[descuento['label']]?element[descuento['label']]:0);
      });
      response['baseCf'] += parseFloat(element['baseCf']);
      response['creditoFiscal'] += parseFloat(element['creditoFiscal']);
    });
    functionCallback(response);
  }
}
