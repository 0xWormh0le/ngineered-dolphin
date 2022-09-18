<template>
    <b-navbar toggleable="lg"
              variant="info">
        <b-navbar-brand href="/login">
            <img class="logo"
                 src="@/assets/logo/dolphin-logo.svg" />
        </b-navbar-brand>

        <b-nav-form @submit="navigateToSearch($event) ">
            <b-form-input size="md"
                          class="mr-sm-2"
                          placeholder=" 🔎 search job titles"
                          v-model="searchInput"></b-form-input>

        </b-nav-form>

        <b-navbar-nav class="ml-auto">
            <b-nav-form>
                <router-link to="/home">
                    <button class="navBtn">🚀 explore</button>
                </router-link>
                <router-link to="/faves">
                    <button class="navBtn">⭐ faves</button>
                </router-link>
                <router-link to="/trending">
                    <button class="navBtn">🔥 trending</button>
                </router-link>
                <router-link to="/profile">
                    <button class="navBtn">😎 u</button>
                </router-link>
                <router-link to="/logout">
                    <button class="navBtn">🚪 logout</button>
                </router-link>
            </b-nav-form>
        </b-navbar-nav>
    </b-navbar>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  import { getModule } from 'vuex-module-decorators'
  import suggestedJobs from '@/store/modules/suggestedJobs'

  @Component
  export default class MainNavbar extends Vue {
    jobsState = getModule(suggestedJobs)

    searchInput = ''

    navigateToSearch(event) {
      event.preventDefault()
      this.$router.push({ path: '/mainSearch', query: { input: this.searchInput } })
      this.jobsState.receiveNewJobs(this.searchInput)
    }
  }
</script>

<style lang="scss" scoped>
  .form-inline .form-control {
    border-radius: 30px;
    width: 300px;
  }

  .navBtn {
    background: transparent;
    border: none;
    color: $white;
    margin: 0px 15px;
  }
  div .bg-info {
    background-color: $navbar-blue !important;
  }

  @media screen and (max-width: 768px) {
    .navbar-brand {
      margin: auto;
    }
    .form-inline {
      margin: auto;
    }

    .ml-auto {
      margin: 2% auto;
    }

    .navBtn {
      margin: 0px 0px;
    }
  }
</style>