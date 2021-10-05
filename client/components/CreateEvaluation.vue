<template>
  <v-container>
    <v-card>
      <v-card-title>
        Create Evaluation Topic &nbsp;&nbsp;&nbsp;&nbsp;
        <div class="my-2 create">
        <v-btn color="success" dark large nuxt to="/CreateQuestion"> Create </v-btn>
      </div>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
        v-if="data"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
const url = "/data.json";
 
export default {
  data() {
    return {
      data: null,
      search: "",
      headers: [
        { text: "No", value: "id" },
        { text: "Topic", value: "topic" },
        { text: "Action", value: "" },
      ],
    };
  },
  async mounted() {
    try {
      const res = await this.$axios.get(url);
      //console.log(res.data);
      this.data = res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>