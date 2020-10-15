import { Loginstate, Setloginfalse, Setlogintrue } from "./types";
import axios from "axios";

export const Setlogintofalse = () => async (dispatch) => {
  dispatch({
    type: Setloginfalse,
  });
};

export const Setlogintotrue = (data) => async (dispatch) => {
  dispatch({
    type: Setlogintrue,
    payload: data,
  });
};

export const getTokenConfig = (getState) => {
  const token = getState().loginstate.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
};
