import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  pure: false
})
export class SortPipe implements PipeTransform {

  // value = [25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5];
  // if direction is 'asc': value = [-12, -5, -4, 5, 9, 11, 19, 19, 21, 25, 28, 28, 31, 33, 37]
  // if direction is 'desc': value = [37, 33, 31, 28, 28, 25, 21, 19, 19, 11, 9, 5, -4, -5, -12]

  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    const sorted = [...value]; // Javascript Spread Operation, na mundeson copy - paste ne -> sorted
    sorted.sort((a, b) => { 
      if (direction === 'asc') {
        // nga më i vogli te më i madhi
        return a > b ? 1 : -1; // The function returns 1 if a > b and -1 otherwise.
      } else {
        // nga më i madhi te më i vogli
        return a > b ? -1 : 1; // The function returns -1 if a > b and 1
      }
    });
    return sorted;
  }
}
 