import { useCallback, useContext, useEffect, useState } from "react";
import FilledButton from "../../components/FilledButton";
import Input from "../../components/Input";
import { AuthContext } from '../../context/AuthContext'
import ApiPaths from "../../core/apiPaths";
import PageNames from "../../core/pageNames";
import InputRegisterUser from "../../DTOs/InputRegisterUser";
import OutputRegisterUser from "../../DTOs/OutputRegisterUser";
import Role from "../../entities/enum/Role.enum";
import Menu from "../../section/Menu";
import { HttpService } from "../../services/HTTP.service";
import styles from "../../styles/Users.module.scss";

interface Props {
  cancel: () => any;
}

const UserForm = ({ cancel }: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>(Role.OBSERVABLE);

  const { checkAuth } = useContext(AuthContext)
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleRegister = useCallback(async () => {
    const input: InputRegisterUser = {
      userData: {
        name,
        email,
        roles: [],
      },
    };

    input.userData.roles.push(role);

    try {
      await new HttpService().post<InputRegisterUser, OutputRegisterUser>(
        ApiPaths.users,
        input
      );
      cancel();
    } catch {
      alert("Verifique os dados por favor");
    }
  }, [cancel, email, name, role]);

  return (
    <div className={styles.containerUserForm}>
      <div>
        <h1>Cadastrar Usuário</h1>
        <Input
          name="Nome"
          type="text"
          placeholder="Digite o nome do usuário"
          value={name}
          onChangeFunction={setName}
        />
        <Input
          name="E-mail"
          type="email"
          placeholder="Digite o email do usuário"
          value={email}
          onChangeFunction={setEmail}
        />
        <div className={styles.selectRole}>
          <p>Selecione o papel do usuário:</p>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value={Role.ADMIN}>Administrador</option>
            <option value={Role.OBSERVABLE}>Observador</option>
          </select>
        </div>
        <div>
          <FilledButton
            text="Cancelar"
            type="function"
            onClickFunction={cancel}
          />
          <FilledButton
            text="Cadastrar"
            type="function"
            onClickFunction={handleRegister}
          />
        </div>
      </div>
    </div>
  );
};

export default UserForm;
