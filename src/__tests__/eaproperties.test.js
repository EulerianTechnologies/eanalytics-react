const EAnalytics = require("../../dist/index");

test("EAProperties initialize with a path", () => {
  const eaprop = EAnalytics.eaproperties("/path");
  expect(eaprop.path).toBe("/path");
});

test("EAProperties appends / to the given path if it's missing", () => {
  const eaprop = EAnalytics.eaproperties("path");
  expect(eaprop.path).toBe("/path");
});

test("EAProperties has a string epoch time", () => {
  const eaprop = EAnalytics.eaproperties("path");
  const value = eaprop["ereplay-time"];
  expect(typeof value).toBe("string");
  expect(parseInt(value)).toBeDefined();
});
