<template>
  <div class="questions-background-container" :class="gradientBackgroundClass">
    <!-- <Unauth-Navbar /> -->

    <div class="vertically-and-horizontally-center-elements">
      <div>
        <div class="questions-form-container">
          <div class="left-action-container">
            <div class="back-button" @click="goToPreviousStep($event)" v-if="currentStep > 0">
              <div class="action-icon">👈</div>
              <div>back</div>
            </div>
          </div>

          <div class="questions-container">
            <Card :bottomCardColor="bottomCardBackgroundColor">
              <ProgressContainer :currentStep="currentStep" :stepsCount="stepsCount" />

              <div class="questions-content-container">
                <template v-if="currentStep === 0">
                  <Loader />
                </template>

                <template v-else>
                  <question-viewer :question-group="currentStepQuestionGroup" v-if="isNotLastStep" />
                  <SignupForm :signupData="signupData" v-if="isSignupStep" />
                </template>
              </div>
            </Card>
          </div>

          <div class="right-action-container">
            <div
              class="forward-button"
              v-if="isNextButtonVisible"
              @click="goToNextStep($event)"
              :class="{ 'not-allowed-to-proceed': nextButtonText.isInvalid }"
            >
              <div class="action-icon" v-if="!nextButtonText.isInvalid">👉</div>
              <div>{{ nextButtonText.value }}</div>
            </div>
          </div>
        </div>

        <div class="testimonials-container">"{{ testimonial.text }}" - {{ testimonial.author }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import UnauthNavbar from '@/components/UnauthNavbar.vue'
import Card from '@/components/Card.vue'
import QuestionButtonLeft from '@/components/QuestionButtonLeft.vue'
import QuestionButtonRight from '@/components/QuestionButtonRight.vue'
import QuestionsApi from '@/services/api/questionsApi'
import QuestionViewer from '@/components/question-viewer/QuestionViewer.vue'
import { QuestionNames } from '@/const/question-names.enum.ts'
import { QuestionInputTypes } from '@/const/question-input-types.enum.ts'
import { QuestionTypesConfig } from '@/const/question-types-config.ts'
import { QuestionSpecialOptions } from '@/const/question-special-options.enum.ts'
import SignupForm from '@/components/signup-form/SignupForm.vue'
import Auth from '@/store/modules/auth.ts'
import ProgressContainer from '@/components/ProgressComponents/ProgressContainer.vue'
import { QuestionTestimonials } from './questions-testimonials'
import { NextButtonText } from './next-button-text'
import Loader from '@/components/loader/Loader.vue'

const AuthState = getModule(Auth)

@Component({
  components: {
    'Unauth-Navbar': UnauthNavbar,
    Card: Card,
    'question-viewer': QuestionViewer,
    SignupForm,
    ProgressContainer,
    Loader
  }
})
export default class Questions extends Vue {
  currentStep = 0
  stepsCount = 0
  questionGroups = new Array()
  sesionId = localStorage.getItem('singup-session-id')
  AuthState = AuthState
  signupData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  bottomCardBackgroundColors = ['#C9BBFF', '#C1DAFF', '#FFCCF7', '#FFCECB']

  mounted() {
    this.getSignupQuestions()
  }

  getSignupQuestions() {
    QuestionsApi.getQuestions(this.sesionId).then(res => {
      this.normalizeQestionsData(res)
    })
  }

  normalizeQestionsData(questionsResp): void {
    questionsResp.forEach(question => {
      const questionGroupExists = this.questionGroups.find(questionGroup => {
        return questionGroup.shortText === question.shortText
      })
      if (questionGroupExists === undefined) {
        this.questionGroups.push({
          title: question.text,
          description: question.description,
          shortText: question.shortText,
          groupFormValidity: {
            didNotEnroll: false,
            isValid: false,
            error: ''
          },
          display: {
            showSkipQuestionsCheckbox: question.shortText === 'EDUCATION' ? true : false,
            showWideContainer:
              question.shortText === 'LOOKING FOR ROLES IN' ||
              question.shortText === 'LOOKING FOR JOBS IN' ||
              question.shortText === 'WANTS TO SOLVE'
                ? true
                : false
          },
          questions: [this.normalizeQuestion(question)]
        })
      } else {
        questionGroupExists.questions.push(this.normalizeQuestion(question))
      }
    })

    this.currentStep = 1
    // There are steps as much as there are question groups + 1 step for sign up form
    this.stepsCount = this.questionGroups.length + 1
  }

  normalizeQuestion(question) {
    const questionTypeConfiguration = QuestionTypesConfig[question.questionType - 1]
    let valueIds = new Array()
    let questionValue = question.answer?.value === null || question.answer?.value === undefined ? '' : question.asnwer
    if (question.answer?.id && question.answer?.values) {
      if (questionTypeConfiguration.inputType === QuestionInputTypes.AUTOCOMPLETE) {
        questionValue = question.answer?.values?.[0] ?? null
      } else {
        valueIds = question.answer.values.map(value => {
          return value.id
        })
      }
    }

    if (questionTypeConfiguration.name === QuestionNames.LOCATION) {
      // Special case: If value is not null in LOCATION question type...
      if (question.answer?.value) {
        // ...it means that 'remote' option was selected.
        valueIds.push(QuestionSpecialOptions.REMOTE)
      }
    }

    return {
      answer: {
        id: question.answer?.id ?? null,
        session: question.answer?.session ?? null,
        value: questionValue,
        valueIds: valueIds,
        availableOptions: {
          isLoaded: false,
          values: []
        }
      },
      id: question.id,
      name: questionTypeConfiguration.name,
      placeholder: questionTypeConfiguration.placeholder ?? '',
      inputType: questionTypeConfiguration.inputType,
      validation: {
        isRequired: question.isMandatory,
        maxOptions: question.maxOptions,
        minOptions: question.minOptions,
        maxValue: question.maxValue,
        minValue: question.minValue
      },
      display: {
        showTwoColumns: questionTypeConfiguration.showTwoColumns ? true : false
      }
      // question.isFreeTypeAllowed
      // valueType: 1
    }
  }

  goToNextStep(event): void {
    if (this.isNextButtonVisible) {
      if (this.isSignupStep) {
        if (this.isSignupFormValid) {
          this.AuthState.signUp({
            firstName: this.signupData.firstName,
            lastName: this.signupData.lastName,
            email: this.signupData.email,
            password: this.signupData.password,
            session: this.sesionId
          }).then(token => {
            if (this.sesionId) {
              localStorage.removeItem('singup-session-id')
            }
            if (token) {
              window.location.href = (this.$route.query.redirect as string) || '/'
            }
          })
        }
      } else {
        if (this.currentStepQuestionGroup.groupFormValidity.isValid) {
          this.saveQuestionGroupAnswers()
        }
      }
    }
  }

  increaseStep() {
    this.currentStep++
    if (this.isNotLastStep) {
      this.loadDataForCurrentQuestionGroup()
    }
  }

  goToPreviousStep(event): void {
    if (this.currentStep > 1) {
      this.currentStep--
      this.loadDataForCurrentQuestionGroup()
    } else {
      this.$router.push('signup')
    }
  }

  async saveQuestionGroupAnswers() {
    if (
      this.currentStepQuestionGroup.display.showSkipQuestionsCheckbox &&
      this.currentStepQuestionGroup.groupFormValidity.didNotEnroll
    ) {
      this.currentStepQuestionGroup.questions.forEach(question => {
        question.answer.valueIds = []
        question.answer.newValue = undefined
      })
    }

    let questionsInQuestionGroup = this.currentStepQuestionGroup.questions.length
    for (const index in this.currentStepQuestionGroup.questions) {
      const question = this.currentStepQuestionGroup.questions[index]
      const payload = {}
      // Special case: If input type is GRAD_YEAR...
      if (question.name === QuestionNames.GRAD_YEAR) {
        // ...value should be send to API
        payload['value'] = question.answer.value === '' ? null : question.answer.value
      }
      // Special case: If input type is autocomplete and user entered new value (which doesn't exist in database)...
      else if (question.inputType === QuestionInputTypes.AUTOCOMPLETE && question.answer.newValue) {
        // ...valueNames should be send to API.
        payload['valueNames'] = [question.answer.newValue]
      } else if (question.name === QuestionNames.LOCATION) {
        const flexibleOptionSelected = question.answer.valueIds.indexOf(
          QuestionSpecialOptions.FLEXIBLE_WITHIN_THE_UNITED_STATES
        )
        const remoteOptionSelected = question.answer.valueIds.indexOf(QuestionSpecialOptions.REMOTE)

        // Special case: If user selected 'flexible withint the united states' option...
        if (flexibleOptionSelected !== -1) {
          // ...empty array should be send to API.
          payload['valueIds'] = []
        } else {
          if (remoteOptionSelected !== -1) {
            if (question.answer.valueIds.length > 1) {
              const valueIds = question.answer.valueIds.slice()
              valueIds.splice(remoteOptionSelected, 1)
              payload['valueIds'] = valueIds
            }
          } else {
            payload['valueIds'] = question.answer.valueIds
          }
        }

        // Special case: If user selected 'remote' option...
        if (remoteOptionSelected !== -1) {
          // ...value instead of valueIds should be send to API.
          payload['value'] = 1
        }
      } else if (question.name === QuestionNames.PROBLEM) {
        const valueIds = question.answer.valueIds.slice()
        const isAllProblemsOptionSelected = valueIds.indexOf(QuestionSpecialOptions.ALL_OF_ABOVE_PROBLEMS)

        // If 'all of the above' option is selected...
        if (isAllProblemsOptionSelected !== -1) {
          // ...remove it from payload.
          valueIds.splice(isAllProblemsOptionSelected, 1)
        }

        payload['valueIds'] = valueIds
      } else {
        payload['valueIds'] = question.answer.valueIds
      }

      if (question.answer.id !== null) {
        await QuestionsApi.updateQuestionAnswer(question.answer.id, payload, this.sesionId).then(res => {
          if (question.answer.newValue) {
            this.updateNewValue(question, res.valueIds, res.id)
          }
        })
      } else {
        payload['question'] = question.id
        await QuestionsApi.answerQuestion(payload, this.sesionId).then(res => {
          if (this.sesionId === null) {
            this.sesionId = res.session
            // @ts-ignore
            localStorage.setItem('singup-session-id', this.sesionId)
          }

          if (question.answer.newValue) {
            this.updateNewValue(question, res.valueIds, res.id)
          }
        })
      }

      if (!--questionsInQuestionGroup) {
        this.increaseStep()
      }
    }
  }

  updateNewValue(question, valueIds: number[], answerId: number): void {
    question.answer.value = {
      id: valueIds[0],
      name: question.answer.newValue
    }
    question.answer.valueIds = valueIds
    question.answer.id = answerId
    question.answer.newValue = undefined
  }

  loadDataForCurrentQuestionGroup(): void {
    this.currentStepQuestionGroup.questions.forEach(question => {
      if (question.inputType === QuestionInputTypes.CHECKBOX && question.answer.availableOptions.isLoaded === false) {
        if (question.name === QuestionNames.JOB_TYPE) {
          QuestionsApi.getJobTypes().then(res => {
            this.setQuestionAnswerData(question, res)
          })
        } else if (question.name === QuestionNames.EXPERIENCE) {
          QuestionsApi.getExperiences().then(res => {
            this.setQuestionAnswerData(question, res)
          })
        } else if (question.name === QuestionNames.ROLE) {
          QuestionsApi.getJobRoles().then(res => {
            this.setQuestionAnswerData(question, res)
          })
        } else if (question.name === QuestionNames.LOCATION) {
          QuestionsApi.getJobLocations().then(res => {
            res.unshift({
              displayName: 'flexible within the united states',
              id: QuestionSpecialOptions.FLEXIBLE_WITHIN_THE_UNITED_STATES,
              image: '' // TODO(a.matrosovas): Find out where to get the image for this option from
            })
            res.push({
              displayName: 'remote',
              id: QuestionSpecialOptions.REMOTE,
              image: '' // TODO(a.matrosovas): Find out where to get the image for this option from
            })
            this.setQuestionAnswerData(question, res)
          })
        } else if (question.name === QuestionNames.PROBLEM) {
          QuestionsApi.getHumanityProblems().then(res => {
            res.push({
              displayName: 'all of the above',
              id: QuestionSpecialOptions.ALL_OF_ABOVE_PROBLEMS
            })
            this.setQuestionAnswerData(question, res)
          })
        }
      }
    })
  }

  setQuestionAnswerData(question, availableOptions) {
    question.answer.availableOptions.isLoaded = true
    availableOptions.forEach(option => {
      option.displayName = option.displayName ? option.displayName : option.name
    })
    question.answer.availableOptions.values = availableOptions
  }

  get currentStepQuestionGroup() {
    return this.questionGroups[this.currentStep - 1]
  }

  get isNextButtonVisible(): boolean {
    return this.currentStep > 0 && (this.isNotLastStep || this.isSignupStep)
  }

  get nextButtonText() {
    let nextButtonText = NextButtonText.default
    let isInvalid = false
    if (this.isSignupStep) {
      if (this.isSignupFormValid) {
        nextButtonText = NextButtonText.last
      } else {
        nextButtonText = 'all fields required'
        isInvalid = true
      }
    } else {
      if (this.currentStepQuestionGroup.groupFormValidity.isValid) {
        if (this.currentStep - 1 < NextButtonText.values.length) {
          nextButtonText = NextButtonText.values[this.currentStep - 1]
        } else {
          nextButtonText = NextButtonText.default
        }
      } else {
        nextButtonText = this.currentStepQuestionGroup.groupFormValidity.error
        isInvalid = true
      }
    }

    return {
      value: nextButtonText,
      isInvalid
    }
  }

  get isSignupStep(): boolean {
    return this.currentStep === this.stepsCount
  }

  get isNotLastStep(): boolean {
    return this.currentStep < this.stepsCount
  }

  get isSignupFormValid(): boolean {
    // TODO(a.matrosovas): Find out what validation rules for sign-up form is and implement those
    return this.signupData.firstName && this.signupData.lastName && this.signupData.email && this.signupData.password
      ? true
      : false
  }

  /**
   * Function for returning iterative step number
   * @description In same cases we have hardcoded several values (for example: testimonials, background color), which
   * should be displayed depending on current step. Steps amount is controlled by backend and might change, so we need
   * a realiable way of looping throughout hardcoded values.
   * This function returns iterative step number by substracting maxValue parameter from currentStep until result is
   * less than lenght of hardcoded values.
   * @param {number} maxValue
   * @returns Iterative step number
   */
  getIterativeStepNumber(maxValue: number): number {
    let currentStep = this.currentStep
    let iterativeStepNumber = 1
    if (currentStep > 1) {
      if (currentStep > maxValue) {
        while (currentStep >= maxValue) {
          currentStep = currentStep - maxValue
        }
      }
      iterativeStepNumber = currentStep
    }

    return iterativeStepNumber
  }

  get gradientBackgroundClass(): string {
    return 'background-' + this.getIterativeStepNumber(4)
  }

  get bottomCardBackgroundColor(): string {
    return this.bottomCardBackgroundColors[this.getIterativeStepNumber(this.bottomCardBackgroundColors.length) - 1]
  }

  get testimonial() {
    const testimonialIndex = this.getIterativeStepNumber(QuestionTestimonials.length)
    return QuestionTestimonials[testimonialIndex - 1]
  }
}
</script>

<style lang="scss" scoped>
$questions-container-width-desktop: 600px;

.questions-background-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

//
// Gradient backgrounds classes for the page
//
.background-1 {
  background: $pink-Gradient;
}

.background-2 {
  background: $blue-Gradient;
}

.background-3 {
  background: $purple-Gradient;
}

.background-4 {
  background: $yellow-Gradient;
}

//
// Action button styles
//
.forward-button,
.back-button {
  border-width: 1px;
  width: 220px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.not-allowed-to-proceed {
    cursor: not-allowed;
  }

  .action-icon {
    font-size: 60px;
    line-height: 55px;
  }
}

.forward-button {
  border-right-style: solid;
  border-top-style: solid;
  border-bottom-style: solid;
  padding-left: 9px; // Same as Card element's left value
}

.back-button {
  border-left-style: solid;
  border-top-style: solid;
  border-bottom-style: solid;
}

//
// Questions section styles
//
.vertically-and-horizontally-center-elements {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.questions-form-container {
  padding-top: 98px; // Height of ProgressContainer (90) + bottom of Card component (8)
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.questions-container {
  width: $questions-container-width-desktop;
  z-index: dolphin-z(belowCard);
}

//
// Testimonials section
//
.testimonials-container {
  width: $questions-container-width-desktop;
  margin: 20px auto;
  border: 1px solid $black;
  padding: 20px;
}
</style>
