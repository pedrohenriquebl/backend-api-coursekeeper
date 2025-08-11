import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Inject } from '@nestjs/common';
import { CreateUserDto } from '../../presentation/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../presentation/dtos/update-user.dto';
import { LoginResponseDto, LoginUserDto } from '../../presentation/dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const hashPassword: string = await bcrypt.hash(dto.password, 10);
    const user = new User(
      undefined,
      dto.firstName,
      dto.lastName,
      dto.email,
      hashPassword,
      dto.cpf,
      dto.profileImage ?? null,
      dto.description ?? null,
    );

    return this.userRepository.create(user);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    user.firstName = dto.firstName ?? user.firstName;
    user.lastName = dto.lastName ?? user.lastName;
    user.email = dto.email ?? user.email;
    user.cpf = dto.cpf ?? user.cpf;
    user.profileImage = dto.profileImage ?? user.profileImage;
    user.description = dto.description ?? user.description;

    return this.userRepository.update(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async restoreUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    user.deletedAt = null;

    return this.userRepository.update(user);
  }

  async softDeleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');

    user.deletedAt = new Date();

    await this.userRepository.update(user);
  }

  async login(loginDto: LoginUserDto): Promise<LoginResponseDto | null> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) return null;

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = user;

    return {
      access_token: token,
      user: userWithoutPassword
    };
  }
}
