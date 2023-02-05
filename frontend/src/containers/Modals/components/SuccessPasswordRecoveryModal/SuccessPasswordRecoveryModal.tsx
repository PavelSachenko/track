import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../../config/constants";
import { useWillUnmount } from '../../../../hooks';

import './SuccessPasswordRecoveryModal.scss'
import { ReactComponent as CheckIcon } from '../../../../icons/check.svg';

const SuccessPasswordRecoveryModal = (props: any) => {
  let navigate = useNavigate();

  useWillUnmount(() => {
    navigate(ROUTES.login);
  })

  return (
    <div className="password-recovery-modal modal-wrap">
      <div className="password-recovery-modal__icon">
        <CheckIcon />
      </div>

      <h2 className="password-recovery-modal__header">Success!</h2>

      <div className="password-recovery-modal__text">Your password has been successfully recovered!</div>

      <button 
        className="password-recovery-modal__button btn" 
        type="button"
        onClick={() => {
          props.closeModal();
          navigate(ROUTES.login);
        }}
      >
        Go to Login
      </button>
    </div>
  )
}

export default SuccessPasswordRecoveryModal;
