import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EditProfileData, LoginData, SignupData } from "./user.types";
import { compareSync, hashSync } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";
import { PrismaService } from "src/Services/prisma.service";


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async signup(signupData: SignupData) {
        const hashedPassword = hashSync(signupData.password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                email: signupData.email,
                password: hashedPassword,
                name: signupData.username,
            },
        });
        // this.mails.sendConfirmRegisterationMessage(signupData.email);
        return newUser;
    }

    async login(loginData: LoginData) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { email: loginData.email },
        });
        const passwordCheck = compareSync(loginData.password, user.password);
        if (!passwordCheck) throw new UnauthorizedException("Wrong Password");
        const payload = {
            username: user.name,
            email: user.email,
            id: user.id,
            img: user.img,
        };
        const secret = process.env.JWT_SECRET as Secret;
        const token = sign(payload, secret, { expiresIn: "120h" });
        return { user: payload, token };
    }
   

    getUserByID(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    editProfile(editProfileData: EditProfileData) {
        const newHashedPassword = editProfileData.password
            ? hashSync(editProfileData.password, 10)
            : undefined;
        return this.prisma.user.update({
            where: {
                id: editProfileData.id,
            },
            data: {
                email: editProfileData.email,
                password: newHashedPassword,
                name: editProfileData.username,
            },
        });
    }

    getAllUsers() {
        return this.prisma.user.findMany();
    }
}
