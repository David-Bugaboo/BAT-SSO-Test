import { useState } from 'react'
import { BsXLg } from 'react-icons/bs'
import styles from "./styles.module.scss";

interface Props {
  children?: React.ReactNode;
  showModal: boolean;
  toogle: () => void
}
const Modal = ({ children, showModal, toogle }: Props) => {

  return (
    <div className={styles.modal} style={{ display: showModal ? "flex" : "none" }}>
      <div className={styles.close} onClick={() => toogle() }>
        <BsXLg size={18} />
      </div>
      {children}
    </div>
  );
};

export default Modal;
