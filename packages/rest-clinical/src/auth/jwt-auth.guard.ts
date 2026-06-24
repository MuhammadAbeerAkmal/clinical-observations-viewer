import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    if (!process.env['KEYCLOAK_JWKS_URI']) {
      return true;
    }
    return super.canActivate(context);
  }
}
