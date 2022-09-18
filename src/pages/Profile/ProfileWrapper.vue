<template>
  <div id="wrapper">
    <NavBar />
    <b-container>
      <div class="profile-container">
        <b-avatar></b-avatar>
        <h2 id="title">{{fullName}}</h2>
        <h5>{{userInfo.profileUrl}}</h5>
      </div>
      <div class="buttons-container">
        <div class="options">
          <div class="tabs">
            <button
              class="right-tab"
              id="profile"
              @click="changeTab('profile'), currentButton = 'profile'"
              :class="{'button-color': currentButton === 'profile'}"
            >profile</button>
            <button
              class="middle-tab"
              id="progress"
              @click="changeTab('progress'), currentButton = 'progress'"
              :class="{'button-color': currentButton === 'progress'}"
            >progress</button>
            <button
              class="left-tab"
              id="settings"
              @click="changeTab('settings'), currentButton = 'settings'"
              :class="{'button-color': currentButton === 'settings'}"
            >settings</button>
          </div>
          <div class="bottom-content-portion">
            <Profile v-if="tabState.activeTab === 'profile'" />
            <Progress v-if="tabState.activeTab === 'progress'"/>
            <Settings v-if="tabState.activeTab === 'settings'"/>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template> 


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NavBar from "@/components/MainNavBar.vue";
import usersApi from "@/services/api/usersApi";
import { getModule } from "vuex-module-decorators";
import userPage from "@/store/modules/userPage";
import Auth from "@/store/modules/auth";
import JobCard from "../../components/JobCard.vue";
import Profile from "@/components/profile-components/Profile.vue";
import Progress from "@/components/profile-components/Progress.vue";
import Settings from "@/components/profile-components/Settings.vue";
import { IUser } from "../../interfaces/user.interface";

import { IUserSettings } from "@/interfaces/user.interface";
@Component({
  components: {
    NavBar,
    Profile,
    Progress,
    JobCard,
    Settings
  }
})
export default class User extends Vue {
  currentButton = "settings";

  fullName = "";

  userInfo: IUser = {} as IUser;
  track: { results: IUserSettings[] } = {} as { results: IUserSettings[] };
  tabState = getModule(userPage);
  authState = getModule(Auth);

  formattedName() {
    this.fullName =
      this.userInfo.firstName +
      " " +
      this.userInfo.lastName.charAt(0).toUpperCase() +
      this.userInfo.lastName.slice(1);

    return this.fullName;
  }

  changeTab(tab: String) {
    this.tabState.changeTab(tab);
  }
  async mounted() {
    this.changeTab(this.currentButton);
    this.userInfo = await usersApi.getUser();
    this.formattedName();
  }
}
</script>

<style scoped lang="scss">
#wrapper {
  background: $yellow-Gradient;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.profile-container {
  margin: 5% auto;
  text-align: center;
}

.buttons-container {
  margin: 5% auto;
  text-align: center;
  border: 1px solid black;
  max-width: 900px;
}

#title {
  font-weight: 800 !important;
}

button {
  background: transparent;
  border: none;
  width: 33.33%;
  display: inline-block;
  padding: 5% 0px;
  border-bottom: 1px solid black;
  font-weight: 800;
  font-size: 22px;
}

button#progress {
  border-right: 2px solid black;
  border-left: 2px solid black;
  border-bottom: 1px solid black;
}

button:focus#profile {
  background: $olive-green !important;
  border: none;
  border-radius: 0px;
  outline: none;
  border-bottom: 1px solid black;
}

button:focus#progress {
  background: $olive-green !important;
  border: none;
  border-radius: 0px;
  outline: none;
  border-right: 2px solid black;
  border-left: 2px solid black;
  border-bottom: 1px solid black;
}
button:focus#settings {
  background: $olive-green !important;
  border: none;
  border-radius: 0px;
  outline: none;
  border-bottom: 1px solid black;
}

.button-color {
  background: $olive-green !important;
}

@media screen and (max-width: 576px) {
  .container {
    max-width: 400px;
  }
}
</style>
