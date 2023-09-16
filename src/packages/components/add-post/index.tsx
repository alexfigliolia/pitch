import React, { memo, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { Router } from "@figliolia/rn-navigation";
import { UtilityStyles } from "@packages/styles";
import { Plus } from "@packages/icons/plus";
import { Styles } from "./Styles";

export const AddPost = memo(() => {
  const navigate = useCallback(() => {
    Router.navigate("create-post");
  }, []);

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={navigate}
        style={[UtilityStyles.Fill, UtilityStyles.Center]}>
        <View style={Styles.icon}>
          <Plus />
        </View>
      </TouchableOpacity>
    </View>
  );
});
