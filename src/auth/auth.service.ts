import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/dto/Auth/SignUp.dto';
import { User } from 'src/models/auth.model';
import * as bcrypt from 'bcrypt';
import { LogInDto } from 'src/dto/Auth/LogIn.dto';
import { UpdateProfileDto } from 'src/dto/Auth/UpdateProfile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { email, password, userName } = signUpDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('A user already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const avatar = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(userName)}`;

    const newUser = new this.userModel({
      userName,
      email,
      password: hashedPassword,
      profilePic: avatar,
    });

    await newUser.save();

    const payload = { userId: newUser._id };

    const token = this.jwtService.sign(payload);

    return { token };
  }

  async login(logInDto: LogInDto): Promise<{ token: string }> {
    const { password, userNameOrEmail } = logInDto;

    const user = await this.userModel.findOne({
      $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }],
    });
    if (!user) {
      throw new BadRequestException('user not found');
    }

    const validatingPassword = await bcrypt.compare(password, user.password);

    if (!validatingPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { userId: user._id };

    const token = this.jwtService.sign(payload);
    return { token };
  }

  async me(id: string): Promise<{ user: User }> {
    const user = await this.userModel.findById(id).select('-password');
    return { user };
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    const { profilePic } = updateProfileDto;
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        profilePic,
      },
      { new: true },
    );

    if (!user) {
      throw new BadRequestException('user not found');
    }
    return user;
  }
}
