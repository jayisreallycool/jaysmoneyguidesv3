/**
 * Cookie / tracking consent — shared constants and the browser-side API.
 *
 * How it works
 *  1. CONSENT_BOOTSTRAP runs inline in <head>, before any Google tag. It
 *     reads the stored choice, sets Google Consent Mode v2 defaults, and
 *     pauses or de-personalises AdSense requests accordingly. Google
 *     Analytics is only downloaded once analytics is allowed.
 *  2. <ConsentBanner> asks the visitor and calls saveConsent().
 *
 * Two regimes, picked from the browser's time zone (no IP lookup, nothing
 * sent anywhere):
 *  - "optin"  — Europe (EEA/UK/CH) or unknown: nothing optional runs until
 *               the visitor says yes (GDPR / ePrivacy).
 *  - "optout" — elsewhere (e.g. US): optional cookies run until the visitor
 *               says no (US state privacy laws), with a clear notice.
 * A Global Privacy Control signal always turns personalised advertising off.
 */

export const ADSENSE_PUBLISHER = 'ca-pub-6197929752414076';
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.startsWith('ca-pub-')
  ? process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  : ADSENSE_PUBLISHER;
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.startsWith('G-') ? process.env.NEXT_PUBLIC_GA_ID : '';

export const CONSENT_KEY = 'jmg_consent_v2';
export const CONSENT_VERSION = 2;
/** Ask again after 6 months (the re-consent interval EU regulators recommend). */
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export const CONSENT_OPEN_EVENT = 'jmg:consent-open';
export const CONSENT_CHANGE_EVENT = 'jmg:consent-change';

export interface ConsentState {
  mode: 'optin' | 'optout';
  /** browser sends Global Privacy Control */
  gpc: boolean;
  /** the visitor has made a choice that is still valid */
  decided: boolean;
  analytics: boolean;
  ads: boolean;
}

/** Inline script for <head>. Plain ES5, no dependencies, must stay self-contained. */
export const CONSENT_BOOTSTRAP = `(function(){
var w=window,d=document;w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments)}w.gtag=w.gtag||gtag;
var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){}
var optin=!tz||/^(Europe\\/|Arctic\\/|Atlantic\\/(Reykjavik|Canary|Madeira|Azores|Faroe)|Africa\\/Ceuta)/.test(tz);
var gpc=navigator.globalPrivacyControl===true;
var c=null;try{c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');if(!c||c.v!==${CONSENT_VERSION}||Date.now()-c.ts>${CONSENT_MAX_AGE_MS})c=null}catch(e){c=null}
var s={mode:optin?'optin':'optout',gpc:gpc,decided:!!c,analytics:c?!!c.analytics:!optin,ads:c?!!c.ads:!optin};
if(gpc)s.ads=false;
var gaId='${GA_ID}',gaLoaded=false;
function g(v){return v?'granted':'denied'}
function signals(){return{ad_storage:g(s.ads),ad_user_data:g(s.ads),ad_personalization:g(s.ads),analytics_storage:g(s.analytics),functionality_storage:'granted',security_storage:'granted'}}
function ads(){var a=w.adsbygoogle=w.adsbygoogle||[];
if(s.ads){a.requestNonPersonalizedAds=0;a.pauseAdRequests=0}
else if(s.mode==='optin'){a.pauseAdRequests=1}
else{a.requestNonPersonalizedAds=1;a.pauseAdRequests=0}}
function ga(){if(!gaId||gaLoaded||!s.analytics)return;gaLoaded=true;
var t=d.createElement('script');t.async=true;t.src='https://www.googletagmanager.com/gtag/js?id='+gaId;d.head.appendChild(t);
gtag('js',new Date());gtag('config',gaId,{send_page_view:true})}
gtag('consent','default',signals());gtag('set','ads_data_redaction',!s.ads);ads();ga();
w.__jmgConsent={state:s,apply:function(n){s.decided=true;s.analytics=!!n.analytics;s.ads=!!n.ads&&!s.gpc;
gtag('consent','update',signals());gtag('set','ads_data_redaction',!s.ads);ads();ga();return s}};
})();`;

type ConsentWindow = Window & {
  __jmgConsent?: { state: ConsentState; apply: (n: { analytics: boolean; ads: boolean }) => ConsentState };
};

const FALLBACK: ConsentState = { mode: 'optin', gpc: false, decided: false, analytics: false, ads: false };

/** Current consent state (browser only). */
export function getConsent(): ConsentState {
  if (typeof window === 'undefined') return FALLBACK;
  return { ...((window as ConsentWindow).__jmgConsent?.state ?? FALLBACK) };
}

/** Store the visitor's choice and apply it to Google's tags immediately. */
export function saveConsent(choice: { analytics: boolean; ads: boolean }): ConsentState {
  const api = (window as ConsentWindow).__jmgConsent;
  const state = api ? api.apply(choice) : { ...FALLBACK, decided: true, ...choice };
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ v: CONSENT_VERSION, ts: Date.now(), analytics: state.analytics, ads: state.ads, mode: state.mode, gpc: state.gpc })
    );
  } catch {
    // storage blocked: the choice still applies for this page view
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: state }));
  return { ...state };
}

/** Re-open the cookie settings from anywhere (footer link, policy pages). */
export function openConsentSettings(): void {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
