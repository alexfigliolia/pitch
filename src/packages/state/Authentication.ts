import { connect, createUseState } from "@figliolia/react-galena";
import { AuthenticationModel } from "@packages/models/Authentication";

export const Authentication = new AuthenticationModel();

export const connectAuthentication = connect(Authentication);
export const useAuthenticationState = createUseState(Authentication);
