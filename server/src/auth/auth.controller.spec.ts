import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtModule } from "@nestjs/jwt";

describe("AuthController", () => {
  let controller: AuthController;

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
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
