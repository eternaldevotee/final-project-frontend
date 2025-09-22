import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe',
  standalone: false
})
export class SearchpipePipe implements PipeTransform {


  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    return items.filter(item => {
      return item.toLowerCase().startsWith(searchTerm.toLocaleLowerCase());
    });
  }

}
