<template>
  <div class="home">
      <div class="tarbar">
          <div class="wrapper">
              <div class="record">{{record}}</div>
              <div class="index">
                  <div class="index-item-left">
                      <mu-button color="pink" round @click="handle($event)" id="hospitalDetail">
                          <mu-avatar :size="26" class="logo" color="white">
                              <img src="../assets/hos.png">
                          </mu-avatar>
                          医院简介
                      </mu-button>
                  </div>
                  <div class="index-item">
                      <mu-button color="pink" round id="examination" @click="handle($event)">
                          <mu-avatar :size="26" class="logo" color="white">
                              <img src="../assets/preg.png">
                          </mu-avatar>
                          妇科检查
                      </mu-button>
                  </div>
                  <div class="index-item-left">
                      <mu-button color="pink" round  id="ultrasound" @click="handle($event)">
                          <mu-avatar color="white" :size="26" class="logo">
                              <img src="../assets/ma.png">
                          </mu-avatar>
                          四维彩超
                      </mu-button>
                  </div>
                  <div class="index-item">
                      <mu-button color="pink" round  id="recovery" @click="handle($event)">
                          <mu-avatar :size="26" class="logo" color="white">
                              <img src="../assets/phone.png">
                          </mu-avatar>
                          月子中心
                      </mu-button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'home',
    components: {

    },
    data: function () {
        let data = {
            "record": "北京慈宝康华医生集团合作单位"
        };
        return data;
    },
    methods: {
        handle: function (event) {
            let current = event.currentTarget;
            let id = current.id;
            this.$router.push("/detail/" + id);
        }
    }

}
</script>

<style>
    .home {
        height: 100%;
        background: url("../assets/baby.jpg") no-repeat;
        background-size: auto 100%;
    }
    .wrapper {
        background-color: #e93478;
        opacity: 0.6;
    }
    .tarbar {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        flex-basis: 150px;
    }
    .index {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        font-size: 15px;
        color: white;
        font-weight: bold;
        padding: 10px;
    }

    .index-item-left, .index-item {
        padding: 5px;
    }

    .index-item-left {
        border-right: 1px dashed whitesmoke;
    }
    .record {
        border-bottom: 1px solid whitesmoke;
        color: white;
        padding: 10px;
    }

    .index .mu-button {
        padding: 8px;
    }
</style>