import * as React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import ReportContainer from "../components/ReportContainer";
import { AuthContext } from "../context/AuthContext";
import ApiPaths from "../core/apiPaths";
import PageNames from "../core/pageNames";
import SummaryTitle from "../entities/enum/SummaryTitle";
import SummaryEntity from "../entities/summary.entity";
import Menu from "../section/Menu";
import { HttpService } from "../services/HTTP.service";
import styles from "../styles/Dashboard.module.scss";
import secondsToHms from "../utils/secondsToHms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [summary, setSummary] = useState<SummaryEntity>({} as SummaryEntity);
  const firstDayOfCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const lastDayOfCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  const [rangeOfDate, setRangeOfDate] = useState({
    startDate: firstDayOfCurrentMonth,
    endDate: lastDayOfCurrentMonth,
  });

  const handleGetSummary = useCallback(async () => {
    const response = await new HttpService().get<SummaryEntity>(
      ApiPaths.summary,
      {
        params: {
          startDate: rangeOfDate.startDate.toISOString(),
          endDate: rangeOfDate.endDate.toISOString(),
        },
      }
    );
    setSummary(response);
  }, [rangeOfDate]);

  const renderSummary = useCallback(() => {
    const summaryKeysAndValues = Object.entries(summary);
    const summaryDisplay = summaryKeysAndValues.map(([key, value]) => (
      <ReportContainer
        key={key}
        title={SummaryTitle[key as keyof SummaryEntity]}
        value={value}
      />
    ));

    return summaryDisplay;
  }, [summary]);

  const { checkAuth } = useContext(AuthContext);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    handleGetSummary();
  }, [handleGetSummary]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setCalendarFirstDay(start);
    setCalendarLastDay(end);

    if (start && end) {
      setRangeOfDate({ startDate: start, endDate: end });
    }
  };

  const [calendarFirstDay, setCalendarFirstDay] = useState(
    firstDayOfCurrentMonth
  );
  const [calendarLastDay, setCalendarLastDay] = useState(lastDayOfCurrentMonth);

  return (
    <section id={styles.dashboard}>
      <Menu title={PageNames.dashboard} />
      <div className={styles.container}>
        <DatePicker
          selected={calendarFirstDay}
          onChange={onChange}
          startDate={calendarFirstDay}
          endDate={calendarLastDay}
          selectsRange
          inline
        />
        {renderSummary()}
      </div>
    </section>
  );
};

export default Dashboard;
