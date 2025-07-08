export const sections = [
  {
    id: "userInterface",
    name: "User Interface",
  },
  {
    id: "javascript",
    name: "JavaScript Functions",
  },
];
export const questions = {
  userInterface: {
    sectionId: "userInterface",
    sectionName: "User Interface",
    questions: [
      {
        id: "counter",
        name: "Counter",
        link: "https://www.greatfrontend.com/questions/user-interface/counter",
        difficulty: "Easy",
        rating: 4,
        completed: true,
        revision: false,
        companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      },
      {
        id: "accordion",
        name: "Accordion",
        link: "https://www.greatfrontend.com/questions/user-interface/accordion",
        difficulty: "Easy",
        rating: 4,
        completed: true,
        revision: false,
        companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      },
    ],
  },
  javascript: {
    sectionId: "javascript",
    sectionName: "JavaScript Functions",
    questions: [
      {
        id: "arrayPrototypeAt",
        name: "Array.prototype.at",
        link: "https://www.greatfrontend.com/questions/javascript/array-at",
        difficulty: "Easy",
        rating: 4,
        completed: true,
        revision: false,
        companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      },
    ],
  },
};
