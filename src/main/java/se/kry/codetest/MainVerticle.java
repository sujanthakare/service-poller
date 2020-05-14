package se.kry.codetest;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class MainVerticle extends AbstractVerticle {

    private HashMap<String, String> services = new HashMap<>();
    // TODO use this
    private DBConnector connector;
    private final BackgroundPoller poller = new BackgroundPoller();

    private Logger logger = new Logger();

    @Override
    public void start(final Future<Void> startFuture) {
        connector = new DBConnector(vertx);
        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());

        vertx.setPeriodic(1000 * 30, timerId -> poller.updateServiceStatus(services));

        services.put("http://www.kry.se", ServiceStatus.UNKNOWN);

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

        router.get("/service").handler(req -> {
            final List<JsonObject> jsonServices = services.entrySet().stream()
                    .map(service -> new JsonObject().put("name", service.getKey()).put("status", service.getValue()))
                    .collect(Collectors.toList());
            req.response().putHeader("content-type", "application/json").end(new JsonArray(jsonServices).encode());
        });
        router.post("/service").handler(req -> createService(req));
        router.delete("/service").handler(req -> deleteService(req));
        router.put("/service").handler(req -> editService(req));
    }

    private void deleteService(RoutingContext req) {
        final JsonObject jsonBody = req.getBodyAsJson();
        services.remove(jsonBody.getString("url"));
        req.response().putHeader("content-type", "text/plain").end("OK");
    }

    private void editService(RoutingContext req) {
        final JsonObject jsonBody = req.getBodyAsJson();
        String newUrl = jsonBody.getString("url");
        String oldUrl = jsonBody.getString("oldUrl");
        services.remove(oldUrl);
        services.put(newUrl, ServiceStatus.UNKNOWN);
        req.response().putHeader("content-type", "text/plain").end("OK");
    }

    private void createService(RoutingContext req) {
        final JsonObject jsonBody = req.getBodyAsJson();
        services.put(jsonBody.getString("url"), ServiceStatus.UNKNOWN);
        req.response().putHeader("content-type", "text/plain").end("OK");
    }
}
