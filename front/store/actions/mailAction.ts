import { CONTACT_REQUEST, INITIALIZE_CONTACT } from 'store/types/mailType';

export const initializeContact = () => ({
  type: INITIALIZE_CONTACT
});

export const contactRequest = (sender: string, content: string) => ({
  type: CONTACT_REQUEST,
  sender,
  content
});
