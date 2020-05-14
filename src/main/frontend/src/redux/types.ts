export enum ServiceStatus {
  OK = "OK",
  UNKNOWN = "UNKNOWN",
  FAIL = "FAIL",
}

export interface IStoreState {
  services: Array<{
    url: string;
    status: ServiceStatus;
  }>;
}
