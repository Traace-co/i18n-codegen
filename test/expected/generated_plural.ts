// prettier-ignore
export const I18nKeys = [
"home.title_one",
"home.title",
"home.title_other",
] as const;

export type I18nKey = typeof I18nKeys[number];
