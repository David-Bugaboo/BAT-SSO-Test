import Role from '../entities/enum/Role.enum'

export default interface OutputRegisterUser {
  id: string;
  name: string
  email: string
  password: string
  recoveryPassCode: string
  roles: Array<Role>
  watchedVideos: Array<number>
  createdAt: Date
  updatedAt: Date
}