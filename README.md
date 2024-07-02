# 闻达纯前端版：一个大规模语言模型调用平台
这个分支的readme正在写
本项目设计目标为实现针对特定环境的高效内容生成，同时考虑个人和中小企业的计算资源局限性，以及知识安全和私密性问题。为达目标，平台化集成了以下能力：

1. 知识库。
2. 多种大语言模型。
3. Auto脚本：通过开发插件形式的JavaScript脚本，为平台附件功能，实现包括但不限于自定义对话流程、访问外部API、在线切换LoRA模型。
4. 其他实用化所需能力：对话历史管理、内网部署、多用户同时使用等。

## 部署

### ollama
*推荐*
推荐使用nginx将本前端与ollama api放至同一服务下，配置参考`nginx.conf`。
当前支持：知识库、在线切换模型、AUTOS

### AI00
将前端文件整体打包，放到`\assets\www\plugins\wenda.zip`，然后通过`http://127.0.0.1:65530/plugins/wenda/`访问。
在使用插件访问时，会自动激活auto:`AI00_api.js`，以切换API。如果替换`\assets\www\index.zip`，可以使程序主页变为闻达，但需修改`AI00_api.js`，删除其中`if (document.location.href.indexOf("plugins")) {`语句，以使切换API生效。
当前支持：知识库(效果不佳)、AUTOS

### llama-server
参考命令：
```llama-server.exe -m 模型路径 --path 前端路径 -c 4096 -cb -ngl 65 --port 65530 --verbose-prompt -co```
前端路径为本项目所在文件夹。需手动开启auto：`llama_server_api.js`，以切换API。
当前支持：AUTOS