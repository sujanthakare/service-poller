package se.kry.codetest;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

public class BackgroundPoller {
    private Logger logger = new Logger();

    public void updateServiceStatus(Map<String, String> services) {
        logger.log("POLLING...");
        services.forEach((url, status) -> {
            String serviceStatus = isReachable(url) ? ServiceStatus.OK : ServiceStatus.FAIL;
            services.put(url, serviceStatus);
        });
    }

    private Boolean isReachable(final String url) {
        HttpURLConnection connection = null;

        try {
            final URL u = new URL(url);
            connection = (HttpURLConnection) u.openConnection();
            connection.setRequestMethod("HEAD");
            final int code = connection.getResponseCode();

            if (code == 200) {
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
