<template>
    <div class="container">
        <mu-bottom-nav id="nav" :value="currentTab">
            <mu-bottom-nav-item
                    title="首页"
                    icon="home"
                    value="home"
                    id="home"
                    @click.native="change($event)"></mu-bottom-nav-item>
            <mu-bottom-nav-item
                    title="来院地址"
                    icon="add_location"
                    id="map"
                    value="map"
                    @click.native="change($event)"></mu-bottom-nav-item>
            <mu-bottom-nav-item
                    title="电话咨询"
                    icon="settings_phone"
                    id="phone"
                    value="phone"
                    :href="telInfo"></mu-bottom-nav-item>
        </mu-bottom-nav>
    </div>
</template>

<script>
    export default {
        name: "BottomNav",
        data: function () {
            let currentTab = "home";
            let telInfo = "tel:03588268999";
            return {
                currentTab: currentTab,
                telInfo: telInfo,
            };
        },
        methods: {
            change: function (event) {
                let current = event.currentTarget;
                let id = current.id;
                if (id === "home") {
                    this.$router.push("/");
                } else if (id==="map") {
                    this.$router.push("/map");
                }
                this.currentTab = current.id;
            },
        },
        watch: {
            $route(to, from) {
                if (to.name === 'home' || to.name === 'map') {
                    this.currentTab = to.name;
                    console.log("-----当前tab");
                    console.dir(to);
                }
            }
        }
    }
</script>

<style>
    #nav {
        color: #f48fb1;
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 70px;
    }
    /* 导航栏选中时的颜色 */
    #nav .mu-bottom-item-active {
        color: #e93478;
    }
</style>