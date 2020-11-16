import { browser, By, by, element, ElementFinder, WebElement, WebElementPromise } from 'protractor';

export class AppPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getTitleText(): Promise<string> {
        return element(by.css('app-container')).getText() as Promise<string>;
    }

    /*
     * Добавить заметку во все секции с переданным именем.
     *
     * @param section
     *    Элемент с тэгом app-section
     * @param note
     *    Объект, который хранит информацию о имени заметки, тексте внутри нее, и дате. Имеет параметры header, content, date типа String.
     *    date должен быть в виде mm/dd/yyyy
     */

     /*
     * 
     *
     */   

     
    async addNoteInSection(section: ElementFinder, note: any): Promise<void> {
        section.element(by.name('add-btn')).click();
        const appModalInput = section.element(by.name('add-note-form'));
        appModalInput.element(by.name('header')).clear();
        appModalInput.element(by.name('header')).sendKeys(note.header);
        appModalInput.element(by.name('text')).clear();
        appModalInput.element(by.name('text')).sendKeys(note.content);
        appModalInput.element(by.name('date')).clear();
        appModalInput.element(by.name('date')).sendKeys(note.date);
        appModalInput.element(by.name('form-container__add-btn')).click();
    }
}
