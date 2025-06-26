import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("./auth.service").AuthResponse>;
    login(req: any, loginDto: LoginDto): Promise<import("./auth.service").AuthResponse>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getCurrentUser(req: any): Promise<Omit<import("../users/entities/user.entity").User, "password">>;
    logout(): Promise<{
        message: string;
    }>;
}
