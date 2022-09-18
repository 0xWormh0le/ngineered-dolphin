<template>
    <v-autocomplete v-model="question.answer.value"
                    :get-label="getLabel"
                    :input-attrs="{
      placeholder: question.placeholder,
      disabled
    }"
                    :items="suggestionList"
                    :component-item="template"
                    :wait="200"
                    :auto-select-one-item="false"
                    @update-items="getSuggestions"
                    @input="valueChanged"
                    @change="change">
    </v-autocomplete>
</template>

<script lang="ts">
  import { Vue, Prop, Component } from 'vue-property-decorator'
  import Autocomplete from 'v-autocomplete'
  import QuestionsApi from '@/services/api/questionsApi'
  import AutocompleteItemTemplate from './AutocompleteItemTemplate.vue'
  import 'v-autocomplete/dist/v-autocomplete.css'
  import { QuestionNames } from '@/const/question-names.enum.ts'

  @Component({
    components: {
      'v-autocomplete': Autocomplete
    }
  })
  export default class AutocompleteInput extends Vue {
    @Prop() question: any
    @Prop() disabled: boolean

    suggestionList = []
    template = AutocompleteItemTemplate

    getSuggestions(text) {
      if (this.question.name === QuestionNames.COLLEGE) {
        QuestionsApi.getSuggestedSchools(text).then(res => {
          this.suggestionList = res.results
        })
      } else if (this.question.name === QuestionNames.MAJOR) {
        QuestionsApi.getSuggestedMajors(text).then(res => {
          this.suggestionList = res.results
        })
      } else if (this.question.name === QuestionNames.DEGREE) {
        QuestionsApi.getSuggestedDegrees(text).then(res => {
          this.suggestionList = res.results.map(({ id, name, abbreviation }) => ({ id, name: abbreviation }))
        })
      }
    }

    valueChanged(item) {
      if (item) {
        this.question.answer.valueIds = [item.id]
        this.question.answer.newValue = undefined
      } else {
        this.question.answer.valueIds = []
      }

      // Timeout is used here so that this.change() make nessesary changes for question object before validating the
      // question
      setTimeout(() => {
        this.$emit('checkQuestionValidity')
      }, 0)
    }

    change(text: string) {
      this.question.answer.newValue = text.trim()
    }

    getLabel(item) {
      return item?.name ? item.name : ''
    }
  }
</script>

<style lang="scss">
  .v-autocomplete-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #000;
    outline-offset: 0; // Overwrite Bootstrap styles

    &::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #000;
    }

    &::-moz-placeholder {
      /* Firefox 19+ */
      color: #000;
      opacity: 1;
    }

    &:-ms-input-placeholder {
      /* IE 10+ */
      color: #000;
    }

    &:-moz-placeholder {
      /* Firefox 18- */
      color: #000;
      opacity: 1;
    }
  }

  .v-autocomplete-list {
    z-index: 100;
    background-color: #fff;
    border: 1px solid #000;
    padding: 5px;
  }
  .v-autocomplete {
    .v-autocomplete-list {
      .v-autocomplete-list-item.v-autocomplete-item-active {
        background-color: #d9e5f3;
      }
    }
  }
</style>
