import React, {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {PopupActions, PopupProps} from './types';
import {Languages} from '@/locales/Languages';
import {MyStylesPopupNoInternet} from './styles';

const PopupNoInternet = forwardRef<PopupActions, PopupProps>(({onClose}: PopupProps, ref) => {
  const styles = MyStylesPopupNoInternet();
  const [visible, setVisible] = useState<boolean>(false);
  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      useNativeDriver={true}
      onBackdropPress={hide}
      avoidKeyboard={true}
      hideModalContentWhileAnimating>
      <View style={styles.popup}>
        <Text style={styles.txtTitle}>{Languages.noInternet.offline}</Text>
        <Text style={styles.txtContent}>{Languages.noInternet.desNoInternet}</Text>
      </View>
    </Modal>
  );
});

export default PopupNoInternet;
