<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex lg7 md>
        <v-card class="elevation-12 box-login">
          <v-toolbar-title align="center" justify="space-around"
            >Service Evaluation
          </v-toolbar-title>
          <br />
          <v-card-text>
            <div class="question">
            <v-row align="center">
              <h3>Question:</h3>
              <v-col cols="8" >
                <v-text-field label="xxxxxxxxxxxxxxxx" solo></v-text-field>
              </v-col>
            </v-row>
            </div>
            <div  align="center" >
              <v-btn depressed color="#FF4500" class="worst" > WORST </v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-btn depressed color="#FFA500" class="moderate"> MODERATE </v-btn>
              <br /><br />
              <v-btn depressed color="#00FF7F" class="good"> GOOD </v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-btn depressed color="#008000" class="best"> BEST </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    first: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  }),
};
</script>

<style>
.question{
  margin-left: 10%;
  width: 100%;
  padding: 3%
}
.worst{
    width: 250px;
}
.moderate{
    width: 250px;
}
.good{
    width: 250px;
}
.best{
    width: 250px;
}

</style>