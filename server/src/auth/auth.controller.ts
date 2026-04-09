import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './guard/auth.guard';
import { User } from '@src/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('sign-up')
    signUp(@Body() {email, fullName, password}: SignUpDto){
        return this.authService.signUp({email, fullName, password});
    }

    @Post('sign-in')
    signIn(@Body() {email, password}: SignInDto){
        return this.authService.signIn({email, password});
    }

    @Get('refresh-token')
    @UseGuards(AuthGuard)
    refreshToken(@User() user){
        return this.authService.refreshToken(user.userId, user.isAdmin);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@User() user){
        return this.authService.profile(user.userId);
    }
}
