import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapValues',
  pure: false
})
/**
 * Класс преобразует Map в массив значений.
 */
export class MapValuesPipe implements PipeTransform {

  transform(map: Map<any, any>, ...args: unknown[]): unknown {
    return Array.from( map.values() );
  }

}
