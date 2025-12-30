import { User } from "../../domain/user.model";

export interface UserRepositoryPort{
    findEmail(email:string): Promise<User | null>,
    createUser(user: User): Promise<User>,
}

// ! INJECT TOKEN
export const USER_REPO_TOKEN = "USER_REPO_TOKEN";