import React, {useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Languages} from '@/locales/Languages';
import {MyTextInput} from '@/components/elements/textfield';
import styles from './styles';
import {Button} from '@/components/elements/button';
import {BUTTON_STYLES} from '@/components/elements/button/constants';
import {TextFieldActions} from '@/components/elements/textfield/types';
import FormValidate from '@/utils/FormValidate';
import {useAppStore} from '@/hooks';
import Popup, {PopupActions} from '@/components/Popup';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';
import {observer} from 'mobx-react';
import {requestLocationPermission} from '@/utils/Permissions';
import {useIsFocused} from '@react-navigation/native';
import ToastUtils from '@/utils/ToastUtils';

const Login = observer(() => {
  const refUser = useRef<TextFieldActions>(null);
  const refPass = useRef<TextFieldActions>(null);
  const {apiServices, common} = useAppStore();
  const refPopup = useRef<PopupActions>(null);
  const isFocus = useIsFocused();

  useEffect(() => {
    refUser.current?.setValue('adminadmin');
    refPass.current?.setValue('admin123');
    requestLocationPermission();
  }, [isFocus]);

  const onValidate = useCallback(() => {
    const _user = refUser?.current?.getValue();
    const _pass = refPass?.current?.getValue();
    const errUser = FormValidate.userNameValidate(_user || '');
    const errPass = FormValidate.passValidate(_pass || '');
    refUser.current?.setErrorMsg(errUser);
    refPass.current?.setErrorMsg(errPass);
    if (`${errUser}${errPass}`.length > 0) {
      return false;
    }
    return true;
  }, []);

  const onLogin = useCallback(async () => {
    if (onValidate()) {
      const resInfoAcc = await apiServices.common.getApiTest();
      ToastUtils.showSuccessToast('Success');
      //   refPopup.current?.show();
      Navigator.navigateToDeepScreen([ScreenName.bottomTab, ScreenName.homeStack]);
    }
  }, [apiServices, onValidate]);

  return (
    <View style={styles.container}>
      <MyTextInput
        ref={refUser}
        label={Languages.auth.labelUser}
        containerInput={styles.containerInput}
        labelStyle={styles.labelStyle}
        placeHolder={Languages.auth.placeHolderUserName}
      />
      <MyTextInput
        ref={refPass}
        label={Languages.auth.labelPass}
        containerInput={styles.containerInput}
        labelStyle={styles.labelStyle}
        placeHolder={Languages.auth.placeHolderPass}
        isPassword
      />
      <Button
        label={Languages.auth.login}
        buttonStyle={BUTTON_STYLES.BLUE}
        style={styles.button}
        onPress={onLogin}
      />
      {/* <MyBottomSheet
        data={mock()}
        styleButton={styles.button}
        colorButton={BUTTON_STYLES.GRAY}
        defaultValue={'admin'}
      /> */}
      <Popup title="Modal" description="show modal" ref={refPopup} />
    </View>
  );
});

export default Login;
