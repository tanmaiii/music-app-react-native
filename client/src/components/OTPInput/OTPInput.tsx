import React, { useRef } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
  StyleSheet,
} from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, SPACING } from "../../theme/theme";

type OTPInputProps = {
  length: number;
  value: Array<string>;
  disabled: boolean;
  onChange(value: Array<string>): void;
};

export const OTPInput: React.FunctionComponent<OTPInputProps> = ({
  length,
  disabled,
  value,
  onChange,
}) => {
  const inputRefs = useRef([]);

  const onChangeValue = (text: string, index: number) => {
    const newValue = value.map((item, valueIndex) => {
      if (valueIndex === index) {
        return text;
      }

      return item;
    });

    onChange(newValue);
  };

  const handleChange = (text: string, index: number) => {
    onChangeValue(text, index);

    if (text.length !== 0) {
      return inputRefs?.current[index + 1]?.focus();
    }

    return inputRefs?.current[index - 1]?.focus();
  };

  const handleBackspace = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const { nativeEvent } = event;

    if (nativeEvent.key === "Backspace") {
      handleChange("", index);
    }
  };

  return (
    <View style={styles.container}>
      {[...new Array(length)].map((_, index) => (
        <TextInput
          ref={(ref) => {
            if (ref && !inputRefs.current.includes(ref)) {
              inputRefs.current = [...inputRefs.current, ref];
            }
          }}
          key={index}
          maxLength={1}
          contextMenuHidden
          selectTextOnFocus
          editable={!disabled}
          style={styles.input}
          keyboardType="decimal-pad"
          testID={`OTPInput-${index}`}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleBackspace(event, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.space_28,
  },
  input: {
    fontSize: 24,
    color: COLORS.White1,
    textAlign: "center",
    width: 55,
    height: 55,
    backgroundColor: COLORS.Black1,
    fontFamily: FONTFAMILY.medium,
    borderRadius: 12,
    borderWidth: 0.6,
    borderColor: COLORS.WhiteRGBA32,
  },
});
