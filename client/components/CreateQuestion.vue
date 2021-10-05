<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="white--text"
          color="#5c9dc0"
          rounded
          dark
          v-bind="attrs"
          v-on="on"
        >
          CREATE
        </v-btn>
      </template>
      <v-card>
      <br>
      <h5 align="center" justify="space-around" class="text-h5" >Create Question</h5>
        <v-card-text>
          <v-container>
          <v-form>
                    <v-row align="center">
                  <h3>Division:</h3>
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                      :items="items"
                      label="Choose Division to Create"
                      dense
                      solo
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row align="center">
                  <h3>Question:</h3>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Solo" solo></v-text-field>
                  </v-col>
                  
                </v-row>
                  </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    data: null,
    items: ["Division1", "Division2", "Division3", "Division4"],
    search: "",
   
  }),
};
</script>