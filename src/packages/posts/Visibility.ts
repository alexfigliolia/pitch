import { Visibility as VisibilityEnum } from "@packages/graphql";

export class Visibility {
  public static readonly values: VisibilityEnum[] = [
    VisibilityEnum.Friends,
    VisibilityEnum.Public,
  ];

  public static enumerate() {
    return VisibilityEnum;
  }
}
