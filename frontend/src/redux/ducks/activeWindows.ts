import { Dispatch } from 'redux';

import { IActiveWindowsState } from './ducks.types';
import { IAction, IAnyObject } from '../../interfaces/interfaces';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const MODAL_TYPES = {
  successRegisterModal: 'successRegisterModal',
  successPasswordChangeModal: 'successPasswordChangeModal',
  successPasswordRecoveryModal: 'successPasswordRecoveryModal',
  agentModal: 'agentModal',
  inviteMemberModal: 'inviteMemberModal',
  invitationInstructionsModal: 'invitationInstructionsModal',
  deleteAgentModal: 'deleteAgentModal',
  deleteInviteModal: 'deleteInviteModal',
  deleteAccountModal: 'deleteAccountModal',
  declineInviteModal: 'declineInviteModal',
  eventModal: 'eventModal',
  deleteEventModal: 'deleteEventModal',
}

export const openModal = (type: string, props?: IAnyObject) => (dispatch: Dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    payload: {
      type,
      props,
    },
  })
}

export const closeModal = (modalType?: string) => (dispatch: Dispatch) => { // delete last item by default
  setTimeout(() => {
    dispatch({
      type: CLOSE_MODAL,
      payload: modalType,
    })
  }, 500)
}

const initialState: IActiveWindowsState = {
  activeModals: [],
  activeModalsEntities: {},
};

const activeWindowsReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case OPEN_MODAL: {
      const { type, props } = payload;

      const newModal = {
        type,
        props,
      };

      return {
        ...state,
        activeModals: [...state.activeModals, newModal],
        activeModalsEntities: {
          ...state.activeModalsEntities,
          [newModal.type]: true,
        }
      }
    }

    case CLOSE_MODAL: {
      const updatedActiveModals = [...state.activeModals];
      const updatedEntities = { ...state.activeModalsEntities };

      const lastIndex = updatedActiveModals.length - 1;
      const removedIndex = payload
        ? state.activeModals.findIndex(modal => modal.type === payload)
        : lastIndex;

      if (removedIndex === -1) {
        return state;
      }

      delete updatedEntities[updatedActiveModals[removedIndex].type]

      updatedActiveModals.splice(removedIndex, 1);

      return {
        ...state,
        activeModals: updatedActiveModals,
        activeModalsEntities: updatedEntities,
      }
    }

    default:
      return state;
  }
};

export default activeWindowsReducer;