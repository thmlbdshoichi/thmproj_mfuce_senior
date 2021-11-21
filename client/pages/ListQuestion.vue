<template>
  <v-container>
    <v-row></v-row>
    <br/><br/>
    <v-alert :type="alertbox.type" transition="fade-transition" :value="alertbox.alert" dismissible>{{alertbox.msg}}</v-alert>
    <v-card>
    <v-card-title>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-icon medium color="#bc8e5d" class="mr-1"> mdi-numeric-1-circle </v-icon>
          เลือกหน่วยงานที่ต้องการ
          <v-select 
          v-model="divTagIndex" 
          @input="fetchItems()"
          :items="userResDiv" 
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
            <CreateQuestion_Button 
            :createAlert="createAlert" :divTagIndex="divTagIndex" 
            :specificQuestion="specificQuestion" :divisionLists="divisionLists" 
            :fetchItems="fetchItems"/>
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
                            :readonly="!selectedDiv"
                            v-model="editedItem.qSequence"
                            prepend-icon="mdi-numeric"
                            label="ลำดับคำถาม"
                            type="number"
                            :rules="[v => (!(specificQuestion.some(e => e.qSequence == v && e.divTag == editedItem.divTag)) || (v == editedqSequence)) || 'ลำดับคำถามซ้ำ', v => !!v || 'ไม่สามารถเว้นว่างลำดับคำถามได้', v => (v && v > 0) || 'ลำดับต้องเป็นจำนวนนับเท่านั้น', v => (v <= (specificQuestion.filter(e => e.divTag == editedItem.divTag).length + 1)) || 'ลำดับคำถามต้องต่อเนื่องกัน']"
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
          <v-icon @click="editItem(item)" :disabled="selectedDiv ? disabled : ''" small class="mr-2" color="yellow darken-2">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(item)" :disabled="selectedDiv ? disabled : ''" small color="error darken-2">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="fetchItems()" dark disabled>Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <br>
    <v-card>
      <v-row class="mt-1">
          <v-col class="text-center" cols="12" sm="12" md="12" lg="12">
            <h3>
              <v-icon medium color="primary">mdi-information</v-icon>
              โปรดทราบว่าการแก้ไข "คำถาม" หรือ "ลำดับของคำถาม" จะมีผลต่อคำถามที่ปรากฎในแบบประเมินและในกราฟสถิติ จึงขอแนะนำให้ล้างข้อมูลสถิติการประเมินทุกครั้งที่มีการแก้ไข
            </h3>
          </v-col>
          <v-col class="text-center" cols="12" sm="12" md="12" lg="12">
            <v-dialog
            v-model="dialogClearResults"
            persistent
            max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn :disabled="selectedDiv ? disabled : ''" v-bind="attrs" v-on="on" color="error">
                  <v-icon left>mdi-delete-empty</v-icon>ล้างข้อมูลสถิติการประเมินของหน่วยงานนี้
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">โปรดพิมพ์ข้อความต่อไปนี้เพื่อยืนยันการลบ</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form ref="formClearEvalResults" lazy-validation>
                      <v-row class="text-center">
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <h2>"{{selectedDiv}}"</h2>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <v-text-field
                            v-model="confirmKeyword"
                            prepend-icon="mdi-delete-sweep"
                            label="ป้อนข้อความ"
                            type="text"
                            :rules="[v => !!v || 'ขออภัยกรุณาเลือกหน่วยงานเพื่อล้างสถิติการประเมิน', v => (v===selectedDiv) || 'จำเป็นต้องกรอกข้อความให้ตรงทุกตัวอักษร หากท่านต้องการล้างสถิติการประเมิน']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeClear">ยกเลิก</v-btn>
                  <v-btn color="error darken-1" text @click="confirmClearResults">ยืนยันการล้างสถิติ</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
    </v-card>
  </v-container>
</template>

