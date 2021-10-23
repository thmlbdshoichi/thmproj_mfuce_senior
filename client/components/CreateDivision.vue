<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="white--text" color="#5c9dc0" rounded dark v-bind="attrs" v-on="on">เพิ่มหน่วยงาน</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <p align="center" justify="space-around" class="text-h5 font-weight-bold mt-3" >เพิ่มหน่วยงานใหม่</p>
            <v-form class="mt-7" ref="formCreatedivision" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                  v-model="newDiv.divTag"
                  prepend-icon="mdi-key"
                  label="แท็กหน่วยงาน"
                  type="text"
                  :counter="6"
                  :rules="[v => !divisions.some(e => e.divTag === v) || 'ขออภัยไม่สามารถใช้แท็กหน่วยงานซ้ำกันได้', v => !!v || 'กรุณากรอกแท็กหน่วยงาน', v => (v && v.length <= 6) || 'แท็กหน่วยงานห้ามเกิน 6 ตัวอักษร']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                  v-model="newDiv.divName"
                  prepend-icon="mdi-wallet-travel"
                  name="Divisionid"
                  label="ชื่อหน่วยงาน"
                  type="text"
                  :rules="[v => (v && v.length > 0) || 'ชื่อหน่วยงานไม่สามารถเว้นว่างได้']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="close">ยกเลิก</v-btn>.
          <v-btn color="warning darken-1" text @click="reset">ล้างข้อมูล</v-btn>
          <v-btn color="success darken-1" text @click="handleSubmitForm">สร้างหน่วยงาน</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    dialog: false,
    newDiv: {
      divTag: "",
      divName: "",
    },
    emptyDiv: {
      divTag: "",
      divName: "",
    }
  }),
  props: {
    divisions: Array,
    fetchItems: Function,
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods:{
    handleSubmitForm() {
      const apiURLdivsCreate = "http://localhost:9000/api/divs";
      if (this.$refs.formCreatedivision.validate()){
        axios.post(apiURLdivsCreate, this.newDiv).then(res => {this.fetchItems()}).catch(err => {console.log(err)});
        this.close();
      } else {
        this.$refs.formCreatedivision.validate()
      }
    },
    reset() {
      this.$refs.formCreatedivision.reset()
      this.$refs.formCreatedivision.resetValidation()
    },
    close() {
          this.dialog = false;
          this.$nextTick(() => {
              this.newDiv = Object.assign({}, this.emptyDiv);
          });
          this.$refs.formCreatedivision.resetValidation()
    },
  },
};
</script>