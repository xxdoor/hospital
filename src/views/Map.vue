<template>
    <div class="map">
        <baidu-map id="map" :center="center" :zoom="zoom" @ready="handler">
            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"
                        :icon="icon">
            </bm-marker>
            <bm-geolocation anchor="BMAP_ANCHOR_TOP_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        </baidu-map>
        <div class="tool">
            <div class="search">
                <mu-form :model="form" label-position="left" label-width="100">
                    <mu-form-item label="出发">
                        <mu-text-field v-model="form.start"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="到达">
                        <mu-text-field v-model="form.end"></mu-text-field>
                    </mu-form-item>
                </mu-form>
            </div>
            <div class="check">
                <mu-button icon color="deeppink" @click="searchMap">
                    <mu-icon value="search" size="36"></mu-icon>
                </mu-button>
            </div>
        </div>

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
                BMap: null
            }
        },
        methods: {
            handler: function (obj) {
                console.log("in map handler..");
                let BMap = obj.BMap;
                let map = obj.map;
                //将两个实例赋值给data
                this.map = map;
                this.BMap = BMap;
                let center_point = new BMap.Point(this.center.lng, this.center.lat);

                // 添加文字标签
                let label_position = {
                    position: center_point,
                    offset: new BMap.Size(-42, 10)
                };
                let label = new BMap.Label("吕梁怡华妇产医院", label_position);
                label.setStyle({
                    color: 'hotpink',
                    fontSize: '12px',
                    height: '20px'
                });
                map.addOverlay(label);

                // 获取当前位置
                let current_point;
                let geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() === 0) {
                        current_point = r.point;
                        // 计算当前位置和医院的距离
                        let distance = map.getDistance(current_point, center_point);

                        if (distance <= 500) {
                            console.log("步行");
                            let walking = new BMap.WalkingRoute(map, {
                                renderOptions: {map: map, autoViewport: true}
                            });
                            walking.search(current_point, center_point);
                        } else {
                            console.log("开车");
                            let driving = new BMap.DrivingRoute(map, {
                                renderOptions: {map: map, autoViewport: true}
                            });
                            driving.search(current_point, center_point);
                        }
                    } else {
                        alert("没有定位到您的位置呢> <")
                    }
                }, {enableHighAccuracy: true})

            },
            searchMap: function () {
                // 检查起点和终点是否改变
                if (this.form.start === '当前位置' && this.form.end === '吕梁怡华妇产医院') {
                    alert('位置没有改变，不搜索');
                } else {
                    let start = this.form.start;
                    let end = this.form.end;
                    let BMap = this.BMap;
                    let map = this.map;

                    console.log("开车");
                    let driving = new BMap.DrivingRoute(map, {
                        renderOptions: {map: map, autoViewport: true}
                    });
                    driving.search(start, end);
                    //TODO 如何计算距离
                    // let distance = this.map.getDistance(start, end);
                    //
                    // if (distance <= 500) {
                    //     console.log("步行");
                    //     let walking = new BMap.WalkingRoute(map, {
                    //         renderOptions: {map: map, autoViewport: true}
                    //     });
                    //     walking.search(current_point, center_point);
                    // } else {
                    //     console.log("开车");
                    //     let driving = new BMap.DrivingRoute(map, {
                    //         renderOptions: {map: map, autoViewport: true}
                    //     });
                    //     driving.search(current_point, center_point);
                    // }
                }
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

</style>