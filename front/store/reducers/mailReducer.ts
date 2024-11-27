import { produce } from 'immer';
import {
  EMAIL_AUTH_FAILURE,
  EMAIL_AUTH_REQUEST,
  EMAIL_AUTH_SUCCESS,
  CHECK_CODE_FAILURE,
  CHECK_CODE_REQUEST,
  CHECK_CODE_SUCCESS,
  CONTACT_FAILURE,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  INITIALIZE_CONTACT,
  MailAction,
  MailState,
  INITIALIZE_CHANGE_PASSWORD,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from 'store/types/mailType';

export const initialState: MailState = {
  emailAuthLoading: false,
  emailAuthDone: false,
  emailAuthError: null,
  checkCodeLoading: false,
  checkCodeDone: false,
  checkCodeError: null,
  changePasswordLoading: false,
  changePasswordDone: false,
  changePasswordError: null,
  contactLoading: false,
  contactDone: false,
  contactError: null
};

const reducer = (state: MailState = initialState, action: MailAction): MailState => {
  return produce(state, draft => {
    switch (action.type) {
      case EMAIL_AUTH_REQUEST:
        draft.emailAuthLoading = true;
        draft.emailAuthDone = false;
        draft.emailAuthError = null;
        break;
      case EMAIL_AUTH_SUCCESS:
        draft.emailAuthLoading = false;
        draft.emailAuthDone = true;
        break;
      case EMAIL_AUTH_FAILURE:
        draft.emailAuthLoading = false;
        draft.emailAuthError = action.error;
        break;
      case CHECK_CODE_REQUEST:
        draft.checkCodeLoading = true;
        draft.checkCodeDone = false;
        draft.checkCodeError = null;
        break;
      case CHECK_CODE_SUCCESS:
        draft.checkCodeLoading = false;
        draft.checkCodeDone = true;
        break;
      case CHECK_CODE_FAILURE:
        draft.checkCodeLoading = false;
        draft.checkCodeError = action.error;
        break;
      case INITIALIZE_CHANGE_PASSWORD:
        draft.emailAuthLoading = false;
        draft.emailAuthDone = false;
        draft.emailAuthError = null;
        draft.checkCodeLoading = false;
        draft.checkCodeDone = false;
        draft.checkCodeError = null;
        draft.changePasswordLoading = false;
        draft.changePasswordDone = false;
        draft.changePasswordError = null;
        break;
      case CHANGE_PASSWORD_REQUEST:
        draft.changePasswordLoading = true;
        draft.changePasswordDone = false;
        draft.changePasswordError = null;
        break;
      case CHANGE_PASSWORD_SUCCESS:
        draft.changePasswordLoading = false;
        draft.changePasswordDone = true;
        break;
      case CHANGE_PASSWORD_FAILURE:
        draft.changePasswordLoading = false;
        draft.changePasswordError = action.error;
        break;
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
