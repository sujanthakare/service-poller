export enum ServiceStatus {
	OK = 'OK',
	UNKNOWN = 'UNKNOWN',
	FAIL = 'FAIL',
}

export interface ServiceTransferObject {
	name: string;
	url: string;
}

export interface Service {
	id?: string;
	name: string;
	status: ServiceStatus;
	url: string;
	createdAt: string;
}

export interface IStoreState {
	services: Array<Service>;
}
