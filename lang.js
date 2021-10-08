const https = require("https"),
  ini = require("ini");
/**
 * Downloads the lang file through HTTP[S].
 * Based on https://stackoverflow.com/a/62056725/11622835
 */
async function httpsRead(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }

      res.setEncoding("utf8");

      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        resolve(rawData);
      });
    });

    request.end();
  });
}

module.exports = function lang(langCode) {
  var file;
  // More languages in the future (maybe)
  switch (langCode.toLowerCase()) {
    case "pt-BR":
    case "pt-EU":
    case "pt":
      file = "pt-BR";
      break;
    case "en-US":
    case "en-GB":
    case "en":
    default:
      file = "en-US";
      break;
  }
  return ini.decode(
    httpsRead(
      `https://raw.githubusercontent.com/guiga-zalu/github-activity-readme/master/lang/${file}.ini`
    )
  );
};
