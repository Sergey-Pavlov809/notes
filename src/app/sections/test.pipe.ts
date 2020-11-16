import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'test'
})

/**
 * Класс форматирования даты 
 */
export class TestPipe implements PipeTransform {

    months: string[] = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
        'августа', 'сентября', 'октября', 'ноября', 'декабря'];


    /**
    * 
    */       
    transform(date: Date): string {
        return `${('0' + date.getDate()).slice(-2)} ${this.months[date.getMonth()]}` +
            ` ${date.getFullYear()}, ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMonth()).slice(-2)}`;
    }
}
