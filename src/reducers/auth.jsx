import { Setloginfalse, Setlogintrue } from "../actions/types";

export default function (
  state = { state: false, token: "", username: "" },
  action
) {
  switch (action.type) {
    case Setlogintrue: {
      return {
        state: true,
        token: action.payload.token,
        username: action.payload.username,
      };
    }

    case Setloginfalse: {
      localStorage.removeItem("token");
      return { state: false, token: "", username: "" };
    }

    default:
      return state;
  }
}
