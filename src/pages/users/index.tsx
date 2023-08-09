import { useMediaQuery } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import FilledButton from "../../components/FilledButton";
import Modal from "../../components/Modal";
import CustomTable from "../../components/Table";
import { AuthContext } from "../../context/AuthContext";
import ApiPaths from "../../core/apiPaths";
import PageNames from "../../core/pageNames";
import UserColumns from "../../entities/Users/user.column";
import UserEntity from "../../entities/Users/user.entity";
import Menu from "../../section/Menu";
import { HttpService } from "../../services/HTTP.service";
import styles from "../../styles/Users.module.scss";
import AnalyticsReport from "./analytics";
import UserForm from "./user";

const Users = () => {
  const [data, setData] = useState<UserEntity[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const toogleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleAnalyticsModal = () => {
    setShowAnalyticsModal(!showAnalyticsModal);
  };

  const handleData = useCallback(async () => {
    const response = await new HttpService().get<UserEntity[]>(ApiPaths.users);
    response.forEach((user) => {
      user.watchedVideosCount = user.watchedVideos.length;
    });
    setData(response);
  }, []);

  const deleteUser = useCallback(
    async (email: string) => {
      await new HttpService()
        .delete(`${ApiPaths.users}/${email}`)
        .then(async () => await handleData());
    },
    [handleData]
  );

  const { checkAuth } = useContext(AuthContext);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    handleData();
  }, [handleData, showCreateModal]);

  const handleAnalyticsViewReport = useCallback(
    (id: string) => {
      const user = data.find((analytics) => analytics.id.match(id));
      if (!user) return;

      setAnalytics(user);
      setShowAnalyticsModal(true);
    },
    [data]
  );

  const handleSearch = useCallback(
    (search: string) => {
      if (!search || search.length < 3) return;
      const searched = data.filter((data) => data.email === search);
      if (searched.length > 0) {
        setData(searched);
      }
    },
    [data]
  );

  return (
    <section id={styles.users}>
      <Menu title={PageNames.users} />
      <div className={styles.container}>
        <div>
          <FilledButton
            text="Criar usuário"
            type="function"
            onClickFunction={() => setShowCreateModal(true)}
          />
        </div>
        <CustomTable
          title="Usuários cadastrados"
          columns={UserColumns}
          data={data}
          showRow={handleAnalyticsViewReport}
          deleteRow={(email) => deleteUser(email)}
          handleSearch={handleSearch}
        />
      </div>

      <Modal showModal={showCreateModal} toogle={toogleCreateModal}>
        <UserForm cancel={() => setShowCreateModal(false)} />
      </Modal>

      <Modal showModal={showAnalyticsModal} toogle={toggleAnalyticsModal}>
        <AnalyticsReport data={analytics} />
      </Modal>
    </section>
  );
};

export default Users;
