import { by, element, promise } from 'protractor';

describe('Сортировка заметок.', () => {

    beforeAll(async () => {
        for (let i = 1; i < 20; i++) {
            const section = element(by.tagName('app-section'));
            const note = {
                header: `note ${i}`,
                content: 'text',
                date: `${('0' + Math.floor(1 + Math.random() * 12)).slice(-2)}/
                    ${('0' + Math.floor(1 + Math.random() * 28)).slice(-2)}/2020`
            };

            section.element(by.name('add-btn')).click();
            const appModalInput = section.element(by.name('add-note-form'));
            appModalInput.element(by.name('header')).clear();
            appModalInput.element(by.name('header')).sendKeys(note.header);
            appModalInput.element(by.name('text')).clear();
            appModalInput.element(by.name('text')).sendKeys(note.content);
            appModalInput.element(by.name('date')).clear();
            appModalInput.element(by.name('date')).sendKeys(note.date);
            appModalInput.element(by.name('form-container__add-btn')).click();

            // await page.addNoteInSection(element(by.tagName('app-section')), {
            //     header: `note ${i}`,
            //     content: 'text',
            //     date: `${('0' + Math.floor(1 + Math.random() * 12)).slice(-2)}/${'0' + Math.floor(1 + Math.random() * 28)}/2020`
            // });
        }
    });


    it('Кнопка появления выпадающего меню содержится на странице.', () => {
        expect(element(by.tagName('app-section')).element(by.name('header__icon')).isDisplayed())
            .toBeTruthy('Кнопка появления выпадающего меню присутствует на странице.');
    });

    it('Появление выпадающего меню выполнено успешно.', () => {
        const section = element(by.tagName('app-section'));
        section.element(by.name('header__icon')).click();
        const dropDownMenu = section.element(by.tagName('app-drop-down-menu'));

        expect(dropDownMenu.isDisplayed()).toBeTruthy('Выпадающее меню появилось на странице.');

        expect(dropDownMenu.element(by.name('label-sort-ascending')).isDisplayed())
            .toBeTruthy('Кнопка сортировки заметок по возрастанию даты присутствует на странице.');

        expect(dropDownMenu.element(by.name('label-reverse-sort-ascending')).isDisplayed())
            .toBeTruthy('Кнопка сортировки заметок по возрастанию даты в обратном порядке присутствует на странице.');
    });

    it('Выпадающее меню скрылось со страницы.', () => {
        const section = element(by.tagName('app-section'));
        section.element(by.name('header__icon')).click();
        expect(section.element(by.tagName('app-drop-down-menu')).isDisplayed()).toBeFalsy('Выпадающего меню нет на странице.');
    });

    it('Сортировка заметок по возрастанию даты выполнена успешно.', () => {
        const months: string[] = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл',
            'авг', 'сен', 'окт', 'ноя', 'дек'];

        const section = element(by.tagName('app-section'));
        section.element(by.name('header__icon')).click();
        const dropDownMenu = section.element(by.tagName('app-drop-down-menu'));
        dropDownMenu.all(by.tagName('label')).get(0).click();
        const dates = section.all(by.tagName('app-note'))
            .map(note => note.element(by.cssContainingText('span', /[0-2]\d \D\S+ 2020, [0-22]\d:[0-5]\d/)).getText()
                .then(dateStr => {
                    return new Date(`2020-${('0' + (months.indexOf(dateStr.match(/[а-я]{3}/)[0]) + 1)).slice(-2)}
                            -${dateStr.slice(0, 2)}`);
                }
                ));

        expect((dates as promise.Promise<Date[]>).then(dateArr => {
            let arrIsSorted = true;
            for (let i = 1; i < dateArr.length; i++) {
                arrIsSorted = arrIsSorted && dateArr[i - 1].getTime() <= dateArr[i].getTime();
            }
            return arrIsSorted;
        })).toBeTruthy('Сортировка выполнена успешно.');
    });

    it('Сортировка заметок по убыванию даты выполнена успешно.', () => {
        const months: string[] = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл',
            'авг', 'сен', 'окт', 'ноя', 'дек'];

        const section = element(by.tagName('app-section'));
        const dropDownMenu = section.element(by.tagName('app-drop-down-menu'));
        dropDownMenu.all(by.tagName('label')).get(1).click();
        const dates = section.all(by.tagName('app-note'))
            .map(note => note.element(by.cssContainingText('span', /[0-2]\d [а-я]+ 2020, [0-2]\d:[0-5]\d/)).getText()
                .then(dateStr => {
                    return new Date(`2020-${('0' + (months.indexOf(dateStr.match(/[а-я]{3}/)[0]) + 1)).slice(-2)}
                            -${dateStr.slice(0, 2)}`);
                }
                ));

        expect((dates as promise.Promise<Date[]>).then(dateArr => {
            let arrIsSorted = true;
            for (let i = 1; i < dateArr.length; i++) {
                arrIsSorted = arrIsSorted && dateArr[i - 1].getTime() >= dateArr[i].getTime();
            }
            return arrIsSorted;
        })).toBeTruthy('Сортировка выполнена успешно.');
    });
});
