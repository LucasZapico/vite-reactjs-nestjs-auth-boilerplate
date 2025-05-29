import { Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { goTry } from "go-try";
import { MongooseError, mongo } from "mongoose";

import { AppError } from "src/utils/appError";
import { UserDto } from "./dto/user.dto";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userDto: UserDto) {
    this.logger.log("User signed up", userDto);
    // check if user exists
    const [emailExistsError, emailExists] = await goTry(() =>
      this.userModel.findOne({ email: userDto.email }),
    );
    
    if (emailExists) { 
      this.logger.error("Error email existence", emailExistsError);
      throw new AppError(`${userDto.email} already existence`, 400);
    }
    // Logic for user signup

    const [createUserError, createUser] = await goTry(() => {
      const newUser = new this.userModel(userDto);
      return newUser.save();
    });

    // TODO: enhance error handler
    // exmaple user already exists
    if (createUserError) {
      this.logger.error("Error creating user", createUserError);
      if (createUserError instanceof mongo.MongoServerError) {
        // Duplicate key error code is 11000
        const match = createUserError.errmsg.match(
          /index: (\w+)_1 dup key: { (\w+): "([^"]+)" }/,
        );
        if (match) {
          const field = match[2];
          const value = match[3];
          throw new AppError(
            `A user with the ${field} "${value}" already exists.`,
            409,
          );
        }
        throw new AppError(createUserError.message, 400);
      }

      throw new AppError("Error creating user", 400);
      // throw new AppError(createUserError?.errorResponse.errmsg, 400);
    }
    return createUser;
  }

  // get user 
  async findUser(data: any){
    this.logger.log("Finding user");
    // Logic for finding user
    const [findUserError, foundUser] = await goTry(() =>
      this.userModel.findOne(data),
    );
    if (findUserError) {
      this.logger.error("Error finding user", findUserError);
      throw new AppError("Error finding user", 400);
    }
    return foundUser;
  }

  async updateUser({query, data}: {query: any, data: any}) {
    this.logger.log("Updating user");
    // Logic for updating user
    const [updateUserError, updatedUser] = await goTry(() =>
      this.userModel.findOneAndUpdate(query, data, ),
    );
  }



  // clear testing data 
   // clear test data
  @Cron(CronExpression.EVERY_5_MINUTES)
  async clearTestData() {
    this.logger.log("Clearing test data");
    const [deleteError, deleteResult] = await goTry(() =>
      this.userModel.deleteMany({ email: /test/i }),
    );
    return 0;
  }

}
