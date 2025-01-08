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
    pageSize: 6,
};

</script>

<style scoped>
/* a-list-item a-card {
        width: 100%;
        height: 100%;
    } */
/* Add these styles */
:deep(.ant-list-item) {
    height: 100%;
}

:deep(.ant-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
}

:deep(.ant-card-cover) {
    flex: 1;
    overflow: hidden;
}

:deep(.ant-card-cover img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* This maintains aspect ratio while covering the space */
}

:deep(.ant-card-body) {
    flex-shrink: 0;
    /* Prevents the body from shrinking */
}

/* Add these if you need more control over image heights */
:deep(.ant-card-cover img) {
  max-height: 200px; /* Set a maximum height for images */
  min-height: 200px; /* Set a minimum height for images */
  min-width: 200px;
  max-width: 500px;
}

:deep(.ant-card-meta) {
  min-height: 80px; /* Ensure consistent height for title/description area */
}

/* If you want to limit text overflow */
:deep(.ant-card-meta-description) {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>