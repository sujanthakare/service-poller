package se.kry.codetest.model;

import se.kry.codetest.ServiceStatus;

import java.util.concurrent.atomic.AtomicInteger;

public class Service {
    private static final AtomicInteger COUNTER = new AtomicInteger(1);

    private final int id;

    private String name;
    private String url;
    private ServiceStatus status;
    private String createdAt;


    public Service(String url, ServiceStatus status, String name) {
        this.id = COUNTER.getAndIncrement();
        this.url = url;
        this.status = status;
        this.name = name;
    }

    public Service() {
        this.id = COUNTER.getAndIncrement();
    }

    public String getUrl() {
        return url;
    }

    public String getName() {
        return name;
    }

    public ServiceStatus getStatus() {
        return status;
    }

    public int getId() {
        return id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setStatus(ServiceStatus status) {
        this.status = status;
    }
}
