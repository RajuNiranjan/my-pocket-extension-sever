import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/dtos/SignUp.dto';
import { User } from 'src/models/auth.model';
import * as bcrypt from 'bcryptjs';
import { LogInDto } from 'src/dtos/LogIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtServie: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto): Promise<{ token: string }> {
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

  async login(logInDto: LogInDto): Promise<{ token: string }> {
    const { emailOrUserName, password } = logInDto;

    const user = await this.userModel.findOne({
      $or: [{ email: emailOrUserName }, { userName: emailOrUserName }],
    });

    if (!user) {
      throw new BadRequestException('no user found on this email or user name');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = { userId: user._id };
    const token = this.jwtServie.sign(payload);
    return { token };
  }

  async me(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('User not found, invalid token');
    }
    const userRes = user.toObject();
    delete userRes.password;
    return userRes;
  }
}
