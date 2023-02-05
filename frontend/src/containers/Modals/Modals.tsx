import { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { closeModal, MODAL_TYPES } from '../../redux/ducks/activeWindows';
import { AppState } from "../../redux/store";
import { IModal } from "../../interfaces/interfaces";

import './Modals.scss';
import Modal from '../../components/Modal/Modal';
import Loadable from '../../components/Loadable';


const components = {
  [MODAL_TYPES.successRegisterModal]: Loadable.SuccessRegisterModal,
  [MODAL_TYPES.successPasswordChangeModal]: Loadable.SuccessPasswordChangeModal,
  [MODAL_TYPES.successPasswordRecoveryModal]: Loadable.SuccessPasswordRecoveryModal,
  [MODAL_TYPES.agentModal]: Loadable.AgentModal,
  [MODAL_TYPES.inviteMemberModal]: Loadable.InviteMemberModal,
  [MODAL_TYPES.invitationInstructionsModal]: Loadable.InvitationInstructionsModal,
  [MODAL_TYPES.deleteAgentModal]: Loadable.DeleteAgentModal,
  [MODAL_TYPES.deleteInviteModal]: Loadable.DeleteInviteModal,
  [MODAL_TYPES.deleteAccountModal]: Loadable.DeleteAccountModal,
  [MODAL_TYPES.declineInviteModal]: Loadable.DeclineInviteModal,
  [MODAL_TYPES.eventModal]: Loadable.EventModal,
  [MODAL_TYPES.deleteEventModal]: Loadable.DeleteEventModal,
};

export interface IModalsProps {
  activeModals: IModal[];
  closeModal: (type?: string) => void;
}

const Modals = (props: IModalsProps) => {
  const {
    activeModals = [],
  } = props;
  
  useEffect(() => {
    if(activeModals.length > 0) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.removeAttribute('style');
    }
  }, [activeModals]);

  const modalsRoot = document.getElementById('modals-root');

  const renderComponent = (
    modal: IModal,
    pending: boolean,
    closeModal: () => void, 
    setPending:(pending: boolean) => void, 
  ) => {
    const Component = components[modal.type];

    return (
      <Component
        closeModal={closeModal}
        setPending={setPending}
        pending={pending}
        {...modal.props}
      />
    )
  }

  return (
    <>
      {modalsRoot && ReactDOM.createPortal(
        <Suspense fallback={<div>Loading...</div>}>
          {activeModals.map((modal: IModal) =>
            <Modal 
              key={modal.type} 
              onClose={() => props.closeModal(modal.type)} 
              isCloseOutside={modal.props?.isCloseOutside}
            >
              {(closeModal: () => void, setPending: (pending: boolean) => void, pending: boolean) => {
                return renderComponent(modal, pending, closeModal, setPending)
              }}
            </Modal>
          )}
        </Suspense>,
        modalsRoot
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  activeModals: state.activeWindows.activeModals,
});

const mapDispatchToProps = {
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modals);