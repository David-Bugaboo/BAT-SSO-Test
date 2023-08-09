import { MUIDataTableColumnDef } from 'mui-datatables';

enum UserColumnEnum {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  WatchedVideos = 'watchedVideosCount',
  signInQuantity = 'signInQuantity',
}

enum UserColumnsLabelEnum {
  Id = 'id',
  Name = 'Nome',
  Email = 'E-mail',
  WatchedVideos = 'Quantidade de logins feitos'
}

const UserColumns: MUIDataTableColumnDef[] = [
  {
    name: UserColumnEnum.Id,
    options: {
      display: false,
    },
  },
  {
    name: UserColumnEnum.Name,
    label: UserColumnsLabelEnum.Name,
  },
  {
    name: UserColumnEnum.Email,
    label: UserColumnsLabelEnum.Email,
  },
  {
    name: UserColumnEnum.signInQuantity,
    label: UserColumnsLabelEnum.WatchedVideos,
  },
];

export default UserColumns;
