package se.kry.codetest;

import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.sql.ResultSet;
import io.vertx.ext.sql.SQLClient;
import io.vertx.ext.sql.SQLConnection;
import se.kry.codetest.model.Service;

import java.util.ArrayList;
import java.util.List;

public class DBConnector {

    public static final String DB_PATH = "poller.db";
    private final SQLClient client;

    public DBConnector(final Vertx vertx) {
        final JsonObject config = new JsonObject().put("url", "jdbc:sqlite:" + DB_PATH)
                .put("driver_class", "org.sqlite.JDBC").put("max_pool_size", 30);

        client = JDBCClient.createShared(vertx, config);
    }

    public Future<ResultSet> createService(final Service service) {
        final String insertQuery = "INSERT INTO service (id, url, status, name) VALUES (?, ?, ?, ?);";
        return query(
                insertQuery,
                new JsonArray()
                        .add(service.getId())
                        .add(service.getUrl())
                        .add(service.getStatus())
                        .add(service.getName()));
    }

    public Future<ResultSet> getServices() {
        final String selectQuery = "SELECT * FROM service;";
        return query(selectQuery);
    }


    public Future<ResultSet> updateStatus(String newStatus, List ids) {
        JsonArray paramsArray = new JsonArray();
        paramsArray.add(newStatus);
        List paramsPlaceholders = new ArrayList();

        ids.forEach((item) -> {
            paramsPlaceholders.add("?");
            paramsArray.add(item);
        });

        final String selectQuery = "UPDATE service SET status = ? WHERE id IN (" + String.join(", ", paramsPlaceholders) + ");";
        return query(selectQuery, paramsArray);
    }

    public Future<ResultSet> editService(String id, Service service) {
        final String selectQuery = "UPDATE service SET status = ?, url = ?, name = ? WHERE id = ?;";
        return query(
                selectQuery,
                new JsonArray()
                        .add(service.getStatus())
                        .add(service.getUrl())
                        .add(service.getName())
                        .add(id)
        );
    }


    public Future<ResultSet> deleteService(String id) {
        final String selectQuery = "DELETE FROM service WHERE id = ?;";
        return query(selectQuery, new JsonArray().add(id));
    }


    public Future<ResultSet> query(final String query) {
        return query(query, new JsonArray());
    }

    public Future<ResultSet> query(final String query, final JsonArray params) {
        if (query == null || query.isEmpty() || !query.endsWith(";")) {
            return Future.failedFuture("Query is null or empty or missing semicolon");
        }

        final Future<ResultSet> queryResultFuture = Future.future();

        client.getConnection(connection -> {
            if (connection.succeeded()) {
                final SQLConnection sqlConnection = connection.result();
                sqlConnection.queryWithParams(query, params, result -> {
                    if (result.failed()) {
                        System.out.println(result.cause());
                        queryResultFuture.fail(result.cause());
                    } else {
                        queryResultFuture.complete(result.result());
                    }
                    sqlConnection.close();
                });
            }
        });

        return queryResultFuture;
    }

}
