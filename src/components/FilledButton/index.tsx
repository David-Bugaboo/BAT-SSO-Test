import styles from './style.module.scss';


interface FilledButtonProps {
  text: string;
  target?: string;
  url?: string;
  type?: 'function' | 'link';
  onClickFunction?: () => void;
  width?: string;
}

const FilledButton = ({
  text,
  target = '_blank',
  url,
  type = 'link',
  onClickFunction,
  width = 'auto',
}: FilledButtonProps) => {
  const getWrapper = (elem: JSX.Element) => {
    switch (type) {
      case 'link':
        return (
          <a className={`${styles.container}`} href={url} target={target}>
            {elem}
          </a>
        );
      case 'function':
        return (
          <button className={styles.container} onClick={() => (onClickFunction ? onClickFunction() : console.log(onClickFunction))}>
            {elem}
          </button>
        );
    }
  };

  const getMiddle = (): JSX.Element => {
    return (
      <div style={{ width }}>
        {text}
      </div>
    );
  };

  const renderButton = () => {
    const middle = getMiddle();
    return getWrapper(middle);
  };

  return renderButton();
};

export default FilledButton;
