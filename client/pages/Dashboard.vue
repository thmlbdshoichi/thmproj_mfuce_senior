<template>
  <div>
    <Graph />
  </div>
</template>

<script>
import Graph from "../components/Dashboard";

export default {
  layout: "observer",
  components: {
    Graph,
  },
};
</script>