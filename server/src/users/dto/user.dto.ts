import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsArray,
  IsUUID,
} from "class-validator";


export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPERADMIN = "SUPERADMIN",
}

export enum ThemeType {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

class BaseUserDto {
  constructor(){
    this.role = UserRole.USER;
  }

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
  
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

}

export class SignupDto extends BaseUserDto {
  @IsString()
  @IsOptional()
  username: string;

}

export class LoginDto extends BaseUserDto {

}



export class UserDto extends BaseUserDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string | null;



  @IsEnum(ThemeType)
  @IsOptional()
  theme?: ThemeType;

  // @IsArray()
  // @Type(() => ListingDto)
  // listing: ListingDto[];
}
