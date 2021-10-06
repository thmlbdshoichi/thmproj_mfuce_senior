<template>
  <div>
    <CreateQuestion />
  </div>
</template>

<script>
import CreateQuestion from "../components/Question_table";

export default {
  layout: "admin",
  components: {
    CreateQuestion,
  },
};
</script>