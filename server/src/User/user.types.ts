import { User } from "@prisma/client";

export type Users = User;

export type LoginDTO = {
    email: string;
    password: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type SignupDTO = {
    email: string;
    password: string;
    username: string;
};

export type SignupData = {
    email: string;
    password: string;
    username: string;
};

export type EditProfileDTO = {
    email?: string;
    username?: string;
    password?: string;
};

export type EditProfileData = {
    id: number;
    email?: string;
    password?: string;
    username?: string;
};
