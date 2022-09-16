// 适配V3 Yunzai，将index.js移至app/index.js
import {
	currentVersion,
	isV3
} from './components/Changelog.js'
import Data from './components/Data.js'

export * from './apps/index.js'
let index = {
	atlas: {}
}
if (isV3) {
	index = await Data.importModule('/plugins/xiaoyao-cvs-plugin-lite/adapter', 'index.js')
}
export const atlas = index.atlas || {}
Bot.logger.info(`---------^_^---------`)
Bot.logger.info(`便签插件${currentVersion}初始化~`)

setTimeout(async function() {
	let msgStr = await redis.get('xiaoyao-lite:restart-msg')
	let relpyPrivate = async function() {}
	if (!isV3) {
		let common = await Data.importModule('/lib', 'common.js')
		if (common && common.default && common.default.relpyPrivate) {
			relpyPrivate = common.default.relpyPrivate
		}
	}
	if (msgStr) {
		let msg = JSON.parse(msgStr)
		await relpyPrivate(msg.qq, msg.msg)
		await redis.del('xiaoyao-lite:restart-msg')
		let msgs = [`当前便签插件版本: ${currentVersion}`]
		await relpyPrivate(msg.qq, msgs.join('\n'))
	}
}, 1000)