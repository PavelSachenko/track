import './SuccessPasswordChangeModal.scss'
import { ReactComponent as CheckIcon } from '../../../../icons/check.svg';

const SuccessPasswordChangeModal = (props: any) => {

  return (
    <div className="password-change-modal modal-wrap">
      <div className="password-change-modal__icon">
        <CheckIcon />
      </div>

      <h2 className="password-change-modal__header">Success!</h2>

      <div className="password-change-modal__text">Your password has been successfully changed!</div>

      <button 
        className="password-change-modal__button btn" 
        type="button"
        onClick={() => props.closeModal()}
      >
        Okey
      </button>
    </div>
  )
}

export default SuccessPasswordChangeModal;
