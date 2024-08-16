import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "decimalAmount",
})
export class DecimalAmountPipe implements PipeTransform {
  montoDecimal: any;
  constructor(public decimalPipe: DecimalPipe) {}

  transform(value: number, format: string = '1.2-2'): any {
    if (value === null || value === undefined) {
      return null;
    }
    // Use DecimalPipe to format the number based on the provided format
    return this.decimalPipe.transform(value, format);
  }
}
