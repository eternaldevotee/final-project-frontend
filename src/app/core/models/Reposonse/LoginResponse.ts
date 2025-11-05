import { UserRoles } from "../enums/UserRoles";

export interface LoginResponse{
    token:string;
    userID:string;
    name:string;
    role:UserRoles;
}