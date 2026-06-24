import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        jwksUri:
          process.env['KEYCLOAK_JWKS_URI'] ??
          'http://localhost:8080/realms/clinical-demo/protocol/openid-connect/certs',
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: process.env['KEYCLOAK_ISSUER'] ?? 'http://localhost:8080/realms/clinical-demo',
      algorithms: ['RS256'] as const,
    });
  }

  validate(payload: Record<string, unknown>): Record<string, unknown> {
    return payload;
  }
}
