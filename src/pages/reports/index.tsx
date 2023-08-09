import { useCallback, useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import CustomTable from "../../components/Table";
import { AuthContext } from "../../context/AuthContext";
import ApiPaths from "../../core/apiPaths";
import PageNames from "../../core/pageNames";
import ReportColumns from "../../entities/Reports/report.column";
import ReportEntity from "../../entities/Reports/report.entity";
import Menu from "../../section/Menu";
import { HttpService } from "../../services/HTTP.service";
import styles from "../../styles/Reports.module.scss";
import Report from "./report";

const Reports = () => {
  const [originalData, setOriginalData] = useState<ReportEntity[]>([]);
  const [data, setData] = useState<ReportEntity[]>([]);
  const [report, setReport] = useState<ReportEntity>();
  const [showModal, setShowModal] = useState(false);

  const handleData = useCallback(async () => {
    const response = await new HttpService().get<ReportEntity[]>(
      ApiPaths.reports
    );
    setData(response);
    setOriginalData(response);
  }, []);

  const handleViewReport = useCallback(
    (id: string) => {
      const report = data.find((report) => report.id.match(id));
      if (!report) return;
      setReport(report);
      setShowModal(true);
    },
    [data]
  );

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    handleData();
  }, [handleData, showModal]);

  const { checkAuth } = useContext(AuthContext);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSearch = useCallback(
    (search: string) => {
      if (!search || search.length < 3) return;
      const searched = data.filter((data) => data.userEmail === search);
      if (searched.length > 0) {
        setData(searched);
      }
    },
    [data]
  );

  return (
    <section id={styles.reports}>
      <Menu title={PageNames.reports} />
      <div className={styles.container}>
        <CustomTable
          title="Relatórios cadastrados"
          columns={ReportColumns}
          showRow={handleViewReport}
          data={data}
          handleSearch={handleSearch}
        />
      </div>

      {!!report && (
        <Modal showModal={showModal} toogle={toogleModal}>
          <Report data={report} />
        </Modal>
      )}
    </section>
  );
};

export default Reports;
