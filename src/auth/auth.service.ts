import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/dtos/SignUp.dto';
import { UserSchema } from 'src/models/auth.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserSchema') private readonly userModel: Model<UserSchema>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, userName, password } = signUpDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({
      email,
      userName,
      password: hashedPassword,
    });
    await newUser.save();
    return { message: 'User created successfully' };
  }
}
