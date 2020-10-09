import { JSDOM } from "jsdom";
import EAnalytics from "../eanalytics";

beforeEach(() => {
  const dom = new JSDOM();

  // @ts-ignore
  global.document = dom.window.document;
  // @ts-ignore
  global.window = dom.window;
});

describe("Snippet", () => {
  test("Is correct", () => {
    // Given
    const host = "et1.eulerian.com";

    // When
    const snippet = EAnalytics._snippet(host);

    // Then
    expect(snippet).toBe(
      "(function(){var td='et1.eulerian.com',d=document,l=d.location,o,a,cn,cdr,cdh,cdr,acdr,i,cj='';if(!l.protocol.indexOf('http')){o=d.createElement('script');a=d.getElementsByTagName('script')[0];cn=parseInt((new Date()).getTime()/3600000);cj='';cdh=(l.host+td).replace(/[^a-z]/g,'');cdr=cdh+cdh.toUpperCase();acdr=cdr.split('');for(i=-1;i<cn%7;i++){cj+=acdr[(cn+i)%acdr.length];}o.type='text/javascript';o.async='async';o.defer='defer';o.src='//'+td+'/'+cj+(cn%8760)+'.js';a.parentNode.insertBefore(o,a);}})();"
    );
  });
});

describe("Initialize function", () => {
  test("inserts EA tag in <head>", () => {
    // Given
    const host = "host.com";
    const spy = jest
      .spyOn(EAnalytics, "_snippet")
      .mockImplementation((host) => `hello ${host}`);

    // When
    EAnalytics.initialize(host);

    // Then
    expect(document.head.children.length).toBe(1);
    expect(document.head.firstElementChild.innerHTML).toBe("hello host.com");
    spy.mockRestore();
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
