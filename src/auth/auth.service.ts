import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/dtos/SignUp.dto';
import { User } from 'src/models/auth.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtServie: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const { email, password, userName } = signUpDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already existed');
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      email,
      userName,
      password: hashPassword,
    });

    await newUser.save();

    const payload = { userId: newUser._id };

    const token = this.jwtServie.sign(payload);
    return { token };
  }
}
