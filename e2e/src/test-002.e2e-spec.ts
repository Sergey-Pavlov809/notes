import { by, element } from 'protractor';

describe('Добавление заметок.', () => {
    const last = element.all(by.tagName('app-section')).last();

    it('Кнопка добавления заметок присутствует на странице.', () => {
        expect(last.element(by.name('add-btn'))?.isPresent()).toBeTruthy('Кнопка добавления заметок присутствует на странице.');
    });

    it('Отображение модального окна с формой выполнено успешно.', () => {
        last.element(by.name('add-btn')).click();

        const appModalInput = last.element(by.tagName('app-modal-input'));
        expect(appModalInput.isDisplayed()).toBeTruthy('Должно появится модальное окно');

        expect(appModalInput
            .element(by.tagName('form')).isDisplayed()).toBeTruthy('Должна отображаться форма внутри модального окна.');

        expect(appModalInput
            .element(by.name('icon')).isDisplayed()).toBeTruthy('Должна отображаться иконка x внутри модального окна.');
    });

    it('Добавление заметки и закрытие модельного окна не выполнено.', () => {
        const notesCount = element.all(by.tagName('app-note')).count();
        const appModalInput = last.element(by.tagName('app-modal-input'));

        appModalInput.element(by.name('form-container__add-btn')).click();
        expect(appModalInput.isDisplayed()).toBeTruthy('Модальное окно не должно исчезнуть.');
        expect(element.all(by.tagName('app-note')).count()).toBe(notesCount);
    });

    it('Закрытие модального окна выполнено успешно.', () => {
        const appModalInput = last.element(by.tagName('app-modal-input'));
        appModalInput.element(by.name('icon')).click();
        expect(appModalInput.isDisplayed()).toBeFalsy('Модальное окно должна исчезнуть.');
    });

    it('Добавление новой заметки выполнено успешно.', () => {
        last.element(by.name('add-btn')).click();

        const appModalInput = last.element(by.css('app-modal-input'));
        const notesCount = element.all(by.css('app-note')).count();

        appModalInput.element(by.name('header')).sendKeys('note');
        appModalInput.element(by.name('text')).sendKeys('text');
        appModalInput.element(by.name('date')).clear();
        appModalInput.element(by.name('date')).sendKeys('11/19/2020');
        appModalInput.element(by.name('form-container__add-btn')).click();

        expect(appModalInput.isDisplayed()).toBeFalsy('Модальное окно должна исчезнуть.');
        expect(last.element(by.cssContainingText('div', 'text'))?.isPresent())
            .toBeTruthy('Новая заметка с надписью текст должна быть создана.');

        expect(last.element(by.cssContainingText('span', 'note'))?.isPresent())
            .toBeTruthy('Новая заметка с именем note должна быть создана.');

        expect(last.element(by.cssContainingText('span', /19 ноября 2020, [0-2]\d:[0-5]\d/))?.isPresent())
            .toBeTruthy('Новая заметка с датой 19.11.2020 далжна быть создана.');

        expect(element.all(by.css('app-note')).count()).toBe(notesCount.then(n => n + 1));
    });
});
