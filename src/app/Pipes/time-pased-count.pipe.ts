import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePasedCount'
})
export class TimePasedCountPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      // @ts-ignore
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        return 'Just now';
      }
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
      };
      let counter;
      // tslint:disable-next-line:forin
      for (const i in intervals) {
        counter = Math.floor(seconds/intervals["year"]);
        if (counter > 0) {
          if (counter === 1) {
            return 'a' + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
        }
      }
    }
    return value;
  }

}
