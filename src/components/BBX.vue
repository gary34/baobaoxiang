<style scoped>

.root-warpper {
	margin: auto;
	/*width: 00px;*/
}

.header-warpper {
  margin: auto;
	margin-top: 100px;
  width: 600px;
}



.el-input input{
	height: 30px;
}

.content-warpper {
	width: 900px;
    margin: auto;
	padding-top: 50px;
	
}

.baobei-card {
  margin-top: 10px;
  margin-left: 30px;
  float: left;
  width: 410px;
}



.header-title {
    margin-bottom: 40px;
}
.content-warpper span{
	/*float: left;*/
}

.baobei-item {
	margin-right: 20px
}

.el-popover div {
	word-break: break-all;
}
/*.baobei-card-header {
  margin: -18px -20px;
  background-color: #13C6F0;
  width: 400px;
  height: 36px;
}*/
.baobei-card-header {
   background-color: #E6A23C;
   padding: 10px;
   border-style: none;
}

.baobei-card-body{
	padding: 20px;
}

.baobei-header i {
	margin-left: 30px;
}

div.item-info div {
	margin: 10px 20px;
}
.el-tag {
	/*padding: 0 15px;*/
	margin: 0 5px;
}

.favorie-panel{
    margin: 20px auto;
    width: 850px;
    
}

.collapse-button{
    float: right;
    font-size: 1.5em;
}
.favorie-panel-header{
    padding: 10px;
    font-size: 16px Medium;
    background-color: #409EFF;
}

.favorie-panel-body{
    padding: 20px;
    min-height: 20px;
}

</style>
<template>
<div class='root-warpper'>

	<div class='header-warpper'>
		<el-input
		placeholder="宝物"
		v-model="searchText">
		</el-input>
	</div>
    <el-card class="favorie-panel" :body-style="{ padding: '0px' }">
            <div class="favorie-panel-header">
                <span class='header-title'>收藏夹</span>
                <i class='collapse-button' @click="collapseFavoriePanel" :class="showFavorie ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i>
            </div> 
            <el-collapse-transition>
                <div v-show="showFavorie" class="favorie-panel-body">
                    <span  class="baobei-item" v-for="item in favoies" :key="item.id">
                        <el-popover
                          placement="top-start"
                          trigger="hover"
                          popper-class="item-info"
                          >
                          <div clas="baobei-header"> 
                              <span>
                                {{item.name}}
                              </span>
                              <i v-bind:class="item.in_favor ? 'el-icon-star-on' : 'el-icon-star-off'" v-on:click="setFavorite(item)" style="cursor: pointer;"></i>
                          </div>
                          <hr/>
                          <div clsss='baobei-desc'v-if="item.desc.length > 0">
                            {{item.desc}}
                          </div>
                          <div clsss='baobei-operator' v-if="item.operator.length > 0">
                            维护人:
                            <el-tag
                            type="primary"
                            >
                                {{item.operator}}
                            </el-tag>
                          </div>
                          <div clsss='baobei-tags'>
                            <el-tag
                              v-if="item.itags.length > 0"
                              v-for="tag in item.itags.split(',')" 
                              :key="tag"
                              type="gray"
                            >
                            {{tag}}
                            </el-tag>
                          </div>
                          <div clsss='baobei-url'>
                            {{item.url}}
                          </div>
                          <a :href="item.url" slot="reference">{{item.name}}</a>
                        </el-popover>
                    </span>
                </div> 
             </el-collapse-transition>
    </el-card>
	<div class='content-warpper'>

		<el-card class="baobei-card" v-for="project in filterProject" :key="project.id" :body-style="{ padding: '0px' }" >
			<div class="baobei-card-header">
				<span class='header-title'>{{project.name}}</span>
			</div>
      
        <!-- <hr/> -->
        <div class="baobei-card-body">
			<span class="baobei-item" v-for="item in project.items"  
				:key="item.id"
				>
				<el-popover
				  placement="top-start"
				  trigger="hover"
				  popper-class="item-info"
				  >
				  <div clas="baobei-header"> 
					  <span>
					  	{{item.name}}
					  </span>
					  <i v-bind:class="item.in_favor ? 'el-icon-star-on' : 'el-icon-star-off'" v-on:click="setFavorite(item)" style="cursor: pointer;"></i>
				  </div>
				  <hr/>
				  <div clsss='baobei-desc'v-if="item.desc.length > 0">
				  	{{item.desc}}
				  </div>
				  <div clsss='baobei-operator' v-if="item.operator.length > 0">
				  	维护人:
				  	<el-tag
				  	type="primary"
				  	>
				  		{{item.operator}}
				  	</el-tag>
				  </div>
				  <div clsss='baobei-tags'>
				  	<el-tag
				  	  v-if="item.itags.length > 0"
					  v-for="tag in item.itags.split(',')" 
					  :key="tag"
					  type="gray"
					>
					{{tag}}
					</el-tag>
				  </div>
				  <div clsss='baobei-url'>
				  	{{item.url}}
				  </div>
				  <a :href="item.url" slot="reference">{{item.name}}</a>
				</el-popover>
			</span>
      </div>
		</el-card>
	</div>
</div>
</template>
<script>
import itemApi from 'api/item'
export default {
  name: 'BBX',
  data () {
    return {
      uid: 0,
      showFavorie: true,
      favoies: [],
      // favoiesSet: new Set(),
      searchText: '',
      projects: []
    }
  },
  created () {
    // 没有token，没有登录拿到token
    if (localStorage.token !== undefined) {
      itemApi.favoies().then(result => {
        this.favoies = result
      })
    } else {
      if (localStorage.favoies !== undefined) {
        this.favoies = JSON.parse(localStorage.favoies)
      }
    }
    itemApi.list().then(result => {
      // console.log(result)
      this.projects = result
    }).catch(() => {})
  },
  computed: {
    filterProject () {
      console.log(this.searchText)
      if (this.searchText === '') {
        return this.projects
      }
      let ps = JSON.parse(JSON.stringify(this.projects))
      let st = this.searchText
      let rg = new RegExp(st, 'i')
      ps.forEach(function (p, index, array) {
        ps[index].items = p.items.filter(item => rg.test(item.name))
      })
      return ps
    }
  },
  methods: {
    handleIconClick (ev) {
      console.log(ev)
    },
    collapseFavoriePanel () {
      this.showFavorie = !this.showFavorie
    },
    setFavorite (item) {
      if (item.in_favor) {
        let i = this.favoies.findIndex((i) => {
          return i.ID === item.ID
        })
        if (i >= 0) {
          this.favoies.splice(i, 1)
          item.in_favor = false
          if (localStorage.token !== undefined) {
            itemApi.rmFavory(item.id).catch(() => {
              console.log('something worrng')
            })
          }
        }
      } else {
        this.favoies.push(item)
        item.in_favor = true
        if (localStorage.token !== undefined) {
          itemApi.addFavory(item.id).catch(() => {})
        }
      }
      localStorage.favoies = JSON.stringify(this.favoies)
    }
  }
}
</script>
