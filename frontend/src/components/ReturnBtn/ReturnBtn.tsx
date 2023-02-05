import { Link } from 'react-router-dom';

import './ReturnBtn.scss';
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';

interface IReturnBtnProps {
  text?: string;
  route: string;
}

const ReturnBtn = (props: IReturnBtnProps) => {
  const { 
    text = 'Back', 
    route,
  } = props;
  
  return (
    <Link 
      className="return-btn"
      to={route}
    >
      <ArrowIcon className="return-btn__icon"/>
      
      <span>{text}</span>
    </Link>
  )
}

export default ReturnBtn;
