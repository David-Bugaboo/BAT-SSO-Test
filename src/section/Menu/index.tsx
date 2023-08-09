import Head from "next/head";
import Image from "next/image";
import AppPaths from "../../core/appPaths";
import PageNames from '../../core/pageNames'
import MenuItem from './components/MenuItem'
import styles from "./styles.module.scss";
import batLogo from "./../../../public/bat_logo.png";

interface Props {
  title: string;
}

const Menu = ({ title }: Props) => {
  return (
    <>
      <Head>
        <title>BAT - {title}</title>
      </Head>
      <div className={styles.container}>
        <Image
            src={batLogo}
            alt="Picture of the author"
            width={393}
            height={184}
        />
        <h3 className={styles.title}>simulador de cura de tabaco Estufa BAT</h3>
        <MenuItem menuDescription={PageNames.dashboard} active={title === PageNames.dashboard}  href={AppPaths.dashboard} />
        <MenuItem menuDescription={PageNames.users} active={title === PageNames.users} href={AppPaths.users} />
        <MenuItem menuDescription={PageNames.reports} active={title === PageNames.reports} href={AppPaths.reports} />
      </div>
    </>
  );
};

export default Menu;
