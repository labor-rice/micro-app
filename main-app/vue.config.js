const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		// 配置端口号
		port: 8080
	},
	configureWebpack: {
		plugins: [new NodePolyfillPlugin()]
	}
});
