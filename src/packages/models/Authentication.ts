import { State } from "@figliolia/galena";

export class AuthenticationModel extends State<{
  id: number;
  name: string;
  email: string;
  verified: boolean;
  token: string;
}> {
  constructor() {
    super("Authentication", {
      id: -1,
      name: "",
      email: "",
      verified: false,
      token: "",
    });
  }
}
