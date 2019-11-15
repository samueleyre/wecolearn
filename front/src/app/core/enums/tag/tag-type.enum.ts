export enum TagTypeEnum {
  LEARN ,
  KNOW ,
  TEACH ,
}

export const tagTypes = Object.values(TagTypeEnum).filter(el => typeof el === 'number');

export const tagTypeFR = {
  [TagTypeEnum.LEARN]: 'Apprentissage',
  [TagTypeEnum.KNOW]: 'Connaissance',
  [TagTypeEnum.TEACH]: 'Transmission',
};
