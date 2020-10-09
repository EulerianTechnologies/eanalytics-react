const _EATag = (host: string) => {
  const script = () => {
    const script = document.createElement("script");
    script.innerHTML = EAnalytics._snippet(host);
    return script;
  };
  return { script };
};

const EAnalytics = {
  _snippet: (host: string) =>
    `(function(){var td='${host}',d=document,l=d.location,o,a,cn,cdr,cdh,cdr,acdr,i,cj='';if(!l.protocol.indexOf('http')){o=d.createElement('script');a=d.getElementsByTagName('script')[0];cn=parseInt((new Date()).getTime()/3600000);cj='';cdh=(l.host+td).replace(/[^a-z]/g,'');cdr=cdh+cdh.toUpperCase();acdr=cdr.split('');for(i=-1;i<cn%7;i++){cj+=acdr[(cn+i)%acdr.length];}o.type='text/javascript';o.async='async';o.defer='defer';o.src='//'+td+'/'+cj+(cn%8760)+'.js';a.parentNode.insertBefore(o,a);}})();`,

  /**
   * Insert Eulerian Analytics tag in the <head> of the current document.
   * @param host The host provided by Eulerian.
   */
  initialize: (host: string) => {
    const script = _EATag(host).script();
    document.head.insertBefore(script, document.head.firstElementChild);
  },

  /**
   * Call EA_collector with the given data param.
   * @param data The data to collect. Example ["path", "NOM_DE_LA_PAGE", "uid", "IDENTIFIANT_DE_L_INTERNAUTE"].
   */
  track: (data: string[]) => {
    // @ts-ignore
    const eaTrackFn = window.EA_collector;
    if (eaTrackFn && data) {
      eaTrackFn(data);
    }
  },
};

export default EAnalytics;
