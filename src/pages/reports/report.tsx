import moment from "moment";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import ReportEntity from "../../entities/Reports/report.entity";
import styles from "../../styles/Reports.module.scss";

interface Props {
  data: ReportEntity;
}

const Report = ({ data }: Props) => {
  const { checkAuth } = useContext(AuthContext);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className={styles.containerReportForm}>
      <div>
        <h1>Relatório completo</h1>
        <div>
          <h3>Usuário</h3>
          <span>{data?.userEmail}</span>
        </div>
        <div>
          <h3>Clima</h3>
          <span>{data?.cenaryClimate}</span>
        </div>
        <div>
          <h3>Maturidade</h3>
          <span>{data?.cenaryMaturity}</span>
        </div>
        <div>
          <h3>Tempo simulado / Tempo real / Tempo Ideal</h3>
          {data?.realSeconds.map((time, index) => (
            <div key={index}>
              <span>
                {data?.simulatedMinutes[index] ?? `--`} min / {time ?? `--`} sec
                /{" "}
                {data.idealMinutes && data.idealMinutes[index]
                  ? data?.idealMinutes[index]
                  : `-- `}
                min
              </span>
            </div>
          ))}
        </div>
        <div>
          <h3>Itens marcados</h3>
          {data?.checkedItems.map((item, index) => (
            <div key={index}>
              <span>- {item}</span>
            </div>
          ))}
        </div>
        <div>
          <h3>Quantidade de folhas verificadas</h3>
          <span>{data?.leafChecks}</span>
        </div>
        <div>
          <h3>Pontuação</h3>
          <span>{data?.score}</span>
        </div>
        <div>
          <h3>Qualidade da cura</h3>
          <span>{data?.quality}</span>
        </div>
        <div>
          <h3>Erros</h3>
          {data?.mistakesLog.map((log, index) => (
            <div key={index}>
              <span>- {log}</span>
            </div>
          ))}
        </div>
        <div>
          <h3>
            Criado em:{" "}
            {moment(data?.createdAt).format("DD/MM/YYYY [às] HH:mm:ss")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Report;
