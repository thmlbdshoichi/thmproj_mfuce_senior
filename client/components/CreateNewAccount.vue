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
          v-bind="attrs"
          v-on="on"
        >
          CREATE
        </v-btn>
      </template>
      <v-card>
      <br>
      <h5 align="center" justify="space-around" class="text-h5" >Create New Account</h5>
        <v-card-text>
          <v-container>
          <v-form>
                  <v-text-field
                    id="Username"
                    prepend-icon="mdi-account"
                    name="Username"
                    label="User Neme:"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    id="Authorzedlevel"
                    prepend-icon="mdi-account"
                    name="Authorzedlevel"
                    label="Authorzed Level:"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="Division"
                    prepend-icon="mdi-account"
                    name="Division"
                    label="Division:"
                    type="text"
                  ></v-text-field>
                  <v-text-field

                    prepend-icon="mdi-cellphone"
                    name="Telephone"
                    label="Telephone:"
                    type="Number"
                  ></v-text-field>
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
  }),
};
</script>

<style scoped>

</style>