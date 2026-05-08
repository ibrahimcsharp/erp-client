import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
  transform(items: any[], column: string): number {
    if (!items || !column) {
      return 0;
    }
    return items
      .map(item => item[column] || 0) // Get column values, default to 0 if missing
      .reduce((acc, value) => acc + Number(value), 0); // Sum all values
  }
}