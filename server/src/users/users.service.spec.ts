import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { UserRole } from "./dto/user.dto";
import { JwtModule, JwtService } from "@nestjs/jwt";

// const mockUserModel = {
//   findOne: jest.fn(),
//   save: jest.fn(),
//   // For `new this.userModel(userDto)` to work, mock as a constructor
//   prototype: {
//     save: jest.fn(),
//   },
// };

describe("UsersService", () => {
  let userService: UsersService;
   const mockUserModel: jest.Mock = jest.fn();


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [
        {
          provide: getModelToken("User"),
          useValue: mockUserModel,
        },
        UsersService,
        JwtService,
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

   afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  it("create user", async () => {
    let userDto = {
      username: "testuser",
      email: "testuser987@example.com",
      password: "test987",
      role: UserRole.USER,
    };
       mockUserModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(userDto),
      toObject: jest.fn().mockReturnValue(userDto),
    }));

    const result = await userService.createUser(userDto);
    expect(mockUserModel).toHaveBeenCalledWith(userDto); 
    
    expect(result).toEqual(userDto);
    
  });
});
