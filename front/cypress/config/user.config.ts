/**
 * user data
 */
import { User } from '~/core/entities/user/entity';

export const USER_CONFIG: User = <User>{
  first_name: 'Samuel',
  last_name: 'Diego',
  password: 'password',
  email: 'contact@wecolearn.com',
  learn_tags: ['polka'],
  city: 'Lyon',
  biographie: 'Je veux devenir danseur pro.',
};

export const USER_CHANGES_CONFIG: User = <User>{
  first_name: 'Mickael',
  last_name: 'Ulrike',
  learn_tags: ['echecs'],
  city: 'Paris',
  biographie: 'Je veux devenir champion d\'echecs',
};
