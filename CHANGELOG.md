# 1.2.0
* 兼容yunzai-V3
# 1.1.0
* 增加`#图鉴帮助`用于查看帮助命令
* 增加`#图鉴设置`用于设置图鉴相关功能
* 支持戳一戳返回体力
    * 需要使用喵喵分支Yunzai以支持此能力，如需切换可在Yunzai跟目录输入下方命令后更新重启
    * `git remote set-url origin https://gitee.com/yoimiya-kokomi/Yunzai-Bot`
    * 可通过`#图鉴设置` 关闭戳一戳
* 增加`体力推送方法`
    *可通过修改init.js方法调用实现新版体力推送
    *具体将**YunzaiApps.dailyNote.DailyNoteTask()**方法改为**YunzaiApps["plugin_xiaoyao-cvs-plugin"].DailyNoteTask()**
* 增加`#体力模板2`指定模板
    *可通过`#体力模板列表`获取你当前已有的模板
    *通过`#体力模板设置(模板)`来指定你需要的模板
    *可以通过`#体力模板设置随机`来恢复之前的状态
* 增加`#**图鉴`用于查看逍遥全图鉴
* 增加`#图鉴更新`用于获取图鉴数据
* 增加`#图鉴插件(强制)更新`用于插件包更新
# 1.0.0
* ~~~~~~~~~~~