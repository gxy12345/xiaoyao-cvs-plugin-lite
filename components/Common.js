import { Cfg } from "./index.js";
import { segment } from "oicq";
import { currentVersion, yunzaiVersion } from "./Changelog.js";
import {render1} from "../apps/render.js";
export const render = async function (path, params, cfg) {
  let paths = path.split("/");
  let { render, e } = cfg;
  let _layout_path = process.cwd() + "/plugins/xiaoyao-cvs-plugin-lite/resources/";
  let layout_path= process.cwd() + "/plugins/xiaoyao-cvs-plugin-lite/resources/common/layout/";
  let base64 = await render1(paths[0], paths[1], {
    ...params,
    _layout_path,
    defaultLayout: layout_path + "default.html",
    elemLayout: layout_path + "elem.html",
    sys: {
      scale: Cfg.scale(cfg.scale || 1),
      copyright: `Created By Yunzai-Bot<span class="version">${yunzaiVersion}</span> &  xiaoyao-cvs-plugin-lite<span class="version">${currentVersion}</span>`
    }
  },"jpeg");

  if (base64) {
    e.reply(segment.image(`base64://${base64}`));
  }

  return true;
}

export const render_path = async function (path, params, cfg,path_) {
  let paths = path.split("/");
  let { render, e } = cfg;
  let _layout_path = process.cwd() + path_;
  let base64 = await render(paths[0], paths[1], {
    ...params,
    _layout_path,
    defaultLayout: _layout_path + "default.html",
    elemLayout: _layout_path + "elem.html",
    sys: {
      scale: Cfg.scale(cfg.scale || 1),
      copyright: `Created By Yunzai-Bot<span class="version">${yunzaiVersion}</span> & xiaoyao-cvs-plugin-lite<span class="version">${currentVersion}</span>`
    }
  });

  if (base64) {
    e.reply(segment.image(`base64://${base64}`));
  }

  return true;
}



export default {
  render,render_path,
  cfg: Cfg.get,
  isDisable: Cfg.isDisable
};