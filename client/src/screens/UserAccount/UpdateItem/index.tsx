import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { RootRouteProps } from "@/navigators/TStack";
import ItemEmail from "./ItemEmail";
import ItemGender from "./ItemGender";
import ItemName from "./ItemName";
import ItemPassowrd from "./ItemPassword";

interface UpdateItemProps {}

const UpdateItem = (props: UpdateItemProps) => {
  const route = useRoute<RootRouteProps<"UpdateItem">>();
  const params = route.params;

  return (
    <>
      {params && params?.type === "name" && <ItemName />}
      {params && params?.type === "email" && <ItemEmail />}
      {params && params?.type === "gender" && <ItemGender />}
      {params && params?.type === "password" && <ItemPassowrd />}
    </>
  );
};

export default UpdateItem;
