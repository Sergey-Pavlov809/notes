import { AppPage } from './app.po';
import { by, element } from 'protractor';

describe('Добавление секции.', () => {
    const page: AppPage = new AppPage();
    beforeAll(() => {
        page.navigateTo();
    });

    it('Кнопка добавления добавляется', () => {
        expect(element(by.name('sections__add-btn'))?.isPresent()).toBeTruthy('Кнопка добавления секции добавляется.');
    });

    it('Внешний вид секции изменияется.', () => {
        element(by.name('sections__add-btn_plus')).click();
        expect(element(by.name('sections__form_head')).isDisplayed())
            .toBeTruthy('Текст с надписью "Добавить секцию" должен появиться сейчас.');
        expect(element(by.name('sections__form_input')).isDisplayed()).toBeTruthy('input должен появится сейчас.');
        expect(element(by.name('sections__form_btn')).isDisplayed())
            .toBeTruthy('Кнопка с надписью "добавить секцию" должна появиться сейчас.');

        expect(element(by.name('sections__form_btn')).getAttribute('disabled')).toBeTruthy('Кнопка должна быть disable для нажатия.');

        expect(element(by.name('sections__add-btn_times-circle')).isDisplayed())
            .toBeTruthy('Иконка "крестик" должна быть видна на кнопке добавления секции.');
        expect(element(by.name('sections__add-btn_plus')).isDisplayed()).toBeFalsy('Иконка со знаком + должна быть скрыта.');
    });

    it('Добавление секции и изменение внешнего вида кнопки не выполнено.', () => {
        const sectionsCount = element.all(by.tagName('app-section')).count();
        element(by.name('sections__form_btn')).click();
        expect(element(by.name('sections__form_head')).isDisplayed()).toBeTruthy('Текст с надписью "Добавить секцию" должен быть видимым.');
        expect(element(by.name('sections__form_input')).isDisplayed()).toBeTruthy('input должен быть видимым.');
        expect(element(by.name('sections__form_btn')).isDisplayed()).toBeTruthy('Кнопка с надписью "добавить секцию" должна быть видимой.');
        expect(element(by.name('sections__add-btn_times-circle')).isDisplayed())
            .toBeTruthy('Иконка x должна быть видна на кнопке добавления секции.');
        expect(element(by.name('sections__add-btn_plus')).isDisplayed()).toBeFalsy('Иконка со знаком + должна быть скрыта.');
        expect(element.all(by.tagName('app-section')).count()).toBe(sectionsCount);
    });

    it('Закрытие поля ввода имени секции выполнено.', () => {
        element(by.name('sections__add-btn_times-circle')).click();
        expect(element(by.name('sections__form_head')).isDisplayed()).toBeFalsy('Текст с надписью "Добавить секцию" должен исчезнуть.');
        expect(element(by.name('sections__form_input')).isDisplayed()).toBeFalsy('input должен исчезнуть.');
        expect(element(by.name('sections__form_btn')).isDisplayed()).toBeFalsy('Кнопка с надписью "добавить секцию" должна исчезнуть.');
        expect(element(by.name('sections__add-btn_times-circle')).isDisplayed()).toBeFalsy('Иконка x должна исчезнуть.');
        expect(element(by.name('sections__add-btn_plus')).isDisplayed()).toBeTruthy('Иконка со знаком + должна появиться.');
    });

    it('Добавление новой секции выполнено успешно.', () => {
        const sectionsCount = element.all(by.tagName('app-section')).count();
        element(by.name('sections__add-btn_plus')).click();
        element(by.name('sections__form_input')).sendKeys('section');
        element(by.name('sections__form_btn')).click();
        expect(element.all(by.tagName('app-section')).count()).toBe(sectionsCount.then(count => count + 1));
        expect(element.all(by.tagName('app-section')).last().
            element(by.cssContainingText('span', 'section')).isPresent())
            .toBeTruthy('Новая секция должна быть создана и стоять после остальных секций.');
        expect(element(by.name('sections__form_head')).isDisplayed()).toBeFalsy('Текст с надписью "Добавить секцию" должен исчезнуть.');

        expect(element(by.name('sections__form_input')).isDisplayed()).toBeFalsy('input должен исчезнуть.');
        expect(element(by.name('sections__form_btn')).isDisplayed()).toBeFalsy('Кнопка с надписью "добавить секцию" должна исчезнуть.');
        expect(element(by.name('sections__add-btn_times-circle')).isDisplayed()).toBeFalsy('Иконка x должна исчезнуть.');
        expect(element(by.name('sections__add-btn_plus')).isDisplayed()).toBeTruthy('Иконка со знаком + должна появиться.');
    });
});
