const blackListedSites = window.localStorage.getItem("BLACK_LISTED_SITES") || [
  "https://www.reddit.com/",
  "https://www.youtube.com/",
];

browser.webNavigation.onBeforeNavigate.addListener((details) => {
  console.log(details.url);
  for (const site of blackListedSites) {
    if (checkSitesEqual(site, details.url)) {
      const redirectUrl = browser.runtime.getURL("errorpage.html");
      browser.tabs.update(details.tabId, { url: redirectUrl });
      break;
    }
  }
});

function checkSitesEqual(site, url) {
  let slashCount = 0;

  for (let i = 0; i < url.length; i++) {
    if (i >= site.length) break;

    if (site[i] !== url[i]) return false;

    if (slashCount >= 3) return true;

    if (url[i] === "/") slashCount++;
  }

  return slashCount === 3;
}
