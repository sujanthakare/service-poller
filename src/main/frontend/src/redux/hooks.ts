import backEnd from './backEnd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_SERVICES } from './actionTypes';
import { getServices } from './selectors';
import { ServiceTransferObject } from './types';

export const useServices = () => {
	const dispatch = useDispatch();
	const services = useSelector(getServices);

	const createService = useCallback(async (service: ServiceTransferObject) => {
		return await backEnd.createService(service);
	}, []);

	const deleteService = useCallback(async (id = '') => {
		return await backEnd.deleteService(id);
	}, []);

	const editService = useCallback(async (id = '', service: ServiceTransferObject) => {
		return await backEnd.editService(id, service);
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
