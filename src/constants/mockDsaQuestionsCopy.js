export const sections = [
  {
    id: "arrayHashTable",
    name: "Array / Hash Table",
  },
  {
    id: "twoPointers",
    name: "Two Pointers",
  },
  {
    id: "slidingWindow",
    name: "Sliding Window",
  },
  {
    id: "stack",
    name: "Stack",
  },
  {
    id: "queue",
    name: "Queue",
  },
  {
    id: "binarySearch",
    name: "Binary Search",
  },
  {
    id: "string",
    name: "String",
  },
  {
    id: "heap",
    name: "Heap",
  },
  {
    id: "linkedList",
    name: "Linked List",
  },
  {
    id: "tree",
    name: "Tree",
  },
  { id: "backtracking", name: "Backtracking" },
  {
    id: "graph",
    name: "Graph",
  },
  {
    id: "dynamicProgramming",
    name: "Dynamic Programming",
  },
  {
    id: "bitManipulation",
    name: "Bit Manipulation",
  },
  {
    id: "math",
    name: "Math",
  },
  {
    id: "design",
    name: "Design",
  },
  {
    id: "greedy",
    name: "Greedy",
  },
];

export const dsaQuestions = {
  allQuestions: {
    twoSum: {
      createdAt: "2023-10-01T00:00:00Z",
      id: "twoSum",
      name: "Two Sum",
      link: "https://leetcode.com/problems/two-sum",
      difficulty: "Easy",
      rating: 4,
      completed: true,
      revision: false,
      companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      sections: ["arrayHashTable", "twoPointers"],
    },
    groupAnagrams: {
      createdAt: "2023-10-01T00:00:00Z",
      id: "groupAnagrams",
      name: "Group Anagrams",
      link: "https://leetcode.com/problems/group-anagrams/",
      difficulty: "Easy",
      rating: 4,
      completed: true,
      revision: false,
      companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      sections: ["arrayHashTable", "twoPointers"],
    },

    validPalindrome: {
      createdAt: "2023-10-01T00:00:00Z",
      id: "validPalindrome",
      name: "Valid Palindrome",
      link: "https://leetcode.com/problems/valid-palindrome/",
      difficulty: "Easy",
      rating: 4,
      completed: true,
      revision: false,
      companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
      sections: ["arrayHashTable", "twoPointers"],
    },
  },
};

export const questions = {
  arrayHashTable: ["twoSum", "groupAnagrams"],
  twoPointers: ["validPalindrome"],
};
