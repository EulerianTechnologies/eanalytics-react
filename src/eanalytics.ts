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

    /**
     * Creates the base property for Eulerian Analytics tracking.
     * @param path The page path.
     * @returns The base Eulerian property payload.
     */
    eaproperties: (path: string) => {
      const seconds_since_epoch = function () {
        return Math.floor(Date.now() / 1000);
      };

      return {
        path: path.startsWith("/") ? path : `/${path}`,
        "ereplay-time": seconds_since_epoch().toString(),
      } as EAPropertiess;
    },
  };

  return ea;
})();

/**
 * The base payload for any Eulerian property.
 */
type EAPropertiess = { [key: string]: string };

export default eanalytics;
