import { State } from "@figliolia/galena";
import type { User } from "@packages/graphql";

export class AuthenticationModel extends State<{
  id: number;
  name: string;
  email: string;
  image: string;
  verified: boolean;
  token: string;
}> {
  constructor() {
    super("Authentication", {
      id: -1,
      name: "",
      email: "",
      image: "",
      token: "",
      verified: false,
    });
  }

  public setToken(token: string) {
    this.update(state => {
      state.token = token;
    });
  }

  public setUser<T extends User>(user: T) {
    this.update(state => {
      state.id = user.id;
      state.name = user.name;
      state.email = user.email;
      state.image = user.image;
      state.verified = user.verified;
    });
  }
}
