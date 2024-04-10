import * as React from "react";
import { Text, View, StyleSheet, Animated, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface TouchableScaleProps extends TouchableOpacityProps {
  children: React.ReactNode; 
}

const TouchableScale = (props: TouchableScaleProps) => {
  const [scaleValue] = React.useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98, // Giảm kích thước khi nhấn
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Khôi phục kích thước ban đầu khi nhấn ra
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={1} {...props}>
      <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
        {props.children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TouchableScale;

const styles = StyleSheet.create({
  container: {},
});
