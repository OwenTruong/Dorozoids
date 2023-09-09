const blackListedSites =
  window.localStorage.getItem("BLACK_LISTED_SITES") || [];

browser.webNavigation.onBeforeNavigate.addListener((details) => {
  if (blackListedSites.includes(details.url)) {
    const redirectUrl = browser.runtime.getURL("errorpage.html");
    browser.tabs.update(details.tabId, { url: redirectUrl });
  }
});
