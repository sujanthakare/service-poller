import { ServiceTransferObject } from './types';

const headers = {
	Accept: 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
};

const deleteService = async (id = '') => {
	if (!id) {
		return;
	}

	return await fetch(`/api/service/${id}`, {
		method: 'delete',
		headers,
	});
};

const editService = async (id = '', serivce: ServiceTransferObject) => {
	if (!id) {
		return;
	}

	return await fetch(`/api/service/${id}`, {
		method: 'put',
		headers,
		body: JSON.stringify(serivce),
	});
};

const createService = async (serivce: ServiceTransferObject) =>
	await fetch('/api/service', {
		method: 'post',
		headers,
		body: JSON.stringify(serivce),
	});

const getServices = async () => {
	const res = await fetch('/api/service', {
		method: 'get',
		headers,
	});
	return await res.json();
};

export default {
	deleteService,
	editService,
	createService,
	getServices,
};
