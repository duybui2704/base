import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  InputAccessoryView,
  Keyboard,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Languages} from '@/locales/Languages';
import {SCREEN_HEIGHT} from '@/utils/DimensionUtils';
import Validate from '@/utils/Validate';
import {myTextFieldStyle} from './styles';
import {TextFieldActions, TextFieldProps, TypeKeyBoard} from './types';
import {Configs, isIOS} from '@/common/Configs';
import {COLORS} from '@/theme';
import IcKeyBoardUp from '@/assets/svg/common/ic_keyboard_arrow_down.svg';
import IcKeyBoardDown from '@/assets/svg/common/ic_keyboard_arrow_down.svg';

export const MyTextInputKeyboardNavigation = forwardRef<TextFieldActions, TextFieldProps>(
  (
    {
      keyboardType = 'DEFAULT',
      value,
      placeHolder,
      isPassword,
      disabled,
      inputStyle,
      onChangeText,
      onEndEditing,
      maxLength,
      multiline,
      leftIcon,
      onFocusCallback,
      containerInput,
      rightIcon,
      testID,
      autoFocus,
      placeHolderColor,
      defaultValue,
      autoCapitalized,
      refArr,
      orderRef,
      inputAccessoryViewID,
      textContentType,
    }: TextFieldProps,
    ref?: any,
  ) => {
    useImperativeHandle(ref, () => ({
      setValue,
      fillValue,
      getValue,
      focus,
      blur,
      setErrorMsg,
    }));

    const [isFocusing, setFocus] = useState<boolean>(false);
    const [textfieldVal, setTextfieldVal] = useState<string>(`${value || ''}`);
    const [errMsg, setErrMsg] = useState<string>('');
    const [iconPass, setIconPass] = useState<boolean>(true);
    const [animation] = useState(new Animated.Value(0));
    const styles = myTextFieldStyle();

    const orgTextInput = useRef<TextInput>(null);

    const defInputProps = {
      keyboardType:
        TypeKeyBoard[keyboardType === 'NUMBER' ? (isIOS ? keyboardType : 'NUMERIC') : keyboardType],
      editable: !disabled,
    };

    useEffect(() => {
      if (onChangeText) {
        onChangeText(textfieldVal, placeHolder || testID);
      }
    }, [onChangeText, placeHolder, testID, textfieldVal, value]);

    const getValue = useCallback(() => textfieldVal.trim(), [textfieldVal]);

    const setValue = useCallback(
      (text: any) => {
        if (maxLength) {
          text = `${text}`.slice(0, maxLength);
        }
        setTextfieldVal(text);
        setErrMsg('');
      },
      [maxLength],
    );

    const fillValue = useCallback(
      (text: any) => {
        setValue(text);
      },
      [setValue],
    );

    useEffect(() => {
      if (!Validate.isEmpty(value)) {
        setValue(value);
      }
    }, [setValue, value]);

    const focus = useCallback(() => {
      if (orgTextInput.current) {
        orgTextInput.current?.focus();
      }
    }, []);

    const blur = useCallback(() => {
      if (orgTextInput.current) {
        orgTextInput.current?.blur();
      }
    }, []);

    const eventTextChange = useCallback(
      (text: string) => {
        setValue(text);
      },
      [setValue],
    );

    const eventEndEditing = useCallback(() => {
      if (onEndEditing) {
        onEndEditing(`${textfieldVal}`, placeHolder || testID);
      }
    }, [onEndEditing, placeHolder, textfieldVal, testID]);

    const onFocus = useCallback(() => {
      onFocusCallback?.(placeHolder);
      setFocus(true);
    }, [onFocusCallback, placeHolder]);

    const onBlur = useCallback(() => {
      setFocus(false);
    }, []);

    const containerStyle = useMemo(() => {
      const borderStyle = {
        borderColor: isFocusing ? COLORS.BLUE : COLORS.GRAY,
      };

      const style = {
        backgroundColor: disabled ? COLORS.GRAY : COLORS.WHITE,
      };

      const backgroundStyle = {
        backgroundColor: isFocusing ? COLORS.WHITE : COLORS.GRAY,
      };

      if (errMsg !== '') {
        borderStyle.borderColor = COLORS.RED;
      }
      return [
        styles.container,
        borderStyle,
        backgroundStyle,
        style,
        containerInput,
        {transform: [{translateX: animation}]},
      ];
    }, [animation, containerInput, disabled, errMsg, isFocusing, styles.container]);

    const _inputStyle = useMemo(
      () => inputStyle || styles.inputFont,
      [styles.inputFont, inputStyle],
    );

    const startShake = useCallback(() => {
      Animated.sequence([
        Animated.timing(animation, {toValue: 10, duration: 50, useNativeDriver: true}),
        Animated.timing(animation, {toValue: -10, duration: 50, useNativeDriver: true}),
        Animated.timing(animation, {toValue: 10, duration: 50, useNativeDriver: true}),
        Animated.timing(animation, {toValue: 0, duration: 50, useNativeDriver: true}),
      ]).start();
    }, [animation]);

    const errorMessage = useMemo(() => {
      const paddingText = {
        marginTop: -SCREEN_HEIGHT * 0.01,
        alignItems: 'flex-start',
        width: '100%',
      } as ViewStyle;
      if (!Validate.isStringEmpty(errMsg)) {
        return (
          <View style={paddingText}>
            <Text style={styles.errorMessage}>{errMsg}</Text>
          </View>
        );
      }
      return null;
    }, [errMsg, styles.errorMessage]);

    const setErrorMsg = useCallback(
      (msg: string) => {
        if (Validate.isStringEmpty(msg)) {
          return;
        }
        setErrMsg(msg);
        startShake();
      },
      [startShake],
    );

    const checkIconPass = useCallback(() => {
      setIconPass(!iconPass);
    }, [iconPass]);

    const checkIconRight = useMemo(() => {
      console.log('checkIconRight');
    }, []);

    const handleDown = useCallback(() => {
      if (orderRef !== refArr?.length) {
        refArr?.[orderRef]?.current?.focus();
      }
    }, [orderRef, refArr]);

    const handleUp = useCallback(() => {
      if (orderRef !== 1) {
        refArr?.[orderRef - 2]?.current?.focus();
      }
    }, [orderRef, refArr]);

    const renderHeaderKeyBroad = useMemo(
      () => (
        <InputAccessoryView nativeID={inputAccessoryViewID} style={styles.containerKeyBoard}>
          <View style={styles.viewKeyBoard}>
            <View style={styles.viewIconKeyBoard}>
              <TouchableOpacity
                onPress={handleDown}
                disabled={orderRef === refArr?.length}
                style={styles.tobIcon}>
                <IcKeyBoardDown
                  width={Configs.FontSize.size28}
                  height={Configs.FontSize.size28}
                  stroke={orderRef === refArr?.length ? COLORS.GRAY_10 : COLORS.GRAY}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUp} disabled={orderRef === 1} style={styles.tobIcon}>
                <IcKeyBoardUp
                  width={Configs.FontSize.size28}
                  height={Configs.FontSize.size28}
                  stroke={orderRef === 1 ? COLORS.GRAY_10 : COLORS.GRAY}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewPlaceHolder}>
              <Text style={styles.txtPlaceHolder}>{(!isPassword && value) || placeHolder}</Text>
            </View>
            <View style={styles.viewDone}>
              <TouchableOpacity style={styles.tobKeyBoard} onPress={() => Keyboard.dismiss()}>
                <Text style={styles.txtDone}>{Languages.common.done}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>
      ),
      [
        handleDown,
        handleUp,
        inputAccessoryViewID,
        isPassword,
        orderRef,
        placeHolder,
        refArr?.length,
        styles.containerKeyBoard,
        styles.tobIcon,
        styles.tobKeyBoard,
        styles.txtDone,
        styles.txtPlaceHolder,
        styles.viewDone,
        styles.viewIconKeyBoard,
        styles.viewKeyBoard,
        styles.viewPlaceHolder,
        value,
      ],
    );

    const handleKey = useCallback(
      ({nativeEvent}: any) => {
        if (nativeEvent.key.toString().slice(0, 3) === '+84') {
          nativeEvent.key = `0${nativeEvent.key.toString().slice(3, nativeEvent.key.length)}`;
          setValue(nativeEvent.key);
        }
      },
      [setValue],
    );

    return (
      <>
        <Animated.View style={containerStyle} ref={ref}>
          <View style={styles.flexRow}>
            {leftIcon}
            <TextInput
              ref={orgTextInput}
              {...defInputProps}
              style={[styles.inputStyle, _inputStyle]}
              placeholder={placeHolder}
              inputAccessoryViewID={inputAccessoryViewID}
              placeholderTextColor={placeHolderColor || COLORS.GRAY_4}
              selectionColor={COLORS.GRAY_4}
              numberOfLines={1}
              secureTextEntry={isPassword ? iconPass : false}
              autoCorrect={false}
              autoCapitalize={autoCapitalized || 'none'}
              value={`${textfieldVal}`}
              maxLength={maxLength}
              multiline={multiline}
              returnKeyType={multiline ? 'next' : 'done'}
              onChangeText={eventTextChange}
              onKeyPress={e => handleKey(e)}
              onEndEditing={eventEndEditing}
              onFocus={onFocus}
              onBlur={onBlur}
              editable={!disabled}
              testID={testID}
              autoFocus={autoFocus}
              defaultValue={defaultValue}
              textContentType={textContentType || 'none'}
              dataDetectorTypes="all"
            />
            {checkIconRight}
          </View>
        </Animated.View>
        {errorMessage}
        {isIOS && renderHeaderKeyBroad}
      </>
    );
  },
);
