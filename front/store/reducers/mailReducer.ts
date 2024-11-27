import { produce } from 'immer';
import {
  CONTACT_FAILURE,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  INITIALIZE_CONTACT,
  MailAction,
  MailState
} from 'store/types/mailType';

export const initialState: MailState = {
  contactLoading: false,
  contactDone: false,
  contactError: null
};

const reducer = (state: MailState = initialState, action: MailAction): MailState => {
  return produce(state, draft => {
    switch (action.type) {
      case INITIALIZE_CONTACT:
        draft.contactLoading = false;
        draft.contactDone = false;
        draft.contactError = null;
        break;
      case CONTACT_REQUEST:
        draft.contactLoading = true;
        draft.contactDone = false;
        draft.contactError = null;
        break;
      case CONTACT_SUCCESS:
        draft.contactLoading = false;
        draft.contactDone = true;
        break;
      case CONTACT_FAILURE:
        draft.contactLoading = false;
        draft.contactError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
