import { QuestionNames } from './question-names.enum';
import { QuestionInputTypes } from './question-input-types.enum';

// More info about question types are located in comment in @/const/question-input-types.enum.ts file.
export const QuestionTypesConfig = [
  {
    name: QuestionNames.COLLEGE,
    placeholder: 'school name',
    inputType: QuestionInputTypes.AUTOCOMPLETE
  },
  {
    name: QuestionNames.MAJOR,
    placeholder: 'field of study',
    inputType: QuestionInputTypes.AUTOCOMPLETE
  },
  {
    name: QuestionNames.ROLE,
    inputType: QuestionInputTypes.CHECKBOX,
    showTwoColumns: true
  },
  {
    name: QuestionNames.LOCATION,
    inputType: QuestionInputTypes.CHECKBOX,
    showTwoColumns: true
  },
  {
    name: QuestionNames.PROBLEM,
    inputType: QuestionInputTypes.CHECKBOX,
    showTwoColumns: true
  },
  {
    name: QuestionNames.JOB_TYPE,
    inputType: QuestionInputTypes.CHECKBOX
  },
  {
    name: QuestionNames.DEGREE,
    placeholder: 'degree type',
    inputType: QuestionInputTypes.AUTOCOMPLETE,
    showTwoColumns: true
  },
  {
    name: QuestionNames.GRAD_YEAR,
    placeholder: 'grad year',
    inputType: QuestionInputTypes.NUMBER,
    showTwoColumns: true
  },
  {
    name: QuestionNames.EXPERIENCE,
    inputType: QuestionInputTypes.CHECKBOX
  },
  {
    // TODO(a.matrosovas): Find out 10th question type
    name: QuestionNames.UNKNOWN
  }
];
