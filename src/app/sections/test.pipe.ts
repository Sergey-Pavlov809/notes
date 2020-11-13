import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})

export class TestPipe implements PipeTransform {
  months: string[] = ['я', 'ф', 'м', 'а', 'м', 'и', 'и',
    'а', 'с', 'о', 'н', 'д'];

  transform(date: Date): string {
    return `${('0' + date.getDate()).slice(-2)} ${this.months[date.getMonth()]}` +
      ` ${date.getFullYear()}, ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMonth()).slice(-2)}`;
  }
}
