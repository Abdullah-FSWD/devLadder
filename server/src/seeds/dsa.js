module.exports = {
  name: "Data Structures & Algorithms",
  slug: "dsa",
  description: "Core DSA concepts for coding interviews and problem solving",
  levels: [
    // ─── BEGINNER ───────────────────────────────────────────────
    {
      level: "beginner",
      sections: [
        {
          title: "Arrays & Strings",
          description: "Fundamental linear data structures and manipulation techniques",
          order: 1,
          topics: [
            {
              title: "Arrays",
              order: 1,
              subtopics: [
                { title: "Array traversal & manipulation", order: 1, resources: [{ title: "GeeksforGeeks: Array Data Structure", url: "https://www.geeksforgeeks.org/array-data-structure/", type: "article" }] },
                { title: "Two-pointer technique", order: 2, resources: [{ title: "LeetCode: Two Pointers", url: "https://leetcode.com/tag/two-pointers/", type: "practice" }] },
                { title: "Sliding window basics", order: 3, resources: [{ title: "GeeksforGeeks: Window Sliding Technique", url: "https://www.geeksforgeeks.org/window-sliding-technique/", type: "article" }] },
              ],
            },
            {
              title: "Strings",
              order: 2,
              subtopics: [
                { title: "String methods & immutability", order: 1, resources: [{ title: "MDN: String", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String", type: "documentation" }] },
                { title: "Palindrome & anagram problems", order: 2, resources: [{ title: "LeetCode: Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/", type: "practice" }] },
                { title: "String searching & pattern matching", order: 3, resources: [{ title: "GeeksforGeeks: Pattern Searching", url: "https://www.geeksforgeeks.org/algorithms-gq/pattern-searching/", type: "article" }] },
              ],
            },
          ],
          test: {
            title: "Arrays & Strings Test",
            questions: [
              { question: "What is the time complexity of accessing an element by index in an array?", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], correctAnswer: 1 },
              { question: "The two-pointer technique is most useful when:", options: ["The array is unsorted", "The array is sorted or you need to find pairs", "You need to sort the array", "You need random access"], correctAnswer: 1 },
              { question: "Sliding window is used to:", options: ["Sort arrays", "Find contiguous subarrays matching a condition", "Binary search", "Reverse arrays"], correctAnswer: 1 },
              { question: "Strings in JavaScript are:", options: ["Mutable", "Immutable", "Always ASCII", "Stored as arrays"], correctAnswer: 1 },
              { question: "Two strings are anagrams if:", options: ["They are equal", "They have the same characters with the same frequency", "They have the same length", "One is a substring of the other"], correctAnswer: 1 },
              { question: "What is the time complexity of string concatenation in a loop (n iterations)?", options: ["O(n)", "O(n^2)", "O(1)", "O(log n)"], correctAnswer: 1 },
              { question: "The best time complexity for finding an element in an unsorted array is:", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctAnswer: 2 },
              { question: "In a sliding window of fixed size k, how many windows exist for an array of size n?", options: ["n", "n - k + 1", "k", "n * k"], correctAnswer: 1 },
              { question: "Reversing an array in-place uses:", options: ["O(n) extra space", "O(1) extra space", "O(n^2) extra space", "A new array"], correctAnswer: 1 },
              { question: "Which method checks if a string is a palindrome?", options: ["Compare it with its reverse", "Check if it's sorted", "Count vowels", "Check length"], correctAnswer: 0 },
            ],
          },
        },
        {
          title: "Hash Maps & Sets",
          description: "Key-value lookups and uniqueness tracking",
          order: 2,
          topics: [
            {
              title: "Hash Maps",
              order: 1,
              subtopics: [
                { title: "Map/Object for frequency counting", order: 1, resources: [{ title: "MDN: Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", type: "documentation" }] },
                { title: "Two Sum pattern", order: 2, resources: [{ title: "LeetCode: Two Sum", url: "https://leetcode.com/problems/two-sum/", type: "practice" }] },
                { title: "Grouping & bucketing with maps", order: 3, resources: [{ title: "LeetCode: Group Anagrams", url: "https://leetcode.com/problems/group-anagrams/", type: "practice" }] },
              ],
            },
            {
              title: "Sets",
              order: 2,
              subtopics: [
                { title: "Deduplication & membership testing", order: 1, resources: [{ title: "MDN: Set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set", type: "documentation" }] },
                { title: "Intersection & union of sets", order: 2, resources: [{ title: "GeeksforGeeks: Set Operations", url: "https://www.geeksforgeeks.org/sets-in-javascript/", type: "article" }] },
              ],
            },
          ],
          test: {
            title: "Hash Maps & Sets Test",
            questions: [
              { question: "Average time complexity of hash map lookup is:", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], correctAnswer: 1 },
              { question: "The Two Sum problem is optimally solved with:", options: ["Nested loops O(n^2)", "Sorting + two pointers O(n log n)", "Hash map O(n)", "Binary search O(log n)"], correctAnswer: 2 },
              { question: "A Set automatically:", options: ["Sorts elements", "Removes duplicates", "Counts elements", "Reverses order"], correctAnswer: 1 },
              { question: "Worst-case time complexity of hash map lookup is:", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], correctAnswer: 2 },
              { question: "Frequency counting with a map runs in:", options: ["O(n^2)", "O(n)", "O(n log n)", "O(1)"], correctAnswer: 1 },
              { question: "To check if two arrays have common elements, the optimal approach uses:", options: ["Nested loops", "A Set for one array, then iterate the other", "Sorting both arrays", "Recursion"], correctAnswer: 1 },
              { question: "JavaScript Map differs from Object because:", options: ["Map keys can be any type", "Object is faster", "Map cannot store functions", "They are identical"], correctAnswer: 0 },
              { question: "Hash collisions are handled by:", options: ["Deleting the key", "Chaining or open addressing", "Ignoring the collision", "Resizing to 1 bucket"], correctAnswer: 1 },
              { question: "Space complexity of a hash map with n entries is:", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], correctAnswer: 2 },
              { question: "Group Anagrams uses a map where the key is:", options: ["The string itself", "The sorted string or character frequency", "The string length", "A random hash"], correctAnswer: 1 },
            ],
          },
        },
        {
          title: "Recursion & Basic Sorting",
          description: "Recursive thinking and fundamental sorting algorithms",
          order: 3,
          topics: [
            {
              title: "Recursion",
              order: 1,
              subtopics: [
                { title: "Base case & recursive case", order: 1, resources: [{ title: "JavaScript.info: Recursion", url: "https://javascript.info/recursion", type: "article" }] },
                { title: "Call stack & stack overflow", order: 2, resources: [{ title: "MDN: Recursion", url: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion", type: "documentation" }] },
                { title: "Common patterns (factorial, fibonacci, power)", order: 3, resources: [{ title: "FreeCodeCamp: Recursion in JS", url: "https://www.freecodecamp.org/news/recursion-in-javascript/", type: "article" }] },
              ],
            },
            {
              title: "Sorting",
              order: 2,
              subtopics: [
                { title: "Bubble sort & selection sort", order: 1, resources: [{ title: "Visualgo: Sorting", url: "https://visualgo.net/en/sorting", type: "article" }] },
                { title: "Insertion sort", order: 2, resources: [{ title: "GeeksforGeeks: Insertion Sort", url: "https://www.geeksforgeeks.org/insertion-sort/", type: "article" }] },
                { title: "Understanding O(n^2) vs O(n log n)", order: 3, resources: [{ title: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/", type: "article" }] },
              ],
            },
          ],
          test: {
            title: "Recursion & Basic Sorting Test",
            questions: [
              { question: "Every recursive function must have:", options: ["A loop", "A base case", "A global variable", "A callback"], correctAnswer: 1 },
              { question: "Stack overflow in recursion happens when:", options: ["Base case is reached", "There are too many recursive calls without reaching base case", "The function returns a value", "Memory is freed"], correctAnswer: 1 },
              { question: "Time complexity of bubble sort is:", options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], correctAnswer: 2 },
              { question: "Insertion sort is efficient for:", options: ["Large random arrays", "Nearly sorted arrays", "Reverse sorted arrays", "Arrays with duplicates only"], correctAnswer: 1 },
              { question: "The fibonacci sequence via naive recursion has time complexity:", options: ["O(n)", "O(n^2)", "O(2^n)", "O(log n)"], correctAnswer: 2 },
              { question: "Which sorting algorithm is stable?", options: ["Selection sort", "Insertion sort", "Neither", "Both"], correctAnswer: 1 },
              { question: "Tail recursion is:", options: ["Recursion with no base case", "When the recursive call is the last operation", "A type of loop", "Always faster"], correctAnswer: 1 },
              { question: "Selection sort works by:", options: ["Swapping adjacent elements", "Finding the minimum and placing it at the correct position", "Dividing the array in half", "Using a hash map"], correctAnswer: 1 },
              { question: "Space complexity of recursive fibonacci (no memoization) is:", options: ["O(1)", "O(n)", "O(2^n)", "O(n^2)"], correctAnswer: 1 },
              { question: "O(n log n) is better than O(n^2) for:", options: ["Small inputs only", "Large inputs", "Neither, they are the same", "Constant inputs"], correctAnswer: 1 },
            ],
          },
        },
      ],
    },

    // ─── INTERMEDIATE ───────────────────────────────────────────
    {
      level: "intermediate",
      sections: [
        {
          title: "Linked Lists & Stacks/Queues",
          description: "Linear data structures beyond arrays",
          order: 1,
          topics: [
            {
              title: "Linked Lists",
              order: 1,
              subtopics: [
                { title: "Singly linked list implementation", order: 1, resources: [{ title: "Visualgo: Linked List", url: "https://visualgo.net/en/list", type: "article" }] },
                { title: "Reversal, cycle detection (Floyd's)", order: 2, resources: [{ title: "LeetCode: Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/", type: "practice" }] },
                { title: "Merge two sorted lists", order: 3, resources: [{ title: "LeetCode: Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/", type: "practice" }] },
                { title: "Doubly linked list basics", order: 4, resources: [{ title: "GeeksforGeeks: Doubly Linked List", url: "https://www.geeksforgeeks.org/doubly-linked-list/", type: "article" }] },
              ],
            },
            {
              title: "Stacks & Queues",
              order: 2,
              subtopics: [
                { title: "Stack implementation & applications", order: 1, resources: [{ title: "GeeksforGeeks: Stack", url: "https://www.geeksforgeeks.org/stack-data-structure/", type: "article" }] },
                { title: "Valid parentheses problem", order: 2, resources: [{ title: "LeetCode: Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/", type: "practice" }] },
                { title: "Queue & BFS applications", order: 3, resources: [{ title: "GeeksforGeeks: Queue", url: "https://www.geeksforgeeks.org/queue-data-structure/", type: "article" }] },
              ],
            },
          ],
          test: {
            title: "Linked Lists & Stacks/Queues Test",
            questions: [
              { question: "Inserting at the head of a singly linked list is:", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], correctAnswer: 1 },
              { question: "Floyd's cycle detection uses:", options: ["A hash set", "Two pointers (slow and fast)", "Recursion only", "Sorting"], correctAnswer: 1 },
              { question: "A stack follows:", options: ["FIFO", "LIFO", "Random access", "Priority order"], correctAnswer: 1 },
              { question: "A queue follows:", options: ["LIFO", "FIFO", "Random access", "Sorted order"], correctAnswer: 1 },
              { question: "Reversing a linked list in-place has space complexity:", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], correctAnswer: 1 },
              { question: "The valid parentheses problem is solved with:", options: ["A queue", "A stack", "Two pointers", "Binary search"], correctAnswer: 1 },
              { question: "Accessing the nth element in a singly linked list is:", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], correctAnswer: 2 },
              { question: "A doubly linked list differs from singly because:", options: ["It uses arrays", "Each node has prev and next pointers", "It is always sorted", "It cannot have cycles"], correctAnswer: 1 },
              { question: "BFS uses which data structure?", options: ["Stack", "Queue", "Hash map", "Binary tree"], correctAnswer: 1 },
              { question: "Merging two sorted linked lists takes:", options: ["O(n + m)", "O(n * m)", "O(n^2)", "O(1)"], correctAnswer: 0 },
            ],
          },
        },
        {
          title: "Trees & Binary Search",
          description: "Hierarchical data structures and divide-and-conquer search",
          order: 2,
          topics: [
            {
              title: "Binary Trees",
              order: 1,
              subtopics: [
                { title: "Tree traversals (inorder, preorder, postorder, level-order)", order: 1, resources: [{ title: "Visualgo: Binary Search Tree", url: "https://visualgo.net/en/bst", type: "article" }] },
                { title: "Height, depth, and balanced trees", order: 2, resources: [{ title: "GeeksforGeeks: Binary Tree Properties", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/", type: "article" }] },
                { title: "BFS vs DFS on trees", order: 3, resources: [{ title: "GeeksforGeeks: BFS vs DFS", url: "https://www.geeksforgeeks.org/bfs-vs-dfs-binary-tree/", type: "article" }] },
              ],
            },
            {
              title: "Binary Search Trees",
              order: 2,
              subtopics: [
                { title: "BST property & operations (insert, search, delete)", order: 1, resources: [{ title: "GeeksforGeeks: BST", url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/", type: "article" }] },
                { title: "Validate BST", order: 2, resources: [{ title: "LeetCode: Validate BST", url: "https://leetcode.com/problems/validate-binary-search-tree/", type: "practice" }] },
              ],
            },
            {
              title: "Binary Search",
              order: 3,
              subtopics: [
                { title: "Binary search on sorted arrays", order: 1, resources: [{ title: "LeetCode: Binary Search", url: "https://leetcode.com/problems/binary-search/", type: "practice" }] },
                { title: "Search space reduction patterns", order: 2, resources: [{ title: "LeetCode: Binary Search Study Plan", url: "https://leetcode.com/study-plan/binary-search/", type: "practice" }] },
              ],
            },
          ],
          test: {
            title: "Trees & Binary Search Test",
            questions: [
              { question: "Inorder traversal of a BST gives:", options: ["Random order", "Sorted ascending order", "Reverse order", "Level order"], correctAnswer: 1 },
              { question: "Binary search requires the array to be:", options: ["Reversed", "Sorted", "Have unique elements", "Of even length"], correctAnswer: 1 },
              { question: "Time complexity of binary search is:", options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"], correctAnswer: 2 },
              { question: "A balanced binary tree has height:", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], correctAnswer: 1 },
              { question: "Level-order traversal uses:", options: ["Stack", "Queue", "Recursion only", "Hash map"], correctAnswer: 1 },
              { question: "Worst-case BST search (unbalanced) is:", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctAnswer: 2 },
              { question: "Preorder traversal visits:", options: ["Left, Root, Right", "Root, Left, Right", "Left, Right, Root", "Right, Root, Left"], correctAnswer: 1 },
              { question: "To validate a BST, you check that:", options: ["All left children are less than all ancestors", "Each node is less than its parent", "Every node has two children", "The tree is complete"], correctAnswer: 0 },
              { question: "DFS on a tree can be implemented with:", options: ["Queue", "Stack or recursion", "Hash map", "Array sorting"], correctAnswer: 1 },
              { question: "Deleting a node with two children in a BST requires finding:", options: ["The parent node", "The inorder successor or predecessor", "The root", "A leaf node"], correctAnswer: 1 },
            ],
          },
        },
        {
          title: "Advanced Sorting & Searching",
          description: "Efficient sorting algorithms and search patterns",
          order: 3,
          topics: [
            {
              title: "Efficient Sorting",
              order: 1,
              subtopics: [
                { title: "Merge sort", order: 1, resources: [{ title: "Visualgo: Sorting", url: "https://visualgo.net/en/sorting", type: "article" }] },
                { title: "Quick sort & partition", order: 2, resources: [{ title: "GeeksforGeeks: Quick Sort", url: "https://www.geeksforgeeks.org/quick-sort/", type: "article" }] },
                { title: "Counting sort & radix sort", order: 3, resources: [{ title: "GeeksforGeeks: Counting Sort", url: "https://www.geeksforgeeks.org/counting-sort/", type: "article" }] },
              ],
            },
            {
              title: "Heaps & Priority Queues",
              order: 2,
              subtopics: [
                { title: "Min-heap & max-heap", order: 1, resources: [{ title: "Visualgo: Heap", url: "https://visualgo.net/en/heap", type: "article" }] },
                { title: "Top-K problems", order: 2, resources: [{ title: "LeetCode: Kth Largest Element", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", type: "practice" }] },
                { title: "Heap sort", order: 3, resources: [{ title: "GeeksforGeeks: Heap Sort", url: "https://www.geeksforgeeks.org/heap-sort/", type: "article" }] },
              ],
            },
          ],
          test: {
            title: "Advanced Sorting & Searching Test",
            questions: [
              { question: "Merge sort time complexity is:", options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"], correctAnswer: 1 },
              { question: "Quick sort worst case is:", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], correctAnswer: 2 },
              { question: "Merge sort space complexity is:", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], correctAnswer: 2 },
              { question: "A min-heap has at its root:", options: ["The largest element", "The smallest element", "The median", "A random element"], correctAnswer: 1 },
              { question: "Finding the Kth largest element optimally uses:", options: ["Sorting O(n log n)", "Min-heap of size K O(n log k)", "Linear search O(n^2)", "Binary search O(log n)"], correctAnswer: 1 },
              { question: "Counting sort works best when:", options: ["Elements are strings", "The range of values is small", "Array is already sorted", "Elements are negative"], correctAnswer: 1 },
              { question: "Quick sort's partition step runs in:", options: ["O(n log n)", "O(n)", "O(1)", "O(n^2)"], correctAnswer: 1 },
              { question: "Heap insert operation is:", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correctAnswer: 2 },
              { question: "Which sort is NOT comparison-based?", options: ["Merge sort", "Quick sort", "Counting sort", "Heap sort"], correctAnswer: 2 },
              { question: "Merge sort is preferred over quick sort when:", options: ["Memory is unlimited and stability matters", "Memory is limited", "Array is small", "Array has unique elements"], correctAnswer: 0 },
            ],
          },
        },
      ],
    },

    // ─── ADVANCED ───────────────────────────────────────────────
    {
      level: "advanced",
      sections: [
        {
          title: "Graphs",
          description: "Graph representations, traversal, and shortest paths",
          order: 1,
          topics: [
            {
              title: "Graph Fundamentals",
              order: 1,
              subtopics: [
                { title: "Adjacency list & adjacency matrix", order: 1, resources: [{ title: "Visualgo: Graph", url: "https://visualgo.net/en/graphds", type: "article" }] },
                { title: "BFS & DFS on graphs", order: 2, resources: [{ title: "GeeksforGeeks: Graph Traversals", url: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/", type: "article" }] },
                { title: "Connected components & cycle detection", order: 3, resources: [{ title: "GeeksforGeeks: Detect Cycle in Graph", url: "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/", type: "article" }] },
              ],
            },
            {
              title: "Shortest Path Algorithms",
              order: 2,
              subtopics: [
                { title: "Dijkstra's algorithm", order: 1, resources: [{ title: "Visualgo: Single-Source Shortest Path", url: "https://visualgo.net/en/sssp", type: "article" }] },
                { title: "Bellman-Ford", order: 2, resources: [{ title: "GeeksforGeeks: Bellman-Ford", url: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/", type: "article" }] },
                { title: "Topological sort", order: 3, resources: [{ title: "GeeksforGeeks: Topological Sort", url: "https://www.geeksforgeeks.org/topological-sorting/", type: "article" }] },
              ],
            },
          ],
          test: {
            title: "Graphs Test",
            questions: [
              { question: "An adjacency list is more space-efficient for:", options: ["Dense graphs", "Sparse graphs", "Complete graphs", "All graphs equally"], correctAnswer: 1 },
              { question: "BFS on a graph finds:", options: ["Any path", "Shortest path in unweighted graphs", "Longest path", "Heaviest path"], correctAnswer: 1 },
              { question: "DFS uses which data structure internally?", options: ["Queue", "Stack", "Heap", "Hash map"], correctAnswer: 1 },
              { question: "Dijkstra's algorithm does NOT work with:", options: ["Weighted graphs", "Directed graphs", "Negative edge weights", "Sparse graphs"], correctAnswer: 2 },
              { question: "Topological sort applies to:", options: ["Undirected graphs", "Directed acyclic graphs (DAGs)", "Cyclic graphs", "Weighted graphs only"], correctAnswer: 1 },
              { question: "Time complexity of BFS with adjacency list is:", options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"], correctAnswer: 2 },
              { question: "A graph cycle can be detected using:", options: ["Sorting", "DFS with visited tracking", "Binary search", "Hashing"], correctAnswer: 1 },
              { question: "Bellman-Ford can detect:", options: ["Shortest path only", "Negative weight cycles", "Maximum flow", "Minimum spanning tree"], correctAnswer: 1 },
              { question: "Connected components in an undirected graph can be found with:", options: ["Sorting", "BFS/DFS from each unvisited node", "Binary search", "Greedy algorithm"], correctAnswer: 1 },
              { question: "In an adjacency matrix, checking if edge (u,v) exists is:", options: ["O(V)", "O(E)", "O(1)", "O(V + E)"], correctAnswer: 2 },
            ],
          },
        },
        {
          title: "Dynamic Programming",
          description: "Overlapping subproblems and optimal substructure",
          order: 2,
          topics: [
            {
              title: "DP Foundations",
              order: 1,
              subtopics: [
                { title: "Memoization (top-down)", order: 1, resources: [{ title: "GeeksforGeeks: Memoization", url: "https://www.geeksforgeeks.org/memoization-1d-2d-and-3d/", type: "article" }] },
                { title: "Tabulation (bottom-up)", order: 2, resources: [{ title: "GeeksforGeeks: Tabulation vs Memoization", url: "https://www.geeksforgeeks.org/tabulation-vs-memoization/", type: "article" }] },
                { title: "Identifying DP problems (overlapping subproblems, optimal substructure)", order: 3, resources: [{ title: "LeetCode: DP Study Plan", url: "https://leetcode.com/study-plan/dynamic-programming/", type: "practice" }] },
              ],
            },
            {
              title: "Classic DP Problems",
              order: 2,
              subtopics: [
                { title: "Fibonacci, climbing stairs, coin change", order: 1, resources: [{ title: "LeetCode: Coin Change", url: "https://leetcode.com/problems/coin-change/", type: "practice" }] },
                { title: "Longest common subsequence", order: 2, resources: [{ title: "LeetCode: Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/", type: "practice" }] },
                { title: "0/1 Knapsack", order: 3, resources: [{ title: "GeeksforGeeks: 0-1 Knapsack", url: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", type: "article" }] },
                { title: "Longest increasing subsequence", order: 4, resources: [{ title: "LeetCode: Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/", type: "practice" }] },
              ],
            },
          ],
          test: {
            title: "Dynamic Programming Test",
            questions: [
              { question: "Dynamic programming is applicable when a problem has:", options: ["Only optimal substructure", "Only overlapping subproblems", "Both optimal substructure and overlapping subproblems", "Neither"], correctAnswer: 2 },
              { question: "Memoization is a:", options: ["Bottom-up approach", "Top-down approach", "Greedy approach", "Brute force approach"], correctAnswer: 1 },
              { question: "Tabulation fills the DP table:", options: ["From the target to base case", "From base case to target", "Randomly", "Only diagonally"], correctAnswer: 1 },
              { question: "The coin change problem asks for:", options: ["Maximum coins", "Minimum coins to make a target amount", "Sorting coins", "Counting coins"], correctAnswer: 1 },
              { question: "Time complexity of LCS with memoization for strings of length m and n:", options: ["O(m + n)", "O(m * n)", "O(2^n)", "O(n log n)"], correctAnswer: 1 },
              { question: "0/1 Knapsack differs from unbounded knapsack because:", options: ["Items have no weight", "Each item can be used at most once", "Items must be sorted", "The knapsack is unlimited"], correctAnswer: 1 },
              { question: "Fibonacci with memoization runs in:", options: ["O(2^n)", "O(n^2)", "O(n)", "O(log n)"], correctAnswer: 2 },
              { question: "The longest increasing subsequence optimal solution is:", options: ["O(n^2)", "O(n log n)", "O(2^n)", "O(n^3)"], correctAnswer: 1 },
              { question: "Space optimization in DP often involves:", options: ["Using more dimensions", "Keeping only the previous row/state", "Sorting the input", "Using recursion"], correctAnswer: 1 },
              { question: "Climbing stairs (1 or 2 steps) is equivalent to:", options: ["Binary search", "Fibonacci sequence", "DFS", "Sorting"], correctAnswer: 1 },
            ],
          },
        },
      ],
    },
  ],
};
