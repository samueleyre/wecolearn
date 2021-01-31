export enum TagTypeEnum {
  LEARN ,
  KNOW ,
  TEACH ,
}

export const tagTypes = Object.values(TagTypeEnum).filter(el => typeof el === 'number');

export const tagTypeEN = {
  [TagTypeEnum.LEARN]: 'learn',
  [TagTypeEnum.KNOW]: 'know',
  [TagTypeEnum.TEACH]: 'teach',
};

export const tagTypeFR = {
  [TagTypeEnum.LEARN]: 'Apprentissage',
  [TagTypeEnum.KNOW]: 'Connaissance',
  [TagTypeEnum.TEACH]: 'Transmission',
};

export const tagTypeEmoji = {
  [TagTypeEnum.LEARN]: '1F4C8',
  [TagTypeEnum.KNOW]: 'E319',
  [TagTypeEnum.TEACH]: '1F9D1-200D-1F3EB',
};
