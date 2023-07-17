// @ts-ignoreimport {StyleProp} from 'react-native/types';

declare module 'my-component' {
  export enum BUTTON_STYLES {
    BLACK = 'BLACK',
    RED = 'RED',
    GRAY = 'GRAY',
    BLUE = 'BLUE',
    WHITE = 'WHITE',
  }

  export interface ButtonProps {
    label: string | number;
    style?: any;
    buttonStyle?: keyof typeof BUTTON_STYLES;
    fontSize?: number;
    textColor?: string;
    icon?: any;
    isLoading?: boolean;
    leftIcon?: any;
    onPress?: (tag?: string) => any;
    disabled?: boolean;
    hasRightIcon?: boolean;
    isIconFont?: boolean;
    isLowerCase?: boolean;
    tag?: any;
    radius?: any;
    rightIcon?: any;
  }

  export interface InputProps {
    keyboardType?: any;
    label?: string;
    value?: string | number;
    placeHolder?: string;
    isPassword?: boolean;
    rightIcon?: string;
    disabled?: boolean;
    hasUnderline?: boolean;
    multiline?: boolean;
    maxLength?: number;
    formatPrice?: boolean;
    formatNumber?: boolean;
    formatEmail?: boolean;
    verified?: boolean;
    showRestriction?: boolean;
    priceSuffix?: string;
    placeHolderColor?: string;
    backgroundColor?: any;
    leftIcon?: any;
    iconSize?: number;
    inputStyle?: any;
    inputStylePwDIcon?: any;
    containerInput?: any;
    hideIconClear?: boolean;
    minHeight?: number | string;
    maxHeight?: number | string;
    testID?: string;
    autoFocus?: boolean;
    onKeyPress?: (text: any, tag?: any) => any;
    onChangeText?: (text: string, tag?: string) => any;
    onEndEditing?: (text: string, tag?: string) => any;
    onClickRightIcon?: (text: string) => any;
    onFocusCallback?: (tag?: string) => any;
    defaultValue?: string;
    autoCapitalized?: any;
    labelStyle?: any;
    ref: any;
    refArr?: Array<any>;
    orderRef?: number | undefined | any;
    inputAccessoryViewID?: string;
    textContentType?: string | any;
  }

  export interface TouchableProps {
    children: any;
    size?: number;
    radius?: number;
    underlayColor?: string;
    style?: any;
    onPress?: () => any;
  }

  export interface RNSheetProps {
    defaultValue?: string;
    isSearch?: boolean;
    stylesContainer?: any;
    onPress?: any;
    colorText?: string;
    styleButton?: any;
    colorButton?: keyof typeof BUTTON_STYLES;
    data?: any;
    height?: number;
    ref: any;
  }

  export const MyTextInput: React.FC<InputProps>;
  export const MyTextInputKeyboardNavigation: React.FC<InputProps>;
  export const Button: React.FC<ButtonProps>;
  export const Touchable: React.FC<TouchableProps>;
  export const MyBottomSheet: React.FC<RNSheetProps>;
}
