import './SuccessRegisterModal.scss'
import { ReactComponent as CheckIcon } from '../../../../icons/check.svg';

const SuccessRegisterModal = (props: any) => {

  return (
    <div className="success-register-modal modal-wrap">
      <div className="success-register-modal__icon">
        <CheckIcon />
      </div>

      <h2 className="success-register-modal__header">Congratulations!</h2>

      <div className="success-register-modal__text">Your account has been created successfully!</div>

      <button 
        className="success-register-modal__button btn" 
        type="button"
        onClick={() => props.closeModal()}
      >
        Run
      </button>
    </div>
  )
}

export default SuccessRegisterModal;
