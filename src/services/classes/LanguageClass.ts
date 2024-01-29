import languageData from './../../data/language_data.json';

type Translation = {
  [key: string]: {
    de: string;
    en: string;
  };
};
export type LanguageSet = "en" | "de";
export const languageSet: LanguageSet[] = ["en", "de"];

export default class LanguageClass {
  private lData: Translation = languageData;
  private language: LanguageSet;

  constructor() {
    this.language = this.getLanguageFromBrowser();
  }

  private getLanguageFromBrowser = (): LanguageSet => {
    return languageSet.reduce<LanguageSet>((result, lang) =>
      lang.includes(navigator.language) ? lang : result,
      languageSet[0]
    );
  };

  public getLanguage = () => this.language;
  public setLanguage = (val: LanguageSet): LanguageSet => {
    if (languageSet.includes(val))
      this.language = val;
    return this.language;
  };
  public getLanguageWord = (val: string): string | undefined => {
    if (!this.lData[val] || !this.lData[val][this.language])
      return;
    return this.lData[val][this.language];
  };
}