

<!---- This is supposed to be the MODAL being shown when you click a job in mainSearch !-----> 
<template>
    <div id="wrapper">
        <NavBar />
        <b-container >
            <div class="wrapper" >

                <div class="short-information">
                      <a href=""> 
                          <h6>{{company}}</h6>
                           </a> 
                         <h2>{{jobTitle}}</h2>  
                         <br>
                         <p>{{location}} | {{jobType}}</p>
                         <p>Working on: {{problems}}</p>

                </div>




           
            </div>
        </b-container>
    </div>

</template> 



<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import Component from "vue-class-component";




@Component({
  components: {
  
  }
})
export default class JobPreview extends Vue {

@Prop() readonly company:string;
@Prop() readonly jobTitle:string;
@Prop() readonly location:string;
@Prop() readonly jobType:string;
@Prop() readonly problems:string;

}

</script>



<style scoped lang="scss">


.short-information{

background: $sky-blue;
}


</style>