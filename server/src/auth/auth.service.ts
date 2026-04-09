import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: Pick<User, 'id' | 'isAdmin'>) {
    const payload = { userId: user.id, isAdmin: user.isAdmin };
    const token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { token, refreshToken };
  }

  async signUp({ email, fullName, password }: SignUpDto) {
    const existUser = await this.userRepo.findOneBy({ email });
    if (existUser)
      throw new BadRequestException('User with this email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepo.create({
      email,
      fullName,
      password: hashedPassword,
    });
    return this.userRepo.save(newUser);
  }

  async signIn({ email, password }: SignInDto) {
    const existUser = await this.userRepo.findOneBy({ email });
    if (!existUser) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const payload = {
      userId: existUser.id,
      isAdmin: existUser.isAdmin,
    };

    const { token, refreshToken } = this.generateToken(existUser);
    return { token, refreshToken };
  }

  async profile(userId: string) {
    return this.userRepo.findOneBy({ id: userId });
  }

  async refreshToken(userId: string, isAdmin: boolean) {
    const payload = { id: userId, isAdmin };
    const { token, refreshToken } = this.generateToken(payload);
    return { token, refreshToken };
  }
}
