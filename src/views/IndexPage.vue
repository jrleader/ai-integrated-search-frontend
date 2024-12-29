<template>
  <div class="index-page">
    <a-input-search v-model:value="searchText" placeholder="请输入搜索关键词" enter-button="搜索" size="large"
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

import { ref, watchEffect } from 'vue';
import type { TabsProps } from 'ant-design-vue';
import PostList from "@/components/PostList.vue";           // PostList 没有被显式 export 出来，因此这里直接 import PostList，不加{}
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRouter, useRoute } from 'vue-router';
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";

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

const initSearchParams = {
  type: activeKey,
  text: "",
  pageSize: 10,
  pageNum: 1,
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
        postList.value = data.postList;
      } else if (type === 'picture') {
        picList.value = data.pictureList;
      } else if (type === 'user') {
        userList.value = data.userList;
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
