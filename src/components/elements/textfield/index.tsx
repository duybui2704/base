import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Animated, TextInput, View, Text} from 'react-native';

import {isIOS} from '../../../common/Configs';
import {COLORS} from '../../../theme';
import Validate from '@/utils/Validate';
import {myTextFieldStyle} from './styles';
import {TextFieldActions, TextFieldProps, TypeKeyBoard} from './types';
//

export const MyTextInput = forwardRef<TextFieldActions, TextFieldProps>(
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
      onKeyPress,
      placeHolderColor,
      defaultValue,
      autoCapitalized,
      label,
      labelStyle,
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
      if (!Validate.isStringEmpty(errMsg)) {
        return <Text style={styles.errorMessage}>{errMsg}</Text>;
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
      console.log('icon right');
    }, []);

    return (
      <View style={styles.containerView}>
        <Text style={labelStyle}>{label}</Text>
        <Animated.View style={containerStyle} ref={ref}>
          <View style={styles.flexRow}>
            {leftIcon}
            <TextInput
              ref={orgTextInput}
              {...defInputProps}
              style={[styles.inputStyle, _inputStyle]}
              placeholder={placeHolder}
              placeholderTextColor={placeHolderColor || COLORS.GRAY}
              selectionColor={COLORS.GRAY}
              numberOfLines={1}
              secureTextEntry={isPassword ? iconPass : false}
              autoCorrect={false}
              autoCapitalize={autoCapitalized || 'none'}
              value={`${textfieldVal}`}
              maxLength={maxLength}
              multiline={multiline}
              returnKeyType={multiline ? 'next' : 'done'}
              onChangeText={eventTextChange}
              onKeyPress={onKeyPress}
              onEndEditing={eventEndEditing}
              onFocus={onFocus}
              onBlur={onBlur}
              editable={!disabled}
              testID={testID}
              autoFocus={autoFocus}
              defaultValue={defaultValue}
            />
            {checkIconRight}
          </View>
        </Animated.View>
        {errorMessage}
      </View>
    );
  },
);
