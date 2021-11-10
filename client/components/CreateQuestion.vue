<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
        justify="end" 
        class="white--text" 
        color="success" 
        rounded 
        v-bind="attrs" 
        v-on="on"
        :disabled="newQuestion.divTag ? disabled : '' ">เพิ่มคำถาม</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <p align="center" justify="space-around" class="text-h5 font-weight-bold mt-3" >เพิ่มคำถามใหม่ {{newQuestion.divTag}}</p>
            <v-form class="mt-7" ref="formCreateQuestion" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field 
                  v-model="newQuestion.qSequence"
                  prepend-icon="mdi-numeric" 
                  label="ลำดับคำถาม" 
                  type="number"
                  min="1"
                  :rules="[v => !(specificQuestion.some(e => e.qSequence == v)) || 'ลำดับคำถามซ้ำ', v => !!v || 'ไม่สามารถเว้นว่างลำดับคำถามได้', v => (v && v > 0) || 'ลำดับต้องเป็นจำนวนนับเท่านั้น']"
                  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                  v-model="newQuestion.qName"
                  prepend-icon="mdi-forum"
                  label="คำถาม"
                  type="text"
                  :rules="[v => !!v || 'ไม่สามารถเว้นว่างคำถามได้']"
                  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error darken-1" text @click="close">ยกเลิก</v-btn>.
                    <v-btn color="warning darken-1" text @click="reset">ล้างข้อมูล</v-btn>
                    <v-btn color="success darken-1" text @click="handleSubmitForm">สร้างคำถามใหม่</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

export default {
  data: () => ({
    dialog: false,
    disabled: false,
    newQuestion: {
      qSequence: "",
      qName: "",
      divTag: "",
    },
    emptyQuestion: {
      qSequence: "",
      qName: "",
      divTag: "",
    },
  }),
  props: {
    specificQuestion: Array,
    divisionLists: Array,
    divTagIndex: String,
    fetchItems: Function,
    createAlert: Function,
  },
  watch: {
        dialog(val) {
        val || this.close();
        },
        divTagIndex(newval) {
          this.emptyQuestion.divTag = newval;
          this.newQuestion.divTag = newval;
        }
  },
  methods:{
      handleSubmitForm() {
        const apiURLquestionCreate = `${process.env.AXIOS_BASEURL}/api/questions`;
        if (this.$refs.formCreateQuestion.validate()){
          this.$axios.post(apiURLquestionCreate, this.newQuestion)
          .then(res => {this.fetchItems(); this.createAlert(`เพิ่มคำถามสำเร็จ`, "success")})
          .catch(err => {this.createAlert(`เกิดข้อผิดพลาดขึ้นในการเพิ่มคำถาม - ${err}`, "error")});
          this.close();
        } else {
          this.$refs.formCreateQuestion.validate()
        }
      },
      reset() {
        this.$refs.formCreateQuestion.reset()
        this.$refs.formCreateQuestion.resetValidation()
      },
      close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.newQuestion = Object.assign({}, this.emptyQuestion);
            });
            this.$refs.formCreateQuestion.resetValidation()
      },
  },
};

</script>

<style scoped>

</style>