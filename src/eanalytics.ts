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
type EAPropertiess = { [key: string]: string };

export default eanalytics;
