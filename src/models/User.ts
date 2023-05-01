export interface IUser {
    name: string;
    email: string;
}

export interface IUserWithPassword extends IUser {
    password: string;
}

export interface ILoginData {
    email: string;
    password: string;
}
