import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import styles from "./style";
import { SPACING } from "../../theme/theme";

interface Props<T> {
  data: T[];
  renderItem(item: T): JSX.Element;
  col?: number;
}
const GridView = <T extends any>(props: Props<T>) => {
  const { data, col = 2, renderItem } = props;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
      showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
    >
      <View style={{ marginLeft: -5, marginRight: -5 }}>
        <View style={[styles.container]}>
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  maxWidth: "50%",
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: "50%",
                  padding: SPACING.space_8,
                }}
              >
                <View>{renderItem(item)}</View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default GridView;
