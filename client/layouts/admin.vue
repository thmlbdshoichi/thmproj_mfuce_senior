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
            <v-list-item-title  class="tt" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar  clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />

      <v-spacer />

      <v-avatar>
        <img src="/user.png" alt="John" />
      </v-avatar>
      &nbsp;&nbsp;&nbsp;
      <v-toolbar-title class="navbar" justify="center" align="center">
        <h6>{{userDetails.username}}</h6>
        <h6>{{userDetails.name}} | ({{userDetails.role}})</h6>
      </v-toolbar-title>

      &nbsp;&nbsp;&nbsp;&nbsp;

      <v-menu bottom left>
        <template v-slot:activator="{}">
          <v-btn class="ma-2" outlined color="#BC8E5D" @click="userLogout"><v-icon left> mdi-login </v-icon><h4>LOGOUT</h4></v-btn>
        </template>

        <v-list nav dense>
          <v-list-item-group v-model="selectedItem" >
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer  :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
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
        { title: "จัดการบัญชีผู้ใช้", icon: "mdi-folder-account", to: "/ListAccount" },
        { title: "จัดการหน่วยงาน", icon: "mdi-chart-pie", to: "/ListDivision" },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Service Evaluation Control Panel",
  }),
  middleware: ['auth-admin'],
  methods: {
    async userLogout() {
      await this.$auth.logout()
      await this.$axios.setToken(false);
      this.$router.replace({name: 'index'});
    },
  },
  mounted(){
    if(this.$auth.loggedIn){
      this.userDetails = this.$auth.user;
      this.$axios.setToken(this.$auth.strategy.token.get());
    }else{
      this.userDetails = this.defaultUser;
    }
  }
};
</script>

<style scoped>

#app {
  font-family: 'Kanit', sans-serif;
}

.icon{
  color:#BC8E5D;
}

.tt {
  color:#000000;
  font-weight : bold ;
}

.v-application {
  background-color: #cacaca;
}



</style>






