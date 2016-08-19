angular-amd
===========

Usage
-----

# 开发时
    $ npm install -g cnpm --registry=https://registry.npm.taobao.org (如果没全局安装)
    $ cnpm install -g gulp (如果没全局安装)
    $ cnpm install
    $ cp _config.js config.js
    $ vi config.js (配置打包端口)
    $ cp app/scripts/config/_config.js app/scripts/config/config.js
    $ vi app/scripts/config/config.js (配置api)
    $ gulp watch
    $ 在浏览器打开 http://192.168.X.XX:XXXX

# 打包生产包
    $ npm install -g cnpm --registry=https://registry.npm.taobao.org (如果没全局安装)
    $ cnpm install -g gulp (如果没全局安装)
    $ cnpm install
    $ cp _config.js config.js
    $ vi config.js (配置打包端口)
    $ cp app/scripts/config/_config.js app/scripts/config/config.js
    $ vi app/scripts/config/config.js (配置api)
    $ gulp build -P (打包生产包)
    $ (域名指向) release/index.html

# 测试生产包
    $ gulp build -P
    $ gulp test
    $ 在浏览器打开 http://192.168.X.XX:XXXX
