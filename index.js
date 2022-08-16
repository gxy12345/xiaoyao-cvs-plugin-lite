import lodash from "lodash";
import {
	AtlasAlias
} from "./apps/xiaoyao_image.js";
import {
	versionInfo,
	help
} from "./apps/help.js";

import common from "../../lib/common.js";
import {
	Note,DailyNoteTask,
	Note_appoint,pokeNote
} from "./apps/Note.js";
import {
	rule as adminRule,
	updateRes,
	sysCfg,
	updateMiaoPlugin,
	updateNoteRes,
	setNoteRes,
	clearNoteRes
} from "./apps/admin.js";
import {
	currentVersion
} from "./components/Changelog.js";
export {
	updateRes,
	updateMiaoPlugin,
	versionInfo,
	Note_appoint,pokeNote,
	sysCfg,
	help,DailyNoteTask,
	AtlasAlias,
	Note,
	updateNoteRes,
	setNoteRes,
	clearNoteRes
};

let rule = {
	Note: {
		reg: "^#*(体力|树脂|查询体力|便笺|便签)$",
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
	r.priority = r.priority || 50;
	r.prehash = true;
	r.hashMark = true;
});

export {
	rule
};

console.log(`xiaoyao-cvs-lite插件${currentVersion}初始化~`);
setTimeout(async function() {
	let msgStr = await redis.get("xiaoyao-lite:restart-msg");
	if (msgStr) {
		let msg = JSON.parse(msgStr);
		await common.relpyPrivate(msg.qq, msg.msg);
		await redis.del("xiaoyao-lite:restart-msg");
		let msgs = [`当前版本: ${currentVersion}`];
		await common.relpyPrivate(msg.qq, msgs.join("\n"));
	}
}, 1000);
