<template>
    <!-- 图片列表  -->
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 3, xxl: 3 }" :data-source="pictureList"
        :pagination="pagination">
        <template #renderItem="{ item }">
            <a-list-item key="item.id">
                <a-list-item-meta>
                    <!-- <template #title>
                        <a :href="item.href">{{ item.title }}</a>
                    </template>
<template #avatar><a-avatar :src="item.avatar" /></template> -->
                </a-list-item-meta>
                <!-- <a-card hoverable style="width: 240px;"> -->
                <a-card hoverable>
                    <template #cover>
                        <!-- <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> -->
                        <a :href="item.url"><img alt="example" :src="item.url" /></a>
                    </template>
                    <!-- <a-card-meta title="Europe Street beat">
                    <template #description>www.instagram.com</template>
                </a-card-meta> -->
                    <a-card-meta :title="item.title">
                        <template #description>{{ item.description }}</template>
                    </a-card-meta>
                </a-card>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { withDefaults, defineProps } from "vue";

interface Props {
    pictureList: any[]
}

const props = withDefaults(defineProps<Props>(), {  // 填充默认值
    pictureList: () => []
});

const pagination = {
    onChange: (page: number) => {
        console.log(page);
    },
    pageSize: 9,
};

</script>

<style scoped>
    /* a-list-item a-card {
        width: 100%;
        height: 100%;
    } */
</style>