export const questionsKey = "questionsSessionKey";
export const questionsColumnDefinition = [
  {
    field: "completed",
    headerName: "Status",
  },
  {
    field: "revision",
    headerName: "Revision Required",
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

export const dsaQuestions = [
  {
    sectionId: "array",
    sectionName: "Array",
    questions: [
      {
        id: "twoSum",
        name: "Two Sum",
        link: "https://leetcode.com/problems/two-sum",
        difficulty: "Easy",
        rating: 4,
        completed: true,
        revision: false,
        companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      },
      {
        id: "groupAnagrams",
        name: "Group Anagrams",
        link: "https://leetcode.com/problems/group-anagrams/",
        difficulty: "Easy",
        rating: 4,
        completed: true,
        revision: false,
        companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      },
    ],
  },
  {
    sectionId: "twoPointers",
    sectionName: "Two Pointers",
    questions: [
      {
        id: "validPalindrome",
        name: "Valid Palindrome",
        link: "https://leetcode.com/problems/valid-palindrome/",
        difficulty: "Easy",
        rating: 4,
        completed: true,
        revision: false,
        companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      },
    ],
  },
];
