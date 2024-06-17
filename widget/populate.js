function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

function initialize() {
  console.log("Initializing...");
  const rootdiv = document.createElement("div");
  rootdiv.id = "root";
  document.body.appendChild(rootdiv);
  console.log("Initialized!");
  loadScript("./index-By2IcVqv.js", function () {
    console.log("First script loaded");
  });
}

initialize();
