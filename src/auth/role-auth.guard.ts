import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.auth.decorator';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const reqRoles = <string[]>(
        this.reflector.getAllAndOverride(ROLES_KEY, [
          context.getHandler(),
          context.getClass(),
        ])
      );

      if (!reqRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Not role' });
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role) => reqRoles.includes(role.value));
    } catch (error) {
      throw new UnauthorizedException({ message: 'Not role' });
    }
  }
}
