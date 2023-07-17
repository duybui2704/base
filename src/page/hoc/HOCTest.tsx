import React, {ComponentType, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import ComponentTest from '../Test';
import ComponentTest1 from '../Test1';

// Define the props for the input component
interface InputProps {
  name: string;
  additionalProp: Array<any>;
}

// Define the props for the enhanced component
export interface EnhancedProps extends InputProps {
  additionalProp: Array<any>;
  onPress: any;
}

// Define the Higher Order Component
function withAdditionalProp<T extends InputProps>(
  WrappedComponent: ComponentType<any>,
): ComponentType<EnhancedProps> {
  return (props: EnhancedProps) => {
    // Add the additional prop to the props
    const [value, setValue] = useState<string>('component 1');
    const enhancedProps: EnhancedProps = {
      ...props,
    };

    const onChange = () => {
      console.log('onChange');
      setValue('change value');
    };

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={onChange}>
          <Text>{value}</Text>
        </TouchableOpacity>
        <WrappedComponent {...enhancedProps} data={value} />
      </View>
    );
  };
}

// Define a simple component

// Enhance MyComponent using the withAdditionalProp Higher Order Component
const EnhancedComponent = withAdditionalProp(ComponentTest);
const EnhancedComponent1 = withAdditionalProp(ComponentTest1);

export {EnhancedComponent, EnhancedComponent1};
