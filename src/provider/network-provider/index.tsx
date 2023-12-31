import RNNetInfo from '@react-native-community/netinfo';
import {observer, useLocalObservable} from 'mobx-react';
import React, {useEffect, useRef, useMemo} from 'react';

import {NetworkContext} from './context';
import PopupNoInternet from '@/components/popup';
import {PopupActions} from '@/components/popup-offline/types';
import {useAppStore} from '@/hooks';

export const NetworkProvider = observer(({children}: any) => {
  const popupRef = useRef<PopupActions>(null);
  const storeLocal = useLocalObservable(() => ({}));
  const {networkManager: networkInfo} = useAppStore();

  useEffect(() => {
    const unsubscribe = RNNetInfo.addEventListener(state => {
      if (!state?.isConnected) {
        popupRef.current?.show();
      } else {
        popupRef.current?.hide?.();
      }
    });
    return () => {
      unsubscribe();
    };
  }, [networkInfo, storeLocal]);

  const renderPopupNoInternet = useMemo(() => <PopupNoInternet ref={popupRef} />, [popupRef]);
  return (
    <>
      <NetworkContext.Provider value={storeLocal}>{children}</NetworkContext.Provider>
      {renderPopupNoInternet}
    </>
  );
});
