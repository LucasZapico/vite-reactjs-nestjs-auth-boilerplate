import { Injectable, UnauthorizedException } from "@nestjs/common"
import { Strategy } from "passport-local"
import { PassportStrategy } from "@nestjs/passport"
import { AuthService } from "src/auth/auth.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    })
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({
      email,
      password,
    })

    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    return user
  }
}
