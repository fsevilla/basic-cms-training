import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('app login page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  xit('should display the log in button', () => {
    browser.get('/login').then(() => {
      let el = element(by.id('test'));

      expect(el.getTagName()).toBe('button');
    });
  });

  it('should show the invalid credentials error with wrong credentials', () => {
      let usernameInput = element(by.name('username'));
      let passwordInput = element(by.name('password'));
      let button = element(by.id('submitBtn'));

      usernameInput.sendKeys('user@localhost.com');
      passwordInput.sendKeys('123456');
      button.click();

      browser.wait(()=>{
        return element(by.id('error')).getText();
      },8000);

      
      expect(element(by.id('error')).getText()).toEqual('incorrect username/password');
  });

  it('should show redirect to home after login', () => {
    let usernameInput = element(by.name('username'));
    let passwordInput = element(by.name('password'));
    let button = element(by.id('submitBtn'));

    usernameInput.sendKeys('user@localhost.com');
    passwordInput.sendKeys('Password123');
    button.click();

    browser.wait(()=>{
      return element(by.tagName('h1')).getText();
    },8000);

    
    expect(element(by.tagName('h1')).getText()).toEqual('Welcome, Default User');
});

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
  });
});
