<template>
  <v-app dark>
    <v-navigation-drawer color="blue-grey lighten-5" v-model="drawer" clipped fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action >
            <v-icon class="icon">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="tt" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      &nbsp;&nbsp;&nbsp;&nbsp;
     <v-avatar class="ml-auto">
        <img src="/user.png" alt="John" />
      </v-avatar>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <v-toolbar-title class="text-center">
        <h6>{{userDetails.username}}</h6>
        <h6>{{userDetails.name}} | ({{userDetails.role}})</h6>
      </v-toolbar-title>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <v-menu>
        <template v-slot:activator="{}"> 
          <v-btn class="ma-2" outlined color="#BC8E5D" @click="userLogout">
            <v-icon left> mdi-logout </v-icon>
            <h4>LOGOUT</h4>
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} T. Boongoen , N. Iam-on, N. Patlee, P. Jairat, A. Moonbung, K. Sinauksonsub - All Rights Reserved</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data: () => ({
      userDetails: {
      username: "",
      name: "",
      role: "",
      resDiv: []
      },
      defaultUser: {
      username: "UNKNOWN",
      name: "UNKNOWN",
      role: "Guest",
      resDiv: []
      },
      clipped: false,
      drawer: false,
      fixed: false,
      selectedItem: 0,
      items: [
        { title: "ดูข้อมูลสถิติ", icon: "mdi-view-dashboard", to: "/Dashboard" },
        { title: "จัดการคำถาม", icon: "mdi-tooltip-edit", to: "/ListQuestion" },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "แผงควบคุมระบบประเมินหน่วยงาน",
    }),
  middleware: ['auth'],
  methods: {
    async userLogout() {
      await this.$auth.logout()
      .then(() => this.$axios.setToken(false))
      .then(() => this.$router.push({name: 'index'}))
    },
    async fetchUser(){
      if(this.$auth.loggedIn){
        this.userDetails = this.$auth.user;
        if(this.$auth.user.role === "Admin"){
          const adminMenu = [
            { title: "จัดการหน่วยงาน", icon: "mdi-domain", to: "/ListDivision" },
            { title: "จัดการบัญชีผู้ใช้", icon: "mdi-folder-account", to: "/ListAccount" },
          ]
          await this.items.push(...adminMenu)
        }
      }
      else
      {
        this.userDetails = this.defaultUser;
      }
    }
  },
  created(){
    this.fetchUser();
  },
}

</script>

<style scoped>

#app {
  font-family: 'Kanit', sans-serif;
}

.icon{
  color:#BC8E5D;
}

.v-application {
  background-color: #cacaca;
}

.v-appbar {
  background-color: #cacaca;
}

.tt {
  color:#000000;
  font-weight : bold ;
}



</style>





