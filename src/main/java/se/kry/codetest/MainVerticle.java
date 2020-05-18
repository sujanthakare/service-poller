package se.kry.codetest;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.json.Json;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;
import se.kry.codetest.model.Service;

import java.net.MalformedURLException;
import java.net.URL;

public class MainVerticle extends AbstractVerticle {
    private DBConnector connector;
    private final BackgroundPoller poller = new BackgroundPoller();
    private Logger logger = new Logger();

    @Override
    public void start(final Future<Void> startFuture) {
        connector = new DBConnector(vertx);
        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());

        vertx.setPeriodic(1000 * 60, timerId -> poller.updateServiceStatus(connector));

        setRoutes(router);

        vertx.createHttpServer().requestHandler(router).listen(8080, result -> {
            if (result.succeeded()) {
                logger.log("KRY code test service started");
                startFuture.complete();
            } else {
                startFuture.fail(result.cause());
            }
        });
    }

    private void setRoutes(final Router router) {
        router.route("/*").handler(StaticHandler.create());

        router.get("/api/service").handler(this::getAll);
        router.post("/api/service").handler(this::createOne);
        router.put("/api/service/:id").handler(this::editOne);
        router.delete("/api/service/:id").handler(this::deleteOne);
    }


    private void editOne(RoutingContext routingContext) {
        final String id = routingContext.request().getParam("id");
        Service service = Json.decodeValue(routingContext.getBodyAsString(), Service.class);
        service.setStatus(ServiceStatus.UNKNOWN);
        System.out.println(service.toString());

        connector.editService(id, service).setHandler(res -> {
            System.out.println(res.result());
            routingContext.response()
                    .setStatusCode(200)
                    .putHeader("content-type", "application/json; charset=utf-8")
                    .end();
        });
    }


    private void deleteOne(RoutingContext routingContext) {
        final String id = routingContext.request().getParam("id");
        if (id == null) {
            routingContext.response().setStatusCode(400).end();
        } else {
            connector.deleteService(id).setHandler(res -> {
                routingContext.response()
                        .setStatusCode(200)
                        .putHeader("content-type", "application/json; charset=utf-8")
                        .end();
            });

        }
    }

    private void getAll(RoutingContext routingContext) {
        connector.getServices().setHandler((res) -> {
            routingContext.response()
                    .setStatusCode(200)
                    .putHeader("content-type", "application/json; charset=utf-8")
                    .end(Json.encodePrettily(res.result().getRows()));
        });
    }

    private void createOne(RoutingContext routingContext) {
        Service service = Json.decodeValue(routingContext.getBodyAsString(), Service.class);
        service.setStatus(ServiceStatus.UNKNOWN);

        try {
            URL url = new URL(service.getUrl());

            connector.createService(service).setHandler(res -> {
                System.out.println(res.result());
                routingContext.response()
                        .putHeader("content-type", "application/json; charset=utf-8")
                        .setStatusCode(200)
                        .end();

            });

        } catch (MalformedURLException e) {
            routingContext.response()
                    .setStatusCode(400)
                    .end();
        }
    }

}
