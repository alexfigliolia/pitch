import { Dimensions } from "react-native";

export class DeviceInfo {
  public static isTablet = Dimensions.get("screen").width > 670;
}
