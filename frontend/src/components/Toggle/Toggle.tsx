import './Toggle.scss';

interface IToggleProps {
  name: string;
  active: boolean;
  title?: string;
  isDisabled?: boolean;
  onToggle: () => void;
};

const Toggle = ({ name, active, title, isDisabled, onToggle }: IToggleProps) => {
  const getBgStyle = (className: string): string => `${className}--${active ? 'true' : 'false'}`;

  const id: string = String(Math.random() * 1000);

  return (
    <label className='toggle' htmlFor={id} >
      {title &&
        <span className='toggle__title'>{title}</span>
      }

      <input
        type="checkbox"
        name={name}
        id={id}
        className="toggle__checkbox"
        checked={active}
        onChange={onToggle}
        disabled={isDisabled}
      />

      <div className={`toggle__main ${getBgStyle('toggle__main')}`}>
        <div className={`toggle__indicator ${getBgStyle('toggle__indicator')}`}></div>
      </div>
    </label>
  );
};

export default Toggle;