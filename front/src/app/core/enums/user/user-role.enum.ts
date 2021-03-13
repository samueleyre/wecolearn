export enum UserRoleEnum {
  SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}

export const USER_ROLES = Object.values(UserRoleEnum);

export const USER_ROLES_FR = {
  [UserRoleEnum.SUPER_ADMIN] : 'Super administrateur',
  [UserRoleEnum.ADMIN] : 'Administrateur',
  [UserRoleEnum.USER] : 'Utilisateur',
};

