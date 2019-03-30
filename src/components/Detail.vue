<template>
    <div class="card">
        <mu-card raised style="width: 100%; margin: 0 auto; height:100%;">
            <mu-card-header class="text" :title="title" :sub-title="subTitle">
            </mu-card-header>
            <mu-carousel class="pics" hide-controls interval="3000">
                <mu-carousel-item v-for="item in imgs">
                    <img :src="item">
                </mu-carousel-item>
            </mu-carousel>
            <mu-card-title class="text" :title="textTitle" :sub-title="textSubTitle"></mu-card-title>
            <mu-card-text class="text">
                {{text}}
            </mu-card-text>
        </mu-card>
    </div>
</template>

<script>
    const client = require('../src/utils').client;
    const urls = require('../src/utils').uri;
    export default {
        name: "Detail",
        props: ["id"],
        data: function () {
            let url = urls.detail + this.id;
            client.get(url)
                .then(res => console.dir(res))
                .catch(err => console.dir(err));
            let data = {
                title: "标题",
                subTitle: "医院简介副标题",
                textTitle: "正文标题",
                textSubTitle: "正文副标题",
                text: "正文正文正文" +
                    "正文正文正文" +
                    "正文正文正文",
                imgs: [require("../assets/baby.jpg"), require("../assets/baby2.jpg")]
            };
            return data;
        },
        methods: {
        }
    }
</script>

<style scoped>

    .card {
        height: 100%;
        text-align: left;
    }

    .text {
        margin: 0 15px;
    }

    .pics {
        height: 40%;
    }

</style>