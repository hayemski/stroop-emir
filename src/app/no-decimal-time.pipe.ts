import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noDecimalTime'
})
export class NoDecimalTimePipe implements PipeTransform {

  transform(value: number): string {
    const wholeNumber = Math.floor(value); // Remove decimals
    const minutes = Math.floor(wholeNumber / 60);
    const seconds = wholeNumber % 60;

    // Format time as MM:SS
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

}
