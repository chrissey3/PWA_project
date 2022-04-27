import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

// if the browser supports SW (all modern browsers do it)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    console.log("Service worker registered");
    // we will register it after the page complete the load
    navigator.serviceWorker.register("/sw.js");
  });
}

hydrate(<RemixBrowser />, document);
