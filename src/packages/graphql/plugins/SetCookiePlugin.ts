import { Plugin } from "./Plugin";
import { DeviceStorage, type IDeviceStorage } from "@packages/local-storage";
import type { GraphQLClientResponse } from "graphql-request/build/esm/types";

export class SetCookiePlugin extends Plugin {
  static whiteList = new Set<keyof IDeviceStorage>(["P_User"]);

  public override onResponse<T>(response: GraphQLClientResponse<T>) {
    const setCookie = response.headers.get("set-cookie");
    if (!setCookie) {
      return;
    }
    const storageUpdates: [name: keyof IDeviceStorage, value: string][] = [];
    const tokens = setCookie.split(";").map(v => v.split("="));
    for (const [name, value] of tokens) {
      if (!!value && this.isWhiteListed(name)) {
        storageUpdates.push([name, value]);
      }
    }
    if (!storageUpdates.length) {
      return;
    }
    void DeviceStorage.multiSet(storageUpdates);
  }

  private isWhiteListed(name: string): name is keyof IDeviceStorage {
    return SetCookiePlugin.whiteList.has(name as any);
  }
}
