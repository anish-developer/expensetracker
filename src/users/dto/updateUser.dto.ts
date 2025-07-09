import { IsEnum, IsString } from 'class-validator';
import { UserStatus } from 'src/enum/userStatus.enum';

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsEnum(UserStatus)
  status?: UserStatus;
}
