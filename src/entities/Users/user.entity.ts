import { IAnalytics } from "../../pages/users/analytics";
import Role from "../enum/Role.enum";

export default interface UserEntity {
  name: string;
  email: string;
  roles: Array<Role>;
  password: string;
  recoveryPassCode: string;
  watchedVideos: Array<string>;
  watchedVideosCount: number;
  createdAt: Date;
  updatedAt: Date;
  signInQuantity: number;
  userAnalytics: IAnalytics
  id: string;
}
