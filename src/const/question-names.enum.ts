// questionType in /api/v1/questions/ response means:
// COLLEGE = 1
// MAJOR = 2
// ROLE = 3
// LOCATION = 4
// PROBLEM = 5
// JOB_TYPE = 6
// DEGREE = 7
// GRAD_YEAR = 8
// EXPERIENCE = 9
// In API docs (https://dolphin-api-dev.herokuapp.com/api/v1/docs/#operation/api_v1_questions_list) it says, that there
// might be 10 question types, but I'm not able to find any description about 10th type
// TODO(a.matrosovas): Find out what 10th question type is
// UNKNOWN = 10
export enum QuestionNames {
  COLLEGE = 'COLLEGE',
  MAJOR = 'MAJOR',
  ROLE = 'ROLE',
  LOCATION = 'LOCATION',
  PROBLEM = 'PROBLEM',
  JOB_TYPE = 'JOB_TYPE',
  DEGREE = 'DEGREE',
  GRAD_YEAR = 'GRAD_YEAR',
  EXPERIENCE = 'EXPERIENCE',
  UNKNOWN = 'UNKNOWN'
}
