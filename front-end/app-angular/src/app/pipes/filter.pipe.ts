import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): unknown {
    const resultProducts = [];
    if ( arg !== '') {
      for (const product of value) {
        if (product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultProducts.push(product);
        }
      }
      return resultProducts;
    } else {
        return value;
    }
  }

}
