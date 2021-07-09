<template>
  <h1>SH</h1>
</template>

<script>
  export default {
    name: 'SH',
    middleware: 'authenticated',
    created() {
      const that = this;
      if(that.views.length>0) {
        that.$router.push(that.views[0].path);
      }
    },
    computed: {
      views: {
        get() {
          const that = this;
          return that.$store.getters['auth/views'];
        }
      }
    }
  }
</script>