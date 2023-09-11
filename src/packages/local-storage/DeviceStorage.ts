import { TypeSafeStorage } from "@figliolia/type-safe-storage";
import type { IDeviceStorage } from "./types";

export const DeviceStorage = new TypeSafeStorage<IDeviceStorage>();
