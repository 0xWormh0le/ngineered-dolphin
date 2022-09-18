<template>
    <div class="question-container">
        <h1 class="question-header">{{ questionGroup.title }}</h1>
        <h2 class="question-description">{{ questionGroup.description }}</h2>
        <form>
            <div class="signup-question-form-container"
                 :class="{ 'wide-container': questionGroup.display.showWideContainer }">
                <div v-for="question in questionGroup.questions"
                     :key="question.id"
                     class="question-input-container"
                     :class="{
            'show-two-columns': question.display.showTwoColumns && question.inputType !== questionInputTypes.CHECKBOX
          }">
                    <autocomplete-input v-if="question.inputType === questionInputTypes.AUTOCOMPLETE"
                                        :question="question"
                                        :disabled="questionGroup.groupFormValidity.didNotEnroll"
                                        @checkQuestionValidity="checkQuestionGroupValidity" />

                    <input v-if="question.inputType === questionInputTypes.NUMBER"
                           :name="getInputName(question)"
                           :id="getInputName(question)"
                           :type="getInputType(question)"
                           :placeholder="question.placeholder"
                           v-model="question.answer.value"
                           :disabled="questionGroup.groupFormValidity.didNotEnroll"
                           @change="checkQuestionGroupValidity"
                           @input="checkQuestionGroupValidity"
                           min="1960"
                           max="2030"
                           class="question-input" />

                    <div v-else-if="question.inputType === questionInputTypes.CHECKBOX">
                        <Loader v-if="!question.answer.availableOptions.isLoaded" />

                        <div v-else
                             :class="{ 'two-columns': question.display.showTwoColumns }">
                            <div v-for="questionOption in question.answer.availableOptions.values"
                                 :key="questionOption.id"
                                 @click="selectAnswer(question, questionOption.id)"
                                 :class="{
                  selected: isAnswerSelected(question, questionOption.id),
                  'role-options': question.name == 'ROLE',
                  'experience-options': question.name == 'EXPERIENCE',
                  'job-type-options': question.name == 'JOB_TYPE',
                  'problem-container': question.name == 'PROBLEM'
                }"
                                 class="question-selector">
                                <div class="location-options">
                                    <div class="icon-container">
                                        <img class="question-image"
                                             :src="imageCheck(questionOption.image, questionOption.displayName)"
                                             alt=""
                                             v-if="!questionOption.icon" />
                                    </div>
                                    <div :class="{
                      'location-text-container': question.name == 'LOCATION',
                      'problem-text-container': question.name == 'PROBLEM'
                    }">
                                        <div :class="{
                        'inner-icon-container': question.name == 'PROBLEM'
                      }">
                                            {{ questionOption.icon ? questionOption.icon + ' ' : '' }}
                                        </div>
                                        <div :class="{
                        'inner-display-name-container': question.name == 'PROBLEM'
                      }">
                                            {{ questionOption.displayName }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dropped-out-education-container"
                     v-if="questionGroup.display.showSkipQuestionsCheckbox">
                    <input type="checkbox"
                           name="dropped-out-education"
                           id="dropped-out-education"
                           v-model="questionGroup.groupFormValidity.didNotEnroll"
                           @change="checkQuestionGroupValidity()" />
                    <label class="dropped-out-education-container-label"
                           for="dropped-out-education">
                        dropped out/didn't enroll
                    </label>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
  import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
  import { QuestionInputTypes } from '@/const/question-input-types.enum.ts'
  import { QuestionTypesConfig } from '@/const/question-types-config'
  import { QuestionNames } from '@/const/question-names.enum'
  import { QuestionSpecialOptions } from '@/const/question-special-options.enum'
  import AutocompleteInput from '@/components/autocomplete-input/AutocompleteInput.vue'
  import Loader from '@/components/loader/Loader.vue'

  @Component({
    components: {
      'autocomplete-input': AutocompleteInput,
      Loader
    }
  })
  export default class QuestionViewer extends Vue {
    @Prop() questionGroup: any

    @Watch('questionGroup', { immediate: true }) onQuestionGroupChanged() {
      this.checkQuestionGroupValidity()
    }

    imageCheck(imageSrcFromBackend, displayName) {
      const flexibleIcon = require('@/assets/graphics/anywhere.png')
      const remoteIcon = require('@/assets/graphics/Remote.png')
      switch (displayName) {
        case 'flexible within the united states':
          return flexibleIcon
        case 'remote':
          return remoteIcon
        default:
          return imageSrcFromBackend
      }
    }

    questionInputTypes = QuestionInputTypes

    selectAnswer(question, answerId): void {
      const isSpecialCase = this.handleSpecialCases(question, answerId)
      if (isSpecialCase) {
        if (answerId === 'all_of_above_problems') {
          this.checkQuestionGroupValidity()
        }
        return
      }

      if (answerId === 'flexible_within_us') {
        this.addSelectedAnswer(question, answerId)
      }
      if (this.isAnswerSelected(question, answerId)) {
        const index = question.answer.valueIds.indexOf(answerId)
        if (index > -1) {
          question.answer.valueIds.splice(index, 1)
        }
      } else {
        // If user selected less option(s) than allowed
        if (question.answer.valueIds.length < question.validation.maxOptions) {
          this.addSelectedAnswer(question, answerId)
        }
        // If only one selection is allowed...
        else if (question.validation.maxOptions === 1) {
          // ...clear selected values...
          question.answer.valueIds = []
          // ...and select new value.
          this.addSelectedAnswer(question, answerId)
        }
      }
      this.checkQuestionGroupValidity()
    }

    /**
     * Special cases are options, which is not returned by backend and requires special handling, for example: 'flexible
     * withing the united states' option should select all options, except for 'remote`.
     */
    handleSpecialCases(question, answerId): boolean {
      let isSpecialCase = false
      const isLocationQuestion = question.name === QuestionNames.LOCATION
      const isSolvingProblemsQuestion = question.name === QuestionNames.PROBLEM

      if (isLocationQuestion || isSolvingProblemsQuestion) {
        let selectAllOptionId
        if (isLocationQuestion) {
          selectAllOptionId = QuestionSpecialOptions.FLEXIBLE_WITHIN_THE_UNITED_STATES
        } else if (isSolvingProblemsQuestion) {
          selectAllOptionId = QuestionSpecialOptions.ALL_OF_ABOVE_PROBLEMS
        }
        // If 'flexible withint the united states' option or 'all of the above' option...
        if (answerId === selectAllOptionId) {
          if (answerId === QuestionSpecialOptions.ALL_OF_ABOVE_PROBLEMS) {
            isSpecialCase = true
          }
          if (this.isAnswerSelected(question, answerId)) {
            // ...unselect all options.
            question.answer.valueIds = []
          } else {
            question.answer.valueIds = []
            question.answer.availableOptions.values.forEach(option => {
              if (isLocationQuestion && option.id !== QuestionSpecialOptions.REMOTE) {
                question.answer.valueIds.push(option.id)
              } else if (isSolvingProblemsQuestion) {
                question.answer.valueIds.push(option.id)
              }
            })
          }

          if (isLocationQuestion) {
            const isRemoteOptionSelected = question.answer.valueIds.indexOf(QuestionSpecialOptions.REMOTE)
            // If 'remote' option was selected before...
            if (isRemoteOptionSelected !== -1) {
              // ...select it again (since we have unselected all options above).
              question.answer.valueIds.push(QuestionSpecialOptions.REMOTE)
            }
          }
        }
        // If 'remote' option was selected...
        else if (isLocationQuestion && answerId === QuestionSpecialOptions.REMOTE) {
          const isFlexibleOptionSelected = question.answer.valueIds.indexOf(
            QuestionSpecialOptions.FLEXIBLE_WITHIN_THE_UNITED_STATES
          )
          // ...and 'flexible withint the united states' option is active...
          if (isFlexibleOptionSelected !== -1 && !this.isAnswerSelected(question, answerId)) {
            // ...allow selecting 'remote' option if question.validation.maxOptions is more than 1
            if (question.validation.maxOptions > 1) {
              isSpecialCase = true
              question.answer.valueIds.push(answerId)
            }
          }
        } else {
          const isSelectAllOptionsSelected = question.answer.valueIds.indexOf(selectAllOptionId)
          // If 'flexible withint the united states' option or 'all of the above' option is active...
          if (isSelectAllOptionsSelected > -1) {
            // ...unselect it.
            question.answer.valueIds.splice(isSelectAllOptionsSelected, 1)
          }
        }
      }

      return isSpecialCase
    }

    addSelectedAnswer(question, answerId): void {
      question.answer.valueIds.push(answerId)
    }

    isAnswerSelected(question, answerId): boolean {
      return question.answer.valueIds.includes(answerId)
    }

    checkQuestionGroupValidity(): void {
      let groupIsValid = true
      if (
        (this.questionGroup.display.showSkipQuestionsCheckbox && !this.questionGroup.groupFormValidity.didNotEnroll) ||
        !this.questionGroup.display.showSkipQuestionsCheckbox
      ) {
        let error = ''
        this.questionGroup.questions.forEach(question => {
          if (question.inputType === QuestionInputTypes.CHECKBOX) {
            const answersCount = question.answer.valueIds.length
            // If user selected less answers than is required
            if (answersCount < 1) {
              groupIsValid = false
              let errorMessage = 'pick at least one'
              if (question.validation.minOptions === 1 && question.validation.maxOptions === 1) {
                errorMessage = 'pick one'
              }
              error = errorMessage
            }
            // If selecting any answer is optional
            else if (question.validation.minOptions === 0) {
              error = 'pick one (optional)'
            }
          } else if (question.inputType === QuestionInputTypes.AUTOCOMPLETE) {
            if (question.validation.isRequired) {
              if (question.answer.valueIds.length < 1 && !question.answer.newValue) {
                error = 'all fields required'
                groupIsValid = false
              }
            }
          } else if (question.inputType === QuestionInputTypes.NUMBER) {
            if (!question.answer.value) {
              error = 'all fields required'
              groupIsValid = false
            } else if (error === '') {
              if (question.answer.value < 1960) {
                error = 'grad year must be after 1960'
                groupIsValid = false
              } else if (question.answer.value > 2030) {
                error = 'grad year must be before 2030'
                groupIsValid = false
              }
            }
          } else {
            if (question.validation.isRequired) {
              // Number validation
              // If minValue or/and maxValue validation exists and answer value is not between minValue and maxValue
              if (
                (question.validation.minValue !== null && question.answer.value < question.validation.minValue) ||
                (question.validation.maxValue !== null && question.answer.value > question.validation.maxValue)
              ) {
                error = 'all fields required'
                groupIsValid = false
              }
            }
          }
        })
       this.questionGroup.groupFormValidity.error = error
      }
      this.questionGroup.groupFormValidity.isValid = groupIsValid
    }

    getInputName(question): string {
      return this.questionGroup.shortText.split(' ').join('_') + '-' + question.id
    }

    getInputType(question): string {
      return question.inputType === this.questionInputTypes.NUMBER ? 'number' : 'text'
    }
  }
</script>

<style lang="scss" scoped>
  .question-container {
    padding: 15px;
    box-sizing: border-box;
  }

  .question-header {
    font-size: $font-size-title-medium;
    text-align: center;
    padding-top: 15px;
  }

  .question-description {
    font-family: $font-family-body;
    font-size: $font-size-body;
    text-align: center;
    padding: 15px 50px;
  }
  .location-options {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .location-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 140px;
  }

  .location-text {
    display: contents;
    font-size: 14px;
    line-height: 5px;
  }

  .inner-icon-container {
    font-size: 24px;
    display: flex;
    align-items: center;
    padding: 5px;
  }
  .problem-text-container {
    display: flex;
    flex-direction: row;
  }

  .inner-display-name-container {
    padding: 5px;
    font-size: 16px;
    width: 160px;
  }
  .signup-question-form-container {
    width: 350px;
    margin: 0 auto;

    &.wide-container {
      width: auto;
      margin: 0 40px;
    }

    .show-two-columns {
      width: 50%;
      display: inline-block;

      &:nth-of-type(2n) {
        padding-left: 10px;
      }

      &:nth-of-type(2n + 1) {
        padding-right: 10px;
      }
    }

    .question-input-container {
      margin: 0 0 20px 0;

      &:last-of-type {
        margin: 0;
      }

      .question-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #000;

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

      .question-selector {
        border: 1px solid #000;
        padding: 5px;
        text-align: center;
        margin-bottom: 20px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        justify-content: center;

        &.selected {
          background-color: #deebff;
        }

        &.role-options {
          max-height: 55px;
          padding: 10px;
        }

        &.experience-options {
          max-height: 45px;
        }

        &.job-type-options {
          max-height: 45px;
        }

        &.problem-container {
          min-height: 100px;
        }

        .question-image {
          height: 80px;
        }
      }

      .two-columns {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;

        .question-selector {
          $gap-between-items: 10px;

          flex-basis: calc(50% - #{$gap-between-items});

          &:nth-of-type(2n) {
            margin-left: $gap-between-items;
          }

          &:nth-of-type(2n + 1) {
            margin-right: $gap-between-items;
          }
        }
      }
    }

    .dropped-out-education-container-label {
      padding-left: 5px;
    }
  }
</style>
