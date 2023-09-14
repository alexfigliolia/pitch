import React, { memo, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { Styles } from "./Styles";
import { UtilityStyles } from "@packages/styles";
import { Plus } from "@packages/icons/plus";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export const AddPost = memo(() => {
  const navigation = useNavigation<NavigationProp<any>>();

  const navigate = useCallback(() => {
    navigation.navigate("create-post");
  }, [navigation]);

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
