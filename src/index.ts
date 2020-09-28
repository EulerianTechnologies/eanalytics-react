var eanalytics = (function () {
  const ea = {
    host: undefined as string,

    /**
     * Initializes the Eulerian Analytics SDK.
     * @param host The host provided by Eulerian.
     */
    initialize: (host: string) => {
      ea.host = host;
    },
  };

  return ea;
})();

/**
 * The base payload for any Eulerian property.
 */
type EAProperties = { [key: string]: string | number };

/**
 * Creates the base property for Eulerian Analytics tracking.
 * @param path The page path.
 * @returns The base Eulerian property payload.
 */
function eaproperties(path: string): EAProperties {
  const seconds_since_epoch = function () {
    return Math.floor(Date.now() / 1000);
  };

  return {
    path: path.startsWith("/") ? path : `/${path}`,
    "ereplay-time": seconds_since_epoch().toString(),
  };
}

module.exports = { eanalytics, eaproperties };
