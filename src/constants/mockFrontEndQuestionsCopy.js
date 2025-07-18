export const sections = [
  {
    id: "userInterface",
    name: "User Interface",
  },
  {
    id: "javascript",
    name: "JavaScript Functions",
  },
  {
    id: "jsArticles",
    name: "JavaScript Articles",
  },
  {
    id: "css",
    name: "CSS",
  },
  {
    id: "cssArticles",
    name: "CSS Articles",
  },
  {
    id: "react",
    name: "React",
  },
  {
    id: "reactArticles",
    name: "React Articles",
  },
  {
    id: "typescript",
    name: "TypeScript",
  },
  {
    id: "performance",
    name: "Performance Articles",
  },
  {
    id: "testing",
    name: "Testing",
  },
  {
    id: "accessibility",
    name: "Accessibility (a11y) Articles",
  },
  {
    id: "webSecurity",
    name: "Web Security Articles",
  },
];

export const frontendQuestions = {
  allQuestions: {
    counter: {
      createdAt: "2023-10-01T00:00:00Z",
      id: "counter",
      name: "Counter",
      link: "https://www.greatfrontend.com/questions/user-interface/counter",
      difficulty: "Easy",
      rating: 4,
      completed: true,
      revision: false,
      companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      sections: ["userInterface"],
    },
    accordion: {
      createdAt: "2023-10-01T00:00:00Z",
      id: "accordion",
      name: "Accordion",
      link: "https://www.greatfrontend.com/questions/user-interface/accordion",
      difficulty: "Easy",
      rating: 4,
      completed: true,
      revision: false,
      companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      sections: ["userInterface"],
    },
    arrayPrototypeAt: {
      createdAt: "2023-10-01T00:00:00Z",
      id: "arrayPrototypeAt",
      name: "Array.prototype.at",
      link: "https://www.greatfrontend.com/questions/javascript/array-at",
      difficulty: "Easy",
      rating: 4,
      completed: true,
      revision: false,
      companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      sections: ["javascript"],
    },
  },
};
export const questions = {
  userInterface: ["counter", "accordion"],
  javascript: ["arrayPrototypeAt"],
};
