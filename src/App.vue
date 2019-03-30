<template>
    <div id="app">
        <!--<div class="header">-->
            <!--<div>header</div>-->
        <!--</div>-->
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="nav">
            <BottomNav id="nav"></BottomNav>
        </div>
    </div>
</template>

<script>
    import BottomNav from "./components/BottomNav";
    export default {
        components: {BottomNav}
    }
</script>

<style>
    html, body, #app {
        height: 100%;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        /*display: flex;*/
        flex-direction: column;
    }
    #app #nav {
        margin: 0;
        padding-left: 0;
        padding-right: 0;
    }
    .content {
        height: 100%;
    }
    /*.header {*/
        /*flex: 0;*/
    /*}*/
    /*.content {*/
        /*flex: 1;*/
        /*overflow: scroll;*/
    /*}*/
    /*.nav {*/
        /*flex: 0;*/
    /*}*/
</style>
