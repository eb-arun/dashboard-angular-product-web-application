import { MyAppV2Page } from './app.po';

describe('my-app-v2 App', () => {
  let page: MyAppV2Page;

  beforeEach(() => {
    page = new MyAppV2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
