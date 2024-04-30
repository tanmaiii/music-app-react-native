import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface KeyboardAvoidingContainerProps {
  children: React.ReactNode;
}

const KeyboardAvoidingContainer = ({ children }: KeyboardAvoidingContainerProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  container: {},
});
