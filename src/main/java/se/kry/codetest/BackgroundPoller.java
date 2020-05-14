package se.kry.codetest;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import io.vertx.core.json.JsonObject;

public class BackgroundPoller {
    private Logger logger = new Logger();

    public void updateServiceStatus(DBConnector connector) {
        logger.log("POLLING...");
        connector.getServices().setHandler((result) -> {
            result.result().getRows().forEach((item) -> {
                JsonObject service = item;
                String url = item.getString("url");
                String serviceStatus = isReachable(item.getString("url")) ? ServiceStatus.OK : ServiceStatus.FAIL;
                connector.editService(url, serviceStatus);
            });

        });
    }

    private Boolean isReachable(final String url) {
        HttpURLConnection connection = null;

        try {
            final URL u = new URL(url);
            connection = (HttpURLConnection) u.openConnection();
            connection.setRequestMethod("HEAD");
            connection.connect();

            final int code = connection.getResponseCode();
            if (code < 400) {
                return true;
            }
        } catch (final IOException e) {

        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
        return false;
    }

}
