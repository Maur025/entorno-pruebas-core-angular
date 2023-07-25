import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ConfiguracionesService } from 'src/app/core/services/compras/configuraciones.service';

@Pipe({
  name: 'formatDecimalComas'
})

export class FormatodecimalesComasPipe implements PipeTransform {

  numberFinal:any;
  constructor(
    public decimalPipe: DecimalPipe,
    public configServices: ConfiguracionesService,
  ){}

  transform(value: number): any {
    return this.numberFinal = this.decimalPipe.transform(value, '1.'+this.configServices.decDigitosValue()+'-'+this.configServices.decDigitosValue());
  }
}
