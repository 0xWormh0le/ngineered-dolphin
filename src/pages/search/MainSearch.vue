

<!---- This is the main component for the Search tab, the subcomponents are in @/components/search-components !-----> 
<template>
  <div id="wrapper">
    <NavBar />
    <b-container>
      <div v-if="isSearchActive">
        <Search :input=" $route.query.input" />
      </div>

      <!-- Currently the API call from isSearchActive is only returning true, if this is changed again in the API, it will then return false and show this -->
      <div v-else>
        <ReferFriends />
      </div>
    </b-container>
  </div>
</template> 
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import { IUser } from "../../interfaces/user.interface"
import userPage from "@/store/modules/userPage";
import Auth from "@/store/modules/auth";
import usersApi from "@/services/api/usersApi";

import Login from "./Login.vue";
import NavBar from "@/components/MainNavBar.vue";
import Search from "@/pages/search/Search.vue";
import ReferFriends from "@/pages/search/ReferFriends.vue";



@Component({
  components: {
    NavBar: NavBar,
    Search: Search,
    ReferFriends: ReferFriends
  }
})
export default class MainSearch extends Vue {
  currentTab = "sourcing";
  userInfo: IUser = {} as IUser;
  tabState = getModule(userPage);
  authState = getModule(Auth);
  changeTab(tab: String) {
    this.tabState.changeTab(tab);
  }
// This will tell the page whether the user has refered a friend a is the option is unlocked or not. It is computed because it can change.
  get isSearchActive() {

    return this.authState.user.isJobSearchUnlocked;
  }
}

</script>
<style scoped lang="scss">
#wrapper {
  background: $violet-Gradient;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
}
.filter {
  max-width: 40px;
  justify-content: right;
}
.faves-container {
  margin: 5% auto auto auto;
  text-align: center;
}
.buttons-container {
  text-align: center;
  border: 1px solid black;
  max-width: 500px;
  margin: 5% auto auto auto;
}
#title {
  font-weight: 800 !important;
}
p {
  font-size: 20px;
  font-weight: 800;
}
b-container {
  margin-bottom: 15%;
}
.options {
  border-bottom: 1px solid black;
  margin: 3% auto 3%;
}
#results {
  text-align: left;
  display: inline-block;
}
@media screen and (max-width: 576px) {
  .container {
    max-width: 350px;
  }
  button {
    font-size: 15px;
  }
  #title {
    font-weight: 800 !important;
    font-size: 35px;
  }
}
</style>
