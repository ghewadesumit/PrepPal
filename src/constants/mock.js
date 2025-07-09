export const dsaQuestionsKey = "dsaQuestionsSessionKey";
export const frontEndQuestionsKey = "frontEndQuestionsKey";
export const companiesKey = "companiesKey";

export const companiesData = {
  amazon: {
    id: "amazon",
    name: "Amazon",
  },
  google: {
    id: "google",
    name: "Google",
  },
  facebook: {
    id: "facebook",
    name: "Facebook",
  },

  microsoft: {
    id: "microsoft",
    name: "Microsoft",
  },
  apple: {
    id: "apple",
    name: "Apple",
  },
  bloomberg: {
    id: "bloomberg",
    name: "Bloomberg",
  },
};

export const questionsColumnDefinition = [
  {
    field: "completed",
    headerName: "Status",
  },
  {
    field: "revision",
    headerName: "Revision",
  },
  {
    field: "name",
    headerName: "Challenge",
  },
  {
    field: "link",
    headerName: "Link",
  },
  {
    field: "difficulty",
    headerName: "Difficulty",
  },
  {
    field: "rating",
    headerName: "Rating",
  },
  {
    field: "companies",
    headerName: "Companies",
  },
];
