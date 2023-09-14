import { State } from "@figliolia/galena";
import { AutoIncrementingID } from "@figliolia/event-emitter";

export class FixedSelectModel extends State<{
  ID: string;
  open: boolean;
  list: string[];
  title: string;
  selectedValue: string;
}> {
  private IDs = new AutoIncrementingID();
  constructor() {
    super("Fixed Select", {
      ID: "-1",
      list: [],
      title: "",
      open: false,
      selectedValue: "",
    });
  }

  public close() {
    this.update(state => {
      state.ID = "-1";
      state.open = false;
    });
  }

  public open(value: string, list: string[], title = "") {
    if (this.getState().open) {
      this.close();
      return;
    }
    const ID = this.IDs.get();
    this.update(state => {
      state.ID = ID;
      state.list = list;
      state.open = true;
      state.title = title;
      state.selectedValue = value;
    });
    return ID;
  }

  public selectValue(value: string) {
    this.update(state => {
      state.selectedValue = value;
    });
  }

  public setList(list: string[]) {
    this.update(state => {
      state.list = list;
    });
  }

  public toggle() {
    this.update(state => {
      const nextState = !state.open;
      state.open = nextState;
      if (!nextState) {
        state.selectedValue = "";
      }
    });
  }
}
