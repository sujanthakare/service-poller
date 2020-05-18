package se.kry.codetest;

public enum ServiceStatus {
    UNKNOWN("UNKNOWN"),
    FAIL("FAIL"),
    OK("OK");

    private String status;

    ServiceStatus(String serviceStatus) {
        this.status = serviceStatus;
    }

    public String getStatus() {
        return status;
    }

}
