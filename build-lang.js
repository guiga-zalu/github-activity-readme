const fs = require("fs/promises"),
	ini = require("ini");

/**
 * @param { LangsDict } langs
 * @param { LangCode } code
 * @param { LangTranslation } translation
 */
function registerTranslation(langs, code, translation) {
	if (typeof code !== "string") return;

	if (!(code in langs)) langs[code] = translation;

	let index = code.lastIndexOf("-");
	if (index > -1) registerTranslation(langs, code.slice(0, index), translation);
}

async function buildLangFile() {
	/** @type { LangsDict } */
	const langs = {};

	const files = (await fs.readdir("./lang"))
		.filter(file => file.endsWith(".ini"))
		.sort();

	for (let file of files)
		registerTranslation(
			langs,
			file.slice(0, -4).toLowerCase(),
			ini.decode(await fs.readFile(`./lang/${file}`, "utf8"))
		);

	langs.default = langs.en;

	var langData =
		"" +
		`
/** @type { LangsDict } */
const langs = ${JSON.stringify(langs, undefined, 2)};
/**
 * @param { LangCode } [langCode]
 * @returns { LangTranslation }
 */
function langTranslations(langCode){
	if(typeof langCode !== "string")
		return langs.default;
	
	langCode = langCode.toLowerCase();
	if(langCode in langs)
		return langs[langCode];
	
	let index = langCode.lastIndexOf("-");

	return langTranslations(index > -1 ? langCode.slice(0, index) : false);
}

module.exports = langTranslations;

/** @typedef { string } LangCode */
/**
 * @typedef { Object } LangTranslation
 * @property { string } IssueCommentEvent
 * @property { string } IssuesEvent
 * @property { Object } PullRequestEvent
 * @property { string } PullRequestEvent.merge
 * @property { string } PullRequestEvent.open
 * @property { string } PullRequestEvent.close
 */
 /** @typedef {{ [code: LangCode]: LangTranslation }} LangsDict */
`;

	await fs.writeFile("./lang.js", langData);
}
buildLangFile();

/** @typedef { string } LangCode */
/**
 * @typedef { Object } LangTranslation
 * @property { string } IssueCommentEvent
 * @property { string } IssuesEvent
 * @property { Object } PullRequestEvent
 * @property { string } PullRequestEvent.merge
 * @property { string } PullRequestEvent.open
 * @property { string } PullRequestEvent.close
 */
/** @typedef {{ [code: LangCode]: LangTranslation }} LangsDict */
