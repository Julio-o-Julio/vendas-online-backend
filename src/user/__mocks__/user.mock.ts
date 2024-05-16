import { User } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userMock: User = {
  id: '70d2aac7-b28f-42db-b94e-b17024fd17e7',
  name: 'Julio',
  email: 'julio@gmail.com',
  userType: UserType.User,
  phone: '55067997685578',
  cpf: '12122323434',
  password: '$2b$10$QylBDPpaCnZoIvARKNcfm.hWnnM19LdI8xyHzKAMyiehsxAZ6qiri',
  address: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
