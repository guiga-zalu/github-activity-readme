/** @type { LangsDict } */
const langs = {
	"en-US": {
		IssueCommentEvent: "🗣 Commented on $item in $item_repo_name",
		IssuesEvent: "❗️ $item_payload_action : issue $item in $item_repo_name",
		PullRequestEvent: {
			merge: "🎉 Merged PR $item in $item_repo_name",
			open: "💪 $item_payload_action : PR $item in $item_repo_name",
			close: "❌ $item_payload_action : PR $item in $item_repo_name",
		},
	},
	en: {
		IssueCommentEvent: "🗣 Commented on $item in $item_repo_name",
		IssuesEvent: "❗️ $item_payload_action : issue $item in $item_repo_name",
		PullRequestEvent: {
			merge: "🎉 Merged PR $item in $item_repo_name",
			open: "💪 $item_payload_action : PR $item in $item_repo_name",
			close: "❌ $item_payload_action : PR $item in $item_repo_name",
		},
	},
	"pt-BR": {
		IssueCommentEvent: "🗣 Comentou em $item no repositório $item_repo_name",
		IssuesEvent:
			"❗️ $item_payload_action : questão $item no repositório $item_repo_name",
		PullRequestEvent: {
			merge: "🎉 Fundiu PR $item ao repositório $item_repo_name",
			open: "💪 $item_payload_action PR $item no repositório $item_repo_name",
			close: "❌ $item_payload_action PR $item no repositório $item_repo_name",
		},
	},
	pt: {
		IssueCommentEvent: "🗣 Comentou em $item no repositório $item_repo_name",
		IssuesEvent:
			"❗️ $item_payload_action : questão $item no repositório $item_repo_name",
		PullRequestEvent: {
			merge: "🎉 Fundiu PR $item ao repositório $item_repo_name",
			open: "💪 $item_payload_action PR $item no repositório $item_repo_name",
			close: "❌ $item_payload_action PR $item no repositório $item_repo_name",
		},
	},
	default: {
		IssueCommentEvent: "🗣 Commented on $item in $item_repo_name",
		IssuesEvent: "❗️ $item_payload_action : issue $item in $item_repo_name",
		PullRequestEvent: {
			merge: "🎉 Merged PR $item in $item_repo_name",
			open: "💪 $item_payload_action : PR $item in $item_repo_name",
			close: "❌ $item_payload_action : PR $item in $item_repo_name",
		},
	},
};
/**
 * @param { LangCode } [langCode]
 * @returns { LangTranslation }
 */
function langTranslations(langCode) {
	if (typeof langCode !== "string") return langs.default;

	langCode = langCode.toLowerCase();
	if (langCode in langs) return langs[langCode];

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
