const EAnalytics = require("../../dist/index");

test("eulerian is truthy", () => {
  expect(EAnalytics).toBeTruthy();
});

test("eulerian can initialize with host", () => {
  EAnalytics.initialize("ett.host.com");
  expect(EAnalytics.host).toBe("ett.host.com");
});
