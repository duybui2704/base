import {useContext} from 'react';

import {PopupContext} from '../provider/popups-provider/context';

export const usePopup = () => {
  const payload = useContext(PopupContext);
  if (!payload) {
    throw new Error('usePopup must be use within PopupContext.');
  }
  return payload;
};
