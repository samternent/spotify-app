<template>
  <div class="flex h-screen w-screen">
    <div class="md:w-1/4 bg-gray-100">
      <Sidebar />
    </div>
    <div class="flex-1">
      <Content />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Content from './components/Content.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    Content,
  },
};

</script>