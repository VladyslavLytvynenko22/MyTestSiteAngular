import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: unknown): unknown {
    const result: string = value as string;
    if (result){
      return result.split('').reverse().join('');
    }

    return value;
  }

}
