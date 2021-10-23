<template>
  <v-container>
    <v-row></v-row>
    <br/><br/>
    <v-card>
      <v-card-title>
        เลือกหน่วยงานที่ต้องการ
      </v-card-title>
      <v-card-title>
          รายชื่อคำถาม &nbsp;&nbsp;&nbsp;&nbsp;
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-card-actions>
            <create_button :divisionLists="divisionLists" :fetchItems="fetchItems"/>
          </v-card-actions>
      </v-card-title>
      <v-data-table :headers="headers" :items="allQuestion" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form ref="formEditQuestion" lazy-validation>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.qSequence"
                            prepend-icon="mdi-chart-pie"
                            label="ลำดับคำถาม"
                            type="number"
                            :rules="[v => !!v || 'กรุณาเลือกลำดับคำถาม']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.qName"
                            prepend-icon="mdi-chart-pie"
                            label="คำถาม"
                            type="text"
                            :rules="[v => !!v || 'คำถามไม่สามารถเว้นว่างได้']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field readonly required
                          v-model="editedItem.divTag" 
                          prepend-icon="mdi-chart-pie"
                          label="รหัสหน่วยงานที่รับผิดชอบ"
                          :rules="[v => (v && v.length > 0) || 'โปรดระบุหน่วยงานที่รับผิดชอบ อย่างน้อย 1 หน่วยงาน']" 
                          ></v-text-field>
                          <v-select required
                          v-model="editedItem.divTag"
                          prepend-icon="mdi-chart-pie"
                          :items="divisionLists"
                          item-text="divName"
                          item-value="divTag"
                          label="ระบุหน่วยงาน"
                          :rules="[v => (v && v.length > 0) || 'โปรดระบุหน่วยงาน']"
                          ></v-select>
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
                <v-card-title class="text-h5">ต้องการลบคำถามนี้ใช่หรือไม่</v-card-title>
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
          <v-btn color="primary" @click="fetchItems()">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import create_button from "../components/CreateQuestion";
import axios from 'axios';
export default {
  layout: "admin",
  components: {
    create_button,
  },
  data: () => ({
    allQuestion: [],
    specificQuestion: [],
    divisionLists: [],
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "Key", value: "_id" },
      { text: "หน่วยงาน", value: "divTag" },
      { text: "ลำดับคำถาม.", value: "qSequence" },
      { text: "คำถาม", value: "qName" },
      { text: "แก้ไข/ลบ", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    divTagIndex: "",
    editedItem: {
      qSequence: "",
      qName: "",
      divTag: "",
      
    },
    defaultItem: {
      qSequence: "",
      qName: "",
      divTag: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มคำถามใหม่" : "แก้ไขคำถาม";
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
    fetchItems(){
      const apiURLAllquestion = `http://localhost:9000/api/questions/`;
      const apiURLSpecificQuestion = `http://localhost:9000/api/questions/C0`
      const apiURLdivs = "http://localhost:9000/api/divs";
      axios.get(apiURLAllquestion).then(res => {this.allQuestion = res.data}).catch(err => { console.log(err) });
      axios.get(apiURLSpecificQuestion).then(res => {this.specificQuestion = res.data}).catch(err => { console.log(err) });
      axios.get(apiURLdivs).then(res => {this.divisionLists = res.data}).catch(err => { console.log(err) });
    },
    editItem(item) {
      this.editedIndex = this.allQuestion.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allQuestion.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1);
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
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
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