import {Configs} from '@/common/Configs';
import {Languages} from '@/locales/Languages';
import {ItemProps} from '@/models/common-model';
import {COLORS, Styles} from '@/theme';
import {SCREEN_WIDTH} from '@/utils/DimensionUtils';
import FormatUtils from '@/utils/FormatUtils';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import React, {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react';
import {View, ViewStyle, StyleSheet, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Button} from './elements/button';
import {BUTTON_STYLES} from './elements/button/constants';
import {MyTextInput} from './elements/textfield';
import MyFlatList from './flaslist/MyFlatList';

type RNSheetProps = {
  defaultValue?: string;
  isSearch?: boolean;
  stylesContainer?: ViewStyle;
  onPress?: any;
  colorText?: string;
  styleButton?: ViewStyle;
  colorButton?: keyof typeof BUTTON_STYLES;
  data?: ItemProps[];
  height?: number;
};

type RNSheetActions = {
  show?: () => any;
  hide?: () => any;
};

const MyBottomSheet = forwardRef<RNSheetActions, RNSheetProps>(
  ({defaultValue, colorText, styleButton, colorButton, data, height}: RNSheetProps, ref) => {
    const refRBSheet = useRef<any>(null);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [dataSearch, setDataSearch] = useState<ItemProps[]>(data || []);

    const show = () => {
      refRBSheet.current?.open();
    };

    const hide = () => {
      refRBSheet.current?.close();
    };

    useImperativeHandle(ref, () => ({
      show,
    }));

    const keyExtractor = useCallback((item: any, index: number) => `${index}${item.id}`, []);

    const onRefreshing = useCallback(() => {
      setIsRefreshing(true);
    }, []);

    const renderItemFlatList = useCallback(({item}: {item: ItemProps}) => {
      const onSelectItem = () => {
        setIsRefreshing(false);
        hide();
      };
      return (
        <TouchableOpacity style={styles.itemFl} onPress={onSelectItem}>
          <Text style={styles.txtFl}>{item.text}</Text>
        </TouchableOpacity>
      );
    }, []);

    const onSearch = useCallback(
      (value: string) => {
        const _value = FormatUtils.removeAccents(value).toUpperCase();
        const _dataSearch = data?.filter((item: ItemProps) =>
          item.text?.toUpperCase().includes(_value),
        );
        setDataSearch(_dataSearch || []);
      },
      [data],
    );

    return (
      <View style={styles.container}>
        <Button
          label={defaultValue || Languages.common.choose}
          textColor={colorText || COLORS.WHITE}
          style={styleButton}
          buttonStyle={colorButton}
          onPress={show}
        />
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={height || SCREEN_HEIGHT / 3}
          animationType={'slide'}
          customStyles={{
            wrapper: {
              backgroundColor: COLORS.TRANSPARENT,
            },
            draggableIcon: {
              backgroundColor: COLORS.GRAY_4,
            },
            container: {
              backgroundColor: COLORS.GRAY_10,
              height: SCREEN_HEIGHT / 3,
            },
          }}>
          <View style={styles.viewFl}>
            <MyTextInput
              placeHolder={Languages.common.search}
              value={valueSearch}
              containerInput={styles.containerInput}
              onChangeText={onSearch}
            />
            <MyFlatList
              data={dataSearch}
              renderItem={renderItemFlatList}
              keyExtractor={keyExtractor}
              onRefresh={onRefreshing}
              contentContainerStyle={styles.flatList}
              refreshing={isRefreshing}
            />
          </View>
        </RBSheet>
      </View>
    );
  },
);

export default MyBottomSheet;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Configs.FontSize.size16,
  },
  viewFl: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Configs.FontSize.size8,
  },
  containerInput: {
    width: SCREEN_WIDTH * 0.85,
    marginBottom: Configs.FontSize.size5,
  },
  flatList: {
    paddingBottom: Configs.FontSize.size10,
  },
  itemFl: {
    width: SCREEN_WIDTH * 0.85,
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY_4,
    paddingHorizontal: Configs.FontSize.size16,
    height: Configs.FontSize.size32,
    justifyContent: 'center',
  },
  txtFl: {
    ...Styles.typography.regular,
  },
});
