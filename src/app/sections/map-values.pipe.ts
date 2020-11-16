import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mapValues',
    pure: false
})
/**
 * from map to arr.
 */
export class MapValuesPipe implements PipeTransform {

    transform(map: Map<any, any>, ...args: unknown[]): any[] {
        return Array.from(map.values());
    }

}
