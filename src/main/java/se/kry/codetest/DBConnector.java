package se.kry.codetest;

import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.sql.ResultSet;
import io.vertx.ext.sql.SQLClient;
import io.vertx.ext.sql.SQLConnection;

import java.util.List;

public class DBConnector {

    public static final String DB_PATH = "poller.db";
    private final SQLClient client;

    public DBConnector(final Vertx vertx) {
        final JsonObject config = new JsonObject().put("url", "jdbc:sqlite:" + DB_PATH)
                .put("driver_class", "org.sqlite.JDBC").put("max_pool_size", 30);

        client = JDBCClient.createShared(vertx, config);
    }

    public Future<ResultSet> createService(final String url, String status) {
        final String insertQuery = "INSERT INTO service (url, status) VALUES (?, ?);";
        return query(insertQuery, new JsonArray().add(url).add(status));
    }

    public Future<ResultSet> getServices() {
        final String selectQuery = "SELECT * FROM service;";
        return query(selectQuery);
    }


    public Future<ResultSet> editService(String url, String status) {
        final String selectQuery = "UPDATE service SET status = ? WHERE url = ?;";
        return query(selectQuery, new JsonArray().add(status).add(url));
    }


    public Future<ResultSet> deleteService(String url) {
        final String selectQuery = "DELETE FROM service WHERE url = ?;";
        return query(selectQuery, new JsonArray().add(url));
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
                        queryResultFuture.fail(result.cause());
                    } else {
                        queryResultFuture.complete(result.result());
                    }
                });

            }
        });

        return queryResultFuture;
    }

}
