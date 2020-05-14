import backEnd from "./backEnd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_SERVICES } from "./actionTypes";
import { getServices } from "./selectors";

export const useServices = () => {
  const dispatch = useDispatch();
  const services = useSelector(getServices);

  const createService = useCallback(async (url: string) => {
    return await backEnd.createService(url);
  }, []);

  const deleteService = useCallback(async (url: string) => {
    return await backEnd.deleteService(url);
  }, []);

  const editService = useCallback(async (oldUrl: string, url: string) => {
    return await backEnd.editService(oldUrl, url);
  }, []);

  const loadServices = useCallback(async () => {
    const response = await backEnd.getServices();
    dispatch({
      type: LOAD_SERVICES,
      payload: response,
    });
  }, [dispatch]);

  return {
    createService,
    deleteService,
    editService,
    loadServices,
    services,
  };
};
