<template>
  <div class="index-page">
    <MyDivider />
    <!-- <div class="logo">
      <img src="../assets/logo.png" alt="logo" />
    </div> -->
    <MyDivider />

    <div class="certain-category-search-wrapper" style="width: 100%">
    <a-auto-complete
      v-model:value="autoCompleteBarValue"
      class="certain-category-search"
      popup-class-name="certain-category-search-dropdown"
      :dropdown-match-select-width="500"
      :options="dataSource"
      @select="onSelect"
      style="width: 250px"
    >
      <template #option="item">
          <template v-if="item.options">
            <span>
          <!-- 这里的 item 指 dataSource 里的每一项 -->
              {{ item.value }}
            </span>
          </template>
          <template v-else-if="item.value === 'all'">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看所有结果
            </a>
          </template>
          <template v-else>
            <div style="display: flex; justify-content: space-between">
              <!-- 这里的 item 🈯️ options 数组里的每一项 -->
            {{ item.label }}
              <!-- <span>
                <UserOutlined />
              搜索过{{ item.count }}次
              </span> -->
            <a v-if="item.label !== ''"
              style="float: right"
              :href="'https://www.baidu.com/s?ie=utf-8&wd=' + item.label"
              target="_blank"
              rel="noopener noreferrer"
            >
              更多
            </a>
            <a v-else href="#"></a>
            </div>
          </template>
        </template>
      <a-input-search placeholder="在此键入搜索词" size="large" @search="onSearch"></a-input-search>
      </a-auto-complete>
    </div>

    <MyDivider />
    <!-- tab 栏 -->
      <a-tabs v-model:activeKey="activeKey" :tab-position="mode" :style="{ height: '200px' }" @tabScroll="callback" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
          <PostList :post-list="postList"/>
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片">
          <PictureList :picture-list="picList" />
        </a-tab-pane>
        <a-tab-pane key="video" tab="视频">
          <VideoList :video-list="videoList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
          <UserList :user-list="userList"/>
      </a-tab-pane>
      <!-- <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`">Content of tab {{ i }}</a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script setup lang="ts">

import { ref, watchEffect, watch, nextTick } from 'vue';
import type { TabsProps } from 'ant-design-vue';
import PostList from "@/components/PostList.vue";           // PostList 没有被显式 export 出来，因此这里直接 import PostList，不加{}
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import VideoList from "@/components/VideoList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRouter, useRoute } from 'vue-router';
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";
import type { CSSProperties } from 'vue';
import type { FlexProps } from 'ant-design-vue';
import { useSearchHistoryStore } from "@/stores/SearchHistoriesStore";
import { useSearchSuggestionStore } from "@/stores/SearchSuggestionStore";
import { storeToRefs } from 'pinia';

// const base_url = process.env.VUE_APP_API_URL
// console.log(base_url)

// 设置搜索框自动完成
// interface searchHistories {
//   value: string;
//   histItem: Array<Record<string, string>>;
// }

// interface searchSuggestions {
//   value: string;
//   suggestions: Array<Record<string, string>>;
// }

interface searchOptions {
  value: string;
  options: Array<Record<string, any>>;
}

const searchHistories = useSearchHistoryStore()
const searchSuggestions = useSearchSuggestionStore()

const dataSource = ref([
  searchSuggestions.$state as Record<string, any>,
  searchHistories.$state as Record<string, any>,

  {
    value: 'all',
  },
])


const buildSearchHistoryItems = (newOption: string) => {
  searchHistories.addOption(newOption)
  const { value, options } = storeToRefs(searchHistories)
  return {
    value: value.value,
    options: options.value,
  }
}

const buildSearchSuggestionItems = (newOptions: any[]) => {
  searchSuggestions.setOptions(newOptions)
  const { value, options } = storeToRefs(searchSuggestions)
  return {
    value: value.value,
    options: options.value,
  }
}

// 搜索栏自动补全
const autoCompleteBarValue = ref('');

const onSelect = (value: string) => {
  alert(autoCompleteBarValue.value)
  console.log('onSelect', value);
};

const isDropDownOpen = ref(false)

const toggleDropDownVisible = () => {
  isDropDownOpen.value = !isDropDownOpen.value
}

const closeDropDown = () => {
  isDropDownOpen.value = false
}

// 搜 索 功 能
// 搜索结果
const postList = ref([]);
const userList = ref([]);
const picList = ref([]);
const videoList = ref([]);


// 搜索框
const route = useRoute();
const router = useRouter();

const mode = ref<TabsProps['tabPosition']>('top');

// 标签页
// const activeKey = ref('post');

// 将标签页状态更改为与路由同步，避免状态丢失
const activeKey = route.params.category || 'post';
const callback: TabsProps['onTabScroll'] = val => {
  console.log(val);
};

// 搜索关键词
const searchText = ref(route.query.text || searchSuggestions.$state.options[0].label);

const initSearchParams = {
  // type: activeKey,
  type: activeKey || 'picture',
  text: searchText.value,
  pageSize: 10,
  pageNum: 10,
};

// 存储搜索参数，初始化为默认值
const searchParams = ref(initSearchParams)

console.log(route.query.text)

// 搜索关键词
const searchText = ref(route.query.text || "");

const loadData = (params: any) => {
  const type  = searchParams.value.type;
  // alert(type)
  if(!type) {
    message.error('类别为空');
    return;
  }
  const query = {
    ...params,
    searchText: params.text,
  }

  // 调用聚合搜索接口
  try {
    myAxios.post('/search/all', query).then((resp: any) => {
      // alert(query.searchText)
      // alert(query.type)
      // console.log('Response fetched');
      // console.log(resp);
      const data = resp;
      if (type === 'post') {
      postList.value = data.dataList;
      } else if (type === 'picture') {
      picList.value = data.dataList.filter((item: any) => !item.url.startsWith("https://pic1.arkoo.com/"));  // 过滤 url 存在问题的图片
      } else if (type === 'user') {
      userList.value = data.dataList;
    } else if (type === 'video') {
      videoList.value = data.dataList;
    }
  }
  ).catch((error) => {
    // alert(error);
    console.log(error);
  })

  // 若搜索词为空，则不提供搜索建议
  if (query.searchText === undefined || query.searchText === '' || query.searchText === null) {
    return;
      }
    }
  )
  } catch (error) {
    console.log(error)
  }
}

// 钩子函数
// 若函数中的任意变量被修改，就会重新执行一遍
// 监听路由事件，并更新 URL
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,        // 设置默认参数
    text: route.query.text,
    type: route.params.category, // 搜索类型设置为当前已被选中的标签
  } as any;
  loadData(searchParams.value);   
})

// 分内容搜索接口
const loadData_separate_reqs = (params: any) => {
  // alert('Hello')
  console.log(params);
  const postQuery = {
    ...searchParams.value,
    searchText: params.text,
  }

  const picQuery = {
    ...searchParams.value,
    searchText: params.text,
  }

  const userQuery = {
    ...searchParams.value,
    userName: params.text,
    userProfile: params.text,
  }
}
// 获取帖子列表
// try {
//   myAxios.post('/post/list/page/vo', postQuery
// ).then((resp) => {
//   console.log(resp);
//   try {
//     postList.value = resp.records;    
//   } catch (error) {
//     console.log(error)
//   }
// })
// } catch (error) {
//   console.log(error);
// }

// // 获取用户列表
// try {
//   myAxios.post('/user/list/page/vo', userQuery
// ).then((resp) => {
//   console.log(resp);
//   try {
//     userList.value = resp.records;    
//   } catch (error) {
//     console.log(error)
//   }
// })
// } catch (error) {
//   console.log(error);
// }

// // 获取图片列表
// try {
//   myAxios.post('/picture/list/page/vo', picQuery
// ).then((resp) => {
//   console.log(resp);
//   try {
//     picList.value = resp.records;    
//   } catch (error) {
//     console.log(error)
//   }
// })
// } catch (error) {
//   console.log(error);
// }

// 首次加载数据
// loadData(initSearchParams);

// 当用户点击搜索按钮或切换 tab 时，回传 URL, 实现状态监听
const onSearch = (value: string) => {
  // console.log('use searchText', value);
  // console.log('or use this.searchText', this.searchText);
  // alert(value);

  // 改变 url, 保存用户的搜索状态
  router.push({
    // query: searchParams.value,
    query: {
      text: value,
    }
  })

  // loadData(searchParams.value);
};

const onTabChange = (key: string) => {
  // alert(key)
  router.push({
    path: `/${key}`,            // 设置动态路由 url
    query: searchParams.value,
  })
};

</script>
