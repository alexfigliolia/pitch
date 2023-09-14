import { connect, createUseState } from "@figliolia/react-galena";
import { FixedSelectModel } from "@packages/models/FixedSelect";

export const FixedSelect = new FixedSelectModel();

export const connectFixedSelect = connect(FixedSelect);
export const useFixedSelect = createUseState(FixedSelect);
