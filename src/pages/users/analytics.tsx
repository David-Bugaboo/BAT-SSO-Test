import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import IUserEntity from "../../entities/Users/user.entity";
import styles from "../../styles/Reports.module.scss";
import Image from "next/image";
import confirmIcon from "./../../../public/confirm.png";
import rejectIcon from "./../../../public/reject.png";

export interface IAnalytics {
  tutorial: number;
  harvestInfo: number;
  checklist: {
    window1: number;
    window2: number;
    window3: number;
    termometer: number;
    kiln: number;
    door1: number;
    door2: number;
    panel: number;
  };
  navigation: {
    left: number;
    right: number;
  };
  panel: {
    temperatureSpeedPlus: number;
    temperatureSpeedMinus: number;
    dryTemperaturePlus: number;
    dryTemperatureMinus: number;
    wetTemperaturePlus: number;
    wetTemperatureMinus: number;
  };
  fastFoward: number;
  leafCheck: {
    yellowing: number;
    withening: number;
    leafDry: number;
    stemDry: number;
  };
}

interface Props {
  data: IUserEntity;
}

function buildProperty(value, text) {
  if (value > 0) {
    return (
      <>
        <span>
          <Image src={confirmIcon} width={12} height={12} /> {text}
        </span>
      </>
    );
  }
  return (
    <span>
      <Image src={rejectIcon} width={12} height={12} /> {text}
    </span>
  );
}

const AnalyticsReport = ({ data }: Props) => {
  const { checkAuth } = useContext(AuthContext);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!data) return;
  const userAnalytics = data.userAnalytics;

  return (
    <div className={styles.containerReportForm}>
      <div>
        <h1>Análise do usuário</h1>
        <div>
          {buildProperty(userAnalytics.tutorial, "Tutorial")}
          {buildProperty(userAnalytics.harvestInfo, "Clima/Colheita")}
        </div>
        <div>
          <h3>Checagem</h3>
          {buildProperty(userAnalytics.checklist.window1, "Janela 1")}
          {buildProperty(userAnalytics.checklist.window2, "Janela 2")}
          {buildProperty(userAnalytics.checklist.window3, "Janela 3")}
          {buildProperty(userAnalytics.checklist.termometer, `Cuba d'agua`)}
          {buildProperty(userAnalytics.checklist.kiln, "Forno")}
          {buildProperty(userAnalytics.checklist.door1, "Porta 1")}
          {buildProperty(userAnalytics.checklist.door1, "Porta 2")}
          {buildProperty(userAnalytics.checklist.panel, "Painel")}
        </div>
        <div>
          <h3>Setas de navegação</h3>
          {buildProperty(userAnalytics.navigation.left, "Esquerda")}
          {buildProperty(userAnalytics.navigation.right, "Direita")}
        </div>
        <div>
          <h3>Painel</h3>
          <p>Temperatura/hora</p>
          {buildProperty(userAnalytics.panel.temperatureSpeedPlus, "Mais (+)")}
          {buildProperty(
            userAnalytics.panel.temperatureSpeedMinus,
            "Menos (-)"
          )}
          <p>Bulbo Seco</p>
          {buildProperty(userAnalytics.panel.dryTemperaturePlus, "Mais (+)")}
          {buildProperty(userAnalytics.panel.dryTemperatureMinus, "Menos (-)")}
          <p>Bulbo úmido</p>
          {buildProperty(userAnalytics.panel.wetTemperaturePlus, "Mais (+)")}
          {buildProperty(userAnalytics.panel.wetTemperatureMinus, "Menos (-)")}
        </div>
        <div>
          {buildProperty(userAnalytics.fastFoward, "Aceleração do relógio")}
        </div>
        <div>
          <h3>Viualização da folha</h3>
          {buildProperty(userAnalytics.leafCheck.yellowing, "Amarelão")}
          {buildProperty(userAnalytics.leafCheck.withening, "Murchamento")}
          {buildProperty(userAnalytics.leafCheck.leafDry, "Secagem da lâmina")}
          {buildProperty(userAnalytics.leafCheck.stemDry, "Secagem do talo")}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
