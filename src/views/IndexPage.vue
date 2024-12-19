<template>
  <div class="index-page">
    <a-input-search v-model:value="searchParams.text" placeholder="请输入搜索关键词" enter-button="搜索" size="large"
      @search="onSearch" />
    <!-- {{ JSON.stringify(searchParams) }} -->
    <!-- {{ JSON.stringify(postList) }} -->
    <MyDivider />
    <!-- tab 栏 -->
      <a-tabs v-model:activeKey="activeKey" :tab-position="mode" :style="{ height: '200px' }" @tabScroll="callback" @change="onTabChange">
        <a-tab-pane key="post" tab="文章">
          <PostList :post-list="postList"/>
        </a-tab-pane>
        <a-tab-pane key="picture" tab="图片">
          <PictureList />
        </a-tab-pane>
        <a-tab-pane key="user" tab="用户">
          <UserList :user-list="userList"/>
        </a-tab-pane>
        <!-- <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`">Content of tab {{ i }}</a-tab-pane> -->
      </a-tabs>
  </div>
</template>

<script setup lang="ts">

import { ref, watchEffect } from 'vue';
import type { TabsProps } from 'ant-design-vue';
import PostList from "@/components/PostList.vue";           // PostList 没有被显式 export 出来，因此这里直接 import PostList，不加{}
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRouter, useRoute } from 'vue-router';
import myAxios from "@/plugins/myAxios";

const postList = ref([]);
const userList = ref([]);
// const picList = ref([]);

// 搜索框
const route = useRoute();
const router = useRouter();

const mode = ref<TabsProps['tabPosition']>('top');

// 标签页
// const activeKey = ref('post');

// 将标签页状态更改为与路由同步，避免状态丢失
const activeKey = route.params.category;
const callback: TabsProps['onTabScroll'] = val => {
  console.log(val);
};

const initSearchParams = {
  type: activeKey,
  text: "",
  pageSize: 10,
  pageNum: 1,
};

// 存储搜索参数，初始化为默认值
const searchParams = ref(initSearchParams)

// 监听路由事件，并更新 URL
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,      // 设置默认参数
    text: route.query.text,       
    type: route.params.category,
  } as any;
  // loadData(searchParams.value);
})

const loadData = (params: any) => {
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
  }
  // 获取帖子列表
try {
  myAxios.post('/post/list/page/vo', postQuery
).then((resp) => {
  console.log(resp);
  try {
    postList.value = resp.records;    
  } catch (error) {
    console.log(error)
  }
})
} catch (error) {
  console.log(error);
}

// 获取用户列表
try {
  myAxios.post('/user/list/page/vo', userQuery
).then((resp) => {
  console.log(resp);
  try {
    userList.value = resp.records;    
  } catch (error) {
    console.log(error)
  }
})
} catch (error) {
  console.log(error);
}

// 获取图片列表
// try {
//   myAxios.post('/picture/list/page/vo', {}
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

}

// 首次加载数据
loadData(initSearchParams);

// 当用户点击搜索按钮或切换 tab 时，回传 URL, 实现状态监听
const onSearch = (value: string) => {
  // console.log('use searchText', value);
  // console.log('or use this.searchText', this.searchText);
  // alert(value);

  // 改变 url, 保存用户的搜索状态
  router.push({
    query: searchParams.value,
  })

  loadData(searchParams.value);
};

const onTabChange = (key: string) => {
  // alert(key)
  router.push({
      path: `/${key}`,            // 设置动态路由 url
      query: searchParams.value,
  })
};

</script>
