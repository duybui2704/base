/* eslint-disable react/prop-types */
import {Configs} from '@/common/Configs';
import MyFlatList from '@/components/flaslist/MyFlatList';
import {COLORS, Styles} from '@/theme';
import {SCREEN_WIDTH} from '@/utils/DimensionUtils';
import React, {useCallback, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {EnhancedProps} from './hoc/HOCTest';

const ComponentTest = (props: EnhancedProps) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const renderItemFlatList = useCallback(({item}: {item: any}) => {
    console.log('item', item);
    const onSelectItem = () => {
      setIsRefreshing(false);
    };
    return (
      <TouchableOpacity style={styles.itemFl} onPress={onSelectItem}>
        <Text style={styles.txtFl}>{item.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  const onRefreshing = useCallback(() => {
    setIsRefreshing(true);
  }, []);
  const keyExtractor = useCallback((item: any, index: number) => `${index}${item.id}`, []);
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <MyFlatList
        data={props.additionalProp || []}
        renderItem={renderItemFlatList}
        keyExtractor={keyExtractor}
        onRefresh={onRefreshing}
        contentContainerStyle={styles.flatList}
        refreshing={isRefreshing}
      />
    </View>
  );
};

export default ComponentTest;

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
