import { IStoreState } from "./types";
import { createSelector } from "reselect";

export const servicesSelector = (state: IStoreState) => state.services;

export const getServices = createSelector(
  servicesSelector,
  (services) => services
);
