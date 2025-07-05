import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform( // marim tre vlera 
    value: string | number | null, 
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ) {
    if (!value) { // nese vlerat eshte null, return, sepse e kemi shtur null brenda vleres: value: string | number | null
      return value;
    }

    let val: number;

    if (typeof value === 'string') { // kontrollojme nese vlera eshte string.
      // convert a string or other value into a floating-point number
      val = parseFloat(value); // parseFloat("123.45"); // returns 123.45
    } else { // nese vlera eshte number val = value
      val = value;
    }

    let outputTemp: number;

    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = val * (9 / 5) + 32; // convert celsius to fahrenheit
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = (val - 32) * (5 / 9); // convert fahrenheit to celsius 
    } else {
      outputTemp = val;
    } 

    let symbol: '°C' | '°F';

    if (!outputType) { // duke ke qen se inputType eshte gjithmon dhe outputType jo, bejme kushtet e symbol
      symbol = inputType === 'cel' ? '°C' : '°F'; // if inputType === 'cel -> °C else -> °F
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }

    // outputTemp == 1.777777777777
    // outputTemp.toFixed(2) = 1.77
    return `${outputTemp.toFixed(2)} ${symbol}`; 
  }
}
