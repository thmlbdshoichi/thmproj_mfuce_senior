<template>
  <v-container>
    <v-row></v-row>
    <br/><br/>
    <v-card>
      <v-card-title>
          บัญชีผู้ใช้งาน &nbsp;&nbsp;&nbsp;&nbsp;
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-card-actions>
            <create_button :users="users" :divisionLists="divisionLists" :fetchItems="fetchItems"/>
          </v-card-actions>
      </v-card-title>
      <v-data-table :headers="headers" :items="users" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-container>
                    <p align="center" justify="space-around" class="text-h5 font-weight-bold mt-3">{{ formTitle }}</p>
                    <v-form ref="formEdituser" lazy-validation>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field required
                          v-model="editedItem.username" 
                          prepend-icon="mdi-account"
                          label="ชื่อผู้ใช้งาน" 
                          type="text"
                          :counter="20"
                          :rules="[v => (!(users.some(e => e.username === v)) || (users[editedIndex]['username'] === v)) || 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว',v => !!v || 'กรุณากรอกชื่อผู้ใช้งาน', v => (v && v.length <= 20) || 'ชื่อผู้ใช้งานห้ามเกิน 20 ตัวอักษร', v => /^[A-Za-z0-9]*$/.test(v) || 'ชื่อผู้ใช้งานต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field required
                          v-model="editedItem.password" 
                          prepend-icon="mdi-lock"
                          label="รหัสผ่าน" 
                          type="password"
                          :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field required
                            v-model="editedItem.name" 
                            prepend-icon="mdi-comment-account"
                            label="ข้อมูลผู้ใช้งาน (ชื่อ - นามสกุล)" 
                            type="text"
                            :rules="[v => !!v || 'กรุณากรอก ชื่อ-นามสกุล ของผู้ใช้งานบัญชีนี้']"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field readonly required
                            v-model="editedItem.resDiv" 
                            prepend-icon="mdi-chart-pie"
                            label="รหัสหน่วยงานที่รับผิดชอบ"
                            :rules="[v => (v && v.length > 0) || 'โปรดระบุหน่วยงานที่รับผิดชอบ อย่างน้อย 1 หน่วยงาน']" 
                            ></v-text-field>
                            <v-select multiple required
                            v-model="editedItem.resDiv"
                            prepend-icon="mdi-chart-pie-notused"
                            :items="divisionLists"
                            item-text="divName"
                            item-value="divTag"
                            label="เลือกหน่วยงานที่รับผิดชอบ"
                            :rules="[v => (v && v.length > 0) || 'โปรดระบุหน่วยงานที่รับผิดชอบ อย่างน้อย 1 หน่วยงาน']"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-select required
                            v-model="editedItem.role" 
                            prepend-icon="mdi-star-circle"
                            :items="user_roleList" 
                            label="ระดับการเข้าถึง" 
                            :rules="[v => !!v || 'กรุณาระบุระดับการเข้าถึงของบัญชีนี้']"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field required
                            v-model="editedItem.tel" 
                            prepend-icon="mdi-cellphone"
                            label="เบอร์โทรติดต่อ"
                            :rules="[v => !!v || 'โปรดระบุเบอร์โทรศัพท์ที่ท่านสะดวกให้ติดต่อ', v => /^[+0-9]*$/.test(v) || 'โปรดใช้เครื่องหมาย + หรือ 0-9 เท่านั้นโดยไม่ต้องเว้นวรรคืหรือขีด']"
                            ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">ยกเลิก</v-btn>
                  <v-btn color="yellow darken-4" text @click="save">แก้ไข</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title align="center" justify="space-around" class="text-h6 font-weight-bold mt-3">ต้องการลบบัญชีผู้ใช้งาน {{editedItem.username}} หรือไม่</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">ยกเลิก</v-btn>
                        <v-btn color="error darken-1" text @click="deleteItemConfirm">ลบข้อมูลทิ้ง</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="editItem(item)" small class="mr-2" color="yellow darken-2">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)" small color="error darken-2">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="fetchItems"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
// IMPORT
import create_button from "../components/CreateNewAccount";
import axios from 'axios';
// EXPORT
export default {
  layout: "admin",
  components: { create_button },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    users: [],
    user_roleList: ['Observer', 'Admin'],
    divisionLists: [],
    search: "",
    headers: [
        { text: "Key", value: "_id" },
        { text: "ชื่อผู้ใช้งาน", value: "username" },
        { text: "ข้อมูลผู้ใช้งาน", value: "name" },
        { text: "ระดับการเข้าถึง", value: "role" },
        { text: "หน่วยงานที่รับผิดชอบ", value: "resDiv" },
        { text: "เบอร์ติดต่อ", value: "tel" },
        { text: "แก้ไข/ลบ", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
        _id: "",
        username: "",
        password: "",
        name: "",
        role: "",
        resDiv: [],
        tel: "",
    },
    defaultItem: {
        _id: "",
        username: "",
        password: "",
        name: "",
        role: "",
        resDiv: [],
        tel: "",
    },
  }),
  computed: {
    formTitle() {
    return this.editedIndex === -1 ? "สร้างบัญชีผู้ใช้งานใหม่" : "แก้ไขบัญชีผู้ใช้งาน";
    },
  },

  watch: {
      dialog(val) {
      val || this.close();
      },
      dialogDelete(val) {
      val || this.closeDelete();
      },
  },

  methods: {
    fetchItems() {
      const apiURLusers = "http://localhost:9000/api/users";
      const apiURLdivs = "http://localhost:9000/api/divs";
      axios.get(apiURLusers).then(res => {this.users = res.data}).catch(err => { console.log(err) });
      axios.get(apiURLdivs).then(res => {this.divisionLists = res.data}).catch(err => { console.log(err) });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const apiURLusersDelete = `http://localhost:9000/api/users/${this.editedItem._id}`;
      axios.delete(apiURLusersDelete).then(res => {this.fetchItems()}).catch(err => {console.log(err)})
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.formEdituser.validate()){
          const apiURLusersUpdate = `http://localhost:9000/api/users/${this.editedItem._id}`;
          axios.patch(apiURLusersUpdate, this.editedItem).then(res => {this.fetchItems()}).catch(err => {console.log(err)})
          this.close();
        }else{
          this.$refs.formEdituser.validate()
        }
    },
  },
  async created() {
    await this.fetchItems();
  },
};
</script>
