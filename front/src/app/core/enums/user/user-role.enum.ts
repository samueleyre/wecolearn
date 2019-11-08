export enum UserRoleEnum {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}

export const USER_ROLES = Object.values(UserRoleEnum);

export const USER_ROLES_FR = {
  [UserRoleEnum.ADMIN] : 'Administrateur',
  [UserRoleEnum.USER] : 'Utilisateur',
};

