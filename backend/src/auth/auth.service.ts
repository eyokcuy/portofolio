import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, pass: string) {
    const user = await this.validateUser(username, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      success: true,
      user,
    };
  }

  async register(username: string, pass: string) {
    const exists = await this.usersService.findOneByUsername(username);
    if (exists) {
      throw new ConflictException('Username already exists');
    }
    const user = await this.usersService.create({
      username,
      password: pass,
      role: 'user', // Default for public registration
    });
    const { password: _, ...result } = user;
    return {
      success: true,
      user: result,
    };
  }
}
