import styles from "./styles.module.scss";

interface Props {
  title: string;
  value: string | number;
}

const ReportContainer = ({ title, value }: Props) => {
  const text = `${value}`;
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <div>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ReportContainer;
