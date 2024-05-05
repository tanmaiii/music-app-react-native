import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { RootRouteProps } from "../../../navigation/TStack";
import styles from "./style";
import ItemName from "./ItemName";
import ItemEmail from "./ItemEmail";
import ItemGender from "./ItemGender";

interface UpdateItemProps {}

const UpdateItem = (props: UpdateItemProps) => {
  const route = useRoute<RootRouteProps<"UpdateItem">>();
  const params = route.params;

  return (
    <>
      {params && params?.type === "name" && <ItemName />}

      {params && params?.type === "email" && (
        <ItemEmail />
      )}
      {params && params?.type === "gender" && <ItemGender/>}
    </>
  );
};

export default UpdateItem;