import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from "@nestjs/common";
import { goTry } from "go-try";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name, {
    timestamp: true,
  });
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(" ")[1];

    this.logger.debug(
      `AuthGuard: canActivate: ${request.method} ${request.url} ${token}`,
      AuthGuard.name,
    );
    // Check if the token is present
    // If not, throw an UnauthorizedException

    if (!token) {
      throw new UnauthorizedException();
    }

    const [err, verified] = await goTry(() => {
      const tokenPayload = this.jwtService.verify(token);
      request.user = {
        userId: tokenPayload.sub,
        email: tokenPayload.email,
        name: tokenPayload.name,
      };
     
      return this.jwtService.verifyAsync(token);
    });

    this.logger.log("verified", verified);

    if (err) {
      this.logger.error(`Error verifying token: ${err.message}`);
      throw new UnauthorizedException();
    }

    return true;
  }
}
