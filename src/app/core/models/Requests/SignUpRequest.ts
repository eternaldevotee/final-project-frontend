import { UserRoles } from "../enums/UserRoles";

export interface SignUpRequest{
  name:string;
  email:string;
  password:string;
  contactNumber:string;
}