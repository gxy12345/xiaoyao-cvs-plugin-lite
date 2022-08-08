import {
	segment
} from "oicq";
import fs from "fs";
import {
	Cfg
} from "../components/index.js";
import Data from "../components/Data.js"
import path from 'path';
import fetch from "node-fetch";
const _path = process.cwd();
const __dirname = path.resolve();

const list = ["shiwu_tujian", "yuanmo_tujian", "mijin_tujian", "shengyiwu_tujian"]
export async function AtlasAlias(e) {
	if (!Cfg.get("Atlas.all")) {
		return false;
	}
	let reg = /#(.*)/;
	if (Cfg.get("sys.Atlas")) {
		reg = /#*(.*)图鉴/;
	}
	if (!reg.test(e.msg)) {
		return false;
	}
	if (await Atlas_list(e)) return true;
	if (await roleInfo(e)) return true;
	if (await weaponInfo(e)) return true;
	// if (await foodInfo(e)) return true;
	// if (await RelicsInfo(e)) return true;
	// if (await monsterInfo(e)) return true;
	var name = e.msg.replace(/#|＃|信息|图鉴|圣遗物|食物|食材|特殊|特色|料理/g, "");
	return send_Msg(e, "all", name);
}


export async function roleInfo(e) {
	// let msg=e.msg.replace(/#|图鉴/g,"");
	let msg = e.msg.replace(/#|＃|信息|图鉴|命座|天赋|突破/g, "");
	let id = YunzaiApps.mysInfo.roleIdToName(msg);
	let name;
	if (["10000005", "10000007", "20000000"].includes(id)) {
		if (!["风主", "岩主", "雷主"].includes(msg)) {
			e.reply("请选择：风主图鉴、岩主图鉴、雷主图鉴");
			return true;
		}
		name = msg;
	} else {
		name = YunzaiApps.mysInfo.roleIdToName(id, true);
		if (!name) return false;
	}
	send_Msg(e, "juese_tujian", name)
	return true;
}

const send_Msg = function(e, type, name) {
	let path = `${_path}/plugins/xiaoyao-cvs-plugin-lite/resources/xiaoyao-plus/${type}/${name}.png`
	if (fs.existsSync(path)) {
		e.reply(segment.image(`file:///${path}`));
		return true;
	}
	if (type == "all") {
		for (let val of list) {
			let new_name = info_img(e, Data.readJSON(`${_path}/plugins/xiaoyao-cvs-plugin-lite/resources/Atlas_alias/`,
				val), name)
			if (new_name) {
				name = new_name
				type = val;
				break;
			}
		}
	}
	path = `${_path}/plugins/xiaoyao-cvs-plugin-lite/resources/xiaoyao-plus/${type}/${name}.png`
	if (!fs.existsSync(path)) {
		return false;
	}
	e.reply(segment.image(`file:///${path}`));
	return true;
}
let weapon = new Map();
let weaponFile = [];
await init();
export async function init(isUpdate = false) {
	let weaponJson = JSON.parse(fs.readFileSync("./config/genshin/weapon.json", "utf8"));
	for (let i in weaponJson) {
		for (let val of weaponJson[i]) {
			weapon.set(val, i);
		}
	}
	let paths = "./plugins/xiaoyao-cvs-plugin-lite/resources/xiaoyao-plus/wuqi_tujian";
	if (!fs.existsSync(paths)) {
		return true;
	}
	weaponFile = fs.readdirSync(paths);
	for (let val of weaponFile) {
		let name = val.replace(".png", "");
		weapon.set(name, name);
	}
}

export async function weaponInfo(e) {
	let msg = e.msg || '';
	if (e.atBot) {
		msg = "#" + msg.replace("#", "");
	}
	if (!/(#*(.*)(信息|图鉴|突破|武器|材料)|#(.*))$/.test(msg)) return;

	let name = weapon.get(msg.replace(/#|＃|信息|图鉴|突破|武器|材料/g, ""));

	if (name) {
		send_Msg(e, "wuqi_tujian", name)
		return true;
	}

	return false;
}
export async function Atlas_list(e) {
	let list = Data.readJSON(`${_path}/plugins/xiaoyao-cvs-plugin-lite/resources/Atlas_alias/`, "Atlas_list");
	let name = e.msg.replace(/#|井/g, "")
	for (let i in list) {
		var title = i.split("|");
		for (let j = 0; j < title.length;j++) {
			if (title[j] == name) {
				await e.reply("请选择:\n"+list[i].join("\n"))
				return true;
			}
		}
	}
	return false;
}
// export async function RelicsInfo(e) {
// 	let msg = e.msg || '';
// 	if (e.atBot) {
// 		msg = "#" + msg.replace("#", "");
// 	}
// 	// if (!/(#*圣遗物(.*)|#(.*))$/.test(msg)) return;
// 	let name = msg.replace(/#|＃|信息|副本|本|圣遗物|图鉴/g, "");
// 	let response = await fetch(`https://info.minigg.cn/artifacts?query=${encodeURIComponent(name)}`);
// 	let res = await response.json();
// 	if (res?.errcode == "10006") return false;
// 	name = res["name"];
// 	if (name) {
// 		send_Msg(e, "shengyiwu_tujian", name)
// 		return true;
// 	}
// 	return false;
// }
const info_img = function(e, list, name) {
	for (let i in list) {
		for (let val of list[i]) {
			if (val == name || i == name) {
				return i;
			}
		}
	}
}
