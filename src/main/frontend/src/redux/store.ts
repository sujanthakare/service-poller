import { createStore } from "redux";
import { IStoreState } from "./types";
import { LOAD_SERVICES } from "./actionTypes";

const defaultState: IStoreState = {
  services: [],
};

const appReducer = (state = defaultState, action: any): IStoreState => {
  if (action.type === LOAD_SERVICES) {
    return {
      services: action.payload,
    };
  }

  return state;
};

const store = createStore(appReducer);

export default store;
