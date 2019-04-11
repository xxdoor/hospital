<template>
    <div class="map">
        <baidu-map id="map" :center="center" :zoom="zoom" @ready="handler">
            <bm-geolocation anchor="BMAP_ANCHOR_TOP_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            <bm-control>
                <mu-button fab small color="primary" @click.native="locateHospital" class="recoveryHos">
                    <mu-icon value="local_hospital"></mu-icon>
                </mu-button>
            </bm-control>
        </baidu-map>
    </div>
</template>

<script>
    export default {
        name: "map",
        data: function () {
            //使用js sdk获取当前位置
            // let current_uri = location.href.split('#')[0];
            // let uri = uris.sdk;
            // let params;
            // let detail;
            // let start = {};
            // client.post(uri, {url: current_uri})
            //     .then(function (response) {
            //         params = response.data;
            //         params.debug = false;
            //         params.jsApiList = ['checkJsApi', 'getLocation', 'openLocation'];
            //         //微信sdk config注入
            //         wx.config(params);
            //         wx.ready(function () {
            //             wx.getLocation({
            //                 success: function (res) {
            //                     start.lat = res.latitude;
            //                     start.lng = res.longitude;
            //                     alert(JSON.stringify(start));
            //                 }
            //             })
            //         });
            //         wx.error(function () {
            //         })
            //     });

            let center = {
                lng: 111.13491,
                lat: 37.511818
            };
            let form = {
                start: '当前位置',
                end: '吕梁怡华妇产医院'
            };

            return {
                // detail: detail,
                center: center,
                zoom: 20,
                icon: {
                    url: require('../assets/s_hos.png'),
                    size: {width: 30, height: 30},
                },
                form: form,
                map: null,
                BMap: null,
                centerPoint: null
            }
        },
        methods: {
            handler: function (obj) {
                let BMap = obj.BMap;
                let map = obj.map;
                let self = this;
                //将两个实例赋值给data
                this.map = map;
                this.BMap = BMap;
                let center_point = new BMap.Point(this.center.lng, this.center.lat);
                this.centetPoint = center_point;
                // 添加文字标签
                let label_position = {
                    position: center_point,
                    offset: new BMap.Size(-60, 10)
                };
                let label = new BMap.Label("吕梁怡华妇产医院", label_position);
                label.setStyle({
                    color: 'hotpink',
                    fontSize: '15px',
                    height: '25px',
                    padding: '5px 5px',
                    border: 'none',
                    backgroundColor: 'none',
                    fontWeight: 'bold'
                });
                map.addOverlay(label);

                let marker = new BMap.Marker(center_point, {
                    icon: new BMap.Icon(self.icon.url, self.icon.size)
                });
                map.addOverlay(marker);
                //图像内容
                let content = "<b>吕梁怡华妇产医院</b><br>";
                content += "<span><strong>地址：</strong>离石区龙凤南大街兴昌路92号</span><br>";
                content += "<span><strong>电话：</strong>(0358)8268999</span><br>";

                let opt = { width: 300 };
                let wrapper = "<a href='https://map.baidu.com/mobile/webapp/search/search/qt=s&wd=吕梁怡华妇产医院/?third_party=uri_api&vt=map' target='_blank'>" + content + "</a>"
                let infoWindow = new BMap.InfoWindow(wrapper, opt);
                marker.openInfoWindow(infoWindow);
                marker.addEventListener('click', function () {
                    marker.openInfoWindow(infoWindow);
                });

                self.$toast.message({
                    message: '请到院考察呢~',
                    color: '#f48fb1'
                });
            },
            // searchMap: function () {
            //     // 检查起点和终点是否改变
            //     if (this.form.start === '当前位置' && this.form.end === '吕梁怡华妇产医院') {
            //         this.$toast.success('已经搜索完成啦');
            //     } else {
            //         let start = this.form.start;
            //         let end = this.form.end;
            //         let BMap = this.BMap;
            //         let map = this.map;
            //
            //         let driving = new BMap.DrivingRoute(map, {
            //             renderOptions: {map: map, autoViewport: true}
            //         });
            //         driving.search(start, end);
            //         this.$toast.success('搜索完毕');
            //         //TODO 如何计算距离
            //         // let distance = this.map.getDistance(start, end);
            //         //
            //         // if (distance <= 500) {
            //         //     console.log("步行");
            //         //     let walking = new BMap.WalkingRoute(map, {
            //         //         renderOptions: {map: map, autoViewport: true}
            //         //     });
            //         //     walking.search(current_point, center_point);
            //         // } else {
            //         //     console.log("开车");
            //         //     let driving = new BMap.DrivingRoute(map, {
            //         //         renderOptions: {map: map, autoViewport: true}
            //         //     });
            //         //     driving.search(current_point, center_point);
            //         // }
            //     }
            // },
            // reset: function () {
            //     window.scroll(0, 0);
            // },
            locateHospital: function () {
                this.map.centerAndZoom(this.centetPoint, this.zoom);
                console.dir(this.map);
            }
        }
    }
</script>

<style scoped>

    #map {
        width: 100%;
        height: 800px;
    }

    .tool {
        position: fixed;;
        bottom: 70px;
        height: 20%;
        width: 100%;
        background-color: white;
        opacity: 0.7;
    }

    .search, .check {
        display: inline-block;
    }

    .search {
        width: 80%;
    }
    .check {
        width: 20%;
    }
    .mu-form-item {
        width: 90%;
    }

    .recoveryHos {
        position: fixed;
        bottom: 80px;
        right: 10px;
    }
</style>