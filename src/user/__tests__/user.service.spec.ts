import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CachedService } from '../../cached/cached.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { userMock } from '../__mocks__/user.mock';
import { User } from '../entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaService,
        CachedService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should return user in findOneByEmail', async () => {
    // Mock the PrismaService findUniqueOrThrow function
    jest
      .spyOn(prismaService.user, 'findUniqueOrThrow')
      .mockResolvedValueOnce(userMock);

    // Call the findUserByEmail function
    const user: User = await service.findOneByEmail('julio@gmail.com');

    // Expectations
    expect(user).toEqual(userMock);

    // Ensure the PrismaService findUniqueOrThrow was called with the correct email
    expect(prismaService.user.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { email: user.email },
    });
  });
});
