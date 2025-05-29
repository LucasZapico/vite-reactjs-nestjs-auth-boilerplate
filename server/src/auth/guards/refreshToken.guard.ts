import { Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RefreshTokenGuard extends AuthGuard("jwt-refresh") {
  private readonly logger = new Logger(RefreshTokenGuard.name, {
    timestamp: true,
  });
  constructor() {
    super();
    this.logger.log("RefreshTokenGuard: constructor");
  }
}
