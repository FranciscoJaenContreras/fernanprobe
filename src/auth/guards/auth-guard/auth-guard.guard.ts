import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { JWTPayload } from 'src/auth/interfaces/jwtPayload.interface';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private jwtService: JwtService, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const payload = await this.jwtService.verifyAsync<JWTPayload>(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );

      const user = await this.authService.findUserById(payload.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
    }catch (error) {
      throw new UnauthorizedException('Token not valid');
    }

    return Promise.resolve(true)
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
