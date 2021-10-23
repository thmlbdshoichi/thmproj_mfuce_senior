<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="white--text" color="#5c9dc0" rounded v-bind="attrs" v-on="on">สร้างบัญชีใหม่</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <p align="center" justify="space-around" class="text-h5 font-weight-bold mt-3" >สร้างบัญชีผู้ใช้งานใหม่</p>
            <v-form class="mt-7" ref="formCreateuser" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field 
                  v-model="newUser.username"
                  prepend-icon="mdi-account" 
                  label="ชื่อผู้ใช้งานใหม่" 
                  type="text"
                  :counter="20"
                  :rules="[v => !users.some(e => e.username === v) || 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว',v => !!v || 'กรุณากรอกชื่อผู้ใช้งาน', v => (v && v.length <= 20) || 'ชื่อผู้ใช้งานห้ามเกิน 20 ตัวอักษร', v => /^[A-Za-z0-9]*$/.test(v) || 'ชื่อผู้ใช้งานต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น']"
                  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                  v-model="newUser.password"
                  prepend-icon="mdi-lock"
                  label="รหัสผ่าน"
                  type="password"
                  :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']"
                  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                  v-model="newUser.name"
                  prepend-icon="mdi-comment-account"
                  label="ข้อมูลผู้ใช้งาน (ชื่อ - นามสกุล)"
                  type="text"
                  :rules="[v => !!v || 'กรุณากรอก ชื่อ-นามสกุล ของผู้ใช้งานบัญชีนี้']"
                  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field  
                  prepend-icon="mdi-chart-pie" 
                  v-model="newUser.resDiv" 
                  label="รหัสหน่วยงานที่รับผิดชอบ" 
                  :rules="[v => (v && v.length > 0) || 'โปรดระบุหน่วยงานที่รับผิดชอบ อย่างน้อย 1 หน่วยงาน']"
                  readonly required></v-text-field>
                  <v-select 
                  v-model="newUser.resDiv"
                  prepend-icon="mdi-chart-pie-notused"
                  :items="divisionLists"
                  item-text="divName"
                  item-value="divTag"
                  label="เลือกหน่วยงานที่รับผิดชอบ"
                  :rules="[v => (v && v.length > 0) || 'โปรดระบุหน่วยงานที่รับผิดชอบ อย่างน้อย 1 หน่วยงาน']"
                  multiple required></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select 
                  v-model="newUser.role"
                  prepend-icon="mdi-star-circle" 
                  :items="user_roleList" 
                  label="ระดับการเข้าถึง" 
                  :rules="[v => !!v || 'กรุณาระบุระดับการเข้าถึงของบัญชีนี้']"
                  required></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                  v-model="newUser.tel"
                  prepend-icon="mdi-cellphone"
                  name="Telephone"
                  label="เบอร์โทรติดต่อ"
                  type="text"
                  :rules="[v => !!v || 'โปรดระบุเบอร์โทรศัพท์ที่ท่านสะดวกให้ติดต่อ', v => /^[+0-9]*$/.test(v) || 'โปรดใช้เครื่องหมาย + หรือ 0-9 เท่านั้นโดยไม่ต้องเว้นวรรคืหรือขีด']"
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
    user_roleList: ['Observer', 'Admin'],
    newUser: {
      username: "",
      password: "",
      name: "",
      role: "",
      resDiv: [],
      tel: ""
    },
    emptyUser: {
      username: "",
      password: "",
      name: "",
      role: "",
      resDiv: [],
      tel: ""
    },
  }),
  props: {
      users: Array,
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
        const apiURLusersCreate = "http://localhost:9000/api/users";
        if (this.$refs.formCreateuser.validate()){
          axios.post(apiURLusersCreate, this.newUser).then(res => {this.fetchItems()}).catch(err => {console.log(err)});
          this.close();
        } else {
          this.$refs.formCreateuser.validate()
        }
      },
      reset() {
        this.$refs.formCreateuser.reset()
        this.$refs.formCreateuser.resetValidation()
      },
      close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.newUser = Object.assign({}, this.emptyUser);
            });
            this.$refs.formCreateuser.resetValidation()
      },
  },
};

</script>

<style scoped>

</style>