import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaSimple'
})
export class FechasimplePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    return value.substring(8,10)+'-'+value.substring(5,7)+'-'+value.substring(0,4);
  }

}
