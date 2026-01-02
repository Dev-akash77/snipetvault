import { User } from "../../domain/user.entity";

export interface UserRepositoryPort{
    findEmail(email:string): Promise<User | null>,
    createUser(user: User): Promise<User>,
}

// ! INJECT TOKEN
export const USER_REPO_TOKEN = Symbol("USER_REPO_TOKEN");