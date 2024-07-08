import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'justText'
})
export class JustTextPipe implements PipeTransform {

  transform(value: string): string {
    const newStr: string = value.toString()
      // Eliminar los numeros
      .replace(/\d/g, '').toString().trim();
    return newStr;
  }

}
