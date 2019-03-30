<template>
    <div class="map">
        <baidu-map id="map" :center="center" :zoom="zoom">
            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"
                        :icon="icon">
                <bm-label content="吕梁怡华妇产医院" :labelStyle="{color: 'deeppink', fontSize : '18px'}" :offset="{width: -35, height: 30}"/>
                <bm-driving :start="start" :end="center" :auto-viewport="true"></bm-driving>
            </bm-marker>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        </baidu-map>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    const client = require('../src/utils').client;
    const uris = require('../src/utils').uri;
    export default {
        name: "Map",
        data: function () {
            let current_uri = location.href.split('#')[0];
            let uri = uris.sdk + '?url=' + current_uri;
            let params;
            let detail;
            let start = {};
            client.get(uri)
                .then(function (response) {
                    params = response.data;
                    params.debug = true;
                    params.jsApiList = ['checkJsApi', 'getLocation', 'openLocation'];
                    //微信sdk config注入
                    wx.config(params);
                    wx.ready(function () {
                        wx.getLocation({
                            success: function (res) {
                                start.lat = res.latitude;
                                start.lng = res.longitude;

                            }
                        })
                    });
                    wx.error(function () {
                    })
                });

            let center = {
                lng: 111.13491,
                lat: 37.511818
            };
            return {
                detail: detail,
                center: center,
                zoom: 20,
                start: start,
                icon: {
                    url: require('../assets/s_hos.png'),
                    size: {width: 30, height: 30},
                }
            }
        }
    }
</script>

<style scoped>

    #map {
        width: 100%;
        height: 900px;
    }
</style>