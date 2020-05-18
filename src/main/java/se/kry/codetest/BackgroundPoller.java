package se.kry.codetest;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import io.vertx.core.AbstractVerticle;

import io.vertx.core.CompositeFuture;
import io.vertx.core.Future;
import io.vertx.core.json.JsonObject;

public class BackgroundPoller {
    private Logger logger = new Logger();
    private int REQUEST_TIME_OUT = 5000;

    public Future updateServiceStatus(DBConnector connector) {
        logger.log("POLLING...");

        connector.getServices().setHandler((result) -> {
            HashMap<String, List> updateMap = new HashMap<>();
            List<Future> updateFutures = new ArrayList<>();

            result.result().getRows().forEach((item) -> {
                String id = item.getInteger("id").toString();
                String url = item.getString("url");
                ServiceStatus currentStatus = ServiceStatus.valueOf(item.getString("status"));
                String newStatus = isReachable(url) ? ServiceStatus.OK.getStatus() : ServiceStatus.FAIL.getStatus();


                if (currentStatus.getStatus() != newStatus) {
                    if (updateMap.get(newStatus) == null) {
                        updateMap.put(newStatus, new ArrayList());
                    }

                    List ids = updateMap.get(newStatus);
                    ids.add(id);
                    updateMap.put(newStatus, ids);
                }
            });

            updateMap.forEach((key, value) -> {
                System.out.println(key);
                System.out.println(value);
                Future future = connector.updateStatus(key, value);
                updateFutures.add(future);
            });

            CompositeFuture.join(updateFutures).setHandler(updateResult -> {
                System.out.println(updateResult);
            });
        });

        return Future.succeededFuture();
    }

    private Boolean isReachable(final String url) {
        HttpURLConnection httpURLConnection = null;

        try {
            URL serviceUrl = new URL(url);

            httpURLConnection = (HttpURLConnection) serviceUrl.openConnection();
            httpURLConnection.setInstanceFollowRedirects(false);
            httpURLConnection.setRequestMethod("HEAD");
            httpURLConnection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 (.NET CLR 3.5.30729)");
            httpURLConnection.setConnectTimeout(REQUEST_TIME_OUT);
            int responseCode = httpURLConnection.getResponseCode();
            return responseCode < HttpURLConnection.HTTP_BAD_REQUEST;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (httpURLConnection != null) {
                httpURLConnection.disconnect();
            }
        }
        return false;
    }
}
