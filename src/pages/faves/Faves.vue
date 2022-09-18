
<!---- This is the main component for the FAVES tab, the subcomponents are in @/components/faves-components !-----> 

<template>
    <div id="wrapper">
        <NavBar />
        <b-container>
            <div class="faves-container">
                <h1 id="title">⭐ faves</h1>
            </div>
            <div class="buttons-container">
                <div class="options">

                    <div class="tabs">
                        

                           <!---- This is the sourcing button that had to be taken off, it is currently working, if needed be, just uncomment it  and it should work the same as the others  !-----> 
                        
                        <!-- <button class="left-tab"
                                id="sourcing"
                                @click="changeTab('sourcing'), currentButton = 'sourcing'"
                                :class="{'sourcing-color': currentButton === 'sourcing'}">saved</button> -->
                        <!---- :class is what makes the buttons colored if they are selected,  !-----> 

                        
                        <button class="middle-tab"
                                id="saved"
                                @click="changeTab('saved'), currentButton = 'saved'"
                                :class="{'saved-color': currentButton === 'saved'}">saved</button>
                        <button class="right-tab"
                                id="emailed"
                                @click="changeTab('emailed'), currentButton = 'emailed'"
                                :class="{'emailed-color': currentButton === 'emailed'}">emailed</button>
                    </div>
                    <div class="bottom-content-portion">

                           <!---- Uncomment this too for the Sourcing button to work  !-----> 
                        <!-- <Sourcing v-if="tabState.activeTab === 'sourcing'" /> -->
                        <Saved v-if="tabState.activeTab === 'saved'" />
                        <Emailed v-if="tabState.activeTab === 'emailed'" />

                    </div>
                </div>
            </div>
        </b-container>
    </div>

</template> 




<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Login from './Login.vue'
  import NavBar from '@/components/MainNavBar.vue'
  import Sourcing from '@/components/faves-components/Sourcing.vue'
  import Saved from '@/components/faves-components/Saved.vue'
  import Emailed from '@/components/faves-components/Emailed.vue'

  import usersApi from '@/services/api/usersApi'
  import { getModule } from 'vuex-module-decorators'
  import userPage from '@/store/modules/userPage'
  import Auth from '@/store/modules/auth'

  @Component({
    components: {
      NavBar: NavBar,
      Saved: Saved,
      Emailed: Emailed
    }
  })
  export default class MainTrending extends Vue {
    currentButton = 'saved'

    tabState = getModule(userPage)
     authState = getModule(Auth);
  
  

    changeTab(tab: String) {
      this.tabState.changeTab(tab)
    }

    mounted() {
      this.changeTab(this.currentButton)
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

  .faves-container {
    margin: 5% auto auto auto;
    text-align: center;
  }
  .buttons-container {
    text-align: center;
    border: 1px solid black;
    max-width: 1000px;
    margin: 5% auto 40px auto;
  }

  #title {
    font-weight: 800 !important;
  }

  button {
    background: transparent;
    border: none;

    // Change witdth to 33.33% so all buttons stay inside the row, also add the borders of the other buttons for styling
    width: 50%;
    display: inline-block;
    padding: 5% 0px;
    border-bottom: 1px solid black;
    font-weight: 800;
    font-size: 22px;
  }

  button#saved {
    border-right: 1px solid black;
  
  }

  button:focus#sourcing {
    border: none;
    border-radius: 0px;
    outline: none;
    border-bottom: 1px solid black;
  }

  button:focus#saved {
    border: none;
    border-radius: 0px;
    outline: none;
    border-right: 1px solid black;
  
    border-bottom: 1px solid black;
  }
  button:focus#emailed {
    border: none;
    border-radius: 0px;
    outline: none;
    border-bottom: 1px solid black;
  }

  .sourcing-color {
    background: $light-green !important;
  }
  .saved-color {
    background: $light-yellow !important;
  }

  .emailed-color {
    background: $light-blue !important;
  }
  .transparent {
    background: transparent;
  }
  b-container {
    margin-bottom: 15%;
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
