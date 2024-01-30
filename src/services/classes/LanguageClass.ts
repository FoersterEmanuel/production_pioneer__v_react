import { ReactNode } from 'react';
import {language_data} from '../../data/language_data';

export type LanguageSet = "en" | "de";
export type Translation = {
  [key: string]: {
    [language in LanguageSet]: string | ReactNode;
  };
};
export const languageSet: LanguageSet[] = ["en", "de"];

export default class LanguageClass {
  private lData: Translation = language_data;
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
  public getLanguageWord = (val: string): string | ReactNode | undefined => {
    if (!this.lData[val] || !this.lData[val][this.language])
      return;
    return this.lData[val][this.language];
  };
}