export enum ServiceStatus {
  OK = "OK",
  UNKNOWN = "UNKNOWN",
  FAIL = "FAIL",
}

export interface IStoreState {
  services: Array<{
    name: string;
    status: ServiceStatus;
  }>;
}
