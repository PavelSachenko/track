import './Spinner.scss';

interface ISpinnerProps {
  className?: string;
  size?: string;
  style?: { [key: string]: string }
}

const Spinner = (props: ISpinnerProps) => {
  const {
    size = '30px',
    className = '',
    style = {},
  } = props;

  return (
    <div
      className={className ? `spinner ${className}` : 'spinner'}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    ></div>
  )
};

export default Spinner;