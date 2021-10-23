<template>
  <v-container>
    <v-row></v-row>
    <br/><br/>
    <v-card>
    <v-card-title>
        <v-col cols="12" sm="6" md="6" lg="4">
          เลือกหน่วยงานที่ต้องการ
          <v-select 
          v-model="divTagIndex" 
          @input="fetchItems()"
          :items="divisionLists" 
          item-text="divName" 
          item-value="divTag" 
          prepend-icon="mdi-magnify" 
          single-line hide-details></v-select>
        </v-col>

    </v-card-title>
    </v-card>
    <br/>
    <v-card>
      <v-card-title>
        <v-col cols="12" sm="3" md="3">
          รายชื่อคำถาม
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-card-actions>
            <CreateQuestion_Button :divTagIndex="divTagIndex" :specificQuestion="specificQuestion" :divisionLists="divisionLists" :fetchItems="fetchItems"/>
          </v-card-actions>
        </v-col>
      </v-card-title>
      <v-data-table :headers="headers" :items="specificQuestion" :search="search">
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
                            prepend-icon="mdi-numeric"
                            label="ลำดับคำถาม"
                            type="number"
                            :rules="[v => (!(specificQuestion.some(e => e.qSequence == v)) || (v == editedqSequence)) || 'ลำดับคำถามซ้ำ', v => !!v || 'ไม่สามารถเว้นว่างลำดับคำถามได้', v => (v && v > 0) || 'ลำดับต้องเป็นจำนวนนับเท่านั้น']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.qName"
                            prepend-icon="mdi-forum"
                            label="คำถาม"
                            type="text"
                            :rules="[v => !!v || 'คำถามไม่สามารถเว้นว่างได้']"
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
          <v-btn color="primary" @click="fetchItems()" dark disabled>Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import CreateQuestion_Button from "../components/CreateQuestion";
import axios from 'axios';
export default {
  layout: "admin",
  components: { CreateQuestion_Button },
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
    editedqSequence: -1,
    divTagIndex: "0",
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
      return this.editedIndex === -1 ? "เพิ่มคำถามใหม่" : `แก้ไขคำถาม ${this.editedItem.divTag}`;
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
      const apiURLAllQuestion = `http://localhost:9000/api/questions/`;
      const apiURLSpecificQuestion = `http://localhost:9000/api/questions/${this.divTagIndex}`
      const apiURLdivs = "http://localhost:9000/api/divs";
      axios.get(apiURLAllQuestion).then(res => {this.allQuestion = res.data}).catch(err => { console.log(err) });
      axios.get(apiURLSpecificQuestion).then(res => {this.specificQuestion = res.data}).catch(err => { console.log(err) });
      axios.get(apiURLdivs).then(res => {this.divisionLists = res.data}).catch(err => { console.log(err) });
    },
    editItem(item) {
      this.editedIndex = this.specificQuestion.indexOf(item);
      this.editedItem = Object.assign({}, item);
      item ? this.editedqSequence = this.editedItem.qSequence : this.editedqSequence = -1
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.specificQuestion.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const apiURLQuestionDelete = `http://localhost:9000/api/questions/${this.specificQuestion[this.editedIndex]['divTag']}/${this.specificQuestion[this.editedIndex]['qSequence']}`;
      axios.delete(apiURLQuestionDelete).then(res => {this.fetchItems()}).catch(err => {console.log(err)})
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
      if (this.$refs.formEditQuestion.validate()){
        const apiURLQuestionUpdate = `http://localhost:9000/api/questions/${this.specificQuestion[this.editedIndex]['divTag']}/${this.specificQuestion[this.editedIndex]['qSequence']}`;
        axios.patch(apiURLQuestionUpdate, this.editedItem).then(res => {this.fetchItems()}).catch(err => {console.log(err)})
        this.close();
      }else{
        this.$refs.formEditQuestion.validate()
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