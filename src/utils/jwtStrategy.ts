import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpression: true,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(paylod: any) {
    const { userId } = paylod;
    return userId;
  }
}
