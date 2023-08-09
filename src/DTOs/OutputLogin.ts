import Role from '../entities/enum/Role.enum'

export default interface OutputLogin {
  userData: {
      name: string,
      email: string,
      roles: Array<Role>
      watchedVideos: Array<string>
  },
  token: string
}