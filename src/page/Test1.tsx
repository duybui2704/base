import React from 'react';
import {View} from 'react-native';

const ComponentTest1 = (props: any) => {
  console.log('props ===', props);
  return <View style={{flex: 1, backgroundColor: 'yellow'}}>{/* <Text>test</Text> */}</View>;
};

export default ComponentTest1;
