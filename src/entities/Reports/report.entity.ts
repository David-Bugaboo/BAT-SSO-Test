export default interface ReportEntity {
  id: string;
  cenaryClimate: string;
  cenaryMaturity: string;
  idealMinutes: number[];
  userEmail: string;
  realSeconds: number[];
  simulatedMinutes: number[];
  checkedItems: string[];
  leafChecks: number;
  score: number;
  quality: string;
  mistakesLog: string[];
  date: String;
  createdAt: Date;
}
