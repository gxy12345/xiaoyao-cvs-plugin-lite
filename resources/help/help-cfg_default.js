/*
* 请勿直接修改此文件，可能会导致后续更新冲突
* 如需自定义可将文件复制一份，重命名为 help-cfg.js 后编辑
* */

// 帮助配置
export const helpCfg = {
  title: "图鉴帮助",  // 帮助标题
  subTitle: "Yunzai-Bot & xiaoyao-cvs-plugin-lite" // 帮助副标题
};
export const helpList = [{
	"group": "信息查询",
	"list": [{
			"icon": 61,
			"title": "#角色图鉴",
			"desc": "目前已知原神角色概况"
		},
		{
			"icon": 66,
			"title": "#武器图鉴",
			"desc": "目前已知原神武器概况"
		},
		{
			"icon": 71,
			"title": "#食谱图鉴",
			"desc": "目前已知原神食谱概况"
		},
		{
			"icon": 74,
			"title": "#怪物图鉴",
			"desc": "目前已知原神怪物概况"
		},
		{
			"icon": 63,
			"title": "#圣遗物图鉴",
			"desc": "目前已知原神圣遗物概况"
		},
		{
			"icon": 14,
			"title": "#体力",
			"desc": "重写原有的查询当前米游社体力"
		},
	]
},{
	"group": "管理命令，仅管理员可用",
	"auth": "master",
	"list": [{
			"icon": 57,
			"title": "#图鉴设置",
			"desc": "例如#图鉴设置体力开启（关闭）"
		},{
			"icon": 58,
			"title": "#图鉴更新",
			"desc": "用于获取最新的图鉴数据图"
		},{
			"icon": 60,
			"title": "#图鉴插件更新",
			"desc": "用于获取最新的插件包数据"
		}
	]
}]
