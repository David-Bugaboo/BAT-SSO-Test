import Role from "../entities/enum/Role.enum";

export default interface InputRegisterUser {
  userData: {
    name: string,
    email: string,
    roles: string[],
  };
}
