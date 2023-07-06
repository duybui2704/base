import React, {useCallback, useMemo} from 'react';
import {TextStyle, Text} from 'react-native';

import {Configs} from '@/common/Configs';
import {ButtonProps} from './types';
import {COLORS} from '@/theme';
import {Touchable} from '../touchable';
import {BUTTON_STYLES} from './constants';
import {styles} from './styles';

export const Button = ({
  label,
  style,
  buttonStyle,
  fontSize = Configs.FontSize.size16,
  isLoading,
  onPress,
  disabled,
  textColor,
  isLowerCase,
  leftIcon,
  rightIcon,
  tag,
  radius,
}: ButtonProps) => {
  const getContainerStyle = useMemo(() => {
    if (disabled) {
      return [styles.container, styles.grayButton, style];
    }
    let containerStyle = {};
    switch (buttonStyle) {
      case BUTTON_STYLES.RED:
        containerStyle = styles.redButton;
        break;
      case BUTTON_STYLES.BLUE:
        containerStyle = styles.blueButton;
        break;
      case BUTTON_STYLES.GRAY:
        containerStyle = styles.grayButton;
        break;
      case BUTTON_STYLES.WHITE:
        containerStyle = styles.whiteButton;
        break;
      case BUTTON_STYLES.BLACK:
      default:
        containerStyle = styles.blackButton;
        break;
    }

    return [styles.container, containerStyle, style];
  }, [disabled, buttonStyle, style]);

  const getTextColor = useMemo(() => {
    if (disabled) {
      return COLORS.GRAY;
    }
    let color;
    switch (buttonStyle) {
      case BUTTON_STYLES.WHITE:
        color = COLORS.BLACK;
        break;
      case BUTTON_STYLES.BLACK:
        color = COLORS.WHITE;
        break;
      case BUTTON_STYLES.RED:
        color = COLORS.WHITE;
        break;
      case BUTTON_STYLES.BLUE:
        color = COLORS.WHITE;
        break;
      default:
        color = COLORS.GRAY;
        break;
    }
    return textColor || color;
  }, [buttonStyle, disabled, textColor]);

  const getTextStyle = useMemo<TextStyle[]>(() => {
    const color = getTextColor;
    return [styles.text, {color, fontSize}];
  }, [fontSize, getTextColor]);

  const _onPress = useCallback(() => {
    onPress?.(tag || label);
  }, [label, onPress, tag]);

  return (
    <Touchable
      disabled={isLoading || disabled}
      style={getContainerStyle}
      radius={radius || styles.container.borderRadius}
      onPress={_onPress}>
      {leftIcon}
      <Text style={getTextStyle}>{!isLowerCase ? `${label}`.toUpperCase() : `${label}`}</Text>
      {rightIcon}
    </Touchable>
  );
};
