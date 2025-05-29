import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtModule } from "@nestjs/jwt";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [
        
        {
          provide: getModelToken("User"),
          useValue: Model,
        },
        AuthService,
        UsersService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
