import { JSDOM } from "jsdom";
import EAnalytics from "../eanalytics";

beforeEach(() => {
  const dom = new JSDOM();

  // @ts-ignore
  global.document = dom.window.document;
  // @ts-ignore
  global.window = dom.window;
});

describe("Initialize function", () => {
  test("inserts EA tag in <head>", () => {
    // Given
    const host = "et1.eulerian.com";

    // When
    EAnalytics.initialize(host);

    // Then
    expect(document.head.children.length).toBe(1);
    expect(document.head.firstElementChild.innerHTML).toBe(
      "(function(e,a){var i=e.length,y=5381,k='script',s=window,v=document,o=v.createElement(k);for(;i;){i-=1;y=(y*33)^e.charCodeAt(i)}y='_EA_'+(y>>>=0);(function(e,a,s,y){s[a]=s[a]||function(){(s[y]=s[y]||[]).push(arguments);s[y].eah=e;};}(e,a,s,y));i=new Date/1E7|0;o.ea=y;y=i%26;o.async=1;o.src='//'+e+'/'+String.fromCharCode(97+y,122-y,65+y)+(i%1E3)+'.js?2';s=v.getElementsByTagName(k)[0];s.parentNode.insertBefore(o,s);})('et1.eulerian.com', 'EA_collector');"
    );
  });

  test("inserts EA tag at position 0", () => {
    // Given
    const createDummyScriptElement = () => {
      let dummy = document.createElement("script");
      dummy.innerHTML = "dummy";
      return dummy;
    };
    document.head.appendChild(createDummyScriptElement());
    document.head.appendChild(createDummyScriptElement());

    // When
    EAnalytics.initialize("i.am.host");

    // Then
    expect(document.head.children.length).toBe(3);
    expect(document.head.firstElementChild.innerHTML).not.toBe("dummy");
  });
});

describe("Track function", () => {
  test("does nothing when window.EA_collector is undefined", () => {
    // Given
    // @ts-ignore
    global.window.EA_collector = undefined;

    // When
    expect(EAnalytics.track([]));

    // Then do nothing
  });

  test("does nothing when data is undefined", () => {
    // Given
    // @ts-ignore
    global.window.EA_collector = () => {};
    // @ts-ignore
    const spy = jest.spyOn(global.window, "EA_collector");

    // When
    expect(EAnalytics.track(undefined));

    // Then do nothing
    expect(spy).not.toBeCalled();
  });

  test("call window.EA_collector function", (done) => {
    // Given
    // @ts-ignore
    global.window.EA_collector = (data: any) => {
      // Then
      expect(data).toEqual(["hello", "world"]);
      done();
    };

    // When
    EAnalytics.track(["hello", "world"]);
  });
});
