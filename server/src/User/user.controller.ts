import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { EditProfileData, LoginData, SignupData } from './user.types';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() signupData: SignupData) {
    return await this.usersService.signup(signupData);
  }

  @Post('login')
  async LogIn(@Body() loginData: LoginData) {
    return await this.usersService.login(loginData);
  }

  @Get('all')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Put(':id')
  async editProfile(
    @Body() editProfileData: EditProfileData,
    @Param('id') id: number,
  ) {
    editProfileData.id = +id;
    return this.usersService.editProfile(editProfileData);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.getUserByID(+id);
  }
}
