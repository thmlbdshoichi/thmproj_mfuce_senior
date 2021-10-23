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
        <h6>6131501016</h6>
        <h6>Natthida Patlee</h6>
      </v-toolbar-title>

      &nbsp;&nbsp;&nbsp;&nbsp;

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-2" outlined color="#BC8E5D" nuxt to="/">
            <v-icon left> mdi-login </v-icon>
            <h4>LOGOUT</h4>
          </v-btn>
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
/**import Account_table from "../components/Account_table";
import Division from "../components/Division";
import CreateEvaluation from "../components/CreateEvaluation";
import Evaluation from "../components/Evaluation";
import Dashboard from "../components/Dashboard";**/

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      selectedItem: 0,
      items: [
        { title: "Account", icon: "mdi-folder", to: "/Account" },
        { title: "Division", icon: "mdi-star", to: "/Division" },
        { title: "Create Quesion", icon: "mdi-account-multiple", to: "/Create_quesion" },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Service Evaluation",
    };
  },
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






