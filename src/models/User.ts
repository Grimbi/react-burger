export interface IUser {
    name: string;
    email: string;
}

export interface IUserWithPassword extends IUser {
    password: string;
}
