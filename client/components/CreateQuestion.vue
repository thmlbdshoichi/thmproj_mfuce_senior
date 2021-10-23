<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="white--text" color="#5c9dc0" rounded dark v-bind="attrs" v-on="on">เพิ่มคำถาม</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <p align="center" justify="space-around" class="text-h5 font-weight-bold mt-3" >เพิ่มคำถามใหม่</p>
            <v-form class="mt-7" ref="formCreateQuestion" lazy-validation>
              <v-row>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field 
                  prepend-icon="mdi-account" 
                  label="ลำดับคำถาม" 
                  type="number"
                  :rules="[v => !!v || 'กรุณากรอกชื่อผู้ใช้งาน', v => (v && v.length <= 20) || 'ชื่อผู้ใช้งานห้ามเกิน 20 ตัวอักษร', v => /^[A-Za-z0-9]*$/.test(v) || 'ชื่อผู้ใช้งานต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น']"
                  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="8">
                  <v-text-field
                  prepend-icon="mdi-lock"
                  label="หน่วยงาน"
                  type="text"
                  :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']"
                  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                  prepend-icon="mdi-comment-account"
                  label="คำถาม"
                  type="text"
                  :rules="[v => !!v || 'กรุณากรอก ชื่อ-นามสกุล ของผู้ใช้งานบัญชีนี้']"
                  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error darken-1" text @click="close">ยกเลิก</v-btn>.
                    <v-btn color="warning darken-1" text @click="reset">ล้างข้อมูล</v-btn>
                    <v-btn color="success darken-1" text @click="handleSubmitForm">สร้างบัญชีใหม่</v-btn>
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
import axios from 'axios';

export default {
  data: () => ({
    dialog: false,
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
      divisionLists: Array,
      fetchItems: Function,
  },
  watch: {
        dialog(val) {
        val || this.close();
        },
  },
  methods:{
      handleSubmitForm() {
        const apiURLquestionCreate = "http://localhost:9000/api/users";
        if (this.$refs.formCreateQuestion.validate()){
          axios.post(apiURLquestionCreate, this.newUser).then(res => {this.fetchItems()}).catch(err => {console.log(err)});
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