<script>
import CreateQuestion_Button from "../components/CreateQuestion";
export default {
  layout: "user",
  components: { CreateQuestion_Button },
  middleware: ['auth'],
  data: () => ({
    alertbox: {
      alert: false,
      msg: "",
      type: "info",
    },
    userDetails: {
      username: "",
      name: "",
      role: "",
      resDiv: []
    },
    defaultUser: {
      username: "",
      name: "",
      role: "",
      resDiv: []
    },
    userResDiv: [],
    //allQuestion: [],
    specificQuestion: [],
    divisionLists: [],
    dialog: false,
    dialogClearResults: false,
    dialogDelete: false,
    disabled: false,
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
    confirmKeyword: "",
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มคำถามใหม่" : `แก้ไขคำถาม ${this.editedItem.divTag} - ${this.editedItem.qSequence}`;
    },
    selectedDiv() {
      if(this.divTagIndex){
        return this.userResDiv.filter((div) => div.divTag == this.divTagIndex)[0].divName;
      } else {
        return "";
      }
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogClearResults(val) {
      val || this.closeClear();
    }
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
    async fetchItems(){
      //const apiURLAllQuestion = `${process.env.AXIOS_BASEURL}/api/questions/`;
      const apiURLSpecificQuestion = `${process.env.AXIOS_BASEURL}/api/questions/${this.divTagIndex}`
      const apiURLdivs = `${process.env.AXIOS_BASEURL}/api/divs`;
      /*await this.$axios.get(apiURLAllQuestion).then(res => {this.allQuestion = res.data})
      .catch(err => { this.createAlert(`เกิดข้อผิดพลาดขึ้นในการดึงข้อมูลคำถามทั้งหมด - ${err}`, "error") });*/
      await this.$axios.get(apiURLSpecificQuestion).then(res => {this.specificQuestion = res.data})
      .catch(err => {this.createAlert(`โปรดเลือกหน่วยงานที่ท่านรับผิดชอบเพื่อแสดงรายการคำถาม`, "info", 60000) });
      await this.$axios.get(apiURLdivs).then(res => {this.divisionLists = res.data}).catch(err => { console.log(err) });
      if(this.$auth.loggedIn){
        this.userDetails = this.$auth.user;
        this.userResDiv = this.divisionLists.filter((div) => this.userDetails.resDiv.includes(div.divTag));
        if(this.$auth.user.role == 'Admin'){
          this.userResDiv = this.divisionLists;
        }
      }
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
      const apiURLQuestionDelete = `${process.env.AXIOS_BASEURL}/api/questions/${this.specificQuestion[this.editedIndex]['divTag']}/${this.specificQuestion[this.editedIndex]['qSequence']}`;
      this.$axios.delete(apiURLQuestionDelete)
      .then(res => {this.fetchItems(); this.createAlert(`ลบคำถามสำเร็จ`, "success")})
      .catch(err => {this.createAlert(`เกิดข้อผิดพลาดขึ้นในการลบคำถาม - ${err}`, "error")})
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

    closeClear(){
      this.dialogClearResults = false;
      this.confirmKeyword = '';
    },

    save() {
      if (this.$refs.formEditQuestion.validate()){
        const apiURLQuestionUpdate = `${process.env.AXIOS_BASEURL}/api/questions/${this.specificQuestion[this.editedIndex]['divTag']}/${this.specificQuestion[this.editedIndex]['qSequence']}`;
        this.$axios.patch(apiURLQuestionUpdate, this.editedItem)
        .then(res => {this.fetchItems(); this.createAlert(`แก้ไขคำถามสำเร็จ`, "success")})
        .catch(err => {this.createAlert(`เกิดข้อผิดพลาดขึ้นในการแก้ไขบัญชีผู้ใช้ - ${err}`, "error")})
        this.close();
      }else{
        this.$refs.formEditQuestion.validate()
      }
    },

    confirmClearResults() {
      if(this.divTagIndex && this.$refs.formClearEvalResults.validate()){
        let apiURLevalResultClear = `${process.env.AXIOS_BASEURL}/api/evalresults/${this.divTagIndex}`
        this.$axios.delete(apiURLevalResultClear)
        .then(res => {this.fetchItems(); this.createAlert(`ทำการสถิติทั้งหมดของหน่วยงาน ${this.selectedDiv} เรียบร้อยแล้ว`, "warning")})
        .catch(err => {this.createAlert(`เกิดข้อผิดพลาดขึ้นในการล้างสถิติของหน่วยงาน ${this.selectedDiv} - ${err}`, "error")})
        this.closeClear();
      } else {
        this.$refs.formClearEvalResults.validate()
      }
    }
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