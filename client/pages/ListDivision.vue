<template>
  <v-container>
    <v-row> </v-row>
    <br/><br/>
    <v-alert :type="alertbox.type" transition="fade-transition" :value="alertbox.alert" dismissible>{{alertbox.msg}}</v-alert>
    <v-card>
      <v-card-title>
        <v-col cols="12" sm="3" md="3">
        รายชื่อหน่วยงาน
        </v-col>
        <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-card-actions>
            <CreateDivision_Button :divisions="divisions" :fetchItems="fetchItems" :createAlert="createAlert"/>
          </v-card-actions>
        </v-col>
      </v-card-title>
      <v-data-table :headers="headers" :items="divisions" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form ref="formEditdivision" lazy-validation>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field required
                            v-model="editedItem.divTag"
                            prepend-icon="mdi-key"
                            label="แท็กหน่วยงาน"
                            :counter="6"
                            :rules="[v => (!(divisions.some(e => e.divTag === v)) || (divisions[editedIndex]['divTag'] === v)) || 'ขออภัยไม่สามารถใช้แท็กหน่วยงานซ้ำกันได้',v => !!v || 'กรุณากรอกแท็กหน่วยงาน', v => (v && v.length <= 6) || 'แท็กหน่วยงานห้ามเกิน 6 ตัวอักษร']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field required
                            v-model="editedItem.divName"
                            prepend-icon="mdi-wallet-travel"
                            label="ชื่อหน่วยงาน"
                            :rules="[v => (v && v.length > 0) || 'ชื่อหน่วยงานไม่สามารถเว้นว่างได้']"
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
            <v-dialog v-model="dialogDelete" max-width="1000px">
              <v-card>
                <v-card-title align="center" justify="space-around" class="text-h6 font-weight-bold mt-3">ต้องการลบหน่วยงาน "{{editedItem.divName}}" หรือไม่</v-card-title>
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
          <v-icon small class="mr-2" @click="editItem(item)" color="yellow darken-2">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)" color="error darken-2">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="fetchItems"> Reset </v-btn>
        </template></v-data-table
      >
    </v-card>
  </v-container>
</template>

<script>
import CreateDivision_Button from "../components/CreateDivision";
export default {
  layout: "user",
  components: { CreateDivision_Button },
  data: () => ({
    alertbox: {
      alert: false,
      msg: "",
      type: "info",
    },
    divisions: [],
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
        { text: "Key", value: "_id"},
        { text: "แท็กหน่วยงาน", value: "divTag" },
        { text: "ชื่อหน่วยงาน", value: "divName" },
        { text: "แก้ไข/ลบ", value: "actions", sortable: false },
      ],
    editedIndex: -1,
    editedItem: {
      divTag: "",
      divName: "",    
    },
    defaultItem: {
      divTag: "",
      divName: "",  
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "สร้างหน่วยงานใหม่" : "แก้ไขข้อมูลของหน่วยงาน";
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
    createAlert(msg, type, delay=5000){
      this.alertbox.msg = msg;
      this.alertbox.type = type;
      this.alertbox.alert = true;
      setInterval(() => {
        this.alertbox.alert = false
        this.alertbox.msg = "";
      }, delay)
    },
    async fetchItems() {
      const apiURLdivs = `${process.env.AXIOS_BASEURL}/api/divs`;
      this.$axios.get(apiURLdivs).then(res => {this.divisions = res.data})
      .catch(err => { this.createAlert(`เกิดข้อผิดพลาดขึ้นในการดึงข้อมูลหน่วยงาน - ${err}`, "error") }); 
    },
    editItem(item) {
      this.editedIndex = this.divisions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.divisions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const apiURLdivsDelete = `${process.env.AXIOS_BASEURL}/api/divs/${this.divisions[this.editedIndex]['divTag']}`;
      this.$axios.delete(apiURLdivsDelete)
      .then(res => {this.fetchItems() ; this.createAlert(`ลบหน่วยงานสำเร็จ`, "success")})
      .catch(err => {this.createAlert(`เกิดข้อผิดพลาดขึ้นในการลบหน่วยงาน - ${err}`, "error")})
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
      if (this.$refs.formEditdivision.validate()){
        const apiURLdivsUpdate = `${process.env.AXIOS_BASEURL}/api/divs/${this.divisions[this.editedIndex]['divTag']}`;
        this.$axios.patch(apiURLdivsUpdate, this.editedItem)
        .then(res => {this.fetchItems(); this.createAlert(`แก้ไขข้อมูลหน่วยงานสำเร็จ`, "success")})
        .catch(err => {this.createAlert(`เกิดข้อผิดพลาดขึ้นในการแก้ไขข้อมูลหน่วยงาน - ${err}`, "error")})
        this.close();
      }else{
        this.$refs.formEditdivision.validate()
      }
    },
  },
  async created() {
    await this.fetchItems();
  },
};
</script>

<style>
v-row > .create {
  align-items: right;
}
</style>