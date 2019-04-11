<template>
    <div class="card">
        <mu-card raised style="width: 100%; margin: 0 auto; height:100%;">
            <mu-card-header class="headText" :title="title" :sub-title="subTitle">
            </mu-card-header>
            <mu-carousel class="pics" interval="20000" @change="imgChange">
                <mu-carousel-item v-for="item in images">
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
            let self = this;
            let url = urls.detail + this.id;
            client.get(url)
                .then(res => {
                    let data = res.data;
                    self.title = data.title;
                    self.subTitle = data.subTitle;
                    self.content = data.content;
                    for (let item of self.content) {
                        self.images.push(item.url);
                    }
                })
                .catch(err => console.dir(err));
            let data = {
                title: "",
                subTitle: "",
                images: [],
                content: "",
                current_active: 0,
            };
            return data;
        },
        methods: {
            imgChange: function (index) {
                this.current_active = index;
            }
        },
        computed: {
            textTitle: function () {
                if (this.content) {
                    return this.content[this.current_active].title;
                }
                return "";
            },
            textSubTitle: function () {
                if (this.content) {
                    return this.content[this.current_active].subTitle;
                }
                return "";
            },
            text: function () {
                if (this.content) {
                    return this.content[this.current_active].text;
                }
                return "";
            }
        }
    }
</script>

<style scoped>

    .card {
        height: 100%;
        text-align: left;
    }

    .text, .headText {
        padding: 20px;
    }
    .headText {
        background-color: #e93478;
        opacity: 0.7;
    }

    .mu-card-header-title .mu-card-title{
        color: white;
    }

    .mu-card-header-title .mu-card-sub-title {
        color: white;
    }

    .pics {
        height: 40%;
    }

</style>