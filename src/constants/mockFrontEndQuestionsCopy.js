export const sections = {
  userInterface: {
    id: "userInterface",
    name: "User Interface",
  },
  javascript: {
    id: "javascript",
    name: "JavaScript Functions",
  },
  jsArticles: {
    id: "jsArticles",
    name: "JavaScript Articles",
  },
  css: {
    id: "css",
    name: "CSS",
  },
  cssArticles: {
    id: "cssArticles",
    name: "CSS Articles",
  },
  react: {
    id: "react",
    name: "React",
  },
  reactArticles: {
    id: "reactArticles",
    name: "React Articles",
  },
  typescript: {
    id: "typescript",
    name: "TypeScript",
  },
  performance: {
    id: "performance",
    name: "Performance Articles",
  },
  testing: {
    id: "testing",
    name: "Testing",
  },
  accessibility: {
    id: "accessibility",
    name: "Accessibility (a11y) Articles",
  },
  webSecurity: {
    id: "webSecurity",
    name: "Web Security Articles",
  },
};

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
