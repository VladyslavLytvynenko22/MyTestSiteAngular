import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: unknown): unknown {
    const results: Array<{
      instanceType: string,
      name: string,
      status: string,
      started: Date}> = value as Array<{
        instanceType: string,
        name: string,
        status: string,
        started: Date}>;
    if (results && results.length !== 0){
      return results.sort((a, b) => (
        a.instanceType < b.instanceType ? 1 : -1
      ));
    }
    return value;
  }

}
