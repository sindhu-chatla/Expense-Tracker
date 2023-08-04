import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthToNumber'
})
export class MonthToNumberPipe implements PipeTransform {
  months: string[] = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
  ];
  
  transform(value: string): string {
    let monthNumber: string = '0';
    this.months.forEach((val, ind) => {
      if (val.toUpperCase() === value.toUpperCase()) {
        monthNumber = (ind + 1).toString();
      }
    });
    return monthNumber.toUpperCase();
  }
  
  

}
