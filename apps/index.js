import lodash from "lodash";
import {
	versionInfo,
	help
} from "./help.js";
import {
	Note,
	DailyNoteTask,
	Note_appoint,
	pokeNote
} from "./Note.js";
import {
	rule as adminRule,
	updateRes,
	sysCfg,
	updateMiaoPlugin,
	updateNoteRes,
	setNoteRes,
	clearNoteRes
} from "./admin.js";
import {
	currentVersion
} from "../components/Changelog.js";
export {
	updateRes,
	updateMiaoPlugin,
	versionInfo,
	Note_appoint,
	pokeNote,
	sysCfg,
	help,
	Note,
	updateNoteRes,
	setNoteRes,
	clearNoteRes,
};
const _path = process.cwd();

let rule = {
	Note: {
		reg: "^#*(便笺|便签|派遣)$",
		describe: "体力",
	},
	Note_appoint: {
		reg: "^#(体力|便笺|便签)模板(设置(.*)|列表)$",
		describe: "体力模板设置",
	},
	help: {
		reg: "^#?(便签)?(命令|帮助|菜单|help|说明|功能|指令|使用说明)$",
		describe: "查看插件的功能",
	},
	pokeNote: {
		reg: "#poke#",
		describe: "体力",
	},
	
	...adminRule
};

lodash.forEach(rule, (r) => {
	r.priority = r.priority || 51;
	r.prehash = true;
	r.hashMark = true;
});

export {
	rule
};
