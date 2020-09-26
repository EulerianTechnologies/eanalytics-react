var eanalytics = require("../dist/index");

test("eulerian is truthy", () => {
  expect(eanalytics).toBeTruthy();
});

test("eulerian can initialize with host", () => {
  eanalytics.initialize("ett.host.com");
  expect(eanalytics.host).toBe("ett.host.com");
});
