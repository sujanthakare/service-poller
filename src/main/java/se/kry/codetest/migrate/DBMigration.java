package se.kry.codetest.migrate;

import io.vertx.core.Vertx;
import se.kry.codetest.DBConnector;

public class DBMigration {

    private static String CREATE_TABLE_QUERY = "CREATE TABLE IF NOT EXISTS " +
            "service (" +
            "id INT IDENTITY(1,1) PRIMARY KEY, " +
            "name VARCHAR(128) NOT NULL, " +
            "url VARCHAR(128) NOT NULL UNIQUE, " +
            "status VARCHAR(128), " +
            "createdAt default CURRENT_TIMESTAMP" +
            ");";


    public static void main(String[] args) {
        Vertx vertx = Vertx.vertx();
        DBConnector connector = new DBConnector(vertx);
        connector.query(CREATE_TABLE_QUERY)
                .setHandler(done -> {
                    if (done.succeeded()) {
                        System.out.println("completed db migrations");
                    } else {
                        done.cause().printStackTrace();
                    }
                    vertx.close(shutdown -> {
                        System.exit(0);
                    });
                });
    }
}
