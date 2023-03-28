<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    mounted() {
      this.methodName();
    },
    methods: {
      methodName() {
        const interfaces = require("os").networkInterfaces();
        const enterFace = require("os").cpus();
        console.log(interfaces, enterFace);
      },
    },
  };
</script>
