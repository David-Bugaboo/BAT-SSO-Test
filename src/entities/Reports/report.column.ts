import { MUIDataTableColumnDef } from 'mui-datatables';

enum ReportColumnEnum {
  Id = 'id',
  Name = 'userName',
  Email = 'userEmail',
  Score = 'score',
  Date = 'date'
}

enum ReportColumnsLabelEnum {
  Id = 'id',
  Name = 'Nome',
  Email = 'E-mail',
  Score = 'Pontuação',
  Date = 'Data'
}

const ReportColumns: MUIDataTableColumnDef[] = [
  {
    name: ReportColumnEnum.Id,
    options: {
      display: false,
    },
  },
  {
    name: ReportColumnEnum.Date,
    label: ReportColumnsLabelEnum.Date,
  },
  {
    name: ReportColumnEnum.Email,
    label: ReportColumnsLabelEnum.Email,
  },
  {
    name: ReportColumnEnum.Score,
    label: ReportColumnsLabelEnum.Score,
  },
];

export default ReportColumns;
