import React from 'react';
import {FlatList, FlatListProps, RefreshControl} from 'react-native';

import {COLORS} from '@/theme';

const MyFlatList = ({...props}: FlatListProps<any>) => (
  <FlatList
    {...props}
    refreshControl={
      <RefreshControl
        tintColor={COLORS.BLUE}
        colors={[COLORS.RED, COLORS.BLUE, COLORS.GRAY]}
        refreshing={props?.refreshing || false}
        onRefresh={props?.onRefresh || undefined}
      />
    }
  />
);

export default MyFlatList;
