import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'limitTo'
})

@Injectable()
export class LimitToPipe implements PipeTransform {
 transform(items: any[], field: string, value: string): any[] {
   if (!items) return [];
   return items.slice(0,parseInt(field))
 }
}
