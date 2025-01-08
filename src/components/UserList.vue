<template>
    <!-- <img alt="" src=""/> -->
    <!-- 用户列表  -->
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="userList" :pagination="pagination">
        <template #renderItem="{ item }">
            <a-list-item key="item.id">
                <a-list-item-meta :description="item.description">
                    <!-- <template #title>
                        <a :href="item.href">{{ item.title }}</a>
                    </template>
<template #avatar><a-avatar :src="item.avatar" /></template> -->
                </a-list-item-meta>
                <!-- <a-card hoverable style="width: 240px;"> -->
                <a-card hoverable>
                    <template #cover>
                        <!-- <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> -->
                        <!-- <img alt="example" :src="portrait" /> -->
                    </template>
                    <!-- <a-card-meta title="Europe Street beat">
                    <template #description>www.instagram.com</template>
                </a-card-meta> -->
                    <a-card-meta :title="item.userName">
                        <template #description>{{ item.userProfile }}</template>
                    </a-card-meta>
                </a-card>
            </a-list-item>
        </template>
    </a-list>
    <!-- <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="userList"> -->
    <!-- <template #footer>
            <div>
                <b>ant design vue</b>
                footer part
            </div>
        </template> -->

    <!-- </a-list> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { withDefaults, defineProps } from "vue";
// import portrait from '../assets/portrait.png'

interface Props {
    userList: any[]
}

const props = withDefaults(defineProps<Props>(), {  // 填充默认值
    userList: () => []
});

const pagination = {
    onChange: (page: number) => {
        console.log(page);
    },
    pageSize: 6,
};

</script>

<style scoped></style>