<template>
    <div class="map">
        <div>map</div>
        <div>{{info}}</div>
        <div>{{detail}}</div>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    const client = require('../src/utils').client;
    const uris = require('../src/utils').uri;
    export default {
        name: "Map",
        data: function () {
            let current_uri = window.location.href;
            let uri = uris.sdk + '?url=' + current_uri;
            let params;
            let detail;
            let info;
            client.get(uri)
                .then(function (response) {
                    params = response.data;
                    params.debug = true;
                    params.jsApiList = ['checkJsApi', 'getLocation', 'openLocation'];
                    //微信sdk config注入
                    wx.config(params);
                    wx.ready(function () {
                        info = "wx ready";
                        console.log("*****wx ready");
                        wx.getLocation({
                            success: function (res) {
                                detail = JSON.stringify(res);
                            }
                        })
                    });
                    wx.error(function (e) {
                        info = "wx error";
                        console.log("****wx error!");
                        console.dir(e);
                    })
                })
                .catch(e => console.dir(e));
            return {
                detail: detail,
                info: info,
            }
        }
    }
</script>

<style scoped>

</style>