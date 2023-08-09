import Link, { LinkProps } from "next/link";
import { BsCaretRight, BsCaretRightFill} from "react-icons/bs";
import styles from './styles.module.scss'

interface Props extends React.PropsWithChildren<LinkProps> {
  menuDescription: string;
  active: boolean
}

const MenuItem = ({ menuDescription, active, ...props }: Props) => {
  return (
    <Link {...props}>
      <div className={styles.container}>
        {active ? <BsCaretRightFill size={24} /> : <BsCaretRight size={24} /> }       
        <a>{menuDescription}</a>
      </div>
    </Link>
  );
};

export default MenuItem;
