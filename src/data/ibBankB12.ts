// IB DP Computer Science (first assessment 2027) - built-in bank for B1 Computational thinking and B2 Programming.
// Original questions written for this app. Code tasks verified by running each model solution against its tests.
import type { IGCSETask } from "../types";

export const IB_TASKS_B12: IGCSETask[] = [
  {
    "id": "ib_b1_001",
    "unit": "B1",
    "title": "B1.1 Parts of a problem specification",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "A developer is writing a problem specification before designing a solution.\n\nIdentify two components that a problem specification may include.",
    "marks": 2,
    "specReference": "B1.1.1",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Identify two components that a problem specification may include.",
        "keywords": [
          "problem statement",
          "constraint",
          "limitation",
          "objective",
          "goal",
          "input",
          "output",
          "evaluation"
        ],
        "maxMarks": 2,
        "criteria": [
          "Any one valid component, e.g. problem statement / constraints and limitations / objectives and goals",
          "A second, different valid component, e.g. input specification / output specification / evaluation criteria"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [2]:\n• Any one valid component, e.g. problem statement / constraints and limitations / objectives and goals [1]\n• A second, different valid component, e.g. input specification / output specification / evaluation criteria [1]\nAccept any two of: problem statement, constraints and limitations, objectives and goals, input specifications, output specifications, evaluation criteria.\nDo not accept vague answers such as 'the code' or 'the program'.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Any one valid component, e.g. problem statement / constraints and limitations / objectives and goals",
        "description": "Any one valid component, e.g. problem statement / constraints and limitations / objectives and goals",
        "acceptedAnswers": [
          "problem statement",
          "constraints",
          "limitations",
          "objectives",
          "goals"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "A second, different valid component, e.g. input specification / output specification / evaluation criteria",
        "description": "A second, different valid component, e.g. input specification / output specification / evaluation criteria",
        "acceptedAnswers": [
          "input specification",
          "output specification",
          "evaluation criteria",
          "inputs",
          "outputs"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_002",
    "unit": "B1",
    "title": "B1.1 Constraints versus objectives",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A school wants a system that books music practice rooms. Rooms can be booked only between 07:30 and 17:00, and the system must run on the existing school web server. The school wants to reduce double bookings to zero.\n\nDistinguish between a constraint and an objective, referring to this scenario.",
    "marks": 3,
    "specReference": "B1.1.1",
    "commandWord": "Distinguish",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Distinguish between a constraint and an objective, referring to this scenario.",
        "keywords": [
          "constraint",
          "restriction",
          "limit",
          "objective",
          "goal",
          "outcome",
          "double booking",
          "server"
        ],
        "maxMarks": 3,
        "criteria": [
          "A constraint is a restriction/limitation the solution must work within",
          "An objective/goal is an outcome the solution is intended to achieve",
          "Correct examples from the scenario: constraint = booking hours 07:30-17:00 or must run on existing web server; objective = zero double bookings"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• A constraint is a restriction/limitation the solution must work within [1]\n• An objective/goal is an outcome the solution is intended to achieve [1]\n• Correct examples from the scenario: constraint = booking hours 07:30-17:00 or must run on existing web server; objective = zero double bookings [1]\nAward the third mark only if both examples are correctly classified.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "A constraint is a restriction/limitation the solution must work within",
        "description": "A constraint is a restriction/limitation the solution must work within",
        "acceptedAnswers": [
          "restriction",
          "limitation",
          "must work within",
          "cannot"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "An objective/goal is an outcome the solution is intended to achieve",
        "description": "An objective/goal is an outcome the solution is intended to achieve",
        "acceptedAnswers": [
          "outcome",
          "aim",
          "intended result",
          "what it should achieve"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Correct examples from the scenario: constraint = booking hours 07:30-17:00 or must run on existing web server; objective = zero double bookings",
        "description": "Correct examples from the scenario: constraint = booking hours 07:30-17:00 or must run on existing web server; objective = zero double bookings",
        "acceptedAnswers": [
          "07:30",
          "17:00",
          "web server",
          "double booking"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_003",
    "unit": "B1",
    "title": "B1.1 Construct a specification: library fines",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A library charges a fine when a book is returned late. The fine is 0.20 per day late, up to a maximum of 5.00. Staff enter the due date and the return date.\n\nConstruct a problem specification for this system by giving its input specification, output specification, one constraint and one evaluation criterion.",
    "marks": 4,
    "specReference": "B1.1.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Construct a problem specification for this system by giving its input specification, output specification, one constraint and one evaluation criterion.",
        "keywords": [
          "input",
          "due date",
          "return date",
          "output",
          "fine",
          "constraint",
          "maximum",
          "evaluation",
          "test"
        ],
        "maxMarks": 4,
        "criteria": [
          "Input specification: due date and actual return date (in a stated date format, return date not before borrowing date)",
          "Output specification: the fine to be paid, shown to 2 decimal places (0.00 if not late)",
          "Constraint: fine capped at 5.00 / rate fixed at 0.20 per day / must run on library desk computers",
          "Evaluation criterion that is measurable, e.g. correct fine for all test dates including 0 days and >25 days late / result within 1 second"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Input specification: due date and actual return date (in a stated date format, return date not before borrowing date) [1]\n• Output specification: the fine to be paid, shown to 2 decimal places (0.00 if not late) [1]\n• Constraint: fine capped at 5.00 / rate fixed at 0.20 per day / must run on library desk computers [1]\n• Evaluation criterion that is measurable, e.g. correct fine for all test dates including 0 days and >25 days late / result within 1 second [1]\nEvaluation criteria must be testable; do not accept 'it works well'.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Input specification: due date and actual return date (in a stated date format, return date not before borrowing date)",
        "description": "Input specification: due date and actual return date (in a stated date format, return date not before borrowing date)",
        "acceptedAnswers": [
          "due date",
          "return date",
          "date format"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Output specification: the fine to be paid, shown to 2 decimal places (0.00 if not late)",
        "description": "Output specification: the fine to be paid, shown to 2 decimal places (0.00 if not late)",
        "acceptedAnswers": [
          "fine",
          "amount",
          "2 decimal places",
          "0.00"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Constraint: fine capped at 5.00 / rate fixed at 0.20 per day / must run on library desk computers",
        "description": "Constraint: fine capped at 5.00 / rate fixed at 0.20 per day / must run on library desk computers",
        "acceptedAnswers": [
          "maximum",
          "5.00",
          "cap",
          "0.20 per day"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Evaluation criterion that is measurable, e.g. correct fine for all test dates including 0 days and >25 days late / result within 1 second",
        "description": "Evaluation criterion that is measurable, e.g. correct fine for all test dates including 0 days and >25 days late / result within 1 second",
        "acceptedAnswers": [
          "test",
          "correct fine",
          "boundary",
          "within",
          "measurable"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_004",
    "unit": "B1",
    "title": "B1.1 Specification components (MCQ)",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "mcq",
    "brief": "Each statement below comes from the problem specification of a parcel-tracking app. Choose the component it belongs to.",
    "marks": 4,
    "specReference": "B1.1.1",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "\"The app must work on phones with no more than 2 GB of memory.\"",
        "options": [
          "Output specification",
          "Constraint/limitation",
          "Problem statement",
          "Evaluation criterion"
        ],
        "a": 1
      },
      {
        "q": "\"The courier scans a 12-character parcel code.\"",
        "options": [
          "Input specification",
          "Objective",
          "Evaluation criterion",
          "Output specification"
        ],
        "a": 0
      },
      {
        "q": "\"95% of test users can find a parcel's location in under 10 seconds.\"",
        "options": [
          "Constraint/limitation",
          "Input specification",
          "Evaluation criterion",
          "Problem statement"
        ],
        "a": 2
      },
      {
        "q": "\"Customers currently phone the depot because they cannot see where their parcel is.\"",
        "options": [
          "Problem statement",
          "Output specification",
          "Constraint/limitation",
          "Input specification"
        ],
        "a": 0
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: B (Constraint/limitation) [1]\n• Q2: A (Input specification) [1]\n• Q3: C (Evaluation criterion) [1]\n• Q4: A (Problem statement) [1]"
  },
  {
    "id": "ib_b1_005",
    "unit": "B1",
    "title": "B1.1 Exam-style: canteen pre-order specification",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A school canteen has long queues at lunch. The head of catering wants students to pre-order meals on a web page before 10:30 each day. Each student has a budget stored on their account, and the kitchen can prepare at most 300 meals per day.",
    "marks": 7,
    "specReference": "B1.1.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "1(a)",
        "question": "State a suitable problem statement for this system.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• Clear statement of the problem: long lunch queues because meals are ordered and paid for at the counter; students need to pre-order before 10:30 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Clear statement of the problem: long lunch queues because meals are ordered and paid for at the counter; students need to pre-order before 10:30",
            "description": "Clear statement of the problem: long lunch queues because meals are ordered and paid for at the counter; students need to pre-order before 10:30",
            "acceptedAnswers": [
              "queues",
              "pre-order",
              "before 10:30"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "1(b)",
        "question": "Identify two constraints for this system.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Orders must be placed before 10:30 [1]\n• Maximum of 300 meals per day / order cannot exceed the student's budget [1]\nAccept: must be a web page; must use existing student accounts.",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Orders must be placed before 10:30",
            "description": "Orders must be placed before 10:30",
            "acceptedAnswers": [
              "10:30",
              "deadline"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Maximum of 300 meals per day / order cannot exceed the student's budget",
            "description": "Maximum of 300 meals per day / order cannot exceed the student's budget",
            "acceptedAnswers": [
              "300",
              "budget"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "1(c)",
        "question": "Outline the input specification for placing an order.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Student identifier/login and chosen meal(s) from the menu [1]\n• Validation detail: menu item must exist, quantity a positive integer, time before 10:30 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Student identifier/login and chosen meal(s) from the menu",
            "description": "Student identifier/login and chosen meal(s) from the menu",
            "acceptedAnswers": [
              "student id",
              "login",
              "meal choice"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Validation detail: menu item must exist, quantity a positive integer, time before 10:30",
            "description": "Validation detail: menu item must exist, quantity a positive integer, time before 10:30",
            "acceptedAnswers": [
              "validation",
              "positive integer",
              "range",
              "exists"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "1(d)",
        "question": "Describe two evaluation criteria that could be used to judge whether the system is successful.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Measurable criterion on queues/time, e.g. average waiting time at lunch reduced by a stated amount [1]\n• Measurable criterion on correctness, e.g. no order accepted after 10:30 / total orders never exceed 300 / balance never negative in testing [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Measurable criterion on queues/time, e.g. average waiting time at lunch reduced by a stated amount",
            "description": "Measurable criterion on queues/time, e.g. average waiting time at lunch reduced by a stated amount",
            "acceptedAnswers": [
              "waiting time",
              "queue length",
              "reduced"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Measurable criterion on correctness, e.g. no order accepted after 10:30 / total orders never exceed 300 / balance never negative in testing",
            "description": "Measurable criterion on correctness, e.g. no order accepted after 10:30 / total orders never exceed 300 / balance never negative in testing",
            "acceptedAnswers": [
              "no order after 10:30",
              "never exceed 300",
              "balance"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "1(a) State a suitable problem statement for this system.",
        "keywords": [
          "queue",
          "pre-order"
        ],
        "maxMarks": 1,
        "criteria": [
          "Clear statement of the problem: long lunch queues because meals are ordered and paid for at the counter; students need to pre-order before 10:30"
        ]
      },
      {
        "q": "1(b) Identify two constraints for this system.",
        "keywords": [
          "10:30",
          "300",
          "budget"
        ],
        "maxMarks": 2,
        "criteria": [
          "Orders must be placed before 10:30",
          "Maximum of 300 meals per day / order cannot exceed the student's budget"
        ]
      },
      {
        "q": "1(c) Outline the input specification for placing an order.",
        "keywords": [
          "student",
          "meal",
          "validate"
        ],
        "maxMarks": 2,
        "criteria": [
          "Student identifier/login and chosen meal(s) from the menu",
          "Validation detail: menu item must exist, quantity a positive integer, time before 10:30"
        ]
      },
      {
        "q": "1(d) Describe two evaluation criteria that could be used to judge whether the system is successful.",
        "keywords": [
          "measurable",
          "time",
          "test"
        ],
        "maxMarks": 2,
        "criteria": [
          "Measurable criterion on queues/time, e.g. average waiting time at lunch reduced by a stated amount",
          "Measurable criterion on correctness, e.g. no order accepted after 10:30 / total orders never exceed 300 / balance never negative in testing"
        ]
      }
    ],
    "markScheme": "1(a): Award [1] for each of the following, up to [1]:\n• Clear statement of the problem: long lunch queues because meals are ordered and paid for at the counter; students need to pre-order before 10:30 [1]\n1(b): Award [1] for each of the following, up to [2]:\n• Orders must be placed before 10:30 [1]\n• Maximum of 300 meals per day / order cannot exceed the student's budget [1]\nAccept: must be a web page; must use existing student accounts.\n1(c): Award [1] for each of the following, up to [2]:\n• Student identifier/login and chosen meal(s) from the menu [1]\n• Validation detail: menu item must exist, quantity a positive integer, time before 10:30 [1]\n1(d): Award [1] for each of the following, up to [2]:\n• Measurable criterion on queues/time, e.g. average waiting time at lunch reduced by a stated amount [1]\n• Measurable criterion on correctness, e.g. no order accepted after 10:30 / total orders never exceed 300 / balance never negative in testing [1]"
  },
  {
    "id": "ib_b1_006",
    "unit": "B1",
    "title": "B1.1 Define abstraction",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Define the term abstraction in computational thinking.",
    "marks": 1,
    "specReference": "B1.1.2",
    "commandWord": "Define",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Define the term abstraction in computational thinking.",
        "keywords": [
          "remove",
          "hide",
          "detail",
          "essential",
          "relevant"
        ],
        "maxMarks": 1,
        "criteria": [
          "Removing/hiding unnecessary detail to focus on the features that matter for solving the problem"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [1]:\n• Removing/hiding unnecessary detail to focus on the features that matter for solving the problem [1]\nDo not accept 'making it simpler' without reference to removing detail.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Removing/hiding unnecessary detail to focus on the features that matter for solving the problem",
        "description": "Removing/hiding unnecessary detail to focus on the features that matter for solving the problem",
        "acceptedAnswers": [
          "removing unnecessary detail",
          "hiding detail",
          "focus on important",
          "essential features"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_007",
    "unit": "B1",
    "title": "B1.1 Describe decomposition",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Describe decomposition, using an example from developing a school timetable program.",
    "marks": 2,
    "specReference": "B1.1.2",
    "commandWord": "Describe",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Describe decomposition, using an example from developing a school timetable program.",
        "keywords": [
          "break",
          "smaller",
          "sub-problem",
          "module",
          "manageable"
        ],
        "maxMarks": 2,
        "criteria": [
          "Breaking a complex problem into smaller, more manageable sub-problems that can be solved separately",
          "Valid example, e.g. separate modules for entering teachers, allocating rooms, checking clashes, printing timetables"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [2]:\n• Breaking a complex problem into smaller, more manageable sub-problems that can be solved separately [1]\n• Valid example, e.g. separate modules for entering teachers, allocating rooms, checking clashes, printing timetables [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Breaking a complex problem into smaller, more manageable sub-problems that can be solved separately",
        "description": "Breaking a complex problem into smaller, more manageable sub-problems that can be solved separately",
        "acceptedAnswers": [
          "break down",
          "smaller parts",
          "sub-problems",
          "manageable"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Valid example, e.g. separate modules for entering teachers, allocating rooms, checking clashes, printing timetables",
        "description": "Valid example, e.g. separate modules for entering teachers, allocating rooms, checking clashes, printing timetables",
        "acceptedAnswers": [
          "rooms",
          "clashes",
          "teachers",
          "print timetable",
          "module"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_008",
    "unit": "B1",
    "title": "B1.1 Pattern recognition",
    "level": "Core",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Outline how pattern recognition helps a programmer who is writing several programs that each validate a different type of user input.",
    "marks": 2,
    "specReference": "B1.1.2",
    "commandWord": "Outline",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Outline how pattern recognition helps a programmer who is writing several programs that each validate a different type of user input.",
        "keywords": [
          "similar",
          "repeat",
          "reuse",
          "general",
          "common"
        ],
        "maxMarks": 2,
        "criteria": [
          "Spotting similarities/repeated steps between problems (each check repeats: read, test against rule, re-prompt)",
          "Allows one general solution/function to be reused, saving time and reducing errors"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [2]:\n• Spotting similarities/repeated steps between problems (each check repeats: read, test against rule, re-prompt) [1]\n• Allows one general solution/function to be reused, saving time and reducing errors [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Spotting similarities/repeated steps between problems (each check repeats: read, test against rule, re-prompt)",
        "description": "Spotting similarities/repeated steps between problems (each check repeats: read, test against rule, re-prompt)",
        "acceptedAnswers": [
          "similarities",
          "repeated",
          "common steps"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Allows one general solution/function to be reused, saving time and reducing errors",
        "description": "Allows one general solution/function to be reused, saving time and reducing errors",
        "acceptedAnswers": [
          "reuse",
          "one function",
          "general solution",
          "saves time"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_009",
    "unit": "B1",
    "title": "B1.1 Algorithmic design",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Describe what is meant by algorithmic design.",
    "marks": 2,
    "specReference": "B1.1.2",
    "commandWord": "Describe",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Describe what is meant by algorithmic design.",
        "keywords": [
          "steps",
          "sequence",
          "order",
          "flowchart",
          "pseudocode"
        ],
        "maxMarks": 2,
        "criteria": [
          "Producing a precise, ordered sequence of steps/instructions to solve the problem",
          "Steps are unambiguous and can be represented as pseudocode/flowchart before coding and tested/traced"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [2]:\n• Producing a precise, ordered sequence of steps/instructions to solve the problem [1]\n• Steps are unambiguous and can be represented as pseudocode/flowchart before coding and tested/traced [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Producing a precise, ordered sequence of steps/instructions to solve the problem",
        "description": "Producing a precise, ordered sequence of steps/instructions to solve the problem",
        "acceptedAnswers": [
          "sequence of steps",
          "ordered",
          "instructions"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Steps are unambiguous and can be represented as pseudocode/flowchart before coding and tested/traced",
        "description": "Steps are unambiguous and can be represented as pseudocode/flowchart before coding and tested/traced",
        "acceptedAnswers": [
          "unambiguous",
          "flowchart",
          "pseudocode",
          "trace"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_010",
    "unit": "B1",
    "title": "B1.1 Which computational thinking concept?",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "mcq",
    "brief": "For each situation, choose the computational thinking concept being used.",
    "marks": 4,
    "specReference": "B1.1.2",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "A map of an underground railway shows stations and lines but not the true distances between them.",
        "options": [
          "Decomposition",
          "Abstraction",
          "Pattern recognition",
          "Algorithmic design"
        ],
        "a": 1
      },
      {
        "q": "A game is split into separate tasks: graphics, scoring, sound and saving progress.",
        "options": [
          "Abstraction",
          "Algorithmic design",
          "Decomposition",
          "Pattern recognition"
        ],
        "a": 2
      },
      {
        "q": "An analyst notices that website traffic rises every Monday morning.",
        "options": [
          "Pattern recognition",
          "Decomposition",
          "Abstraction",
          "Algorithmic design"
        ],
        "a": 0
      },
      {
        "q": "A student writes numbered steps to calculate the median of a list of marks.",
        "options": [
          "Abstraction",
          "Pattern recognition",
          "Decomposition",
          "Algorithmic design"
        ],
        "a": 3
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: B (Abstraction) [1]\n• Q2: C (Decomposition) [1]\n• Q3: A (Pattern recognition) [1]\n• Q4: D (Algorithmic design) [1]"
  },
  {
    "id": "ib_b1_011",
    "unit": "B1",
    "title": "B1.1 Abstraction versus decomposition",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Distinguish between abstraction and decomposition.",
    "marks": 3,
    "specReference": "B1.1.2",
    "commandWord": "Distinguish",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Distinguish between abstraction and decomposition.",
        "keywords": [
          "abstraction",
          "decomposition",
          "detail",
          "smaller",
          "whereas"
        ],
        "maxMarks": 3,
        "criteria": [
          "Abstraction removes/ignores detail that is not relevant to the problem",
          "Decomposition splits the problem into smaller sub-problems",
          "Clear contrast: abstraction reduces what is modelled, decomposition keeps the whole problem but divides it into parts (example acceptable)"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Abstraction removes/ignores detail that is not relevant to the problem [1]\n• Decomposition splits the problem into smaller sub-problems [1]\n• Clear contrast: abstraction reduces what is modelled, decomposition keeps the whole problem but divides it into parts (example acceptable) [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Abstraction removes/ignores detail that is not relevant to the problem",
        "description": "Abstraction removes/ignores detail that is not relevant to the problem",
        "acceptedAnswers": [
          "remove detail",
          "ignore irrelevant",
          "hide"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Decomposition splits the problem into smaller sub-problems",
        "description": "Decomposition splits the problem into smaller sub-problems",
        "acceptedAnswers": [
          "split",
          "break down",
          "sub-problems"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Clear contrast: abstraction reduces what is modelled, decomposition keeps the whole problem but divides it into parts (example acceptable)",
        "description": "Clear contrast: abstraction reduces what is modelled, decomposition keeps the whole problem but divides it into parts (example acceptable)",
        "acceptedAnswers": [
          "whereas",
          "contrast",
          "divides rather than removes"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_012",
    "unit": "B1",
    "title": "B1.1 CT in network security",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A company's network security team wants to detect attacks on its network.\n\nExplain how two different computational thinking concepts could be applied to this problem.",
    "marks": 4,
    "specReference": "B1.1.3",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain how two different computational thinking concepts could be applied to this problem.",
        "keywords": [
          "pattern",
          "traffic",
          "signature",
          "abstraction",
          "decomposition",
          "packet"
        ],
        "maxMarks": 4,
        "criteria": [
          "Pattern recognition named/identified",
          "Explained: identifying repeated signatures/unusual traffic patterns (e.g. many failed logins from one address) to flag likely attacks",
          "Second concept named, e.g. abstraction or decomposition",
          "Explained: e.g. abstraction keeps only relevant packet fields (source, port, time) / decomposition splits into monitoring, detection and alerting"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Pattern recognition named/identified [1]\n• Explained: identifying repeated signatures/unusual traffic patterns (e.g. many failed logins from one address) to flag likely attacks [1]\n• Second concept named, e.g. abstraction or decomposition [1]\n• Explained: e.g. abstraction keeps only relevant packet fields (source, port, time) / decomposition splits into monitoring, detection and alerting [1]\nAward [1] for each concept identified and [1] for each explanation linked to network security.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Pattern recognition named/identified",
        "description": "Pattern recognition named/identified",
        "acceptedAnswers": [
          "pattern recognition"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Explained: identifying repeated signatures/unusual traffic patterns (e.g. many failed logins from one address) to flag likely attacks",
        "description": "Explained: identifying repeated signatures/unusual traffic patterns (e.g. many failed logins from one address) to flag likely attacks",
        "acceptedAnswers": [
          "signature",
          "unusual traffic",
          "failed logins",
          "anomaly"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Second concept named, e.g. abstraction or decomposition",
        "description": "Second concept named, e.g. abstraction or decomposition",
        "acceptedAnswers": [
          "abstraction",
          "decomposition",
          "algorithmic design"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Explained: e.g. abstraction keeps only relevant packet fields (source, port, time) / decomposition splits into monitoring, detection and alerting",
        "description": "Explained: e.g. abstraction keeps only relevant packet fields (source, port, time) / decomposition splits into monitoring, detection and alerting",
        "acceptedAnswers": [
          "relevant fields",
          "ignore content",
          "monitoring",
          "alerting"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_013",
    "unit": "B1",
    "title": "B1.1 CT without programming",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Computational thinking does not necessarily involve programming.\n\nExplain this statement with reference to designing a relational database for a hospital.",
    "marks": 3,
    "specReference": "B1.1.3",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain this statement with reference to designing a relational database for a hospital.",
        "keywords": [
          "toolkit",
          "decomposition",
          "abstraction",
          "entity",
          "table",
          "attribute"
        ],
        "maxMarks": 3,
        "criteria": [
          "CT is a problem-solving toolkit/way of thinking, not code",
          "Decomposition: splitting hospital data into entities/tables such as patients, doctors, appointments",
          "Abstraction: choosing only relevant attributes (e.g. not storing patient's favourite colour); the design can be done on paper before any code"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• CT is a problem-solving toolkit/way of thinking, not code [1]\n• Decomposition: splitting hospital data into entities/tables such as patients, doctors, appointments [1]\n• Abstraction: choosing only relevant attributes (e.g. not storing patient's favourite colour); the design can be done on paper before any code [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "CT is a problem-solving toolkit/way of thinking, not code",
        "description": "CT is a problem-solving toolkit/way of thinking, not code",
        "acceptedAnswers": [
          "toolkit",
          "way of thinking",
          "problem-solving"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Decomposition: splitting hospital data into entities/tables such as patients, doctors, appointments",
        "description": "Decomposition: splitting hospital data into entities/tables such as patients, doctors, appointments",
        "acceptedAnswers": [
          "entities",
          "tables",
          "patients",
          "appointments"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Abstraction: choosing only relevant attributes (e.g. not storing patient's favourite colour); the design can be done on paper before any code",
        "description": "Abstraction: choosing only relevant attributes (e.g. not storing patient's favourite colour); the design can be done on paper before any code",
        "acceptedAnswers": [
          "relevant attributes",
          "on paper",
          "before code",
          "ER diagram"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_014",
    "unit": "B1",
    "title": "B1.1 CT in machine learning",
    "level": "Core",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "Explain how abstraction and pattern recognition are used when developing a machine learning model that predicts whether an email is spam.",
    "marks": 4,
    "specReference": "B1.1.3",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain how abstraction and pattern recognition are used when developing a machine learning model that predicts whether an email is spam.",
        "keywords": [
          "feature",
          "abstraction",
          "pattern",
          "training",
          "classify"
        ],
        "maxMarks": 4,
        "criteria": [
          "Abstraction: emails represented by selected features (e.g. word counts, sender, links) instead of the whole message",
          "This reduces data size/noise so the model can be trained efficiently",
          "Pattern recognition: model learns patterns/features common to known spam in labelled training data",
          "Uses learned patterns to classify new, unseen emails"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Abstraction: emails represented by selected features (e.g. word counts, sender, links) instead of the whole message [1]\n• This reduces data size/noise so the model can be trained efficiently [1]\n• Pattern recognition: model learns patterns/features common to known spam in labelled training data [1]\n• Uses learned patterns to classify new, unseen emails [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Abstraction: emails represented by selected features (e.g. word counts, sender, links) instead of the whole message",
        "description": "Abstraction: emails represented by selected features (e.g. word counts, sender, links) instead of the whole message",
        "acceptedAnswers": [
          "features",
          "word counts",
          "represent",
          "selected"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "This reduces data size/noise so the model can be trained efficiently",
        "description": "This reduces data size/noise so the model can be trained efficiently",
        "acceptedAnswers": [
          "reduce",
          "noise",
          "efficient"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Pattern recognition: model learns patterns/features common to known spam in labelled training data",
        "description": "Pattern recognition: model learns patterns/features common to known spam in labelled training data",
        "acceptedAnswers": [
          "learns patterns",
          "training data",
          "labelled"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Uses learned patterns to classify new, unseen emails",
        "description": "Uses learned patterns to classify new, unseen emails",
        "acceptedAnswers": [
          "classify",
          "unseen",
          "predict"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_015",
    "unit": "B1",
    "title": "B1.1 To what extent: CT in software development",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A team leader claims that applying computational thinking before writing any code is the most important factor in the success of a software project.\n\nTo what extent do you agree with this claim?",
    "marks": 6,
    "specReference": "B1.1.3",
    "commandWord": "To what extent",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "To what extent do you agree with this claim?",
        "keywords": [
          "decomposition",
          "abstraction",
          "pattern",
          "testing",
          "requirements",
          "conclusion"
        ],
        "maxMarks": 6,
        "criteria": [
          "0: No relevant knowledge.",
          "1-2: Limited, mainly descriptive points about computational thinking; no counter-argument; no conclusion.",
          "3-4: Some analysis with at least one argument for and against, linked to software development; conclusion may be weak.",
          "5-6: Balanced, well-supported discussion of several CT concepts and other factors, with a clear, justified conclusion.",
          "Decomposition supports team working and modular testing.",
          "Abstraction and a clear specification reduce misunderstanding.",
          "Pattern recognition encourages reuse of tested code.",
          "Testing, user involvement, communication and budget also determine success.",
          "Iterative approaches may revise early designs."
        ]
      }
    ],
    "markScheme": "Use the markbands below. Award the band that best fits the response.\nMarks | Level descriptor\n0 | No relevant knowledge.\n1-2 | Limited, mainly descriptive points about computational thinking; no counter-argument; no conclusion.\n3-4 | Some analysis with at least one argument for and against, linked to software development; conclusion may be weak.\n5-6 | Balanced, well-supported discussion of several CT concepts and other factors, with a clear, justified conclusion.\n\nIndicative content (responses may include):\n• Decomposition supports team working and modular testing.\n• Abstraction and a clear specification reduce misunderstanding.\n• Pattern recognition encourages reuse of tested code.\n• Testing, user involvement, communication and budget also determine success.\n• Iterative approaches may revise early designs.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Decomposition allows parallel development by team members",
        "description": "Decomposition allows parallel development by team members",
        "acceptedAnswers": [
          "parallel",
          "team",
          "modules"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Abstraction/clear specification reduces wasted work and misunderstanding of requirements",
        "description": "Abstraction/clear specification reduces wasted work and misunderstanding of requirements",
        "acceptedAnswers": [
          "requirements",
          "specification"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Pattern recognition allows reuse of existing solutions/libraries",
        "description": "Pattern recognition allows reuse of existing solutions/libraries",
        "acceptedAnswers": [
          "reuse"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Counter-argument: other factors matter, e.g. testing, user feedback, communication, budget",
        "description": "Counter-argument: other factors matter, e.g. testing, user feedback, communication, budget",
        "acceptedAnswers": [
          "testing",
          "user feedback",
          "budget"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Counter-argument: requirements change, so up-front design can be over-planned/agile iterations needed",
        "description": "Counter-argument: requirements change, so up-front design can be over-planned/agile iterations needed",
        "acceptedAnswers": [
          "change",
          "iterative",
          "agile"
        ]
      },
      {
        "id": "MP6",
        "marks": 1,
        "criterion": "Reasoned conclusion supported by the arguments",
        "description": "Reasoned conclusion supported by the arguments",
        "acceptedAnswers": [
          "conclusion",
          "overall"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_016",
    "unit": "B1",
    "title": "B1.1 Applying CT in real contexts",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "mcq",
    "brief": "Choose the best answer for each question.",
    "marks": 3,
    "specReference": "B1.1.3",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "A data analyst groups customer purchases to find products that are often bought together. Which concept is mainly used?",
        "options": [
          "Decomposition",
          "Pattern recognition",
          "Abstraction",
          "Iteration"
        ],
        "a": 1
      },
      {
        "q": "A database designer stores a student's date of birth but not their height. Which concept is this?",
        "options": [
          "Abstraction",
          "Decomposition",
          "Pattern recognition",
          "Selection"
        ],
        "a": 0
      },
      {
        "q": "Which statement about computational thinking is correct?",
        "options": [
          "It can only be applied when writing code",
          "It is a set of problem-solving techniques that may not involve programming",
          "It is the same as debugging",
          "It only applies to mathematics"
        ],
        "a": 1
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: B (Pattern recognition) [1]\n• Q2: A (Abstraction) [1]\n• Q3: B (It is a set of problem-solving techniques that may not involve programming) [1]"
  },
  {
    "id": "ib_b1_017",
    "unit": "B1",
    "title": "B1.1 Flowchart symbols",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "mcq",
    "brief": "Identify the standard flowchart symbol for each purpose.",
    "marks": 4,
    "specReference": "B1.1.4",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Which symbol is used for a decision such as \"Is X > 10?\"",
        "options": [
          "Rectangle",
          "Parallelogram",
          "Diamond",
          "Oval (rounded rectangle)"
        ],
        "a": 2
      },
      {
        "q": "Which symbol is used for INPUT and OUTPUT?",
        "options": [
          "Parallelogram",
          "Diamond",
          "Circle",
          "Rectangle"
        ],
        "a": 0
      },
      {
        "q": "Which symbol marks the Start or End of a flowchart?",
        "options": [
          "Diamond",
          "Oval (rounded rectangle)",
          "Parallelogram",
          "Small circle"
        ],
        "a": 1
      },
      {
        "q": "Which symbol joins two parts of a flowchart that are drawn apart, e.g. on another page?",
        "options": [
          "Rectangle",
          "Flowline arrow",
          "Connector (small circle)",
          "Diamond"
        ],
        "a": 2
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: C (Diamond) [1]\n• Q2: A (Parallelogram) [1]\n• Q3: B (Oval (rounded rectangle)) [1]\n• Q4: C (Connector (small circle)) [1]"
  },
  {
    "id": "ib_b1_018",
    "unit": "B1",
    "title": "B1.1 Name the flowchart symbol",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "table",
    "brief": "Complete the table by selecting the name of the standard flowchart symbol that should be used for each step.",
    "marks": 3,
    "specReference": "B1.1.4",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "Step",
        "type": "text"
      },
      {
        "label": "Symbol",
        "type": "select",
        "options": [
          "Start/End",
          "Input/Output",
          "Process",
          "Decision",
          "Connector",
          "Flowline"
        ]
      }
    ],
    "rows": [
      [
        {
          "v": "TOTAL ← TOTAL + PRICE",
          "g": true
        },
        {
          "v": "Process"
        }
      ],
      [
        {
          "v": "Is COUNT = 10?",
          "g": true
        },
        {
          "v": "Decision"
        }
      ],
      [
        {
          "v": "OUTPUT \"Done\"",
          "g": true
        },
        {
          "v": "Input/Output"
        }
      ],
      [
        {
          "v": "STOP",
          "g": true
        },
        {
          "v": "Start/End"
        }
      ],
      [
        {
          "v": "Arrow showing the direction of control",
          "g": true
        },
        {
          "v": "Flowline"
        }
      ],
      [
        {
          "v": "INPUT AGE",
          "g": true
        },
        {
          "v": "Input/Output"
        }
      ]
    ],
    "markScheme": "Award [3] for a fully correct table; marks are awarded in proportion to correct cells (6 cells to complete). Award follow-through for values that are correct given an earlier error."
  },
  {
    "id": "ib_b1_019",
    "unit": "B1",
    "title": "B1.1 Connector and flowline",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Outline the purpose of the connector symbol and the flowline in a flowchart.",
    "marks": 2,
    "specReference": "B1.1.4",
    "commandWord": "Outline",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Outline the purpose of the connector symbol and the flowline in a flowchart.",
        "keywords": [
          "connector",
          "join",
          "flowline",
          "direction",
          "arrow"
        ],
        "maxMarks": 2,
        "criteria": [
          "Connector: links separate sections of a flowchart (e.g. across pages) without long crossing lines",
          "Flowline: arrow showing the direction/order in which control passes between symbols"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [2]:\n• Connector: links separate sections of a flowchart (e.g. across pages) without long crossing lines [1]\n• Flowline: arrow showing the direction/order in which control passes between symbols [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Connector: links separate sections of a flowchart (e.g. across pages) without long crossing lines",
        "description": "Connector: links separate sections of a flowchart (e.g. across pages) without long crossing lines",
        "acceptedAnswers": [
          "link sections",
          "join",
          "across pages",
          "continue"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Flowline: arrow showing the direction/order in which control passes between symbols",
        "description": "Flowline: arrow showing the direction/order in which control passes between symbols",
        "acceptedAnswers": [
          "direction",
          "order",
          "flow of control",
          "arrow"
        ]
      }
    ]
  },
  {
    "id": "ib_b1_020",
    "unit": "B1",
    "title": "B1.1 Trace a digit-sum flowchart",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "table",
    "brief": "Flowchart (written as numbered symbols):\n1  [Start]\n2  [Input/Output] INPUT N\n3  [Process] TOTAL ← 0\n4  [Decision] Is N > 0?  Yes → 5,  No → 7\n5  [Process] TOTAL ← TOTAL + (N MOD 10)\n6  [Process] N ← N DIV 10, then flowline back to 4\n7  [Input/Output] OUTPUT TOTAL\n8  [End]\n\nComplete the trace table for the input N = 472. Each row shows the values after one pass through boxes 4-6; the last row shows the final decision and output.",
    "marks": 4,
    "specReference": "B1.1.4",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "N",
        "type": "text"
      },
      {
        "label": "N > 0?",
        "type": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "TOTAL",
        "type": "text"
      },
      {
        "label": "OUTPUT",
        "type": "text"
      }
    ],
    "rows": [
      [
        {
          "v": "472",
          "g": true
        },
        {
          "v": "Yes",
          "g": true
        },
        {
          "v": "0",
          "g": true
        },
        {
          "v": "",
          "g": true
        }
      ],
      [
        {
          "v": "47"
        },
        {
          "v": "Yes"
        },
        {
          "v": "2"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "4"
        },
        {
          "v": "Yes"
        },
        {
          "v": "9"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "0"
        },
        {
          "v": "No"
        },
        {
          "v": "13"
        },
        {
          "v": "13"
        }
      ]
    ],
    "markScheme": "Award [4] for a fully correct table; marks are awarded in proportion to correct cells (12 cells to complete). Award follow-through for values that are correct given an earlier error.\nDo not penalise TOTAL being written in the same row as the new N."
  },
  {
    "id": "ib_b1_021",
    "unit": "B1",
    "title": "B1.1 Determine flowchart output",
    "level": "Core",
    "difficulty": "Easy",
    "type": "inspect",
    "brief": "Flowchart (written as numbered symbols):\n1  [Start]\n2  [Input/Output] INPUT A, B, C\n3  [Process] BIG ← A\n4  [Decision] Is B > BIG?  Yes → 5,  No → 6\n5  [Process] BIG ← B\n6  [Decision] Is C > BIG?  Yes → 7,  No → 8\n7  [Process] BIG ← C\n8  [Input/Output] OUTPUT BIG\n9  [End]\n\nState the output of the flowchart for each set of inputs, and state its purpose.",
    "marks": 4,
    "specReference": "B1.1.4",
    "commandWord": "Deduce",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Output when A = 4, B = 9, C = 7",
        "a": [
          "9"
        ]
      },
      {
        "q": "Output when A = 8, B = 3, C = 8",
        "a": [
          "8"
        ]
      },
      {
        "q": "Output when A = -2, B = -5, C = -1",
        "a": [
          "-1"
        ]
      },
      {
        "q": "State the purpose of the flowchart (two or three words)",
        "a": [
          "finds the largest",
          "largest number",
          "maximum",
          "find the maximum",
          "largest of three numbers",
          "the largest",
          "find largest"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• Output when A = 4, B = 9, C = 7 → 9 [1]\n• Output when A = 8, B = 3, C = 8 → 8 [1]\n• Output when A = -2, B = -5, C = -1 → -1 [1]\n• State the purpose of the flowchart (two or three words) → finds the largest (accept largest number, maximum, find the maximum, largest of three numbers, the largest, find largest) [1]"
  },
  {
    "id": "ib_b1_022",
    "unit": "B1",
    "title": "B1.1 Trace a counting flowchart",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "table",
    "brief": "Flowchart (written as numbered symbols):\n1  [Start]\n2  [Process] COUNT ← 0, X ← 1\n3  [Decision] Is X <= 20?  Yes → 4,  No → 8\n4  [Decision] Is X MOD 3 = 0?  Yes → 5,  No → 6\n5  [Process] COUNT ← COUNT + 1\n6  [Process] X ← X + 4\n7  flowline back to 3\n8  [Input/Output] OUTPUT COUNT\n9  [End]\n\nComplete the trace table. Each row shows X when box 3 is reached.",
    "marks": 5,
    "specReference": "B1.1.4",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "X",
        "type": "text"
      },
      {
        "label": "X <= 20?",
        "type": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "X MOD 3 = 0?",
        "type": "select",
        "options": [
          "Yes",
          "No",
          "-"
        ]
      },
      {
        "label": "COUNT",
        "type": "text"
      },
      {
        "label": "OUTPUT",
        "type": "text"
      }
    ],
    "rows": [
      [
        {
          "v": "1",
          "g": true
        },
        {
          "v": "Yes",
          "g": true
        },
        {
          "v": "No",
          "g": true
        },
        {
          "v": "0",
          "g": true
        },
        {
          "v": "",
          "g": true
        }
      ],
      [
        {
          "v": "5"
        },
        {
          "v": "Yes"
        },
        {
          "v": "No"
        },
        {
          "v": "0"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "9"
        },
        {
          "v": "Yes"
        },
        {
          "v": "Yes"
        },
        {
          "v": "1"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "13"
        },
        {
          "v": "Yes"
        },
        {
          "v": "No"
        },
        {
          "v": "1"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "17"
        },
        {
          "v": "Yes"
        },
        {
          "v": "No"
        },
        {
          "v": "1"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "21"
        },
        {
          "v": "No"
        },
        {
          "v": "-"
        },
        {
          "v": "1"
        },
        {
          "v": "1"
        }
      ]
    ],
    "markScheme": "Award [5] for a fully correct table; marks are awarded in proportion to correct cells (25 cells to complete). Award follow-through for values that are correct given an earlier error."
  },
  {
    "id": "ib_b1_023",
    "unit": "B1",
    "title": "B1.1 Trace a binary conversion flowchart",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "table",
    "brief": "Flowchart (written as numbered symbols):\n1  [Start]\n2  [Input/Output] INPUT N\n3  [Process] BITS ← \"\"\n4  [Decision] Is N = 0?  Yes → 8,  No → 5\n5  [Process] R ← N MOD 2\n6  [Process] BITS ← R concatenated in front of BITS\n7  [Process] N ← N DIV 2, then flowline back to 4\n8  [Input/Output] OUTPUT BITS\n9  [End]\n\nComplete the trace table for the input N = 13. Each row shows values after boxes 5-7 have been executed.",
    "marks": 4,
    "specReference": "B1.1.4",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "N",
        "type": "text"
      },
      {
        "label": "R",
        "type": "text"
      },
      {
        "label": "BITS",
        "type": "text"
      }
    ],
    "rows": [
      [
        {
          "v": "13",
          "g": true
        },
        {
          "v": "",
          "g": true
        },
        {
          "v": "",
          "g": true
        }
      ],
      [
        {
          "v": "6"
        },
        {
          "v": "1"
        },
        {
          "v": "1"
        }
      ],
      [
        {
          "v": "3"
        },
        {
          "v": "0"
        },
        {
          "v": "01"
        }
      ],
      [
        {
          "v": "1"
        },
        {
          "v": "1"
        },
        {
          "v": "101"
        }
      ],
      [
        {
          "v": "0"
        },
        {
          "v": "1"
        },
        {
          "v": "1101"
        }
      ]
    ],
    "markScheme": "Award [4] for a fully correct table; marks are awarded in proportion to correct cells (12 cells to complete). Award follow-through for values that are correct given an earlier error.\nFinal output: 1101. Accept BITS values written with or without quotation marks."
  },
  {
    "id": "ib_b1_024",
    "unit": "B1",
    "title": "B1.1 Loop decisions in a flowchart",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "inspect",
    "brief": "Flowchart (written as numbered symbols):\n1  [Start]\n2  [Input/Output] INPUT N\n3  [Process] TOTAL ← 0\n4  [Decision] Is N > 0?  Yes → 5,  No → 7\n5  [Process] TOTAL ← TOTAL + (N MOD 10)\n6  [Process] N ← N DIV 10, then flowline back to 4\n7  [Input/Output] OUTPUT TOTAL\n8  [End]\n\nAnswer the questions about the flowchart above.",
    "marks": 4,
    "specReference": "B1.1.4",
    "commandWord": "Deduce",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "How many times is the decision in box 4 evaluated when N = 3050?",
        "a": [
          "5",
          "five"
        ]
      },
      {
        "q": "What is output when N = 3050?",
        "a": [
          "8"
        ]
      },
      {
        "q": "What is output when N = 0?",
        "a": [
          "0"
        ]
      },
      {
        "q": "Name the type of symbol used in box 6.",
        "a": [
          "process",
          "process/operation",
          "operation",
          "rectangle"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• How many times is the decision in box 4 evaluated when N = 3050? → 5 (accept five) [1]\n• What is output when N = 3050? → 8 [1]\n• What is output when N = 0? → 0 [1]\n• Name the type of symbol used in box 6. → process (accept process/operation, operation, rectangle) [1]"
  },
  {
    "id": "ib_b1_025",
    "unit": "B1",
    "title": "B1.1 Exam-style: car park charge flowchart",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A car park uses this flowchart to calculate the charge.\n\n1  [Start]\n2  [Input/Output] INPUT HOURS, ISMEMBER\n3  [Decision] Is HOURS <= 2?  Yes → 4,  No → 5\n4  [Process] CHARGE ← 3, go to 6\n5  [Process] CHARGE ← 3 + (HOURS - 2) * 2\n6  [Decision] Is ISMEMBER = TRUE?  Yes → 7,  No → 8\n7  [Process] CHARGE ← CHARGE / 2\n8  [Input/Output] OUTPUT CHARGE\n9  [End]",
    "marks": 10,
    "specReference": "B1.1.4",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "2(a)",
        "question": "Identify the type of symbol used in box 3 and in box 8.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Box 3: decision (diamond) [1]\n• Box 8: input/output (parallelogram) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Box 3: decision (diamond)",
            "description": "Box 3: decision (diamond)",
            "acceptedAnswers": [
              "decision",
              "diamond"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Box 8: input/output (parallelogram)",
            "description": "Box 8: input/output (parallelogram)",
            "acceptedAnswers": [
              "input/output",
              "output",
              "parallelogram"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "2(b)",
        "question": "Determine the output when HOURS = 5 and ISMEMBER = FALSE, and when HOURS = 2 and ISMEMBER = TRUE.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• HOURS = 5, not a member: 9 [1]\n• HOURS = 2, member: 1.5 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "HOURS = 5, not a member: 9",
            "description": "HOURS = 5, not a member: 9",
            "acceptedAnswers": [
              "9"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "HOURS = 2, member: 1.5",
            "description": "HOURS = 2, member: 1.5",
            "acceptedAnswers": [
              "1.5"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "2(c)",
        "question": "Construct a Python program that implements the flowchart. HOURS is input as an integer and ISMEMBER as the text Y or N.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Both inputs read with hours converted to integer [1]\n• Correct if/else for HOURS <= 2 with both charge calculations [1]\n• Separate selection halving the charge for members [1]\n• Charge output after both decisions [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Both inputs read with hours converted to integer",
            "description": "Both inputs read with hours converted to integer",
            "acceptedAnswers": [
              "int(input"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Correct if/else for HOURS <= 2 with both charge calculations",
            "description": "Correct if/else for HOURS <= 2 with both charge calculations",
            "acceptedAnswers": [
              "if hours <= 2",
              "else"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Separate selection halving the charge for members",
            "description": "Separate selection halving the charge for members",
            "acceptedAnswers": [
              "/ 2",
              "member == \"Y\""
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Charge output after both decisions",
            "description": "Charge output after both decisions",
            "acceptedAnswers": [
              "print(charge)"
            ]
          }
        ],
        "solution": "hours = int(input(\"Hours: \"))\nmember = input(\"Member (Y/N): \")\nif hours <= 2:\n    charge = 3\nelse:\n    charge = 3 + (hours - 2) * 2\nif member == \"Y\":\n    charge = charge / 2\nprint(charge)"
      },
      {
        "id": "p4",
        "label": "2(d)",
        "question": "Suggest one test value for HOURS that checks a boundary in this flowchart, and justify your choice.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• HOURS = 2 (or 3) [1]\n• Justification: it is at the edge of the HOURS <= 2 decision so tests whether <= rather than < was used [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "HOURS = 2 (or 3)",
            "description": "HOURS = 2 (or 3)",
            "acceptedAnswers": [
              "2",
              "3"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Justification: it is at the edge of the HOURS <= 2 decision so tests whether <= rather than < was used",
            "description": "Justification: it is at the edge of the HOURS <= 2 decision so tests whether <= rather than < was used",
            "acceptedAnswers": [
              "boundary",
              "edge",
              "<= vs <"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "2(a) Identify the type of symbol used in box 3 and in box 8.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Box 3: decision (diamond)",
          "Box 8: input/output (parallelogram)"
        ]
      },
      {
        "q": "2(b) Determine the output when HOURS = 5 and ISMEMBER = FALSE, and when HOURS = 2 and ISMEMBER = TRUE.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "HOURS = 5, not a member: 9",
          "HOURS = 2, member: 1.5"
        ]
      },
      {
        "q": "2(c) Construct a Python program that implements the flowchart. HOURS is input as an integer and ISMEMBER as the text Y or N.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Both inputs read with hours converted to integer",
          "Correct if/else for HOURS <= 2 with both charge calculations",
          "Separate selection halving the charge for members",
          "Charge output after both decisions"
        ]
      },
      {
        "q": "2(d) Suggest one test value for HOURS that checks a boundary in this flowchart, and justify your choice.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "HOURS = 2 (or 3)",
          "Justification: it is at the edge of the HOURS <= 2 decision so tests whether <= rather than < was used"
        ]
      }
    ],
    "markScheme": "2(a): Award [1] for each of the following, up to [2]:\n• Box 3: decision (diamond) [1]\n• Box 8: input/output (parallelogram) [1]\n2(b): Award [1] for each of the following, up to [2]:\n• HOURS = 5, not a member: 9 [1]\n• HOURS = 2, member: 1.5 [1]\n2(c): Award [1] for each of the following, up to [4]:\n• Both inputs read with hours converted to integer [1]\n• Correct if/else for HOURS <= 2 with both charge calculations [1]\n• Separate selection halving the charge for members [1]\n• Charge output after both decisions [1]\n2(d): Award [1] for each of the following, up to [2]:\n• HOURS = 2 (or 3) [1]\n• Justification: it is at the edge of the HOURS <= 2 decision so tests whether <= rather than < was used [1]"
  },
  {
    "id": "ib_b1_026",
    "unit": "B1",
    "title": "B1.1 Exam-style: hospital appointment system",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A hospital wants a system that lets patients book, change and cancel outpatient appointments online. Doctors work different shifts, and some clinics need specialist equipment that is only available in certain rooms.",
    "marks": 8,
    "specReference": "B1.1.2",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "3(a)",
        "question": "Describe how decomposition could be applied to this problem.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Breaking the system into smaller sub-problems/modules [1]\n• Appropriate examples: patient registration, booking, cancellation, doctor shift management, room/equipment allocation, reminders [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Breaking the system into smaller sub-problems/modules",
            "description": "Breaking the system into smaller sub-problems/modules",
            "acceptedAnswers": [
              "sub-problems",
              "modules",
              "smaller parts"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Appropriate examples: patient registration, booking, cancellation, doctor shift management, room/equipment allocation, reminders",
            "description": "Appropriate examples: patient registration, booking, cancellation, doctor shift management, room/equipment allocation, reminders",
            "acceptedAnswers": [
              "booking",
              "cancellation",
              "shifts",
              "rooms",
              "reminders"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "3(b)",
        "question": "Identify two details that could be removed by abstraction when modelling a doctor in this system.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• One irrelevant detail, e.g. doctor's home address / hobbies / car [1]\n• A second irrelevant detail [1]\nDo not accept details needed for booking such as name, specialism or shift times.",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "One irrelevant detail, e.g. doctor's home address / hobbies / car",
            "description": "One irrelevant detail, e.g. doctor's home address / hobbies / car",
            "acceptedAnswers": [
              "home address",
              "hobbies",
              "car",
              "age"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "A second irrelevant detail",
            "description": "A second irrelevant detail",
            "acceptedAnswers": [
              "eye colour",
              "height",
              "favourite food",
              "family"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "3(c)",
        "question": "Explain how pattern recognition could help the hospital reduce missed appointments.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Analyse historical appointment data for patterns in missed appointments [1]\n• Example pattern: certain times/days/age groups/long waits more likely to be missed [1]\n• Action based on the pattern, e.g. targeted reminders, overbooking those slots, offering different times [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Analyse historical appointment data for patterns in missed appointments",
            "description": "Analyse historical appointment data for patterns in missed appointments",
            "acceptedAnswers": [
              "historical data",
              "analyse",
              "trends"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Example pattern: certain times/days/age groups/long waits more likely to be missed",
            "description": "Example pattern: certain times/days/age groups/long waits more likely to be missed",
            "acceptedAnswers": [
              "early morning",
              "Mondays",
              "age group",
              "long wait"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Action based on the pattern, e.g. targeted reminders, overbooking those slots, offering different times",
            "description": "Action based on the pattern, e.g. targeted reminders, overbooking those slots, offering different times",
            "acceptedAnswers": [
              "reminders",
              "overbook",
              "reschedule"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "3(d)",
        "question": "Outline one reason why computational thinking is useful here even before any code is written.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• Clarifies requirements/structure of the problem early, e.g. identifies rules such as equipment-room constraints, reducing costly changes later [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Clarifies requirements/structure of the problem early, e.g. identifies rules such as equipment-room constraints, reducing costly changes later",
            "description": "Clarifies requirements/structure of the problem early, e.g. identifies rules such as equipment-room constraints, reducing costly changes later",
            "acceptedAnswers": [
              "requirements",
              "plan",
              "before coding",
              "reduce errors"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "3(a) Describe how decomposition could be applied to this problem.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Breaking the system into smaller sub-problems/modules",
          "Appropriate examples: patient registration, booking, cancellation, doctor shift management, room/equipment allocation, reminders"
        ]
      },
      {
        "q": "3(b) Identify two details that could be removed by abstraction when modelling a doctor in this system.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "One irrelevant detail, e.g. doctor's home address / hobbies / car",
          "A second irrelevant detail"
        ]
      },
      {
        "q": "3(c) Explain how pattern recognition could help the hospital reduce missed appointments.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Analyse historical appointment data for patterns in missed appointments",
          "Example pattern: certain times/days/age groups/long waits more likely to be missed",
          "Action based on the pattern, e.g. targeted reminders, overbooking those slots, offering different times"
        ]
      },
      {
        "q": "3(d) Outline one reason why computational thinking is useful here even before any code is written.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "Clarifies requirements/structure of the problem early, e.g. identifies rules such as equipment-room constraints, reducing costly changes later"
        ]
      }
    ],
    "markScheme": "3(a): Award [1] for each of the following, up to [2]:\n• Breaking the system into smaller sub-problems/modules [1]\n• Appropriate examples: patient registration, booking, cancellation, doctor shift management, room/equipment allocation, reminders [1]\n3(b): Award [1] for each of the following, up to [2]:\n• One irrelevant detail, e.g. doctor's home address / hobbies / car [1]\n• A second irrelevant detail [1]\nDo not accept details needed for booking such as name, specialism or shift times.\n3(c): Award [1] for each of the following, up to [3]:\n• Analyse historical appointment data for patterns in missed appointments [1]\n• Example pattern: certain times/days/age groups/long waits more likely to be missed [1]\n• Action based on the pattern, e.g. targeted reminders, overbooking those slots, offering different times [1]\n3(d): Award [1] for each of the following, up to [1]:\n• Clarifies requirements/structure of the problem early, e.g. identifies rules such as equipment-room constraints, reducing costly changes later [1]"
  },
  {
    "id": "ib_b2_001",
    "unit": "B2",
    "title": "B2.1 Choosing data types",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "mcq",
    "brief": "Choose the most appropriate data type for each item of data in a sports club program.",
    "marks": 4,
    "specReference": "B2.1.1",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Whether a member has paid this year's fee",
        "options": [
          "Integer",
          "String",
          "Boolean",
          "Decimal (float)"
        ],
        "a": 2
      },
      {
        "q": "A member's phone number such as 07700 900123",
        "options": [
          "Integer",
          "String",
          "Boolean",
          "Decimal (float)"
        ],
        "a": 1
      },
      {
        "q": "The average time for a 100 m race, e.g. 12.37",
        "options": [
          "Decimal (float)",
          "Integer",
          "Char",
          "Boolean"
        ],
        "a": 0
      },
      {
        "q": "The single letter code for a membership band, e.g. 'J'",
        "options": [
          "Decimal (float)",
          "Boolean",
          "Char",
          "Integer"
        ],
        "a": 2
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: C (Boolean) [1]\n• Q2: B (String) [1]\n• Q3: A (Decimal (float)) [1]\n• Q4: C (Char) [1]"
  },
  {
    "id": "ib_b2_002",
    "unit": "B2",
    "title": "B2.1 Python expressions and types",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "inspect",
    "brief": "Study the Python code below. State the value printed by each line.",
    "marks": 6,
    "specReference": "B2.1.1",
    "commandWord": "State",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "code": "print(7 // 2)\nprint(7 / 2)\nprint(7 % 2)\nprint(\"3\" + \"4\")\nprint(int(\"3\") + int(\"4\"))\nprint(type(7 / 7))",
    "questions": [
      {
        "q": "Line 1 output",
        "a": [
          "3"
        ]
      },
      {
        "q": "Line 2 output",
        "a": [
          "3.5"
        ]
      },
      {
        "q": "Line 3 output",
        "a": [
          "1"
        ]
      },
      {
        "q": "Line 4 output",
        "a": [
          "34"
        ]
      },
      {
        "q": "Line 5 output",
        "a": [
          "7"
        ]
      },
      {
        "q": "Line 6 output",
        "a": [
          "<class 'float'>",
          "float"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [6]):\n• Line 1 output → 3 [1]\n• Line 2 output → 3.5 [1]\n• Line 3 output → 1 [1]\n• Line 4 output → 34 [1]\n• Line 5 output → 7 [1]\n• Line 6 output → <class 'float'> (accept float) [1]"
  },
  {
    "id": "ib_b2_003",
    "unit": "B2",
    "title": "B2.1 Temperature conversion",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "code",
    "brief": "Write a program that converts a temperature from Celsius to Fahrenheit using F = C × 9 / 5 + 32.\n\n• Input the temperature with the prompt `Celsius: ` (it may be a decimal).\n• Output the result to 1 decimal place in the form `Fahrenheit: 98.6`\n\nExample: input 37 → output `Fahrenheit: 98.6`",
    "marks": 3,
    "specReference": "B2.1.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "# Convert Celsius to Fahrenheit\n",
    "solution": "c = float(input(\"Celsius: \"))\nf = c * 9 / 5 + 32\nprint(f\"Fahrenheit: {f:.1f}\")",
    "tests": [
      {
        "in": [
          "37"
        ],
        "out": "Fahrenheit: 98.6",
        "m": 1
      },
      {
        "in": [
          "-40"
        ],
        "out": "Fahrenheit: -40.0",
        "m": 1
      },
      {
        "in": [
          "21.5"
        ],
        "out": "Fahrenheit: 70.7",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Input converted to float (decimal) [1]\n• Correct formula c * 9 / 5 + 32 [1]\n• Output formatted to 1 decimal place with label [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Input converted to float (decimal)",
        "description": "Input converted to float (decimal)",
        "acceptedAnswers": [
          "float(input"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Correct formula c * 9 / 5 + 32",
        "description": "Correct formula c * 9 / 5 + 32",
        "acceptedAnswers": [
          "* 9 / 5 + 32"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Output formatted to 1 decimal place with label",
        "description": "Output formatted to 1 decimal place with label",
        "acceptedAnswers": [
          ":.1f",
          "round("
        ]
      }
    ]
  },
  {
    "id": "ib_b2_004",
    "unit": "B2",
    "title": "B2.1 Seconds to hours, minutes and seconds",
    "level": "Core",
    "difficulty": "Easy",
    "type": "code",
    "brief": "A stopwatch records a time in whole seconds. Write a program that converts it into hours, minutes and seconds using integer division and modulus.\n\n• Prompt: `Seconds: `\n• Output format: `2 h 5 min 9 s`\n\nExample: input 7509 → `2 h 5 min 9 s`",
    "marks": 4,
    "specReference": "B2.1.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "total = int(input(\"Seconds: \"))\n# calculate hours, minutes and seconds\n",
    "solution": "total = int(input(\"Seconds: \"))\nh = total // 3600\nm = (total % 3600) // 60\ns = total % 60\nprint(f\"{h} h {m} min {s} s\")",
    "tests": [
      {
        "in": [
          "7509"
        ],
        "out": "2 h 5 min 9 s",
        "m": 1
      },
      {
        "in": [
          "59"
        ],
        "out": "0 h 0 min 59 s",
        "m": 1
      },
      {
        "in": [
          "3600"
        ],
        "out": "1 h 0 min 0 s",
        "m": 1
      },
      {
        "in": [
          "86399"
        ],
        "out": "23 h 59 min 59 s",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Hours using // 3600 [1]\n• Minutes from the remainder of hours, // 60 [1]\n• Seconds using % 60 [1]\n• Output in the exact required format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Hours using // 3600",
        "description": "Hours using // 3600",
        "acceptedAnswers": [
          "// 3600"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Minutes from the remainder of hours, // 60",
        "description": "Minutes from the remainder of hours, // 60",
        "acceptedAnswers": [
          "% 3600",
          "// 60"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Seconds using % 60",
        "description": "Seconds using % 60",
        "acceptedAnswers": [
          "% 60"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Output in the exact required format",
        "description": "Output in the exact required format",
        "acceptedAnswers": [
          "h",
          "min",
          "s"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_005",
    "unit": "B2",
    "title": "B2.1 Boolean flag: cinema discount",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "A cinema ticket costs 9.50. Students and people aged 65 or over get 30% off.\n\n• Prompt `Age: ` (integer) then `Student (Y/N): `\n• Store whether a discount applies in a Boolean variable called `discount`.\n• Output `Price: 6.65` (2 decimal places).\n\nExample: inputs 70, N → `Price: 6.65`",
    "marks": 4,
    "specReference": "B2.1.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "age = int(input(\"Age: \"))\nstudent = input(\"Student (Y/N): \")\n",
    "solution": "age = int(input(\"Age: \"))\nstudent = input(\"Student (Y/N): \")\ndiscount = age >= 65 or student == \"Y\"\nprice = 9.50\nif discount:\n    price = price * 0.7\nprint(f\"Price: {price:.2f}\")",
    "tests": [
      {
        "in": [
          "70",
          "N"
        ],
        "out": "Price: 6.65",
        "m": 1
      },
      {
        "in": [
          "17",
          "Y"
        ],
        "out": "Price: 6.65",
        "m": 1
      },
      {
        "in": [
          "30",
          "N"
        ],
        "out": "Price: 9.50",
        "m": 1
      },
      {
        "in": [
          "65",
          "N"
        ],
        "out": "Price: 6.65",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Boolean variable assigned from a condition [1]\n• Condition uses age >= 65 or student == \"Y\" [1]\n• 30% reduction applied only when discount is True [1]\n• Output formatted to 2 decimal places [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Boolean variable assigned from a condition",
        "description": "Boolean variable assigned from a condition",
        "acceptedAnswers": [
          "discount ="
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Condition uses age >= 65 or student == \"Y\"",
        "description": "Condition uses age >= 65 or student == \"Y\"",
        "acceptedAnswers": [
          ">= 65",
          "or"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "30% reduction applied only when discount is True",
        "description": "30% reduction applied only when discount is True",
        "acceptedAnswers": [
          "* 0.7",
          "0.3"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Output formatted to 2 decimal places",
        "description": "Output formatted to 2 decimal places",
        "acceptedAnswers": [
          ":.2f"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_006",
    "unit": "B2",
    "title": "B2.1 Global and local variables",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "inspect",
    "brief": "Study the code. State the output of each print statement in the order they are executed.",
    "marks": 4,
    "specReference": "B2.1.1",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "code": "count = 5\n\ndef add_ten():\n    count = 10\n    count = count + 5\n    print(count)\n\ndef increase():\n    global count\n    count = count + 1\n\nadd_ten()\nprint(count)\nincrease()\nprint(count)\nadd_ten()",
    "questions": [
      {
        "q": "First line of output",
        "a": [
          "15"
        ]
      },
      {
        "q": "Second line of output",
        "a": [
          "5"
        ]
      },
      {
        "q": "Third line of output",
        "a": [
          "6"
        ]
      },
      {
        "q": "Fourth line of output",
        "a": [
          "15"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• First line of output → 15 [1]\n• Second line of output → 5 [1]\n• Third line of output → 6 [1]\n• Fourth line of output → 15 [1]"
  },
  {
    "id": "ib_b2_007",
    "unit": "B2",
    "title": "B2.1 Trace integer division and modulus",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "table",
    "brief": "Trace the code below for the input 1234. Each row shows the values at the end of one iteration of the loop.\n\nn = int(input())\nrev = 0\nwhile n > 0:\n    d = n % 10\n    rev = rev * 10 + d\n    n = n // 10\nprint(rev)",
    "marks": 4,
    "specReference": "B2.1.1",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "n",
        "type": "text"
      },
      {
        "label": "d",
        "type": "text"
      },
      {
        "label": "rev",
        "type": "text"
      }
    ],
    "rows": [
      [
        {
          "v": "1234",
          "g": true
        },
        {
          "v": "",
          "g": true
        },
        {
          "v": "0",
          "g": true
        }
      ],
      [
        {
          "v": "123"
        },
        {
          "v": "4"
        },
        {
          "v": "4"
        }
      ],
      [
        {
          "v": "12"
        },
        {
          "v": "3"
        },
        {
          "v": "43"
        }
      ],
      [
        {
          "v": "1"
        },
        {
          "v": "2"
        },
        {
          "v": "432"
        }
      ],
      [
        {
          "v": "0"
        },
        {
          "v": "1"
        },
        {
          "v": "4321"
        }
      ]
    ],
    "markScheme": "Award [4] for a fully correct table; marks are awarded in proportion to correct cells (12 cells to complete). Award follow-through for values that are correct given an earlier error.\nOutput: 4321"
  },
  {
    "id": "ib_b2_008",
    "unit": "B2",
    "title": "B2.1 String slicing",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "inspect",
    "brief": "word = \"COMPUTATION\"\n\nState the output of each expression.",
    "marks": 6,
    "specReference": "B2.1.2",
    "commandWord": "State",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "print(word[0:4])",
        "a": [
          "COMP"
        ]
      },
      {
        "q": "print(word[-3:])",
        "a": [
          "ION"
        ]
      },
      {
        "q": "print(word[4])",
        "a": [
          "U"
        ]
      },
      {
        "q": "print(len(word))",
        "a": [
          "11"
        ]
      },
      {
        "q": "print(word[::2])",
        "a": [
          "CMUAIN"
        ]
      },
      {
        "q": "print(word.lower()[3:7])",
        "a": [
          "puta"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [6]):\n• print(word[0:4]) → COMP [1]\n• print(word[-3:]) → ION [1]\n• print(word[4]) → U [1]\n• print(len(word)) → 11 [1]\n• print(word[::2]) → CMUAIN [1]\n• print(word.lower()[3:7]) → puta [1]"
  },
  {
    "id": "ib_b2_009",
    "unit": "B2",
    "title": "B2.1 Initials from a full name",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "code",
    "brief": "Write a program that inputs a person's first name and last name and outputs their initials in upper case, each followed by a full stop.\n\n• Prompts: `First name: ` then `Last name: `\n• Output example: `Initials: A.L.`\n\nExample: ada, lovelace → `Initials: A.L.`",
    "marks": 3,
    "specReference": "B2.1.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "first = input(\"First name: \")\nlast = input(\"Last name: \")\n",
    "solution": "first = input(\"First name: \")\nlast = input(\"Last name: \")\nprint(\"Initials: \" + first[0].upper() + \".\" + last[0].upper() + \".\")",
    "tests": [
      {
        "in": [
          "ada",
          "lovelace"
        ],
        "out": "Initials: A.L.",
        "m": 1
      },
      {
        "in": [
          "Grace",
          "Hopper"
        ],
        "out": "Initials: G.H.",
        "m": 1
      },
      {
        "in": [
          "alan",
          "turing"
        ],
        "out": "Initials: A.T.",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Extract first character of each name using index 0 [1]\n• Convert to upper case [1]\n• Concatenate with full stops and output in required format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Extract first character of each name using index 0",
        "description": "Extract first character of each name using index 0",
        "acceptedAnswers": [
          "[0]"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Convert to upper case",
        "description": "Convert to upper case",
        "acceptedAnswers": [
          ".upper()"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Concatenate with full stops and output in required format",
        "description": "Concatenate with full stops and output in required format",
        "acceptedAnswers": [
          "+ \".\"",
          "Initials: "
        ]
      }
    ]
  },
  {
    "id": "ib_b2_010",
    "unit": "B2",
    "title": "B2.1 Extract the domain of an email",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a program that inputs an email address and outputs the user name (before the @) and the domain (after the @) on separate lines. If the address does not contain exactly one @, output `Invalid` only.\n\n• Prompt: `Email: `\n• Output example for sam.lee@school.org:\n`User: sam.lee`\n`Domain: school.org`",
    "marks": 4,
    "specReference": "B2.1.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "email = input(\"Email: \")\n",
    "solution": "email = input(\"Email: \")\nif email.count(\"@\") != 1:\n    print(\"Invalid\")\nelse:\n    pos = email.find(\"@\")\n    print(\"User: \" + email[:pos])\n    print(\"Domain: \" + email[pos + 1:])",
    "tests": [
      {
        "in": [
          "sam.lee@school.org"
        ],
        "out": "User: sam.lee\nDomain: school.org",
        "m": 1
      },
      {
        "in": [
          "info@ib.example"
        ],
        "out": "User: info\nDomain: ib.example",
        "m": 1
      },
      {
        "in": [
          "no-at-sign.com"
        ],
        "out": "Invalid",
        "m": 1
      },
      {
        "in": [
          "a@b@c"
        ],
        "out": "Invalid",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Check that exactly one @ is present [1]\n• Locate position of @ (find/index/split) [1]\n• Slice before the @ for the user name [1]\n• Slice after the @ for the domain [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Check that exactly one @ is present",
        "description": "Check that exactly one @ is present",
        "acceptedAnswers": [
          "count(\"@\")",
          "== 1",
          "!= 1"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Locate position of @ (find/index/split)",
        "description": "Locate position of @ (find/index/split)",
        "acceptedAnswers": [
          "find",
          "index",
          "split"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Slice before the @ for the user name",
        "description": "Slice before the @ for the user name",
        "acceptedAnswers": [
          "[:pos]"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Slice after the @ for the domain",
        "description": "Slice after the @ for the domain",
        "acceptedAnswers": [
          "[pos + 1:]"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_011",
    "unit": "B2",
    "title": "B2.1 Censor a word",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a program that replaces every occurrence of a banned word in a sentence with asterisks of the same length. The search is case-sensitive.\n\n• Prompts: `Sentence: ` then `Banned word: `\n• Output the new sentence only.\n\nExample: `the cat sat on the mat`, `at` → `the c** s** on the m**`",
    "marks": 4,
    "specReference": "B2.1.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "sentence = input(\"Sentence: \")\nbanned = input(\"Banned word: \")\n",
    "solution": "sentence = input(\"Sentence: \")\nbanned = input(\"Banned word: \")\nprint(sentence.replace(banned, \"*\" * len(banned)))",
    "tests": [
      {
        "in": [
          "cats sat on mats",
          "at"
        ],
        "out": "c**s s** on m**s",
        "m": 1
      },
      {
        "in": [
          "bad news is bad",
          "bad"
        ],
        "out": "*** news is ***",
        "m": 1
      },
      {
        "in": [
          "nothing here",
          "xyz"
        ],
        "out": "nothing here",
        "m": 1
      },
      {
        "in": [
          "Banana",
          "an"
        ],
        "out": "B****a",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Both strings input [1]\n• Build a replacement string of asterisks of matching length [1]\n• Replace every occurrence (replace() or a loop over substrings) [1]\n• Output the altered sentence [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Both strings input",
        "description": "Both strings input",
        "acceptedAnswers": [
          "input("
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Build a replacement string of asterisks of matching length",
        "description": "Build a replacement string of asterisks of matching length",
        "acceptedAnswers": [
          "\"*\" * len"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Replace every occurrence (replace() or a loop over substrings)",
        "description": "Replace every occurrence (replace() or a loop over substrings)",
        "acceptedAnswers": [
          ".replace(",
          "for"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Output the altered sentence",
        "description": "Output the altered sentence",
        "acceptedAnswers": [
          "print"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_012",
    "unit": "B2",
    "title": "B2.1 Palindrome checker",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "A palindrome reads the same forwards and backwards. Write a program that ignores spaces and upper/lower case.\n\n• Prompt: `Text: `\n• Output `Palindrome` or `Not a palindrome`\n\nExample: `Never odd or even` → `Palindrome`",
    "marks": 4,
    "specReference": "B2.1.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "text = input(\"Text: \")\n",
    "solution": "text = input(\"Text: \")\nclean = text.replace(\" \", \"\").lower()\nif clean == clean[::-1]:\n    print(\"Palindrome\")\nelse:\n    print(\"Not a palindrome\")",
    "tests": [
      {
        "in": [
          "Never odd or even"
        ],
        "out": "Palindrome",
        "m": 1
      },
      {
        "in": [
          "racecar"
        ],
        "out": "Palindrome",
        "m": 1
      },
      {
        "in": [
          "Computer Science"
        ],
        "out": "Not a palindrome",
        "m": 1
      },
      {
        "in": [
          "ab"
        ],
        "out": "Not a palindrome",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Remove spaces [1]\n• Convert to one case [1]\n• Reverse the string (slice or loop) [1]\n• Compare and output the correct message [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Remove spaces",
        "description": "Remove spaces",
        "acceptedAnswers": [
          "replace(\" \", \"\")"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Convert to one case",
        "description": "Convert to one case",
        "acceptedAnswers": [
          ".lower()",
          ".upper()"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Reverse the string (slice or loop)",
        "description": "Reverse the string (slice or loop)",
        "acceptedAnswers": [
          "[::-1]"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Compare and output the correct message",
        "description": "Compare and output the correct message",
        "acceptedAnswers": [
          "Palindrome",
          "Not a palindrome"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_013",
    "unit": "B2",
    "title": "B2.1 Count a substring without count()",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "Write a program that counts how many times a pattern appears in a piece of text, including overlapping matches. You must NOT use the built-in count() method; use a loop and slicing.\n\n• Prompts: `Text: ` then `Pattern: `\n• Output example: `Found 3 times`\n\nExample: `banana`, `ana` → `Found 2 times`",
    "marks": 5,
    "specReference": "B2.1.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "text = input(\"Text: \")\npattern = input(\"Pattern: \")\n",
    "solution": "text = input(\"Text: \")\npattern = input(\"Pattern: \")\nfound = 0\nfor i in range(len(text) - len(pattern) + 1):\n    if text[i:i + len(pattern)] == pattern:\n        found = found + 1\nprint(f\"Found {found} times\")",
    "tests": [
      {
        "in": [
          "banana",
          "ana"
        ],
        "out": "Found 2 times",
        "m": 1
      },
      {
        "in": [
          "aaaa",
          "aa"
        ],
        "out": "Found 3 times",
        "m": 1
      },
      {
        "in": [
          "computer",
          "z"
        ],
        "out": "Found 0 times",
        "m": 1
      },
      {
        "in": [
          "the cat and the hat",
          "the"
        ],
        "out": "Found 2 times",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Counter initialised to 0 [1]\n• Loop over every valid start position [1]\n• Slice of the same length as the pattern extracted [1]\n• Compare slice with pattern and increment [1]\n• Output in the required format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Counter initialised to 0",
        "description": "Counter initialised to 0",
        "acceptedAnswers": [
          "found = 0"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Loop over every valid start position",
        "description": "Loop over every valid start position",
        "acceptedAnswers": [
          "range(len(text) - len(pattern) + 1)"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Slice of the same length as the pattern extracted",
        "description": "Slice of the same length as the pattern extracted",
        "acceptedAnswers": [
          "text[i:i + len(pattern)]"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Compare slice with pattern and increment",
        "description": "Compare slice with pattern and increment",
        "acceptedAnswers": [
          "== pattern",
          "+ 1"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Output in the required format",
        "description": "Output in the required format",
        "acceptedAnswers": [
          "Found",
          "times"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_014",
    "unit": "B2",
    "title": "B2.1 Caesar cipher",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "Write a program that encrypts a message with a Caesar cipher. Each upper-case letter is shifted forward by the key, wrapping from Z back to A. Any other character (spaces, digits, punctuation) is unchanged. Convert the message to upper case first.\n\n• Prompts: `Message: ` then `Key: ` (integer 0-25)\n• Output the encrypted message only.\n\nExample: `Hello, World`, 3 → `KHOOR, ZRUOG`",
    "marks": 5,
    "specReference": "B2.1.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "message = input(\"Message: \").upper()\nkey = int(input(\"Key: \"))\n",
    "solution": "message = input(\"Message: \").upper()\nkey = int(input(\"Key: \"))\nresult = \"\"\nfor ch in message:\n    if \"A\" <= ch <= \"Z\":\n        result = result + chr((ord(ch) - ord(\"A\") + key) % 26 + ord(\"A\"))\n    else:\n        result = result + ch\nprint(result)",
    "tests": [
      {
        "in": [
          "Hello, World",
          "3"
        ],
        "out": "KHOOR, ZRUOG",
        "m": 1
      },
      {
        "in": [
          "xyz",
          "2"
        ],
        "out": "ZAB",
        "m": 1
      },
      {
        "in": [
          "IB 2027",
          "13"
        ],
        "out": "VO 2027",
        "m": 1
      },
      {
        "in": [
          "abc",
          "0"
        ],
        "out": "ABC",
        "m": 1
      },
      {
        "in": [
          "Zebra",
          "25"
        ],
        "out": "YDAQZ",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Loop through each character [1]\n• Test whether character is a letter [1]\n• Use ord/chr to shift [1]\n• Wrap around using % 26 [1]\n• Non-letters unchanged and result built by concatenation [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Loop through each character",
        "description": "Loop through each character",
        "acceptedAnswers": [
          "for ch in"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Test whether character is a letter",
        "description": "Test whether character is a letter",
        "acceptedAnswers": [
          "\"A\" <= ch <= \"Z\"",
          "isalpha"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Use ord/chr to shift",
        "description": "Use ord/chr to shift",
        "acceptedAnswers": [
          "ord(",
          "chr("
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Wrap around using % 26",
        "description": "Wrap around using % 26",
        "acceptedAnswers": [
          "% 26"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Non-letters unchanged and result built by concatenation",
        "description": "Non-letters unchanged and result built by concatenation",
        "acceptedAnswers": [
          "else",
          "result + ch"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_015",
    "unit": "B2",
    "title": "B2.1 Points of failure",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A program reads exam marks from a file named marks.txt, asks the user for a pass mark and prints the percentage of students who passed.\n\nDescribe three different points at which this program could fail.",
    "marks": 3,
    "specReference": "B2.1.3",
    "commandWord": "Describe",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Describe three different points at which this program could fail.",
        "keywords": [
          "input",
          "ValueError",
          "file",
          "missing",
          "logic",
          "zero"
        ],
        "maxMarks": 3,
        "criteria": [
          "Unexpected input: user types text/blank/negative value for the pass mark causing ValueError or invalid result",
          "Resource unavailability: marks.txt missing, moved or locked, causing FileNotFoundError/permission error",
          "Logic error: e.g. file is empty so dividing by number of students (0) causes ZeroDivisionError / wrong comparison gives wrong percentage"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Unexpected input: user types text/blank/negative value for the pass mark causing ValueError or invalid result [1]\n• Resource unavailability: marks.txt missing, moved or locked, causing FileNotFoundError/permission error [1]\n• Logic error: e.g. file is empty so dividing by number of students (0) causes ZeroDivisionError / wrong comparison gives wrong percentage [1]\nEach point must be linked to this program for the mark.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Unexpected input: user types text/blank/negative value for the pass mark causing ValueError or invalid result",
        "description": "Unexpected input: user types text/blank/negative value for the pass mark causing ValueError or invalid result",
        "acceptedAnswers": [
          "unexpected input",
          "ValueError",
          "text instead of number"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Resource unavailability: marks.txt missing, moved or locked, causing FileNotFoundError/permission error",
        "description": "Resource unavailability: marks.txt missing, moved or locked, causing FileNotFoundError/permission error",
        "acceptedAnswers": [
          "file not found",
          "missing file",
          "resource unavailable"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Logic error: e.g. file is empty so dividing by number of students (0) causes ZeroDivisionError / wrong comparison gives wrong percentage",
        "description": "Logic error: e.g. file is empty so dividing by number of students (0) causes ZeroDivisionError / wrong comparison gives wrong percentage",
        "acceptedAnswers": [
          "division by zero",
          "empty file",
          "logic error"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_016",
    "unit": "B2",
    "title": "B2.1 try / except / finally order",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "inspect",
    "brief": "Study the code below.",
    "marks": 4,
    "specReference": "B2.1.3",
    "commandWord": "Deduce",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "code": "try:\n    x = int(input(\"Number: \"))\n    print(10 / x)\nexcept ZeroDivisionError:\n    print(\"cannot divide by zero\")\nexcept ValueError:\n    print(\"not a whole number\")\nfinally:\n    print(\"done\")",
    "questions": [
      {
        "q": "Output (both lines, separated by a space) when the user enters 4",
        "a": [
          "2.5 done",
          "2.5, done"
        ]
      },
      {
        "q": "Output when the user enters 0",
        "a": [
          "cannot divide by zero done",
          "cannot divide by zero, done"
        ]
      },
      {
        "q": "Output when the user enters ten",
        "a": [
          "not a whole number done",
          "not a whole number, done"
        ]
      },
      {
        "q": "Which block runs in every case?",
        "a": [
          "finally",
          "the finally block"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• Output (both lines, separated by a space) when the user enters 4 → 2.5 done (accept 2.5, done) [1]\n• Output when the user enters 0 → cannot divide by zero done (accept cannot divide by zero, done) [1]\n• Output when the user enters ten → not a whole number done (accept not a whole number, done) [1]\n• Which block runs in every case? → finally (accept the finally block) [1]"
  },
  {
    "id": "ib_b2_017",
    "unit": "B2",
    "title": "B2.1 Robust integer input",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a program that keeps asking for a whole number until a valid integer is entered. Use try/except to catch the error.\n\n• Prompt: `Enter a whole number: `\n• Each time the input is not an integer, output `Invalid input`\n• When a valid integer is entered, output its square in the form `Square: 49`\n\nExample: inputs `seven`, `7` →\n`Invalid input`\n`Square: 49`",
    "marks": 4,
    "specReference": "B2.1.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "# keep asking until a valid integer is entered\n",
    "solution": "valid = False\nwhile not valid:\n    try:\n        num = int(input(\"Enter a whole number: \"))\n        valid = True\n    except ValueError:\n        print(\"Invalid input\")\nprint(f\"Square: {num * num}\")",
    "tests": [
      {
        "in": [
          "7"
        ],
        "out": "Square: 49",
        "m": 1
      },
      {
        "in": [
          "seven",
          "7"
        ],
        "out": "Invalid input\nSquare: 49",
        "m": 1
      },
      {
        "in": [
          "3.5",
          "",
          "-4"
        ],
        "out": "Invalid input\nInvalid input\nSquare: 16",
        "m": 1
      },
      {
        "in": [
          "x",
          "y",
          "z",
          "10"
        ],
        "out": "Invalid input\nInvalid input\nInvalid input\nSquare: 100",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Loop that repeats until valid [1]\n• int(input()) inside a try block [1]\n• except ValueError outputs Invalid input [1]\n• Square output after loop ends [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Loop that repeats until valid",
        "description": "Loop that repeats until valid",
        "acceptedAnswers": [
          "while"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "int(input()) inside a try block",
        "description": "int(input()) inside a try block",
        "acceptedAnswers": [
          "try:",
          "int(input"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "except ValueError outputs Invalid input",
        "description": "except ValueError outputs Invalid input",
        "acceptedAnswers": [
          "except ValueError",
          "Invalid input"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Square output after loop ends",
        "description": "Square output after loop ends",
        "acceptedAnswers": [
          "Square:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_018",
    "unit": "B2",
    "title": "B2.1 Safe average with finally",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "Write a program that inputs a total number of points and a number of games and outputs the average points per game to 1 decimal place.\n\n• Prompts: `Total points: ` then `Games: `\n• Output `Average: 12.5` when both are valid integers and games is not 0.\n• Output `Numbers only` if either input is not an integer (still read both inputs first).\n• Output `No games played` if games is 0.\n• Whatever happens, finish by outputting `Finished` using a finally block.",
    "marks": 5,
    "specReference": "B2.1.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "total_text = input(\"Total points: \")\ngames_text = input(\"Games: \")\n",
    "solution": "total_text = input(\"Total points: \")\ngames_text = input(\"Games: \")\ntry:\n    avg = int(total_text) / int(games_text)\n    print(f\"Average: {avg:.1f}\")\nexcept ValueError:\n    print(\"Numbers only\")\nexcept ZeroDivisionError:\n    print(\"No games played\")\nfinally:\n    print(\"Finished\")",
    "tests": [
      {
        "in": [
          "125",
          "10"
        ],
        "out": "Average: 12.5\nFinished",
        "m": 1
      },
      {
        "in": [
          "50",
          "0"
        ],
        "out": "No games played\nFinished",
        "m": 1
      },
      {
        "in": [
          "abc",
          "4"
        ],
        "out": "Numbers only\nFinished",
        "m": 1
      },
      {
        "in": [
          "7",
          "3"
        ],
        "out": "Average: 2.3\nFinished",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Conversion and division inside try [1]\n• except ValueError with correct message [1]\n• except ZeroDivisionError with correct message [1]\n• finally block outputs Finished [1]\n• Average formatted to 1 decimal place [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Conversion and division inside try",
        "description": "Conversion and division inside try",
        "acceptedAnswers": [
          "try:",
          "int("
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "except ValueError with correct message",
        "description": "except ValueError with correct message",
        "acceptedAnswers": [
          "except ValueError"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "except ZeroDivisionError with correct message",
        "description": "except ZeroDivisionError with correct message",
        "acceptedAnswers": [
          "except ZeroDivisionError"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "finally block outputs Finished",
        "description": "finally block outputs Finished",
        "acceptedAnswers": [
          "finally:"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Average formatted to 1 decimal place",
        "description": "Average formatted to 1 decimal place",
        "acceptedAnswers": [
          ":.1f"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_019",
    "unit": "B2",
    "title": "B2.1 Role of exception handling",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Explain the role of exception handling in developing robust programs.",
    "marks": 3,
    "specReference": "B2.1.3",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain the role of exception handling in developing robust programs.",
        "keywords": [
          "exception",
          "crash",
          "catch",
          "recover",
          "finally",
          "message"
        ],
        "maxMarks": 3,
        "criteria": [
          "Detects/catches run-time errors (exceptions) instead of letting the program crash",
          "Allows a controlled response, e.g. a helpful message, re-prompting the user, using a default value",
          "finally ensures clean-up code (e.g. closing files/releasing resources) always runs, so data is not lost/corrupted"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Detects/catches run-time errors (exceptions) instead of letting the program crash [1]\n• Allows a controlled response, e.g. a helpful message, re-prompting the user, using a default value [1]\n• finally ensures clean-up code (e.g. closing files/releasing resources) always runs, so data is not lost/corrupted [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Detects/catches run-time errors (exceptions) instead of letting the program crash",
        "description": "Detects/catches run-time errors (exceptions) instead of letting the program crash",
        "acceptedAnswers": [
          "catch",
          "crash",
          "run-time error"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Allows a controlled response, e.g. a helpful message, re-prompting the user, using a default value",
        "description": "Allows a controlled response, e.g. a helpful message, re-prompting the user, using a default value",
        "acceptedAnswers": [
          "message",
          "re-prompt",
          "recover"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "finally ensures clean-up code (e.g. closing files/releasing resources) always runs, so data is not lost/corrupted",
        "description": "finally ensures clean-up code (e.g. closing files/releasing resources) always runs, so data is not lost/corrupted",
        "acceptedAnswers": [
          "finally",
          "close file",
          "clean-up",
          "always runs"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_020",
    "unit": "B2",
    "title": "B2.1 Exceptions in Python (MCQ)",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "mcq",
    "brief": "Choose the correct answer for each question.",
    "marks": 4,
    "specReference": "B2.1.3",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Which exception is raised by int(\"4.5\")?",
        "options": [
          "TypeError",
          "ValueError",
          "ZeroDivisionError",
          "IndexError"
        ],
        "a": 1
      },
      {
        "q": "Which exception is raised by opening a file that does not exist for reading?",
        "options": [
          "FileNotFoundError",
          "KeyError",
          "NameError",
          "ValueError"
        ],
        "a": 0
      },
      {
        "q": "When does the code in a finally block run?",
        "options": [
          "Only if no exception occurs",
          "Only if an exception occurs",
          "Always, whether or not an exception occurs",
          "Only if the except block fails"
        ],
        "a": 2
      },
      {
        "q": "Which error cannot normally be caught by try/except because the program will not start?",
        "options": [
          "Syntax error",
          "ValueError",
          "ZeroDivisionError",
          "IndexError"
        ],
        "a": 0
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: B (ValueError) [1]\n• Q2: A (FileNotFoundError) [1]\n• Q3: C (Always, whether or not an exception occurs) [1]\n• Q4: A (Syntax error) [1]"
  },
  {
    "id": "ib_b2_021",
    "unit": "B2",
    "title": "B2.1 Classify the errors",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "inspect",
    "brief": "The program below should output the average of five numbers entered by the user, but it contains errors.",
    "marks": 4,
    "specReference": "B2.1.4",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "code": "1  total = 0\n2  for i in range(5):\n3      num = int(input(\"Number: \")\n4      total = total + num\n5  average = total / 4\n6  print(average)",
    "questions": [
      {
        "q": "State the line number containing a syntax error.",
        "a": [
          "3",
          "line 3"
        ]
      },
      {
        "q": "State the line number containing a logic error.",
        "a": [
          "5",
          "line 5"
        ]
      },
      {
        "q": "Write the corrected version of line 5.",
        "a": [
          "average = total / 5",
          "average = total/5"
        ]
      },
      {
        "q": "Name the debugging technique of adding extra output lines to show variable values.",
        "a": [
          "print statements",
          "print statement",
          "print debugging",
          "printing variables"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• State the line number containing a syntax error. → 3 (accept line 3) [1]\n• State the line number containing a logic error. → 5 (accept line 5) [1]\n• Write the corrected version of line 5. → average = total / 5 (accept average = total/5) [1]\n• Name the debugging technique of adding extra output lines to show variable values. → print statements (accept print statement, print debugging, printing variables) [1]"
  },
  {
    "id": "ib_b2_022",
    "unit": "B2",
    "title": "B2.1 Breakpoints and stepping",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Describe how a programmer could use breakpoints and step-by-step execution to find a logic error in a loop that produces the wrong total.",
    "marks": 3,
    "specReference": "B2.1.4",
    "commandWord": "Describe",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Describe how a programmer could use breakpoints and step-by-step execution to find a logic error in a loop that produces the wrong total.",
        "keywords": [
          "breakpoint",
          "pause",
          "step",
          "watch",
          "variable",
          "expected"
        ],
        "maxMarks": 3,
        "criteria": [
          "Set a breakpoint on/just before the loop so execution pauses there",
          "Step through one line/iteration at a time",
          "Inspect/watch the values of variables (e.g. total, loop counter) each step and compare with expected values to find where they first go wrong"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Set a breakpoint on/just before the loop so execution pauses there [1]\n• Step through one line/iteration at a time [1]\n• Inspect/watch the values of variables (e.g. total, loop counter) each step and compare with expected values to find where they first go wrong [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Set a breakpoint on/just before the loop so execution pauses there",
        "description": "Set a breakpoint on/just before the loop so execution pauses there",
        "acceptedAnswers": [
          "breakpoint",
          "pause"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Step through one line/iteration at a time",
        "description": "Step through one line/iteration at a time",
        "acceptedAnswers": [
          "step",
          "line by line",
          "one iteration"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Inspect/watch the values of variables (e.g. total, loop counter) each step and compare with expected values to find where they first go wrong",
        "description": "Inspect/watch the values of variables (e.g. total, loop counter) each step and compare with expected values to find where they first go wrong",
        "acceptedAnswers": [
          "watch",
          "inspect variables",
          "compare expected"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_023",
    "unit": "B2",
    "title": "B2.1 Fix the error: highest mark",
    "level": "Fix the error",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "The starter program should input marks until -1 is entered and output the highest mark in the form `Highest: 87`. If no marks are entered (the first input is -1) it should output `Highest: none`. It contains several errors. Debug and correct it.\n\n• Prompt: `Mark: `",
    "marks": 4,
    "specReference": "B2.1.4",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "highest = 0\nmark = int(input(\"Mark: \"))\nwhile mark != -1:\n    if mark < highest:\n        highest = mark\nmark = int(input(\"Mark: \"))\nprint(\"Highest: \" + highest)",
    "solution": "highest = -1\nmark = int(input(\"Mark: \"))\nwhile mark != -1:\n    if mark > highest:\n        highest = mark\n    mark = int(input(\"Mark: \"))\nif highest == -1:\n    print(\"Highest: none\")\nelse:\n    print(\"Highest: \" + str(highest))",
    "tests": [
      {
        "in": [
          "45",
          "87",
          "60",
          "-1"
        ],
        "out": "Highest: 87",
        "m": 1
      },
      {
        "in": [
          "0",
          "-1"
        ],
        "out": "Highest: 0",
        "m": 1
      },
      {
        "in": [
          "-1"
        ],
        "out": "Highest: none",
        "m": 1
      },
      {
        "in": [
          "12",
          "9",
          "30",
          "29",
          "-1"
        ],
        "out": "Highest: 30",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Comparison corrected to mark > highest [1]\n• Second input indented inside the loop (fixes infinite loop) [1]\n• Integer converted with str() for concatenation (or f-string) [1]\n• Case with no marks handled correctly (initial value / check) [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Comparison corrected to mark > highest",
        "description": "Comparison corrected to mark > highest",
        "acceptedAnswers": [
          "mark > highest"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Second input indented inside the loop (fixes infinite loop)",
        "description": "Second input indented inside the loop (fixes infinite loop)",
        "acceptedAnswers": [
          "indent"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Integer converted with str() for concatenation (or f-string)",
        "description": "Integer converted with str() for concatenation (or f-string)",
        "acceptedAnswers": [
          "str(highest)"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Case with no marks handled correctly (initial value / check)",
        "description": "Case with no marks handled correctly (initial value / check)",
        "acceptedAnswers": [
          "none",
          "-1"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_024",
    "unit": "B2",
    "title": "B2.1 Trace table to locate a logic error",
    "level": "Trace table",
    "difficulty": "Hard",
    "type": "table",
    "brief": "This code should count how many of the values are greater than or equal to 50.\n\nvalues = [50, 72, 18, 50]\ncount = 0\nfor i in range(1, len(values)):\n    if values[i] > 50:\n        count = count + 1\nprint(count)\n\nComplete the trace table, then answer in the final row: the correct expected output.",
    "marks": 4,
    "specReference": "B2.1.4",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "i",
        "type": "text"
      },
      {
        "label": "values[i]",
        "type": "text"
      },
      {
        "label": "values[i] > 50",
        "type": "select",
        "options": [
          "True",
          "False"
        ]
      },
      {
        "label": "count",
        "type": "text"
      }
    ],
    "rows": [
      [
        {
          "v": "-",
          "g": true
        },
        {
          "v": "-",
          "g": true
        },
        {
          "v": "-",
          "g": true
        },
        {
          "v": "0",
          "g": true
        }
      ],
      [
        {
          "v": "1"
        },
        {
          "v": "72"
        },
        {
          "v": "True"
        },
        {
          "v": "1"
        }
      ],
      [
        {
          "v": "2"
        },
        {
          "v": "18"
        },
        {
          "v": "False"
        },
        {
          "v": "1"
        }
      ],
      [
        {
          "v": "3"
        },
        {
          "v": "50"
        },
        {
          "v": "False"
        },
        {
          "v": "1"
        }
      ],
      [
        {
          "v": "Output printed",
          "g": true
        },
        {
          "v": "",
          "g": true
        },
        {
          "v": "",
          "g": true
        },
        {
          "v": "1"
        }
      ],
      [
        {
          "v": "Correct output",
          "g": true
        },
        {
          "v": "",
          "g": true
        },
        {
          "v": "",
          "g": true
        },
        {
          "v": "3"
        }
      ]
    ],
    "markScheme": "Award [4] for a fully correct table; marks are awarded in proportion to correct cells (14 cells to complete). Award follow-through for values that are correct given an earlier error.\nErrors to identify in discussion: range should start at 0; condition should be >= 50."
  },
  {
    "id": "ib_b2_025",
    "unit": "B2",
    "title": "B2.2 Compare static and dynamic structures",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Compare static and dynamic data structures.",
    "marks": 4,
    "specReference": "B2.2.1",
    "commandWord": "Compare",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Compare static and dynamic data structures.",
        "keywords": [
          "fixed",
          "size",
          "grow",
          "memory",
          "allocation",
          "flexible",
          "speed"
        ],
        "maxMarks": 4,
        "criteria": [
          "Static: size fixed when created/compiled; memory allocated once (contiguously)",
          "Dynamic: size can grow/shrink at run time; memory allocated/released as needed (e.g. on the heap)",
          "Static may waste memory if not full / cannot exceed capacity, whereas dynamic uses only what is needed (plus pointer/overhead)",
          "Static gives fast direct access/predictable performance; dynamic is more flexible but resizing/allocation can be slower"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Static: size fixed when created/compiled; memory allocated once (contiguously) [1]\n• Dynamic: size can grow/shrink at run time; memory allocated/released as needed (e.g. on the heap) [1]\n• Static may waste memory if not full / cannot exceed capacity, whereas dynamic uses only what is needed (plus pointer/overhead) [1]\n• Static gives fast direct access/predictable performance; dynamic is more flexible but resizing/allocation can be slower [1]\nFor 'Compare', answers should refer to both structures throughout; award a maximum of [2] if only one structure is described.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Static: size fixed when created/compiled; memory allocated once (contiguously)",
        "description": "Static: size fixed when created/compiled; memory allocated once (contiguously)",
        "acceptedAnswers": [
          "fixed size",
          "allocated at compile",
          "contiguous"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Dynamic: size can grow/shrink at run time; memory allocated/released as needed (e.g. on the heap)",
        "description": "Dynamic: size can grow/shrink at run time; memory allocated/released as needed (e.g. on the heap)",
        "acceptedAnswers": [
          "grow",
          "shrink",
          "run time",
          "heap"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Static may waste memory if not full / cannot exceed capacity, whereas dynamic uses only what is needed (plus pointer/overhead)",
        "description": "Static may waste memory if not full / cannot exceed capacity, whereas dynamic uses only what is needed (plus pointer/overhead)",
        "acceptedAnswers": [
          "waste memory",
          "overflow",
          "overhead"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Static gives fast direct access/predictable performance; dynamic is more flexible but resizing/allocation can be slower",
        "description": "Static gives fast direct access/predictable performance; dynamic is more flexible but resizing/allocation can be slower",
        "acceptedAnswers": [
          "faster access",
          "predictable",
          "flexible",
          "resizing slower"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_026",
    "unit": "B2",
    "title": "B2.2 Static or dynamic? (MCQ)",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "mcq",
    "brief": "Choose the correct answer.",
    "marks": 3,
    "specReference": "B2.2.1",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Which describes a static data structure?",
        "options": [
          "Its size can change while the program runs",
          "Its size is fixed when it is created",
          "It must store strings only",
          "It cannot be indexed"
        ],
        "a": 1
      },
      {
        "q": "A program stores exactly 7 daily temperatures for one week. Which is most suitable?",
        "options": [
          "A static array of size 7",
          "A dynamic linked structure",
          "A queue",
          "A stack"
        ],
        "a": 0
      },
      {
        "q": "What is a disadvantage of a dynamic data structure?",
        "options": [
          "It can never grow",
          "Extra memory/time overhead for allocation and resizing",
          "It always wastes unused space",
          "It cannot store integers"
        ],
        "a": 1
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: B (Its size is fixed when it is created) [1]\n• Q2: A (A static array of size 7) [1]\n• Q3: B (Extra memory/time overhead for allocation and resizing) [1]"
  },
  {
    "id": "ib_b2_027",
    "unit": "B2",
    "title": "B2.2 Choosing a structure for a scenario",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A weather station records exactly one reading per hour for 24 hours. A messaging app stores the messages in a chat, which can grow without limit.\n\nExplain which type of data structure (static or dynamic) is more suitable for each scenario.",
    "marks": 4,
    "specReference": "B2.2.1",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain which type of data structure (static or dynamic) is more suitable for each scenario.",
        "keywords": [
          "static",
          "fixed",
          "24",
          "dynamic",
          "grow",
          "unknown"
        ],
        "maxMarks": 4,
        "criteria": [
          "Weather station: static array",
          "Reason: number of items known/fixed (24), so no wasted space and fast indexed access by hour",
          "Messaging app: dynamic structure (e.g. Python list/ArrayList/linked list)",
          "Reason: number of messages unknown and grows, so memory allocated as needed / no overflow"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Weather station: static array [1]\n• Reason: number of items known/fixed (24), so no wasted space and fast indexed access by hour [1]\n• Messaging app: dynamic structure (e.g. Python list/ArrayList/linked list) [1]\n• Reason: number of messages unknown and grows, so memory allocated as needed / no overflow [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Weather station: static array",
        "description": "Weather station: static array",
        "acceptedAnswers": [
          "static",
          "array"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Reason: number of items known/fixed (24), so no wasted space and fast indexed access by hour",
        "description": "Reason: number of items known/fixed (24), so no wasted space and fast indexed access by hour",
        "acceptedAnswers": [
          "24",
          "fixed",
          "known in advance",
          "index by hour"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Messaging app: dynamic structure (e.g. Python list/ArrayList/linked list)",
        "description": "Messaging app: dynamic structure (e.g. Python list/ArrayList/linked list)",
        "acceptedAnswers": [
          "dynamic",
          "list"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Reason: number of messages unknown and grows, so memory allocated as needed / no overflow",
        "description": "Reason: number of messages unknown and grows, so memory allocated as needed / no overflow",
        "acceptedAnswers": [
          "unknown",
          "grows",
          "no overflow",
          "as needed"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_028",
    "unit": "B2",
    "title": "B2.2 List operations",
    "level": "Core",
    "difficulty": "Easy",
    "type": "inspect",
    "brief": "Study the code. State the output of each numbered print statement.",
    "marks": 5,
    "specReference": "B2.2.2",
    "commandWord": "State",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "code": "nums = [3, 8, 5]\nnums.append(10)\nprint(nums)           #1\nnums.insert(1, 1)\nprint(nums)           #2\nlast = nums.pop()\nprint(last)           #3\nnums.remove(8)\nprint(nums)           #4\nprint(len(nums))      #5",
    "questions": [
      {
        "q": "print #1",
        "a": [
          "[3, 8, 5, 10]"
        ]
      },
      {
        "q": "print #2",
        "a": [
          "[3, 1, 8, 5, 10]"
        ]
      },
      {
        "q": "print #3",
        "a": [
          "10"
        ]
      },
      {
        "q": "print #4",
        "a": [
          "[3, 1, 5]"
        ]
      },
      {
        "q": "print #5",
        "a": [
          "3"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [5]):\n• print #1 → [3, 8, 5, 10] [1]\n• print #2 → [3, 1, 8, 5, 10] [1]\n• print #3 → 10 [1]\n• print #4 → [3, 1, 5] [1]\n• print #5 → 3 [1]"
  },
  {
    "id": "ib_b2_029",
    "unit": "B2",
    "title": "B2.2 Statistics from a list",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a program that inputs how many values there are, then inputs each value (integers) into a list. Output the largest, smallest and mean value. Do NOT use the built-in max(), min() or sum() functions; traverse the list.\n\n• Prompts: `How many: ` then `Value: ` for each value\n• Output (mean to 2 decimal places):\n`Largest: 9`\n`Smallest: 2`\n`Mean: 5.25`",
    "marks": 5,
    "specReference": "B2.2.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "count = int(input(\"How many: \"))\nvalues = []\n",
    "solution": "count = int(input(\"How many: \"))\nvalues = []\nfor i in range(count):\n    values.append(int(input(\"Value: \")))\nlargest = values[0]\nsmallest = values[0]\ntotal = 0\nfor v in values:\n    if v > largest:\n        largest = v\n    if v < smallest:\n        smallest = v\n    total = total + v\nprint(f\"Largest: {largest}\")\nprint(f\"Smallest: {smallest}\")\nprint(f\"Mean: {total / count:.2f}\")",
    "tests": [
      {
        "in": [
          "4",
          "5",
          "9",
          "2",
          "5"
        ],
        "out": "Largest: 9\nSmallest: 2\nMean: 5.25",
        "m": 2
      },
      {
        "in": [
          "1",
          "7"
        ],
        "out": "Largest: 7\nSmallest: 7\nMean: 7.00",
        "m": 1
      },
      {
        "in": [
          "3",
          "-4",
          "-1",
          "-9"
        ],
        "out": "Largest: -1\nSmallest: -9\nMean: -4.67",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Values appended to a list in a counted loop [1]\n• Largest and smallest initialised from first element [1]\n• Traversal updating largest and smallest [1]\n• Running total accumulated [1]\n• Correct outputs with mean to 2 d.p. [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Values appended to a list in a counted loop",
        "description": "Values appended to a list in a counted loop",
        "acceptedAnswers": [
          "append"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Largest and smallest initialised from first element",
        "description": "Largest and smallest initialised from first element",
        "acceptedAnswers": [
          "values[0]"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Traversal updating largest and smallest",
        "description": "Traversal updating largest and smallest",
        "acceptedAnswers": [
          "if v > largest",
          "if v < smallest"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Running total accumulated",
        "description": "Running total accumulated",
        "acceptedAnswers": [
          "total = total + v"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Correct outputs with mean to 2 d.p.",
        "description": "Correct outputs with mean to 2 d.p.",
        "acceptedAnswers": [
          ":.2f"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_030",
    "unit": "B2",
    "title": "B2.2 Remove all occurrences",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "A list of product codes is entered as one line separated by commas. Write a program that removes every occurrence of a code chosen by the user and outputs the remaining list and how many items were removed.\n\n• Prompts: `Codes: ` then `Remove: `\n• Output example:\n`['A1', 'C3']`\n`Removed: 2`\n\nExample: `A1,B2,C3,B2`, `B2`",
    "marks": 4,
    "specReference": "B2.2.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "codes = input(\"Codes: \").split(\",\")\ntarget = input(\"Remove: \")\n",
    "solution": "codes = input(\"Codes: \").split(\",\")\ntarget = input(\"Remove: \")\nremoved = 0\nwhile target in codes:\n    codes.remove(target)\n    removed = removed + 1\nprint(codes)\nprint(f\"Removed: {removed}\")",
    "tests": [
      {
        "in": [
          "A1,B2,C3,B2",
          "B2"
        ],
        "out": "['A1', 'C3']\nRemoved: 2",
        "m": 1
      },
      {
        "in": [
          "X,X,X",
          "X"
        ],
        "out": "[]\nRemoved: 3",
        "m": 1
      },
      {
        "in": [
          "P1,P2",
          "Q9"
        ],
        "out": "['P1', 'P2']\nRemoved: 0",
        "m": 1
      },
      {
        "in": [
          "K,L,K,M,K",
          "K"
        ],
        "out": "['L', 'M']\nRemoved: 3",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Input split into a list [1]\n• Loop that removes every occurrence (not just the first) [1]\n• Count of removed items maintained [1]\n• Both outputs in the required format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Input split into a list",
        "description": "Input split into a list",
        "acceptedAnswers": [
          ".split(\",\")"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Loop that removes every occurrence (not just the first)",
        "description": "Loop that removes every occurrence (not just the first)",
        "acceptedAnswers": [
          "while target in",
          "remove"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Count of removed items maintained",
        "description": "Count of removed items maintained",
        "acceptedAnswers": [
          "removed + 1"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Both outputs in the required format",
        "description": "Both outputs in the required format",
        "acceptedAnswers": [
          "print(codes)",
          "Removed:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_031",
    "unit": "B2",
    "title": "B2.2 2D list: cinema seating",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "A small cinema has 3 rows of 4 seats stored as a 2D list where 1 means booked and 0 means free:\n\nseats = [[1, 0, 1, 1],\n         [0, 0, 0, 1],\n         [1, 1, 1, 1]]\n\nWrite a program that inputs a row number and seat number (both starting at 1). If that seat is free, book it (set it to 1) and output `Booked`; otherwise output `Taken`. Then output the number of free seats left in each row, one row per line.\n\n• Prompts: `Row: ` then `Seat: `\n• Output example for row 2, seat 1:\n`Booked`\n`Row 1: 1 free`\n`Row 2: 2 free`\n`Row 3: 0 free`",
    "marks": 5,
    "specReference": "B2.2.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "seats = [[1, 0, 1, 1],\n         [0, 0, 0, 1],\n         [1, 1, 1, 1]]\nrow = int(input(\"Row: \"))\nseat = int(input(\"Seat: \"))\n",
    "solution": "seats = [[1, 0, 1, 1],\n         [0, 0, 0, 1],\n         [1, 1, 1, 1]]\nrow = int(input(\"Row: \"))\nseat = int(input(\"Seat: \"))\nif seats[row - 1][seat - 1] == 0:\n    seats[row - 1][seat - 1] = 1\n    print(\"Booked\")\nelse:\n    print(\"Taken\")\nfor r in range(len(seats)):\n    free = 0\n    for s in range(len(seats[r])):\n        if seats[r][s] == 0:\n            free = free + 1\n    print(f\"Row {r + 1}: {free} free\")",
    "tests": [
      {
        "in": [
          "2",
          "1"
        ],
        "out": "Booked\nRow 1: 1 free\nRow 2: 2 free\nRow 3: 0 free",
        "m": 2
      },
      {
        "in": [
          "3",
          "4"
        ],
        "out": "Taken\nRow 1: 1 free\nRow 2: 3 free\nRow 3: 0 free",
        "m": 1
      },
      {
        "in": [
          "1",
          "2"
        ],
        "out": "Booked\nRow 1: 0 free\nRow 2: 3 free\nRow 3: 0 free",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Access element with [row - 1][seat - 1] [1]\n• Check free and update to 1 [1]\n• Correct Booked/Taken output [1]\n• Nested loop over rows and seats [1]\n• Free count reset per row and output in required format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Access element with [row - 1][seat - 1]",
        "description": "Access element with [row - 1][seat - 1]",
        "acceptedAnswers": [
          "[row - 1][seat - 1]"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Check free and update to 1",
        "description": "Check free and update to 1",
        "acceptedAnswers": [
          "== 0",
          "= 1"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Correct Booked/Taken output",
        "description": "Correct Booked/Taken output",
        "acceptedAnswers": [
          "Booked",
          "Taken"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Nested loop over rows and seats",
        "description": "Nested loop over rows and seats",
        "acceptedAnswers": [
          "for r",
          "for s"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Free count reset per row and output in required format",
        "description": "Free count reset per row and output in required format",
        "acceptedAnswers": [
          "free = 0",
          "Row"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_032",
    "unit": "B2",
    "title": "B2.2 2D list: best subject column",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "Marks for 3 students in 4 subjects are stored in a 2D list. Write a program that inputs 3 lines, each containing 4 integers separated by spaces (one line per student), stores them in a 2D list and outputs the subject number (1-4) with the highest total and that total. If totals are equal, choose the lowest subject number.\n\n• Prompt for each line: `Marks: `\n• Output example: `Subject 2 total 245`",
    "marks": 5,
    "specReference": "B2.2.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "marks = []\nfor i in range(3):\n    line = input(\"Marks: \")\n",
    "solution": "marks = []\nfor i in range(3):\n    line = input(\"Marks: \")\n    row = []\n    for part in line.split():\n        row.append(int(part))\n    marks.append(row)\nbest = 0\nbest_total = -1\nfor col in range(4):\n    total = 0\n    for r in range(3):\n        total = total + marks[r][col]\n    if total > best_total:\n        best_total = total\n        best = col\nprint(f\"Subject {best + 1} total {best_total}\")",
    "tests": [
      {
        "in": [
          "70 80 60 50",
          "65 85 70 55",
          "60 80 75 40"
        ],
        "out": "Subject 2 total 245",
        "m": 2
      },
      {
        "in": [
          "10 10 10 10",
          "10 10 10 10",
          "10 10 10 10"
        ],
        "out": "Subject 1 total 30",
        "m": 1
      },
      {
        "in": [
          "1 2 3 99",
          "1 2 3 4",
          "1 2 3 4"
        ],
        "out": "Subject 4 total 107",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Each line split and converted into a row of integers [1]\n• Rows appended to build a 2D list [1]\n• Outer loop over columns, inner loop over rows [1]\n• Track highest total and its column (strict > keeps lowest on ties) [1]\n• Output subject number (1-based) and total [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Each line split and converted into a row of integers",
        "description": "Each line split and converted into a row of integers",
        "acceptedAnswers": [
          "split()",
          "int("
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Rows appended to build a 2D list",
        "description": "Rows appended to build a 2D list",
        "acceptedAnswers": [
          "marks.append(row)"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Outer loop over columns, inner loop over rows",
        "description": "Outer loop over columns, inner loop over rows",
        "acceptedAnswers": [
          "for col",
          "marks[r][col]"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Track highest total and its column (strict > keeps lowest on ties)",
        "description": "Track highest total and its column (strict > keeps lowest on ties)",
        "acceptedAnswers": [
          "> best_total"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Output subject number (1-based) and total",
        "description": "Output subject number (1-based) and total",
        "acceptedAnswers": [
          "best + 1"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_033",
    "unit": "B2",
    "title": "B2.2 Dice frequency count",
    "level": "Core",
    "difficulty": "Easy",
    "type": "code",
    "brief": "Write a program that inputs a series of dice rolls (1-6) as one line of digits separated by spaces, counts how many times each face appeared using a list of 6 counters, and outputs each face with its count.\n\n• Prompt: `Rolls: `\n• Output one line per face, e.g. `1: 2`, `2: 0`, ... `6: 1`",
    "marks": 4,
    "specReference": "B2.2.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "rolls = input(\"Rolls: \").split()\ncounts = [0] * 6\n",
    "solution": "rolls = input(\"Rolls: \").split()\ncounts = [0] * 6\nfor r in rolls:\n    counts[int(r) - 1] = counts[int(r) - 1] + 1\nfor face in range(6):\n    print(f\"Face {face + 1} count {counts[face]}\")",
    "tests": [
      {
        "in": [
          "1 6 1 3"
        ],
        "out": "Face 1 count 2\nFace 2 count 0\nFace 3 count 1\nFace 4 count 0\nFace 5 count 0\nFace 6 count 1",
        "m": 1
      },
      {
        "in": [
          "6 6 6 6 6"
        ],
        "out": "Face 1 count 0\nFace 2 count 0\nFace 3 count 0\nFace 4 count 0\nFace 5 count 0\nFace 6 count 5",
        "m": 1
      },
      {
        "in": [
          "2 3 4 5 1 6 2"
        ],
        "out": "Face 1 count 1\nFace 2 count 2\nFace 3 count 1\nFace 4 count 1\nFace 5 count 1\nFace 6 count 1",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• List of six counters initialised to 0 [1]\n• Roll used as index (minus 1) [1]\n• Counter incremented [1]\n• All six faces output in order [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "List of six counters initialised to 0",
        "description": "List of six counters initialised to 0",
        "acceptedAnswers": [
          "[0] * 6"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Roll used as index (minus 1)",
        "description": "Roll used as index (minus 1)",
        "acceptedAnswers": [
          "int(r) - 1"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Counter incremented",
        "description": "Counter incremented",
        "acceptedAnswers": [
          "+ 1"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "All six faces output in order",
        "description": "All six faces output in order",
        "acceptedAnswers": [
          "for face in range(6)"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_034",
    "unit": "B2",
    "title": "B2.2 Trace a list traversal",
    "level": "Trace table",
    "difficulty": "Moderate",
    "type": "table",
    "brief": "Trace the code below. Each row shows the values at the end of one iteration of the for loop.\n\ndata = [4, 7, 2, 9, 3]\nrunning = 0\nfor i in range(len(data)):\n    if data[i] % 2 == 1:\n        running = running + data[i]\n    else:\n        data[i] = 0\nprint(data, running)",
    "marks": 5,
    "specReference": "B2.2.2",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "i",
        "type": "text"
      },
      {
        "label": "data[i]",
        "type": "text"
      },
      {
        "label": "running",
        "type": "text"
      }
    ],
    "rows": [
      [
        {
          "v": "0"
        },
        {
          "v": "0"
        },
        {
          "v": "0"
        }
      ],
      [
        {
          "v": "1"
        },
        {
          "v": "7"
        },
        {
          "v": "7"
        }
      ],
      [
        {
          "v": "2"
        },
        {
          "v": "0"
        },
        {
          "v": "7"
        }
      ],
      [
        {
          "v": "3"
        },
        {
          "v": "9"
        },
        {
          "v": "16"
        }
      ],
      [
        {
          "v": "4"
        },
        {
          "v": "3"
        },
        {
          "v": "19"
        }
      ],
      [
        {
          "v": "Final data",
          "g": true
        },
        {
          "v": "[0, 7, 0, 9, 3]"
        },
        {
          "v": "",
          "g": true
        }
      ]
    ],
    "markScheme": "Award [5] for a fully correct table; marks are awarded in proportion to correct cells (16 cells to complete). Award follow-through for values that are correct given an earlier error.\nOutput: [0, 7, 0, 9, 3] 19"
  },
  {
    "id": "ib_b2_035",
    "unit": "B2",
    "title": "B2.2 Stack operations",
    "level": "Core",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Explain how a stack operates as a last in, first out (LIFO) data structure, referring to the operations push, pop, peek and isEmpty.",
    "marks": 4,
    "specReference": "B2.2.3",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain how a stack operates as a last in, first out (LIFO) data structure, referring to the operations push, pop, peek and isEmpty.",
        "keywords": [
          "push",
          "pop",
          "peek",
          "isEmpty",
          "top",
          "last in first out"
        ],
        "maxMarks": 4,
        "criteria": [
          "push adds an item to the top of the stack",
          "pop removes and returns the item at the top - the most recently added (LIFO)",
          "peek returns the top item without removing it",
          "isEmpty returns True if there are no items, checked before pop/peek to avoid underflow"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• push adds an item to the top of the stack [1]\n• pop removes and returns the item at the top - the most recently added (LIFO) [1]\n• peek returns the top item without removing it [1]\n• isEmpty returns True if there are no items, checked before pop/peek to avoid underflow [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "push adds an item to the top of the stack",
        "description": "push adds an item to the top of the stack",
        "acceptedAnswers": [
          "push",
          "top",
          "add"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "pop removes and returns the item at the top - the most recently added (LIFO)",
        "description": "pop removes and returns the item at the top - the most recently added (LIFO)",
        "acceptedAnswers": [
          "pop",
          "removes top",
          "most recent"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "peek returns the top item without removing it",
        "description": "peek returns the top item without removing it",
        "acceptedAnswers": [
          "peek",
          "without removing"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "isEmpty returns True if there are no items, checked before pop/peek to avoid underflow",
        "description": "isEmpty returns True if there are no items, checked before pop/peek to avoid underflow",
        "acceptedAnswers": [
          "isEmpty",
          "underflow",
          "no items"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_036",
    "unit": "B2",
    "title": "B2.2 Trace stack operations",
    "level": "Core",
    "difficulty": "Easy",
    "type": "inspect",
    "brief": "A stack is initially empty. The following operations are carried out in order:\n\npush(4), push(9), push(2), pop(), push(7), peek(), pop(), pop(), push(5)\n\nAnswer the questions.",
    "marks": 5,
    "specReference": "B2.2.3",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Value returned by the first pop()",
        "a": [
          "2"
        ]
      },
      {
        "q": "Value returned by peek()",
        "a": [
          "7"
        ]
      },
      {
        "q": "Value returned by the third pop()",
        "a": [
          "9"
        ]
      },
      {
        "q": "Contents of the stack at the end, bottom to top (comma separated)",
        "a": [
          "4, 5",
          "4,5",
          "[4, 5]"
        ]
      },
      {
        "q": "Value returned by isEmpty() at the end",
        "a": [
          "false"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [5]):\n• Value returned by the first pop() → 2 [1]\n• Value returned by peek() → 7 [1]\n• Value returned by the third pop() → 9 [1]\n• Contents of the stack at the end, bottom to top (comma separated) → 4, 5 (accept 4,5, [4, 5]) [1]\n• Value returned by isEmpty() at the end → false [1]"
  },
  {
    "id": "ib_b2_037",
    "unit": "B2",
    "title": "B2.2 Reverse a string with a stack",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a program that reverses a word using a stack implemented with a Python list. Write functions push(stack, item), pop(stack) and is_empty(stack). Push every character, then pop until the stack is empty.\n\n• Prompt: `Word: `\n• Output example: `Reversed: tupmoc`",
    "marks": 4,
    "specReference": "B2.2.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "def push(stack, item):\n    pass\n\ndef pop(stack):\n    pass\n\ndef is_empty(stack):\n    pass\n\nword = input(\"Word: \")\n",
    "solution": "def push(stack, item):\n    stack.append(item)\n\ndef pop(stack):\n    return stack.pop()\n\ndef is_empty(stack):\n    return len(stack) == 0\n\nword = input(\"Word: \")\nstack = []\nfor ch in word:\n    push(stack, ch)\nresult = \"\"\nwhile not is_empty(stack):\n    result = result + pop(stack)\nprint(\"Reversed: \" + result)",
    "tests": [
      {
        "in": [
          "computer"
        ],
        "out": "Reversed: retupmoc",
        "m": 1
      },
      {
        "in": [
          "a"
        ],
        "out": "Reversed: a",
        "m": 1
      },
      {
        "in": [
          "level"
        ],
        "out": "Reversed: level",
        "m": 1
      },
      {
        "in": [
          "Stack123"
        ],
        "out": "Reversed: 321kcatS",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• push appends to the top (end of list) [1]\n• pop removes and returns the top item [1]\n• is_empty returns a Boolean [1]\n• Characters pushed then popped until empty to build result [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "push appends to the top (end of list)",
        "description": "push appends to the top (end of list)",
        "acceptedAnswers": [
          "append"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "pop removes and returns the top item",
        "description": "pop removes and returns the top item",
        "acceptedAnswers": [
          "return stack.pop()"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "is_empty returns a Boolean",
        "description": "is_empty returns a Boolean",
        "acceptedAnswers": [
          "len(stack) == 0"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Characters pushed then popped until empty to build result",
        "description": "Characters pushed then popped until empty to build result",
        "acceptedAnswers": [
          "while not is_empty"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_038",
    "unit": "B2",
    "title": "B2.2 Bracket matching with a stack",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "A code editor checks whether brackets are balanced. Write a program that uses a stack to check the brackets (), [] and {} in a line of text. Other characters are ignored.\n\n• Prompt: `Expression: `\n• Output `Balanced` or `Not balanced`\n\nExamples: `{a[1](b)}` → `Balanced`; `(]` → `Not balanced`; `((` → `Not balanced`",
    "marks": 6,
    "specReference": "B2.2.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "expr = input(\"Expression: \")\nstack = []\n",
    "solution": "expr = input(\"Expression: \")\nstack = []\npairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\nok = True\nfor ch in expr:\n    if ch in \"([{\":\n        stack.append(ch)\n    elif ch in \")]}\":\n        if len(stack) == 0 or stack.pop() != pairs[ch]:\n            ok = False\nif ok and len(stack) == 0:\n    print(\"Balanced\")\nelse:\n    print(\"Not balanced\")",
    "tests": [
      {
        "in": [
          "{a[1](b)}"
        ],
        "out": "Balanced",
        "m": 1
      },
      {
        "in": [
          "(]"
        ],
        "out": "Not balanced",
        "m": 1
      },
      {
        "in": [
          "(("
        ],
        "out": "Not balanced",
        "m": 1
      },
      {
        "in": [
          "x = (a + b) * [c - {d}]"
        ],
        "out": "Balanced",
        "m": 1
      },
      {
        "in": [
          "())("
        ],
        "out": "Not balanced",
        "m": 1
      },
      {
        "in": [
          "no brackets"
        ],
        "out": "Balanced",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [6]:\n• Opening brackets pushed [1]\n• Closing bracket: check stack not empty [1]\n• Pop and compare with matching opening bracket [1]\n• Mismatch sets flag to not balanced [1]\n• Stack must be empty at the end [1]\n• Correct output messages [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Opening brackets pushed",
        "description": "Opening brackets pushed",
        "acceptedAnswers": [
          "append"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Closing bracket: check stack not empty",
        "description": "Closing bracket: check stack not empty",
        "acceptedAnswers": [
          "len(stack) == 0"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Pop and compare with matching opening bracket",
        "description": "Pop and compare with matching opening bracket",
        "acceptedAnswers": [
          "stack.pop()",
          "pairs"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Mismatch sets flag to not balanced",
        "description": "Mismatch sets flag to not balanced",
        "acceptedAnswers": [
          "ok = False"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Stack must be empty at the end",
        "description": "Stack must be empty at the end",
        "acceptedAnswers": [
          "len(stack) == 0"
        ]
      },
      {
        "id": "MP6",
        "marks": 1,
        "criterion": "Correct output messages",
        "description": "Correct output messages",
        "acceptedAnswers": [
          "Balanced",
          "Not balanced"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_039",
    "unit": "B2",
    "title": "B2.2 Stack command processor",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "Write a program that processes stack commands until END is entered. Commands:\n• `PUSH x` - push the integer x\n• `POP` - output the popped value, or `Empty` if the stack is empty\n• `PEEK` - output the top value, or `Empty`\n• `END` - output `Size: n` (number of items left) and stop\n\nPrompt for each command: `Command: `",
    "marks": 5,
    "specReference": "B2.2.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "stack = []\ncommand = input(\"Command: \")\n",
    "solution": "stack = []\ncommand = input(\"Command: \")\nwhile command != \"END\":\n    parts = command.split()\n    if parts[0] == \"PUSH\":\n        stack.append(int(parts[1]))\n    elif parts[0] == \"POP\":\n        if len(stack) == 0:\n            print(\"Empty\")\n        else:\n            print(stack.pop())\n    elif parts[0] == \"PEEK\":\n        if len(stack) == 0:\n            print(\"Empty\")\n        else:\n            print(stack[-1])\n    command = input(\"Command: \")\nprint(f\"Size: {len(stack)}\")",
    "tests": [
      {
        "in": [
          "PUSH 3",
          "PUSH 8",
          "PEEK",
          "POP",
          "POP",
          "POP",
          "END"
        ],
        "out": "8\n8\n3\nEmpty\nSize: 0",
        "m": 2
      },
      {
        "in": [
          "END"
        ],
        "out": "Size: 0",
        "m": 1
      },
      {
        "in": [
          "PUSH 1",
          "PUSH 2",
          "PUSH 3",
          "POP",
          "END"
        ],
        "out": "3\nSize: 2",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Loop until END [1]\n• PUSH splits command and appends integer [1]\n• POP removes and outputs top value [1]\n• PEEK outputs top without removing [1]\n• Empty checks before POP/PEEK and final size output [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Loop until END",
        "description": "Loop until END",
        "acceptedAnswers": [
          "while command != \"END\""
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "PUSH splits command and appends integer",
        "description": "PUSH splits command and appends integer",
        "acceptedAnswers": [
          "split()",
          "append(int"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "POP removes and outputs top value",
        "description": "POP removes and outputs top value",
        "acceptedAnswers": [
          "stack.pop()"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "PEEK outputs top without removing",
        "description": "PEEK outputs top without removing",
        "acceptedAnswers": [
          "stack[-1]"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Empty checks before POP/PEEK and final size output",
        "description": "Empty checks before POP/PEEK and final size output",
        "acceptedAnswers": [
          "Empty",
          "Size:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_040",
    "unit": "B2",
    "title": "B2.2 Stacks: uses and performance",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A drawing program provides an \"undo\" feature.\n\nExplain why a stack is an appropriate data structure for this feature, and how stack operations affect performance and memory usage.",
    "marks": 4,
    "specReference": "B2.2.3",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain why a stack is an appropriate data structure for this feature, and how stack operations affect performance and memory usage.",
        "keywords": [
          "push",
          "pop",
          "undo",
          "LIFO",
          "O(1)",
          "memory",
          "overflow"
        ],
        "maxMarks": 4,
        "criteria": [
          "Each action is pushed as it happens; undo pops the most recent action first (LIFO matches undo order)",
          "Example: drawing line then circle; undo removes circle first",
          "push/pop/peek only touch the top so take constant time O(1)",
          "Memory grows with each stored action; a limit on undo history/stack overflow must be managed"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Each action is pushed as it happens; undo pops the most recent action first (LIFO matches undo order) [1]\n• Example: drawing line then circle; undo removes circle first [1]\n• push/pop/peek only touch the top so take constant time O(1) [1]\n• Memory grows with each stored action; a limit on undo history/stack overflow must be managed [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Each action is pushed as it happens; undo pops the most recent action first (LIFO matches undo order)",
        "description": "Each action is pushed as it happens; undo pops the most recent action first (LIFO matches undo order)",
        "acceptedAnswers": [
          "push action",
          "pop",
          "most recent",
          "LIFO"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Example: drawing line then circle; undo removes circle first",
        "description": "Example: drawing line then circle; undo removes circle first",
        "acceptedAnswers": [
          "circle first",
          "reverse order"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "push/pop/peek only touch the top so take constant time O(1)",
        "description": "push/pop/peek only touch the top so take constant time O(1)",
        "acceptedAnswers": [
          "O(1)",
          "constant time"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Memory grows with each stored action; a limit on undo history/stack overflow must be managed",
        "description": "Memory grows with each stored action; a limit on undo history/stack overflow must be managed",
        "acceptedAnswers": [
          "memory grows",
          "limit",
          "overflow",
          "history"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_041",
    "unit": "B2",
    "title": "B2.2 Queue operations",
    "level": "Core",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Explain how a queue operates as a first in, first out (FIFO) data structure, referring to enqueue, dequeue, front and isEmpty.",
    "marks": 4,
    "specReference": "B2.2.4",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain how a queue operates as a first in, first out (FIFO) data structure, referring to enqueue, dequeue, front and isEmpty.",
        "keywords": [
          "enqueue",
          "dequeue",
          "front",
          "rear",
          "isEmpty",
          "first in first out"
        ],
        "maxMarks": 4,
        "criteria": [
          "enqueue adds an item at the rear/back of the queue",
          "dequeue removes and returns the item at the front - the one that has waited longest (FIFO)",
          "front returns the front item without removing it",
          "isEmpty returns True when the queue has no items; checked before dequeue to avoid underflow"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• enqueue adds an item at the rear/back of the queue [1]\n• dequeue removes and returns the item at the front - the one that has waited longest (FIFO) [1]\n• front returns the front item without removing it [1]\n• isEmpty returns True when the queue has no items; checked before dequeue to avoid underflow [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "enqueue adds an item at the rear/back of the queue",
        "description": "enqueue adds an item at the rear/back of the queue",
        "acceptedAnswers": [
          "enqueue",
          "rear",
          "back"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "dequeue removes and returns the item at the front - the one that has waited longest (FIFO)",
        "description": "dequeue removes and returns the item at the front - the one that has waited longest (FIFO)",
        "acceptedAnswers": [
          "dequeue",
          "front",
          "first added"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "front returns the front item without removing it",
        "description": "front returns the front item without removing it",
        "acceptedAnswers": [
          "front",
          "without removing"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "isEmpty returns True when the queue has no items; checked before dequeue to avoid underflow",
        "description": "isEmpty returns True when the queue has no items; checked before dequeue to avoid underflow",
        "acceptedAnswers": [
          "isEmpty",
          "underflow"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_042",
    "unit": "B2",
    "title": "B2.2 Trace queue operations",
    "level": "Core",
    "difficulty": "Easy",
    "type": "inspect",
    "brief": "A queue is initially empty. The operations below are carried out in order:\n\nenqueue(\"A\"), enqueue(\"B\"), enqueue(\"C\"), dequeue(), enqueue(\"D\"), front(), dequeue(), enqueue(\"E\")\n\nAnswer the questions.",
    "marks": 4,
    "specReference": "B2.2.4",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Value returned by the first dequeue()",
        "a": [
          "A"
        ]
      },
      {
        "q": "Value returned by front()",
        "a": [
          "B"
        ]
      },
      {
        "q": "Value returned by the second dequeue()",
        "a": [
          "B"
        ]
      },
      {
        "q": "Contents of the queue at the end, front to rear (comma separated)",
        "a": [
          "C, D, E",
          "C,D,E",
          "CDE"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• Value returned by the first dequeue() → A [1]\n• Value returned by front() → B [1]\n• Value returned by the second dequeue() → B [1]\n• Contents of the queue at the end, front to rear (comma separated) → C, D, E (accept C,D,E, CDE) [1]"
  },
  {
    "id": "ib_b2_043",
    "unit": "B2",
    "title": "B2.2 Print queue simulation",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "A shared printer holds jobs in a queue. Write a program that processes commands until `STOP` is entered:\n• `ADD name` - enqueue the job name and output `Queued: name`\n• `PRINT` - dequeue the front job and output `Printing: name`, or output `No jobs` if the queue is empty\n• `STOP` - output `Waiting: n` where n is the number of jobs still in the queue\n\nPrompt for each command: `Command: `",
    "marks": 5,
    "specReference": "B2.2.4",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "queue = []\ncommand = input(\"Command: \")\n",
    "solution": "queue = []\ncommand = input(\"Command: \")\nwhile command != \"STOP\":\n    if command.startswith(\"ADD \"):\n        name = command[4:]\n        queue.append(name)\n        print(\"Queued: \" + name)\n    elif command == \"PRINT\":\n        if len(queue) == 0:\n            print(\"No jobs\")\n        else:\n            print(\"Printing: \" + queue.pop(0))\n    command = input(\"Command: \")\nprint(f\"Waiting: {len(queue)}\")",
    "tests": [
      {
        "in": [
          "ADD report",
          "ADD poster",
          "PRINT",
          "ADD essay",
          "PRINT",
          "STOP"
        ],
        "out": "Queued: report\nQueued: poster\nPrinting: report\nQueued: essay\nPrinting: poster\nWaiting: 1",
        "m": 2
      },
      {
        "in": [
          "PRINT",
          "STOP"
        ],
        "out": "No jobs\nWaiting: 0",
        "m": 1
      },
      {
        "in": [
          "ADD a",
          "ADD b",
          "ADD c",
          "STOP"
        ],
        "out": "Queued: a\nQueued: b\nQueued: c\nWaiting: 3",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Loop until STOP [1]\n• ADD extracts name and appends to rear [1]\n• PRINT removes from the front [1]\n• Empty queue handled [1]\n• Final count output [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Loop until STOP",
        "description": "Loop until STOP",
        "acceptedAnswers": [
          "while command != \"STOP\""
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "ADD extracts name and appends to rear",
        "description": "ADD extracts name and appends to rear",
        "acceptedAnswers": [
          "append",
          "command[4:]"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "PRINT removes from the front",
        "description": "PRINT removes from the front",
        "acceptedAnswers": [
          "pop(0)"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Empty queue handled",
        "description": "Empty queue handled",
        "acceptedAnswers": [
          "No jobs"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Final count output",
        "description": "Final count output",
        "acceptedAnswers": [
          "Waiting:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_044",
    "unit": "B2",
    "title": "B2.2 Stack or queue?",
    "level": "Core",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "For each scenario, identify whether a stack or a queue is more appropriate and justify your choice.\n(i) Customers waiting for a call-centre agent.\n(ii) Checking the back button history in a web browser.",
    "marks": 4,
    "specReference": "B2.2.4",
    "commandWord": "Justify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "(ii) Checking the back button history in a web browser.",
        "keywords": [
          "queue",
          "FIFO",
          "order",
          "stack",
          "LIFO",
          "recent"
        ],
        "maxMarks": 4,
        "criteria": [
          "(i) queue",
          "Customers served in the order they called - FIFO is fair",
          "(ii) stack",
          "Back returns to the most recently visited page first - LIFO"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• (i) queue [1]\n• Customers served in the order they called - FIFO is fair [1]\n• (ii) stack [1]\n• Back returns to the most recently visited page first - LIFO [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "(i) queue",
        "description": "(i) queue",
        "acceptedAnswers": [
          "queue"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Customers served in the order they called - FIFO is fair",
        "description": "Customers served in the order they called - FIFO is fair",
        "acceptedAnswers": [
          "order",
          "FIFO",
          "first come first served"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "(ii) stack",
        "description": "(ii) stack",
        "acceptedAnswers": [
          "stack"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Back returns to the most recently visited page first - LIFO",
        "description": "Back returns to the most recently visited page first - LIFO",
        "acceptedAnswers": [
          "most recent",
          "LIFO"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_045",
    "unit": "B2",
    "title": "B2.2 Stacks and queues (MCQ)",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "mcq",
    "brief": "Choose the correct answer.",
    "marks": 4,
    "specReference": "B2.2.4",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Items 1, 2, 3 are added in that order and then two items are removed. Which item remains if a queue is used?",
        "options": [
          "1",
          "2",
          "3",
          "None"
        ],
        "a": 2
      },
      {
        "q": "Using the same items and removals with a stack, which item remains?",
        "options": [
          "1",
          "2",
          "3",
          "None"
        ],
        "a": 0
      },
      {
        "q": "Which operation on a queue stored in a Python list with list.pop(0) takes O(n) time?",
        "options": [
          "enqueue with append",
          "dequeue with pop(0)",
          "isEmpty with len()",
          "front with queue[0]"
        ],
        "a": 1
      },
      {
        "q": "Which application is best suited to a stack?",
        "options": [
          "Keyboard buffer",
          "Managing function calls and return addresses",
          "Round-robin process scheduling",
          "Customers at a ticket office"
        ],
        "a": 1
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: C (3) [1]\n• Q2: A (1) [1]\n• Q3: B (dequeue with pop(0)) [1]\n• Q4: B (Managing function calls and return addresses) [1]"
  },
  {
    "id": "ib_b2_046",
    "unit": "B2",
    "title": "B2.2 Exam-style: hospital triage queue",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "An emergency department records patients in a queue in the order they arrive. The queue is implemented in Python as a list called waiting, where waiting[0] is the front.",
    "marks": 13,
    "specReference": "B2.2.4",
    "commandWord": "Discuss",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "4(a)",
        "question": "State the Python statement that enqueues the patient \"Lee\".",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• waiting.append(\"Lee\") [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "waiting.append(\"Lee\")",
            "description": "waiting.append(\"Lee\")",
            "acceptedAnswers": [
              "waiting.append(\"Lee\")",
              "waiting.append('Lee')"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "4(b)",
        "question": "waiting = [\"Ali\", \"Ben\"]. Trace the following and state the final list: enqueue \"Cara\"; dequeue; enqueue \"Dev\"; dequeue.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Dequeued patients: Ali then Ben [1]\n• Final list [\"Cara\", \"Dev\"] [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Dequeued patients: Ali then Ben",
            "description": "Dequeued patients: Ali then Ben",
            "acceptedAnswers": [
              "Ali",
              "Ben"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Final list [\"Cara\", \"Dev\"]",
            "description": "Final list [\"Cara\", \"Dev\"]",
            "acceptedAnswers": [
              "['Cara', 'Dev']",
              "Cara, Dev"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "4(c)",
        "question": "Construct a function next_patient(waiting) that returns the patient at the front and removes them, or returns \"None waiting\" if the queue is empty.",
        "marks": 3,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Function header with parameter [1]\n• Empty check returning \"None waiting\" [1]\n• Removes and returns front item [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Function header with parameter",
            "description": "Function header with parameter",
            "acceptedAnswers": [
              "def next_patient(waiting)"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Empty check returning \"None waiting\"",
            "description": "Empty check returning \"None waiting\"",
            "acceptedAnswers": [
              "len(waiting) == 0",
              "None waiting"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Removes and returns front item",
            "description": "Removes and returns front item",
            "acceptedAnswers": [
              "pop(0)",
              "return"
            ]
          }
        ],
        "solution": "def next_patient(waiting):\n    if len(waiting) == 0:\n        return \"None waiting\"\n    return waiting.pop(0)"
      },
      {
        "id": "p4",
        "label": "4(d)",
        "question": "Explain one performance issue of using pop(0) on a Python list for a long queue, and suggest an alternative implementation.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• pop(0) shifts every remaining item one place [1]\n• so dequeue is O(n), slow for long queues [1]\n• Alternative: circular queue with front/rear pointers / linked list giving O(1) dequeue [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "pop(0) shifts every remaining item one place",
            "description": "pop(0) shifts every remaining item one place",
            "acceptedAnswers": [
              "shift",
              "move every element"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "so dequeue is O(n), slow for long queues",
            "description": "so dequeue is O(n), slow for long queues",
            "acceptedAnswers": [
              "O(n)",
              "linear"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Alternative: circular queue with front/rear pointers / linked list giving O(1) dequeue",
            "description": "Alternative: circular queue with front/rear pointers / linked list giving O(1) dequeue",
            "acceptedAnswers": [
              "circular queue",
              "pointer",
              "linked list",
              "O(1)"
            ]
          }
        ]
      },
      {
        "id": "p5",
        "label": "4(e)",
        "question": "Discuss whether a simple FIFO queue is appropriate for an emergency department.",
        "marks": 4,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• FIFO is fair and simple for patients of equal urgency [1]\n• But a critical patient arriving later would wait behind minor cases [1]\n• A priority queue / separate queues per triage category would be better [1]\n• Balanced conclusion, e.g. FIFO within each priority level [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "FIFO is fair and simple for patients of equal urgency",
            "description": "FIFO is fair and simple for patients of equal urgency",
            "acceptedAnswers": [
              "fair",
              "simple"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "But a critical patient arriving later would wait behind minor cases",
            "description": "But a critical patient arriving later would wait behind minor cases",
            "acceptedAnswers": [
              "critical",
              "wait",
              "urgency"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "A priority queue / separate queues per triage category would be better",
            "description": "A priority queue / separate queues per triage category would be better",
            "acceptedAnswers": [
              "priority queue",
              "triage category"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Balanced conclusion, e.g. FIFO within each priority level",
            "description": "Balanced conclusion, e.g. FIFO within each priority level",
            "acceptedAnswers": [
              "conclusion",
              "within each level"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "4(a) State the Python statement that enqueues the patient \"Lee\".",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "waiting.append(\"Lee\")"
        ]
      },
      {
        "q": "4(b) waiting = [\"Ali\", \"Ben\"]. Trace the following and state the final list: enqueue \"Cara\"; dequeue; enqueue \"Dev\"; dequeue.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Dequeued patients: Ali then Ben",
          "Final list [\"Cara\", \"Dev\"]"
        ]
      },
      {
        "q": "4(c) Construct a function next_patient(waiting) that returns the patient at the front and removes them, or returns \"None waiting\" if the queue is empty.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Function header with parameter",
          "Empty check returning \"None waiting\"",
          "Removes and returns front item"
        ]
      },
      {
        "q": "4(d) Explain one performance issue of using pop(0) on a Python list for a long queue, and suggest an alternative implementation.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "pop(0) shifts every remaining item one place",
          "so dequeue is O(n), slow for long queues",
          "Alternative: circular queue with front/rear pointers / linked list giving O(1) dequeue"
        ]
      },
      {
        "q": "4(e) Discuss whether a simple FIFO queue is appropriate for an emergency department.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "FIFO is fair and simple for patients of equal urgency",
          "But a critical patient arriving later would wait behind minor cases",
          "A priority queue / separate queues per triage category would be better",
          "Balanced conclusion, e.g. FIFO within each priority level"
        ]
      }
    ],
    "markScheme": "4(a): Award [1] for each of the following, up to [1]:\n• waiting.append(\"Lee\") [1]\n4(b): Award [1] for each of the following, up to [2]:\n• Dequeued patients: Ali then Ben [1]\n• Final list [\"Cara\", \"Dev\"] [1]\n4(c): Award [1] for each of the following, up to [3]:\n• Function header with parameter [1]\n• Empty check returning \"None waiting\" [1]\n• Removes and returns front item [1]\n4(d): Award [1] for each of the following, up to [3]:\n• pop(0) shifts every remaining item one place [1]\n• so dequeue is O(n), slow for long queues [1]\n• Alternative: circular queue with front/rear pointers / linked list giving O(1) dequeue [1]\n4(e): Award [1] for each of the following, up to [4]:\n• FIFO is fair and simple for patients of equal urgency [1]\n• But a critical patient arriving later would wait behind minor cases [1]\n• A priority queue / separate queues per triage category would be better [1]\n• Balanced conclusion, e.g. FIFO within each priority level [1]"
  },
  {
    "id": "ib_b2_047",
    "unit": "B2",
    "title": "B2.3 Order of instructions",
    "level": "Core",
    "difficulty": "Easy",
    "type": "inspect",
    "brief": "Two versions of a program are intended to output the total cost after adding 10% tax to a price of 50.\n\nVersion A:\nprice = 50\ntotal = price + tax\ntax = price * 0.1\nprint(total)\n\nVersion B:\nprice = 50\ntax = price * 0.1\nprice = 60\ntotal = price + tax\nprint(total)",
    "marks": 4,
    "specReference": "B2.3.1",
    "commandWord": "Deduce",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Name the error produced by Version A.",
        "a": [
          "NameError",
          "name error"
        ]
      },
      {
        "q": "State the output of Version B.",
        "a": [
          "65.0",
          "65"
        ]
      },
      {
        "q": "State the correct total that should be output.",
        "a": [
          "55.0",
          "55"
        ]
      },
      {
        "q": "Which line in Version B should be removed to give the correct total? (copy the line)",
        "a": [
          "price = 60"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• Name the error produced by Version A. → NameError (accept name error) [1]\n• State the output of Version B. → 65.0 (accept 65) [1]\n• State the correct total that should be output. → 55.0 (accept 55) [1]\n• Which line in Version B should be removed to give the correct total? (copy the line) → price = 60 [1]"
  },
  {
    "id": "ib_b2_048",
    "unit": "B2",
    "title": "B2.3 Infinite loops and deadlock",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Describe how an infinite loop and deadlock can occur, and one way to avoid an infinite loop.",
    "marks": 3,
    "specReference": "B2.3.1",
    "commandWord": "Describe",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Describe how an infinite loop and deadlock can occur, and one way to avoid an infinite loop.",
        "keywords": [
          "infinite",
          "condition",
          "update",
          "deadlock",
          "resource",
          "wait"
        ],
        "maxMarks": 3,
        "criteria": [
          "Infinite loop: loop condition never becomes false, e.g. loop variable not updated inside the loop",
          "Deadlock: two (or more) processes each wait for a resource held by the other, so neither can continue",
          "Avoid infinite loop: ensure the loop variable is changed towards the exit condition / use a counted loop / trace the loop with boundary values"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Infinite loop: loop condition never becomes false, e.g. loop variable not updated inside the loop [1]\n• Deadlock: two (or more) processes each wait for a resource held by the other, so neither can continue [1]\n• Avoid infinite loop: ensure the loop variable is changed towards the exit condition / use a counted loop / trace the loop with boundary values [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Infinite loop: loop condition never becomes false, e.g. loop variable not updated inside the loop",
        "description": "Infinite loop: loop condition never becomes false, e.g. loop variable not updated inside the loop",
        "acceptedAnswers": [
          "condition never false",
          "not updated",
          "never ends"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Deadlock: two (or more) processes each wait for a resource held by the other, so neither can continue",
        "description": "Deadlock: two (or more) processes each wait for a resource held by the other, so neither can continue",
        "acceptedAnswers": [
          "wait for each other",
          "resource held",
          "neither proceeds"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Avoid infinite loop: ensure the loop variable is changed towards the exit condition / use a counted loop / trace the loop with boundary values",
        "description": "Avoid infinite loop: ensure the loop variable is changed towards the exit condition / use a counted loop / trace the loop with boundary values",
        "acceptedAnswers": [
          "update variable",
          "counted loop",
          "trace"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_049",
    "unit": "B2",
    "title": "B2.3 Fix the order: savings plan",
    "level": "Fix the error",
    "difficulty": "Easy",
    "type": "code",
    "brief": "The starter program should input a starting balance and a number of years, add 5% interest each year, and output the balance after each year. The statements are in the wrong order, so the output is wrong. Correct the order of instructions.\n\n• Prompts: `Balance: ` then `Years: `\n• Output one line per year, e.g. `Year 1 balance 105.00`",
    "marks": 4,
    "specReference": "B2.3.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "years = int(input(\"Years: \"))\nbalance = float(input(\"Balance: \"))\nfor year in range(1, years + 1):\n    print(f\"Year {year} balance {balance:.2f}\")\n    balance = balance * 1.05",
    "solution": "balance = float(input(\"Balance: \"))\nyears = int(input(\"Years: \"))\nfor year in range(1, years + 1):\n    balance = balance * 1.05\n    print(f\"Year {year} balance {balance:.2f}\")",
    "tests": [
      {
        "in": [
          "100",
          "2"
        ],
        "out": "Year 1 balance 105.00\nYear 2 balance 110.25",
        "m": 2
      },
      {
        "in": [
          "2000",
          "3"
        ],
        "out": "Year 1 balance 2100.00\nYear 2 balance 2205.00\nYear 3 balance 2315.25",
        "m": 1
      },
      {
        "in": [
          "50",
          "1"
        ],
        "out": "Year 1 balance 52.50",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Inputs taken in the order Balance then Years [1]\n• Interest added before the balance is printed [1]\n• Loop runs exactly 'years' times starting at year 1 [1]\n• Output to 2 decimal places [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Inputs taken in the order Balance then Years",
        "description": "Inputs taken in the order Balance then Years",
        "acceptedAnswers": [
          "balance = float(input"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Interest added before the balance is printed",
        "description": "Interest added before the balance is printed",
        "acceptedAnswers": [
          "balance * 1.05"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Loop runs exactly 'years' times starting at year 1",
        "description": "Loop runs exactly 'years' times starting at year 1",
        "acceptedAnswers": [
          "range(1, years + 1)"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Output to 2 decimal places",
        "description": "Output to 2 decimal places",
        "acceptedAnswers": [
          ":.2f"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_050",
    "unit": "B2",
    "title": "B2.3 Grade boundaries with elif",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "code",
    "brief": "Write a program that inputs a percentage and outputs the IB-style grade using these boundaries: 80+ → 7, 70-79 → 6, 60-69 → 5, 50-59 → 4, 40-49 → 3, below 40 → 2. Any value below 0 or above 100 outputs `Invalid`.\n\n• Prompt: `Percentage: ` (integer)\n• Output example: `Grade 6`",
    "marks": 4,
    "specReference": "B2.3.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "pct = int(input(\"Percentage: \"))\n",
    "solution": "pct = int(input(\"Percentage: \"))\nif pct < 0 or pct > 100:\n    print(\"Invalid\")\nelif pct >= 80:\n    print(\"Grade 7\")\nelif pct >= 70:\n    print(\"Grade 6\")\nelif pct >= 60:\n    print(\"Grade 5\")\nelif pct >= 50:\n    print(\"Grade 4\")\nelif pct >= 40:\n    print(\"Grade 3\")\nelse:\n    print(\"Grade 2\")",
    "tests": [
      {
        "in": [
          "79"
        ],
        "out": "Grade 6",
        "m": 1
      },
      {
        "in": [
          "80"
        ],
        "out": "Grade 7",
        "m": 1
      },
      {
        "in": [
          "0"
        ],
        "out": "Grade 2",
        "m": 1
      },
      {
        "in": [
          "101"
        ],
        "out": "Invalid",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Validation for out-of-range values [1]\n• if/elif/else chain [1]\n• Boundaries in correct descending order with >= [1]\n• Correct output format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Validation for out-of-range values",
        "description": "Validation for out-of-range values",
        "acceptedAnswers": [
          "< 0 or",
          "> 100"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "if/elif/else chain",
        "description": "if/elif/else chain",
        "acceptedAnswers": [
          "elif"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Boundaries in correct descending order with >=",
        "description": "Boundaries in correct descending order with >=",
        "acceptedAnswers": [
          ">= 80",
          ">= 70"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Correct output format",
        "description": "Correct output format",
        "acceptedAnswers": [
          "Grade"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_051",
    "unit": "B2",
    "title": "B2.3 Leap year with Boolean operators",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "A year is a leap year if it is divisible by 4 and not divisible by 100, or if it is divisible by 400. Write a program using a single if/else with Boolean operators.\n\n• Prompt: `Year: `\n• Output `2024 is a leap year` or `2023 is not a leap year`",
    "marks": 4,
    "specReference": "B2.3.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "year = int(input(\"Year: \"))\n",
    "solution": "year = int(input(\"Year: \"))\nif (year % 4 == 0 and not year % 100 == 0) or year % 400 == 0:\n    print(f\"{year} is a leap year\")\nelse:\n    print(f\"{year} is not a leap year\")",
    "tests": [
      {
        "in": [
          "2024"
        ],
        "out": "2024 is a leap year",
        "m": 1
      },
      {
        "in": [
          "1900"
        ],
        "out": "1900 is not a leap year",
        "m": 1
      },
      {
        "in": [
          "2000"
        ],
        "out": "2000 is a leap year",
        "m": 1
      },
      {
        "in": [
          "2023"
        ],
        "out": "2023 is not a leap year",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Divisible by 4 test using % [1]\n• Not divisible by 100 combined with and/not [1]\n• Divisible by 400 combined with or [1]\n• Correct output messages including the year [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Divisible by 4 test using %",
        "description": "Divisible by 4 test using %",
        "acceptedAnswers": [
          "% 4 == 0"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Not divisible by 100 combined with and/not",
        "description": "Not divisible by 100 combined with and/not",
        "acceptedAnswers": [
          "and",
          "% 100 != 0",
          "not"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Divisible by 400 combined with or",
        "description": "Divisible by 400 combined with or",
        "acceptedAnswers": [
          "or year % 400 == 0"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Correct output messages including the year",
        "description": "Correct output messages including the year",
        "acceptedAnswers": [
          "is a leap year",
          "is not a leap year"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_052",
    "unit": "B2",
    "title": "B2.3 Theme park ticket price",
    "level": "Core",
    "difficulty": "Hard",
    "type": "code",
    "brief": "A theme park charges: under 4 → free (0); 4-15 → 18; 16-64 → 30; 65 and over → 20. On a Tuesday every paying ticket is reduced by 5. A child shorter than 110 cm cannot go on the big ride.\n\n• Prompts: `Age: `, `Day: `, `Height (cm): `\n• Output two lines, e.g.\n`Price: 25`\n`Big ride: yes`  (or `Big ride: no`)",
    "marks": 5,
    "specReference": "B2.3.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "age = int(input(\"Age: \"))\nday = input(\"Day: \")\nheight = int(input(\"Height (cm): \"))\n",
    "solution": "age = int(input(\"Age: \"))\nday = input(\"Day: \")\nheight = int(input(\"Height (cm): \"))\nif age < 4:\n    price = 0\nelif age <= 15:\n    price = 18\nelif age <= 64:\n    price = 30\nelse:\n    price = 20\nif day == \"Tuesday\" and price > 0:\n    price = price - 5\nprint(f\"Price: {price}\")\nif height >= 110:\n    print(\"Big ride: yes\")\nelse:\n    print(\"Big ride: no\")",
    "tests": [
      {
        "in": [
          "30",
          "Tuesday",
          "175"
        ],
        "out": "Price: 25\nBig ride: yes",
        "m": 1
      },
      {
        "in": [
          "3",
          "Tuesday",
          "95"
        ],
        "out": "Price: 0\nBig ride: no",
        "m": 1
      },
      {
        "in": [
          "15",
          "Monday",
          "109"
        ],
        "out": "Price: 18\nBig ride: no",
        "m": 1
      },
      {
        "in": [
          "65",
          "Tuesday",
          "160"
        ],
        "out": "Price: 15\nBig ride: yes",
        "m": 1
      },
      {
        "in": [
          "64",
          "Sunday",
          "110"
        ],
        "out": "Price: 30\nBig ride: yes",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Age bands with if/elif/else [1]\n• Correct boundaries 4, 15/16, 64/65 [1]\n• Tuesday reduction only for paying tickets [1]\n• Height test >= 110 [1]\n• Both outputs in the required format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Age bands with if/elif/else",
        "description": "Age bands with if/elif/else",
        "acceptedAnswers": [
          "elif age <= 15",
          "elif age <= 64"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Correct boundaries 4, 15/16, 64/65",
        "description": "Correct boundaries 4, 15/16, 64/65",
        "acceptedAnswers": [
          "< 4",
          "<= 15",
          "<= 64"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Tuesday reduction only for paying tickets",
        "description": "Tuesday reduction only for paying tickets",
        "acceptedAnswers": [
          "and price > 0"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Height test >= 110",
        "description": "Height test >= 110",
        "acceptedAnswers": [
          ">= 110"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Both outputs in the required format",
        "description": "Both outputs in the required format",
        "acceptedAnswers": [
          "Price:",
          "Big ride:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_053",
    "unit": "B2",
    "title": "B2.3 Evaluate Boolean conditions",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "inspect",
    "brief": "a = 7, b = 3, c = True\n\nState whether each condition evaluates to True or False.",
    "marks": 5,
    "specReference": "B2.3.2",
    "commandWord": "Deduce",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "a > 5 and b > 5",
        "a": [
          "False"
        ]
      },
      {
        "q": "a > 5 or b > 5",
        "a": [
          "True"
        ]
      },
      {
        "q": "not c or a == 7",
        "a": [
          "True"
        ]
      },
      {
        "q": "a % b == 1 and not (b >= 3)",
        "a": [
          "False"
        ]
      },
      {
        "q": "a != b and (c or b > a)",
        "a": [
          "True"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [5]):\n• a > 5 and b > 5 → False [1]\n• a > 5 or b > 5 → True [1]\n• not c or a == 7 → True [1]\n• a % b == 1 and not (b >= 3) → False [1]\n• a != b and (c or b > a) → True [1]"
  },
  {
    "id": "ib_b2_054",
    "unit": "B2",
    "title": "B2.3 Selection structures (MCQ)",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "mcq",
    "brief": "Choose the correct answer.",
    "marks": 3,
    "specReference": "B2.3.2",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "x = 15. What is output?\nif x > 10:\n    print(\"A\")\nelif x > 5:\n    print(\"B\")\nelse:\n    print(\"C\")",
        "options": [
          "A",
          "B",
          "A and B",
          "C"
        ],
        "a": 0
      },
      {
        "q": "Which condition is True only when n is between 1 and 10 inclusive?",
        "options": [
          "n >= 1 or n <= 10",
          "n > 1 and n < 10",
          "n >= 1 and n <= 10",
          "not (n >= 1)"
        ],
        "a": 2
      },
      {
        "q": "What is the Python keyword equivalent to 'else if' in Java?",
        "options": [
          "elseif",
          "elif",
          "else if",
          "then"
        ],
        "a": 1
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: A (A) [1]\n• Q2: C (n >= 1 and n <= 10) [1]\n• Q3: B (elif) [1]"
  },
  {
    "id": "ib_b2_055",
    "unit": "B2",
    "title": "B2.3 Sentinel-controlled total",
    "level": "Core",
    "difficulty": "Easy",
    "type": "code",
    "brief": "A shop till adds up item prices. Write a program that inputs prices until 0 is entered, then outputs the number of items and the total cost to 2 decimal places.\n\n• Prompt: `Price: `\n• Output example:\n`Items: 3`\n`Total: 12.75`",
    "marks": 4,
    "specReference": "B2.3.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "count = 0\ntotal = 0\n",
    "solution": "count = 0\ntotal = 0\nprice = float(input(\"Price: \"))\nwhile price != 0:\n    count = count + 1\n    total = total + price\n    price = float(input(\"Price: \"))\nprint(f\"Items: {count}\")\nprint(f\"Total: {total:.2f}\")",
    "tests": [
      {
        "in": [
          "2.50",
          "4.25",
          "6",
          "0"
        ],
        "out": "Items: 3\nTotal: 12.75",
        "m": 1
      },
      {
        "in": [
          "0"
        ],
        "out": "Items: 0\nTotal: 0.00",
        "m": 1
      },
      {
        "in": [
          "9.99",
          "0"
        ],
        "out": "Items: 1\nTotal: 9.99",
        "m": 1
      },
      {
        "in": [
          "1",
          "1",
          "1",
          "1",
          "1",
          "0"
        ],
        "out": "Items: 5\nTotal: 5.00",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Condition-controlled loop with sentinel 0 [1]\n• Count and total updated inside the loop [1]\n• Next price input at end of loop body [1]\n• Correct outputs with 2 d.p. [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Condition-controlled loop with sentinel 0",
        "description": "Condition-controlled loop with sentinel 0",
        "acceptedAnswers": [
          "while price != 0"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Count and total updated inside the loop",
        "description": "Count and total updated inside the loop",
        "acceptedAnswers": [
          "count + 1",
          "total + price"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Next price input at end of loop body",
        "description": "Next price input at end of loop body",
        "acceptedAnswers": [
          "price = float(input"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Correct outputs with 2 d.p.",
        "description": "Correct outputs with 2 d.p.",
        "acceptedAnswers": [
          ":.2f"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_056",
    "unit": "B2",
    "title": "B2.3 Validation loop",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "code",
    "brief": "Write a program that asks for a rating from 1 to 5 and repeats the question until a valid value is entered. For every invalid value output `Out of range`. Finally output `Thank you for rating 4`.\n\n• Prompt: `Rating (1-5): ` (inputs are always integers)",
    "marks": 3,
    "specReference": "B2.3.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "rating = int(input(\"Rating (1-5): \"))\n",
    "solution": "rating = int(input(\"Rating (1-5): \"))\nwhile rating < 1 or rating > 5:\n    print(\"Out of range\")\n    rating = int(input(\"Rating (1-5): \"))\nprint(f\"Thank you for rating {rating}\")",
    "tests": [
      {
        "in": [
          "4"
        ],
        "out": "Thank you for rating 4",
        "m": 1
      },
      {
        "in": [
          "0",
          "6",
          "5"
        ],
        "out": "Out of range\nOut of range\nThank you for rating 5",
        "m": 1
      },
      {
        "in": [
          "-3",
          "1"
        ],
        "out": "Out of range\nThank you for rating 1",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• while loop with correct range condition [1]\n• Error message and re-input inside the loop [1]\n• Final message with value [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "while loop with correct range condition",
        "description": "while loop with correct range condition",
        "acceptedAnswers": [
          "while rating < 1 or rating > 5"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Error message and re-input inside the loop",
        "description": "Error message and re-input inside the loop",
        "acceptedAnswers": [
          "Out of range"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Final message with value",
        "description": "Final message with value",
        "acceptedAnswers": [
          "Thank you for rating"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_057",
    "unit": "B2",
    "title": "B2.3 Counted loop: times table",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "code",
    "brief": "Write a program that inputs a number and a limit and outputs the times table from 1 up to the limit using a counted loop.\n\n• Prompts: `Number: ` then `Up to: `\n• Output one line per multiple, e.g. `3 times 4 is 12`",
    "marks": 3,
    "specReference": "B2.3.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "number = int(input(\"Number: \"))\nlimit = int(input(\"Up to: \"))\n",
    "solution": "number = int(input(\"Number: \"))\nlimit = int(input(\"Up to: \"))\nfor i in range(1, limit + 1):\n    print(f\"{number} times {i} is {number * i}\")",
    "tests": [
      {
        "in": [
          "3",
          "4"
        ],
        "out": "3 times 1 is 3\n3 times 2 is 6\n3 times 3 is 9\n3 times 4 is 12",
        "m": 1
      },
      {
        "in": [
          "12",
          "2"
        ],
        "out": "12 times 1 is 12\n12 times 2 is 24",
        "m": 1
      },
      {
        "in": [
          "7",
          "10"
        ],
        "out": "7 times 1 is 7\n7 times 2 is 14\n7 times 3 is 21\n7 times 4 is 28\n7 times 5 is 35\n7 times 6 is 42\n7 times 7 is 49\n7 times 8 is 56\n7 times 9 is 63\n7 times 10 is 70",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• for loop with range(1, limit + 1) [1]\n• Product calculated [1]\n• Output format exactly as specified [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "for loop with range(1, limit + 1)",
        "description": "for loop with range(1, limit + 1)",
        "acceptedAnswers": [
          "range(1, limit + 1)"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Product calculated",
        "description": "Product calculated",
        "acceptedAnswers": [
          "number * i"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Output format exactly as specified",
        "description": "Output format exactly as specified",
        "acceptedAnswers": [
          " times ",
          " is "
        ]
      }
    ]
  },
  {
    "id": "ib_b2_058",
    "unit": "B2",
    "title": "B2.3 Prime number test",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a program that inputs a whole number greater than 1 and outputs whether it is prime. Use a loop that stops checking as soon as a factor is found.\n\n• Prompt: `Number: `\n• Output `17 is prime` or `21 is not prime`",
    "marks": 4,
    "specReference": "B2.3.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "num = int(input(\"Number: \"))\n",
    "solution": "num = int(input(\"Number: \"))\nis_prime = True\nd = 2\nwhile d * d <= num and is_prime:\n    if num % d == 0:\n        is_prime = False\n    d = d + 1\nif is_prime:\n    print(f\"{num} is prime\")\nelse:\n    print(f\"{num} is not prime\")",
    "tests": [
      {
        "in": [
          "17"
        ],
        "out": "17 is prime",
        "m": 1
      },
      {
        "in": [
          "21"
        ],
        "out": "21 is not prime",
        "m": 1
      },
      {
        "in": [
          "2"
        ],
        "out": "2 is prime",
        "m": 1
      },
      {
        "in": [
          "49"
        ],
        "out": "49 is not prime",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Loop testing possible divisors [1]\n• Divisibility test with % [1]\n• Loop stops early when a factor is found (flag/break) [1]\n• Correct output messages [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Loop testing possible divisors",
        "description": "Loop testing possible divisors",
        "acceptedAnswers": [
          "while",
          "for d in range"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Divisibility test with %",
        "description": "Divisibility test with %",
        "acceptedAnswers": [
          "num % d == 0"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Loop stops early when a factor is found (flag/break)",
        "description": "Loop stops early when a factor is found (flag/break)",
        "acceptedAnswers": [
          "is_prime",
          "break"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Correct output messages",
        "description": "Correct output messages",
        "acceptedAnswers": [
          "is prime",
          "is not prime"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_059",
    "unit": "B2",
    "title": "B2.3 Counted versus conditional loops",
    "level": "Core",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Distinguish between a counted loop and a conditional loop, giving a suitable use for each.",
    "marks": 3,
    "specReference": "B2.3.3",
    "commandWord": "Distinguish",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Distinguish between a counted loop and a conditional loop, giving a suitable use for each.",
        "keywords": [
          "for",
          "while",
          "fixed",
          "condition",
          "validation"
        ],
        "maxMarks": 3,
        "criteria": [
          "Counted (for) loop repeats a known/fixed number of times",
          "Conditional (while) loop repeats until/while a condition is met - number of repetitions not known in advance",
          "Suitable uses: counted - process each of 30 students / each item in a list; conditional - input validation / read until sentinel"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Counted (for) loop repeats a known/fixed number of times [1]\n• Conditional (while) loop repeats until/while a condition is met - number of repetitions not known in advance [1]\n• Suitable uses: counted - process each of 30 students / each item in a list; conditional - input validation / read until sentinel [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Counted (for) loop repeats a known/fixed number of times",
        "description": "Counted (for) loop repeats a known/fixed number of times",
        "acceptedAnswers": [
          "known number",
          "fixed",
          "for loop"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Conditional (while) loop repeats until/while a condition is met - number of repetitions not known in advance",
        "description": "Conditional (while) loop repeats until/while a condition is met - number of repetitions not known in advance",
        "acceptedAnswers": [
          "condition",
          "unknown",
          "while"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Suitable uses: counted - process each of 30 students / each item in a list; conditional - input validation / read until sentinel",
        "description": "Suitable uses: counted - process each of 30 students / each item in a list; conditional - input validation / read until sentinel",
        "acceptedAnswers": [
          "each item",
          "validation",
          "sentinel"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_060",
    "unit": "B2",
    "title": "B2.3 Trace nested loops",
    "level": "Trace table",
    "difficulty": "Moderate",
    "type": "table",
    "brief": "Trace the program below. Add one row each time the print statement is executed.\n\ntotal = 0\nfor i in range(1, 4):\n    for j in range(i, 3):\n        total = total + i * j\n        print(i, j, total)",
    "marks": 3,
    "specReference": "B2.3.3",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "i",
        "type": "text"
      },
      {
        "label": "j",
        "type": "text"
      },
      {
        "label": "total",
        "type": "text"
      }
    ],
    "rows": [
      [
        {
          "v": "1"
        },
        {
          "v": "1"
        },
        {
          "v": "1"
        }
      ],
      [
        {
          "v": "1"
        },
        {
          "v": "2"
        },
        {
          "v": "3"
        }
      ],
      [
        {
          "v": "2"
        },
        {
          "v": "2"
        },
        {
          "v": "7"
        }
      ]
    ],
    "markScheme": "Award [3] for a fully correct table; marks are awarded in proportion to correct cells (9 cells to complete). Award follow-through for values that are correct given an earlier error.\nWhen i = 3, range(3, 3) is empty so the inner loop does not execute."
  },
  {
    "id": "ib_b2_061",
    "unit": "B2",
    "title": "B2.3 Digit statistics",
    "level": "Core",
    "difficulty": "Easy",
    "type": "code",
    "brief": "Write a program that inputs a positive integer and, using a while loop with // and % (not string functions), outputs how many digits it has and the sum of its digits.\n\n• Prompt: `Number: `\n• Output example for 4096:\n`Digits: 4`\n`Sum: 19`",
    "marks": 4,
    "specReference": "B2.3.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "num = int(input(\"Number: \"))\n",
    "solution": "num = int(input(\"Number: \"))\ndigits = 0\ntotal = 0\nwhile num > 0:\n    total = total + num % 10\n    num = num // 10\n    digits = digits + 1\nprint(f\"Digits: {digits}\")\nprint(f\"Sum: {total}\")",
    "tests": [
      {
        "in": [
          "4096"
        ],
        "out": "Digits: 4\nSum: 19",
        "m": 1
      },
      {
        "in": [
          "7"
        ],
        "out": "Digits: 1\nSum: 7",
        "m": 1
      },
      {
        "in": [
          "99999"
        ],
        "out": "Digits: 5\nSum: 45",
        "m": 1
      },
      {
        "in": [
          "1000001"
        ],
        "out": "Digits: 7\nSum: 2",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• while loop until number is 0 [1]\n• Extract last digit with % 10 [1]\n• Remove last digit with // 10 [1]\n• Both counters output correctly [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "while loop until number is 0",
        "description": "while loop until number is 0",
        "acceptedAnswers": [
          "while num > 0"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Extract last digit with % 10",
        "description": "Extract last digit with % 10",
        "acceptedAnswers": [
          "% 10"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Remove last digit with // 10",
        "description": "Remove last digit with // 10",
        "acceptedAnswers": [
          "// 10"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Both counters output correctly",
        "description": "Both counters output correctly",
        "acceptedAnswers": [
          "Digits:",
          "Sum:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_062",
    "unit": "B2",
    "title": "B2.3 Password validation function",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a function is_strong(password) that returns True if the password has at least 8 characters, at least one digit and at least one upper-case letter, otherwise False. The main program inputs a password and outputs `Strong` or `Weak` by calling the function.\n\n• Prompt: `Password: `",
    "marks": 5,
    "specReference": "B2.3.4",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "def is_strong(password):\n    pass\n\npassword = input(\"Password: \")\n",
    "solution": "def is_strong(password):\n    has_digit = False\n    has_upper = False\n    for ch in password:\n        if ch.isdigit():\n            has_digit = True\n        if ch.isupper():\n            has_upper = True\n    return len(password) >= 8 and has_digit and has_upper\n\npassword = input(\"Password: \")\nif is_strong(password):\n    print(\"Strong\")\nelse:\n    print(\"Weak\")",
    "tests": [
      {
        "in": [
          "Secure2027"
        ],
        "out": "Strong",
        "m": 1
      },
      {
        "in": [
          "short1A"
        ],
        "out": "Weak",
        "m": 1
      },
      {
        "in": [
          "nouppercase9"
        ],
        "out": "Weak",
        "m": 1
      },
      {
        "in": [
          "NODIGITSHERE"
        ],
        "out": "Weak",
        "m": 1
      },
      {
        "in": [
          "ABCDEFG7"
        ],
        "out": "Strong",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Function defined with a parameter and returns a Boolean [1]\n• Length check >= 8 [1]\n• Loop/any to detect a digit [1]\n• Loop/any to detect an upper-case letter [1]\n• Main program calls function and outputs result [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Function defined with a parameter and returns a Boolean",
        "description": "Function defined with a parameter and returns a Boolean",
        "acceptedAnswers": [
          "def is_strong(password)",
          "return"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Length check >= 8",
        "description": "Length check >= 8",
        "acceptedAnswers": [
          "len(password) >= 8"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Loop/any to detect a digit",
        "description": "Loop/any to detect a digit",
        "acceptedAnswers": [
          "isdigit"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Loop/any to detect an upper-case letter",
        "description": "Loop/any to detect an upper-case letter",
        "acceptedAnswers": [
          "isupper"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Main program calls function and outputs result",
        "description": "Main program calls function and outputs result",
        "acceptedAnswers": [
          "if is_strong("
        ]
      }
    ]
  },
  {
    "id": "ib_b2_063",
    "unit": "B2",
    "title": "B2.3 Modular shopping bill",
    "level": "Core",
    "difficulty": "Hard",
    "type": "code",
    "brief": "Write a modular program with these two functions:\n• line_cost(price, qty) returns price × qty\n• apply_discount(total) returns the total reduced by 10% if it is over 50, otherwise unchanged\n\nThe main program inputs the number of lines, then for each line a price and a quantity, adds up the line costs and outputs the final bill.\n\n• Prompts: `Lines: `, then `Price: ` and `Quantity: ` for each line\n• Output example: `Bill: 54.00`",
    "marks": 5,
    "specReference": "B2.3.4",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "def line_cost(price, qty):\n    pass\n\ndef apply_discount(total):\n    pass\n",
    "solution": "def line_cost(price, qty):\n    return price * qty\n\ndef apply_discount(total):\n    if total > 50:\n        return total * 0.9\n    return total\n\nlines = int(input(\"Lines: \"))\ntotal = 0\nfor i in range(lines):\n    price = float(input(\"Price: \"))\n    qty = int(input(\"Quantity: \"))\n    total = total + line_cost(price, qty)\nprint(f\"Bill: {apply_discount(total):.2f}\")",
    "tests": [
      {
        "in": [
          "2",
          "20",
          "2",
          "10",
          "2"
        ],
        "out": "Bill: 54.00",
        "m": 2
      },
      {
        "in": [
          "1",
          "50",
          "1"
        ],
        "out": "Bill: 50.00",
        "m": 1
      },
      {
        "in": [
          "3",
          "1.5",
          "4",
          "12.25",
          "2",
          "9.99",
          "1"
        ],
        "out": "Bill: 40.49",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• line_cost returns the product [1]\n• apply_discount applies 10% only when over 50 [1]\n• Loop collects each line's price and quantity [1]\n• Running total uses line_cost [1]\n• Final bill uses apply_discount and 2 d.p. [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "line_cost returns the product",
        "description": "line_cost returns the product",
        "acceptedAnswers": [
          "return price * qty"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "apply_discount applies 10% only when over 50",
        "description": "apply_discount applies 10% only when over 50",
        "acceptedAnswers": [
          "> 50",
          "* 0.9"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Loop collects each line's price and quantity",
        "description": "Loop collects each line's price and quantity",
        "acceptedAnswers": [
          "for i in range(lines)"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Running total uses line_cost",
        "description": "Running total uses line_cost",
        "acceptedAnswers": [
          "line_cost(price, qty)"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Final bill uses apply_discount and 2 d.p.",
        "description": "Final bill uses apply_discount and 2 d.p.",
        "acceptedAnswers": [
          "apply_discount(total)",
          ":.2f"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_064",
    "unit": "B2",
    "title": "B2.3 Benefits of modularization",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A team is developing a large school management program.\n\nExplain two benefits of dividing the program into functions and modules.",
    "marks": 4,
    "specReference": "B2.3.4",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain two benefits of dividing the program into functions and modules.",
        "keywords": [
          "reuse",
          "maintain",
          "test",
          "team",
          "parallel",
          "duplication"
        ],
        "maxMarks": 4,
        "criteria": [
          "Reusability: a function (e.g. calculate_average) is written once and called many times",
          "Reduces duplication, so code is shorter and changes made in one place",
          "Maintainability/testing: each module can be tested and debugged independently",
          "Team working: different developers can work on different modules in parallel"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Reusability: a function (e.g. calculate_average) is written once and called many times [1]\n• Reduces duplication, so code is shorter and changes made in one place [1]\n• Maintainability/testing: each module can be tested and debugged independently [1]\n• Team working: different developers can work on different modules in parallel [1]\nAward [1] for each benefit identified and [1] for each linked expansion, up to [4].",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Reusability: a function (e.g. calculate_average) is written once and called many times",
        "description": "Reusability: a function (e.g. calculate_average) is written once and called many times",
        "acceptedAnswers": [
          "reuse",
          "called many times"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Reduces duplication, so code is shorter and changes made in one place",
        "description": "Reduces duplication, so code is shorter and changes made in one place",
        "acceptedAnswers": [
          "one place",
          "less duplication"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Maintainability/testing: each module can be tested and debugged independently",
        "description": "Maintainability/testing: each module can be tested and debugged independently",
        "acceptedAnswers": [
          "test independently",
          "debug",
          "maintain"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Team working: different developers can work on different modules in parallel",
        "description": "Team working: different developers can work on different modules in parallel",
        "acceptedAnswers": [
          "team",
          "parallel",
          "different developers"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_065",
    "unit": "B2",
    "title": "B2.3 Parameters, return values and scope",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "inspect",
    "brief": "Study the code below.",
    "marks": 5,
    "specReference": "B2.3.4",
    "commandWord": "Deduce",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "code": "rate = 2\n\ndef adjust(value):\n    result = value * rate + 2\n    return result\n\nx = 3\nprint(adjust(x))\nrate = 3\nprint(adjust(x + 1))\nprint(x)",
    "questions": [
      {
        "q": "State the first line of output.",
        "a": [
          "8"
        ]
      },
      {
        "q": "State the second line of output.",
        "a": [
          "14"
        ]
      },
      {
        "q": "State the third line of output.",
        "a": [
          "3"
        ]
      },
      {
        "q": "Identify one local variable in the function adjust (other than the parameter).",
        "a": [
          "result"
        ]
      },
      {
        "q": "Name the error that would occur if print(result) were added at the end of the program.",
        "a": [
          "NameError",
          "name error"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [5]):\n• State the first line of output. → 8 [1]\n• State the second line of output. → 14 [1]\n• State the third line of output. → 3 [1]\n• Identify one local variable in the function adjust (other than the parameter). → result [1]\n• Name the error that would occur if print(result) were added at the end of the program. → NameError (accept name error) [1]"
  },
  {
    "id": "ib_b2_066",
    "unit": "B2",
    "title": "B2.3 Exam-style: library fines program",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A library program stores the number of days late for each returned book in a list, e.g. days_late = [0, 3, 12, 0, 30]. The fine is 0.20 per day, up to a maximum of 5.00 per book.",
    "marks": 10,
    "specReference": "B2.3.4",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "5(a)",
        "question": "Construct a function fine(days) that returns the fine for one book.",
        "marks": 3,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Header with parameter days [1]\n• Calculation days * 0.20 [1]\n• Cap at 5.00 and return [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Header with parameter days",
            "description": "Header with parameter days",
            "acceptedAnswers": [
              "def fine(days)"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Calculation days * 0.20",
            "description": "Calculation days * 0.20",
            "acceptedAnswers": [
              "* 0.20",
              "* 0.2"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Cap at 5.00 and return",
            "description": "Cap at 5.00 and return",
            "acceptedAnswers": [
              "5.00",
              "min(",
              "return"
            ]
          }
        ],
        "solution": "def fine(days):\n    amount = days * 0.20\n    if amount > 5.00:\n        amount = 5.00\n    return amount"
      },
      {
        "id": "p2",
        "label": "5(b)",
        "question": "Construct code that uses fine() to calculate and output the total of all fines in days_late, and the number of books returned late.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Loop through every element of days_late [1]\n• Call fine() and accumulate total [1]\n• Count books with days > 0 [1]\n• Output both values [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Loop through every element of days_late",
            "description": "Loop through every element of days_late",
            "acceptedAnswers": [
              "for d in days_late"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Call fine() and accumulate total",
            "description": "Call fine() and accumulate total",
            "acceptedAnswers": [
              "fine(d)"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Count books with days > 0",
            "description": "Count books with days > 0",
            "acceptedAnswers": [
              "if d > 0"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Output both values",
            "description": "Output both values",
            "acceptedAnswers": [
              "print"
            ]
          }
        ],
        "solution": "total = 0\nlate = 0\nfor d in days_late:\n    total = total + fine(d)\n    if d > 0:\n        late = late + 1\nprint(f\"Total: {total:.2f}\")\nprint(f\"Late books: {late}\")"
      },
      {
        "id": "p3",
        "label": "5(c)",
        "question": "State the total fine for days_late = [0, 3, 12, 0, 30].",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• 8.00 (0 + 0.60 + 2.40 + 0 + 5.00) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "8.00 (0 + 0.60 + 2.40 + 0 + 5.00)",
            "description": "8.00 (0 + 0.60 + 2.40 + 0 + 5.00)",
            "acceptedAnswers": [
              "8.00",
              "8",
              "8.0"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "5(d)",
        "question": "Explain why the variable amount in fine() should be local rather than global.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Local variable exists only while the function runs / cannot be changed accidentally by other parts of the program [1]\n• Makes the function self-contained, reusable and easier to test/debug; avoids name clashes [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Local variable exists only while the function runs / cannot be changed accidentally by other parts of the program",
            "description": "Local variable exists only while the function runs / cannot be changed accidentally by other parts of the program",
            "acceptedAnswers": [
              "only inside function",
              "accidentally changed"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Makes the function self-contained, reusable and easier to test/debug; avoids name clashes",
            "description": "Makes the function self-contained, reusable and easier to test/debug; avoids name clashes",
            "acceptedAnswers": [
              "reusable",
              "name clash",
              "self-contained"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "5(a) Construct a function fine(days) that returns the fine for one book.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Header with parameter days",
          "Calculation days * 0.20",
          "Cap at 5.00 and return"
        ]
      },
      {
        "q": "5(b) Construct code that uses fine() to calculate and output the total of all fines in days_late, and the number of books returned late.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Loop through every element of days_late",
          "Call fine() and accumulate total",
          "Count books with days > 0",
          "Output both values"
        ]
      },
      {
        "q": "5(c) State the total fine for days_late = [0, 3, 12, 0, 30].",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "8.00 (0 + 0.60 + 2.40 + 0 + 5.00)"
        ]
      },
      {
        "q": "5(d) Explain why the variable amount in fine() should be local rather than global.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Local variable exists only while the function runs / cannot be changed accidentally by other parts of the program",
          "Makes the function self-contained, reusable and easier to test/debug; avoids name clashes"
        ]
      }
    ],
    "markScheme": "5(a): Award [1] for each of the following, up to [3]:\n• Header with parameter days [1]\n• Calculation days * 0.20 [1]\n• Cap at 5.00 and return [1]\n5(b): Award [1] for each of the following, up to [4]:\n• Loop through every element of days_late [1]\n• Call fine() and accumulate total [1]\n• Count books with days > 0 [1]\n• Output both values [1]\n5(c): Award [1] for each of the following, up to [1]:\n• 8.00 (0 + 0.60 + 2.40 + 0 + 5.00) [1]\n5(d): Award [1] for each of the following, up to [2]:\n• Local variable exists only while the function runs / cannot be changed accidentally by other parts of the program [1]\n• Makes the function self-contained, reusable and easier to test/debug; avoids name clashes [1]"
  },
  {
    "id": "ib_b2_067",
    "unit": "B2",
    "title": "B2.4 Big O notation (MCQ)",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "mcq",
    "brief": "Choose the correct time complexity for each algorithm in the worst case.",
    "marks": 4,
    "specReference": "B2.4.1",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Linear search of n items",
        "options": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n²)"
        ],
        "a": 2
      },
      {
        "q": "Binary search of n sorted items",
        "options": [
          "O(log n)",
          "O(n)",
          "O(n log n)",
          "O(1)"
        ],
        "a": 0
      },
      {
        "q": "Bubble sort of n items",
        "options": [
          "O(n)",
          "O(n²)",
          "O(log n)",
          "O(2ⁿ)"
        ],
        "a": 1
      },
      {
        "q": "Accessing element list[500] in an array/list",
        "options": [
          "O(n)",
          "O(log n)",
          "O(1)",
          "O(n²)"
        ],
        "a": 2
      }
    ],
    "markScheme": "Award [1] for each correct option:\n• Q1: C (O(n)) [1]\n• Q2: A (O(log n)) [1]\n• Q3: B (O(n²)) [1]\n• Q4: C (O(1)) [1]"
  },
  {
    "id": "ib_b2_068",
    "unit": "B2",
    "title": "B2.4 Calculate Big O of code fragments",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "inspect",
    "brief": "State the time complexity, in Big O notation, of each fragment in terms of n. Write powers as n^2, e.g. O(n^2).\n\nFragment 1:\nfor i in range(n):\n    total = total + i\n\nFragment 2:\nfor i in range(n):\n    for j in range(n):\n        grid[i][j] = 0\n\nFragment 3:\nwhile n > 1:\n    n = n // 2\n    steps = steps + 1\n\nFragment 4:\nprint(data[0] + data[-1])\n\nFragment 5:\nfor i in range(n):\n    print(i)\nfor j in range(n):\n    print(j)",
    "marks": 5,
    "specReference": "B2.4.1",
    "commandWord": "Calculate",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Fragment 1",
        "a": [
          "O(n)"
        ]
      },
      {
        "q": "Fragment 2",
        "a": [
          "O(n^2)",
          "O(n²)",
          "O(n*n)"
        ]
      },
      {
        "q": "Fragment 3",
        "a": [
          "O(log n)",
          "O(logn)",
          "O(log2 n)"
        ]
      },
      {
        "q": "Fragment 4",
        "a": [
          "O(1)"
        ]
      },
      {
        "q": "Fragment 5",
        "a": [
          "O(n)"
        ],
        "why": "Two sequential loops give 2n steps; constants are dropped."
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [5]):\n• Fragment 1 → O(n) [1]\n• Fragment 2 → O(n^2) (accept O(n²), O(n*n)) [1]\n• Fragment 3 → O(log n) (accept O(logn), O(log2 n)) [1]\n• Fragment 4 → O(1) [1]\n• Fragment 5 → O(n) [1]"
  },
  {
    "id": "ib_b2_069",
    "unit": "B2",
    "title": "B2.4 Time and space complexity",
    "level": "Core",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Distinguish between the time complexity and the space complexity of an algorithm, and state the space complexity of an in-place bubble sort.",
    "marks": 3,
    "specReference": "B2.4.1",
    "commandWord": "Distinguish",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Distinguish between the time complexity and the space complexity of an algorithm, and state the space complexity of an in-place bubble sort.",
        "keywords": [
          "time",
          "steps",
          "space",
          "memory",
          "O(1)",
          "grows"
        ],
        "maxMarks": 3,
        "criteria": [
          "Time complexity: how the number of steps/running time grows as the input size n grows",
          "Space complexity: how the extra memory required grows as n grows",
          "In-place bubble sort uses O(1) extra space (only a temporary variable for swaps)"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Time complexity: how the number of steps/running time grows as the input size n grows [1]\n• Space complexity: how the extra memory required grows as n grows [1]\n• In-place bubble sort uses O(1) extra space (only a temporary variable for swaps) [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Time complexity: how the number of steps/running time grows as the input size n grows",
        "description": "Time complexity: how the number of steps/running time grows as the input size n grows",
        "acceptedAnswers": [
          "running time",
          "number of steps",
          "grows with n"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Space complexity: how the extra memory required grows as n grows",
        "description": "Space complexity: how the extra memory required grows as n grows",
        "acceptedAnswers": [
          "memory",
          "extra space"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "In-place bubble sort uses O(1) extra space (only a temporary variable for swaps)",
        "description": "In-place bubble sort uses O(1) extra space (only a temporary variable for swaps)",
        "acceptedAnswers": [
          "O(1)",
          "constant"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_070",
    "unit": "B2",
    "title": "B2.4 Scalability calculation",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A linear search takes 2 ms to search 1000 records. Assume time is proportional to the number of comparisons in the worst case.\n\n(a) Estimate the time for 1 000 000 records using linear search.\n(b) A binary search makes at most 10 comparisons for 1000 records. Estimate the maximum comparisons for 1 000 000 records.\n(c) Explain what these results show about scalability.",
    "marks": 4,
    "specReference": "B2.4.1",
    "commandWord": "Calculate",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "(c) Explain what these results show about scalability.",
        "keywords": [
          "2000",
          "20",
          "log",
          "linear",
          "scal"
        ],
        "maxMarks": 4,
        "criteria": [
          "(a) 2000 ms / 2 s (1000 times more records → 1000 times longer)",
          "(b) 20 comparisons (log2 1 000 000 ≈ 20)",
          "(c) O(n) time grows in direct proportion to data size",
          "(c) O(log n) grows very slowly, so binary search scales much better for large sorted data sets"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• (a) 2000 ms / 2 s (1000 times more records → 1000 times longer) [1]\n• (b) 20 comparisons (log2 1 000 000 ≈ 20) [1]\n• (c) O(n) time grows in direct proportion to data size [1]\n• (c) O(log n) grows very slowly, so binary search scales much better for large sorted data sets [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "(a) 2000 ms / 2 s (1000 times more records → 1000 times longer)",
        "description": "(a) 2000 ms / 2 s (1000 times more records → 1000 times longer)",
        "acceptedAnswers": [
          "2000 ms",
          "2 s",
          "2 seconds"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "(b) 20 comparisons (log2 1 000 000 ≈ 20)",
        "description": "(b) 20 comparisons (log2 1 000 000 ≈ 20)",
        "acceptedAnswers": [
          "20"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "(c) O(n) time grows in direct proportion to data size",
        "description": "(c) O(n) time grows in direct proportion to data size",
        "acceptedAnswers": [
          "proportion",
          "linear",
          "O(n)"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "(c) O(log n) grows very slowly, so binary search scales much better for large sorted data sets",
        "description": "(c) O(log n) grows very slowly, so binary search scales much better for large sorted data sets",
        "acceptedAnswers": [
          "O(log n)",
          "scales better",
          "slowly"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_071",
    "unit": "B2",
    "title": "B2.4 Evaluate algorithm choice",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A social media company stores 50 million user names. New users are added thousands of times per minute and searches for a user name happen millions of times per minute.\n\nEvaluate keeping the user names in a sorted list searched with binary search, compared with an unsorted list searched with linear search.",
    "marks": 6,
    "specReference": "B2.4.1",
    "commandWord": "Evaluate",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Evaluate keeping the user names in a sorted list searched with binary search, compared with an unsorted list searched with linear search.",
        "keywords": [
          "binary",
          "linear",
          "O(log n)",
          "O(n)",
          "insert",
          "scal",
          "conclusion"
        ],
        "maxMarks": 6,
        "criteria": [
          "0: No relevant knowledge.",
          "1-2: Identifies some features of one or both approaches with little reference to the scenario.",
          "3-4: Describes strengths and weaknesses of both approaches using Big O, with some reference to search and insertion frequency; conclusion may be unsupported.",
          "5-6: Balanced evaluation of time (and space) complexity of searching and inserting for both approaches, applied to the scale of the scenario, with a justified conclusion.",
          "log2(50 000 000) ≈ 26 comparisons for binary search vs up to 50 million for linear.",
          "Inserting into a sorted list needs O(n) shifting; appending to unsorted is O(1).",
          "Searches outnumber insertions by roughly 1000:1.",
          "Both use O(n) space.",
          "Real systems would use an index/hash table."
        ]
      }
    ],
    "markScheme": "Use the markbands below. Award the band that best fits the response.\nMarks | Level descriptor\n0 | No relevant knowledge.\n1-2 | Identifies some features of one or both approaches with little reference to the scenario.\n3-4 | Describes strengths and weaknesses of both approaches using Big O, with some reference to search and insertion frequency; conclusion may be unsupported.\n5-6 | Balanced evaluation of time (and space) complexity of searching and inserting for both approaches, applied to the scale of the scenario, with a justified conclusion.\n\nIndicative content (responses may include):\n• log2(50 000 000) ≈ 26 comparisons for binary search vs up to 50 million for linear.\n• Inserting into a sorted list needs O(n) shifting; appending to unsorted is O(1).\n• Searches outnumber insertions by roughly 1000:1.\n• Both use O(n) space.\n• Real systems would use an index/hash table.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Binary search O(log n): about 26 comparisons for 50 million, versus up to 50 million for linear O(n)",
        "description": "Binary search O(log n): about 26 comparisons for 50 million, versus up to 50 million for linear O(n)",
        "acceptedAnswers": [
          "O(log n)",
          "26",
          "O(n)"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "With millions of searches per minute, search time dominates so binary search is a strong advantage",
        "description": "With millions of searches per minute, search time dominates so binary search is a strong advantage",
        "acceptedAnswers": [
          "searches dominate",
          "frequent searches"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Sorted list: each insertion must keep order - shifting elements is O(n) per insert",
        "description": "Sorted list: each insertion must keep order - shifting elements is O(n) per insert",
        "acceptedAnswers": [
          "insertion",
          "shift",
          "O(n)"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Unsorted list: insertion at end is O(1)",
        "description": "Unsorted list: insertion at end is O(1)",
        "acceptedAnswers": [
          "append",
          "O(1)"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Space complexity similar (both O(n)); sorting cost/maintenance considered",
        "description": "Space complexity similar (both O(n)); sorting cost/maintenance considered",
        "acceptedAnswers": [
          "space",
          "O(n)",
          "sorting cost"
        ]
      },
      {
        "id": "MP6",
        "marks": 1,
        "criterion": "Justified conclusion, e.g. sorted/indexed structure better because searches far outnumber insertions, or suggest hashing/indexing",
        "description": "Justified conclusion, e.g. sorted/indexed structure better because searches far outnumber insertions, or suggest hashing/indexing",
        "acceptedAnswers": [
          "conclusion",
          "index",
          "hash"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_072",
    "unit": "B2",
    "title": "B2.4 Linear search",
    "level": "Core",
    "difficulty": "Easy",
    "type": "code",
    "brief": "A list of student names is stored in the program:\n\nnames = [\"Ava\", \"Ben\", \"Cai\", \"Dan\", \"Eli\", \"Fay\"]\n\nWrite a linear search (do not use `in`, index() or find()) that inputs a name and outputs its position (starting at 0) or `Not found`. Also output the number of comparisons made.\n\n• Prompt: `Search for: `\n• Output example:\n`Found at 3`\n`Comparisons: 4`",
    "marks": 4,
    "specReference": "B2.4.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "names = [\"Ava\", \"Ben\", \"Cai\", \"Dan\", \"Eli\", \"Fay\"]\ntarget = input(\"Search for: \")\n",
    "solution": "names = [\"Ava\", \"Ben\", \"Cai\", \"Dan\", \"Eli\", \"Fay\"]\ntarget = input(\"Search for: \")\npos = -1\ni = 0\ncomparisons = 0\nwhile i < len(names) and pos == -1:\n    comparisons = comparisons + 1\n    if names[i] == target:\n        pos = i\n    i = i + 1\nif pos == -1:\n    print(\"Not found\")\nelse:\n    print(f\"Found at {pos}\")\nprint(f\"Comparisons: {comparisons}\")",
    "tests": [
      {
        "in": [
          "Dan"
        ],
        "out": "Found at 3\nComparisons: 4",
        "m": 1
      },
      {
        "in": [
          "Ava"
        ],
        "out": "Found at 0\nComparisons: 1",
        "m": 1
      },
      {
        "in": [
          "Zed"
        ],
        "out": "Not found\nComparisons: 6",
        "m": 1
      },
      {
        "in": [
          "Fay"
        ],
        "out": "Found at 5\nComparisons: 6",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Loop through list from index 0 [1]\n• Compare each element with target [1]\n• Stop when found and record position [1]\n• Correct outputs including comparisons count / Not found [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Loop through list from index 0",
        "description": "Loop through list from index 0",
        "acceptedAnswers": [
          "while i < len(names)",
          "for i in range"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Compare each element with target",
        "description": "Compare each element with target",
        "acceptedAnswers": [
          "names[i] == target"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Stop when found and record position",
        "description": "Stop when found and record position",
        "acceptedAnswers": [
          "pos = i",
          "break"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Correct outputs including comparisons count / Not found",
        "description": "Correct outputs including comparisons count / Not found",
        "acceptedAnswers": [
          "Not found",
          "Comparisons:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_073",
    "unit": "B2",
    "title": "B2.4 Binary search with comparisons",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "The sorted list below holds product codes:\n\ncodes = [3, 8, 15, 21, 27, 34, 40, 52, 66, 71, 89]\n\nWrite an iterative binary search that inputs a code and outputs the index where it was found or `Not found`, followed by the number of comparisons (each time the middle item is checked counts as one). Use mid = (low + high) // 2.\n\n• Prompt: `Code: `\n• Output example:\n`Index: 6`\n`Comparisons: 3`",
    "marks": 6,
    "specReference": "B2.4.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "codes = [3, 8, 15, 21, 27, 34, 40, 52, 66, 71, 89]\ntarget = int(input(\"Code: \"))\n",
    "solution": "codes = [3, 8, 15, 21, 27, 34, 40, 52, 66, 71, 89]\ntarget = int(input(\"Code: \"))\nlow = 0\nhigh = len(codes) - 1\nfound = -1\ncomparisons = 0\nwhile low <= high and found == -1:\n    mid = (low + high) // 2\n    comparisons = comparisons + 1\n    if codes[mid] == target:\n        found = mid\n    elif codes[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\nif found == -1:\n    print(\"Not found\")\nelse:\n    print(f\"Index: {found}\")\nprint(f\"Comparisons: {comparisons}\")",
    "tests": [
      {
        "in": [
          "34"
        ],
        "out": "Index: 5\nComparisons: 1",
        "m": 1
      },
      {
        "in": [
          "40"
        ],
        "out": "Index: 6\nComparisons: 3",
        "m": 1
      },
      {
        "in": [
          "3"
        ],
        "out": "Index: 0\nComparisons: 3",
        "m": 1
      },
      {
        "in": [
          "90"
        ],
        "out": "Not found\nComparisons: 4",
        "m": 1
      },
      {
        "in": [
          "21"
        ],
        "out": "Index: 3\nComparisons: 3",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [6]:\n• low and high initialised to 0 and len - 1 [1]\n• Loop while low <= high and not found [1]\n• mid calculated with integer division [1]\n• low = mid + 1 when middle item is smaller [1]\n• high = mid - 1 when middle item is larger [1]\n• Comparisons counted and correct outputs [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "low and high initialised to 0 and len - 1",
        "description": "low and high initialised to 0 and len - 1",
        "acceptedAnswers": [
          "low = 0",
          "high = len(codes) - 1"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Loop while low <= high and not found",
        "description": "Loop while low <= high and not found",
        "acceptedAnswers": [
          "while low <= high"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "mid calculated with integer division",
        "description": "mid calculated with integer division",
        "acceptedAnswers": [
          "(low + high) // 2"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "low = mid + 1 when middle item is smaller",
        "description": "low = mid + 1 when middle item is smaller",
        "acceptedAnswers": [
          "low = mid + 1"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "high = mid - 1 when middle item is larger",
        "description": "high = mid - 1 when middle item is larger",
        "acceptedAnswers": [
          "high = mid - 1"
        ]
      },
      {
        "id": "MP6",
        "marks": 1,
        "criterion": "Comparisons counted and correct outputs",
        "description": "Comparisons counted and correct outputs",
        "acceptedAnswers": [
          "comparisons + 1",
          "Not found"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_074",
    "unit": "B2",
    "title": "B2.4 Trace a binary search",
    "level": "Trace table",
    "difficulty": "Moderate",
    "type": "table",
    "brief": "A binary search is used to find 52 in the list\n\nindex: 0  1  2   3   4   5   6   7   8   9   10\nvalue: 3  8  15  21  27  34  40  52  66  71  89\n\nmid = (low + high) // 2. Complete one row for each time the middle item is compared.",
    "marks": 5,
    "specReference": "B2.4.2",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "low",
        "type": "text"
      },
      {
        "label": "high",
        "type": "text"
      },
      {
        "label": "mid",
        "type": "text"
      },
      {
        "label": "codes[mid]",
        "type": "text"
      },
      {
        "label": "Action",
        "type": "select",
        "options": [
          "Found",
          "low = mid + 1",
          "high = mid - 1"
        ]
      }
    ],
    "rows": [
      [
        {
          "v": "0",
          "g": true
        },
        {
          "v": "10",
          "g": true
        },
        {
          "v": "5"
        },
        {
          "v": "34"
        },
        {
          "v": "low = mid + 1"
        }
      ],
      [
        {
          "v": "6"
        },
        {
          "v": "10"
        },
        {
          "v": "8"
        },
        {
          "v": "66"
        },
        {
          "v": "high = mid - 1"
        }
      ],
      [
        {
          "v": "6"
        },
        {
          "v": "7"
        },
        {
          "v": "6"
        },
        {
          "v": "40"
        },
        {
          "v": "low = mid + 1"
        }
      ],
      [
        {
          "v": "7"
        },
        {
          "v": "7"
        },
        {
          "v": "7"
        },
        {
          "v": "52"
        },
        {
          "v": "Found"
        }
      ]
    ],
    "markScheme": "Award [5] for a fully correct table; marks are awarded in proportion to correct cells (18 cells to complete). Award follow-through for values that are correct given an earlier error."
  },
  {
    "id": "ib_b2_075",
    "unit": "B2",
    "title": "B2.4 Choosing a search technique",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A phone directory app stores 200 000 entries sorted alphabetically by name.\n\nExplain why binary search is suitable for finding a phone number from a name, but linear search is needed to find the name that belongs to a given phone number.",
    "marks": 4,
    "specReference": "B2.4.2",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain why binary search is suitable for finding a phone number from a name, but linear search is needed to find the name that belongs to a given phone number.",
        "keywords": [
          "sorted",
          "binary",
          "halve",
          "linear",
          "O(log n)",
          "O(n)"
        ],
        "maxMarks": 4,
        "criteria": [
          "Binary search requires data sorted by the search key; the directory is sorted by name",
          "so it halves the search area each comparison: about 18 comparisons for 200 000 / O(log n)",
          "The data is not sorted by phone number, so binary search cannot be used for numbers",
          "Linear search checks every entry in turn: up to 200 000 comparisons / O(n)"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Binary search requires data sorted by the search key; the directory is sorted by name [1]\n• so it halves the search area each comparison: about 18 comparisons for 200 000 / O(log n) [1]\n• The data is not sorted by phone number, so binary search cannot be used for numbers [1]\n• Linear search checks every entry in turn: up to 200 000 comparisons / O(n) [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Binary search requires data sorted by the search key; the directory is sorted by name",
        "description": "Binary search requires data sorted by the search key; the directory is sorted by name",
        "acceptedAnswers": [
          "sorted by name",
          "requires sorted"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "so it halves the search area each comparison: about 18 comparisons for 200 000 / O(log n)",
        "description": "so it halves the search area each comparison: about 18 comparisons for 200 000 / O(log n)",
        "acceptedAnswers": [
          "halves",
          "18",
          "O(log n)"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "The data is not sorted by phone number, so binary search cannot be used for numbers",
        "description": "The data is not sorted by phone number, so binary search cannot be used for numbers",
        "acceptedAnswers": [
          "not sorted by number"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Linear search checks every entry in turn: up to 200 000 comparisons / O(n)",
        "description": "Linear search checks every entry in turn: up to 200 000 comparisons / O(n)",
        "acceptedAnswers": [
          "every entry",
          "200 000",
          "O(n)"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_076",
    "unit": "B2",
    "title": "B2.4 Search comparisons",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "inspect",
    "brief": "Answer the following questions about searching.",
    "marks": 4,
    "specReference": "B2.4.2",
    "commandWord": "Calculate",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Maximum number of comparisons for a binary search of 1000 sorted items",
        "a": [
          "10"
        ]
      },
      {
        "q": "Maximum number of comparisons for a linear search of 1000 items",
        "a": [
          "1000"
        ]
      },
      {
        "q": "Maximum comparisons for binary search of 31 items",
        "a": [
          "5"
        ]
      },
      {
        "q": "Best-case number of comparisons for a linear search",
        "a": [
          "1"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• Maximum number of comparisons for a binary search of 1000 sorted items → 10 [1]\n• Maximum number of comparisons for a linear search of 1000 items → 1000 [1]\n• Maximum comparisons for binary search of 31 items → 5 [1]\n• Best-case number of comparisons for a linear search → 1 [1]"
  },
  {
    "id": "ib_b2_077",
    "unit": "B2",
    "title": "B2.4 Bubble sort passes",
    "level": "Sort by hand",
    "difficulty": "Easy",
    "type": "sort",
    "brief": "Sort this list into ascending order by hand using a bubble sort: 29, 12, 41, 7, 33. Write the list after each complete pass (separated by commas). Stop when the next pass would make no swaps.",
    "marks": 3,
    "specReference": "B2.4.3",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "algo": "bubble",
    "data": [
      29,
      12,
      41,
      7,
      33
    ],
    "desc": false,
    "rows": [
      [
        "12, 29, 7, 33, 41"
      ],
      [
        "12, 7, 29, 33, 41"
      ],
      [
        "7, 12, 29, 33, 41"
      ]
    ],
    "labels": [
      "After pass 1",
      "After pass 2",
      "After pass 3"
    ],
    "hint": "In each pass compare neighbours from left to right and swap them if they are out of order.",
    "markScheme": "Award [1] for each correct pass:\n• Pass 1: 12, 29, 7, 33, 41 [1]\n• Pass 2: 12, 7, 29, 33, 41 [1]\n• Pass 3: 7, 12, 29, 33, 41 [1]\nNote to examiners: a fourth pass makes no swaps and confirms the list is sorted."
  },
  {
    "id": "ib_b2_078",
    "unit": "B2",
    "title": "B2.4 Trace a selection sort",
    "level": "Trace table",
    "difficulty": "Easy",
    "type": "table",
    "brief": "A selection sort (ascending) finds the smallest item in the unsorted part and swaps it into position. Complete the list after each pass.\n\nStart: [64, 25, 12, 22, 11]",
    "marks": 4,
    "specReference": "B2.4.3",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "Pass",
        "type": "text"
      },
      {
        "label": "List after pass",
        "type": "text"
      },
      {
        "label": "Item placed",
        "type": "text"
      }
    ],
    "rows": [
      [
        {
          "v": "1",
          "g": true
        },
        {
          "v": "[11, 25, 12, 22, 64]"
        },
        {
          "v": "11"
        }
      ],
      [
        {
          "v": "2",
          "g": true
        },
        {
          "v": "[11, 12, 25, 22, 64]"
        },
        {
          "v": "12"
        }
      ],
      [
        {
          "v": "3",
          "g": true
        },
        {
          "v": "[11, 12, 22, 25, 64]"
        },
        {
          "v": "22"
        }
      ],
      [
        {
          "v": "4",
          "g": true
        },
        {
          "v": "[11, 12, 22, 25, 64]"
        },
        {
          "v": "25"
        }
      ]
    ],
    "markScheme": "Award [4] for a fully correct table; marks are awarded in proportion to correct cells (8 cells to complete). Award follow-through for values that are correct given an earlier error."
  },
  {
    "id": "ib_b2_079",
    "unit": "B2",
    "title": "B2.4 Bubble sort with early exit",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "Write a program that inputs integers separated by spaces, sorts them into ascending order with a bubble sort (do NOT use sort() or sorted()), and stops early when a pass makes no swaps. Output the sorted list and the number of passes made (including the final pass with no swaps, unless the loop ends after n-1 passes).\n\n• Prompt: `Numbers: `\n• Output example:\n`Sorted: [1, 4, 5, 8]`\n`Passes: 3`",
    "marks": 6,
    "specReference": "B2.4.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "nums = [int(x) for x in input(\"Numbers: \").split()]\n",
    "solution": "nums = [int(x) for x in input(\"Numbers: \").split()]\nn = len(nums)\npasses = 0\nswapped = True\nwhile swapped and passes < n - 1:\n    swapped = False\n    passes = passes + 1\n    for i in range(n - passes):\n        if nums[i] > nums[i + 1]:\n            nums[i], nums[i + 1] = nums[i + 1], nums[i]\n            swapped = True\nprint(f\"Sorted: {nums}\")\nprint(f\"Passes: {passes}\")",
    "tests": [
      {
        "in": [
          "5 1 4 8"
        ],
        "out": "Sorted: [1, 4, 5, 8]\nPasses: 2",
        "m": 1
      },
      {
        "in": [
          "1 2 3 4 5"
        ],
        "out": "Sorted: [1, 2, 3, 4, 5]\nPasses: 1",
        "m": 1
      },
      {
        "in": [
          "9 7 5 3 1"
        ],
        "out": "Sorted: [1, 3, 5, 7, 9]\nPasses: 4",
        "m": 2
      },
      {
        "in": [
          "3 3 1"
        ],
        "out": "Sorted: [1, 3, 3]\nPasses: 2",
        "m": 1
      },
      {
        "in": [
          "42"
        ],
        "out": "Sorted: [42]\nPasses: 0",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [6]:\n• Outer loop repeats while swaps occur [1]\n• Inner loop compares adjacent items [1]\n• Swap performed correctly [1]\n• Swapped flag reset each pass and set on swap [1]\n• Inner range reduces each pass / passes counted [1]\n• Correct output format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Outer loop repeats while swaps occur",
        "description": "Outer loop repeats while swaps occur",
        "acceptedAnswers": [
          "while swapped"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Inner loop compares adjacent items",
        "description": "Inner loop compares adjacent items",
        "acceptedAnswers": [
          "nums[i] > nums[i + 1]"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Swap performed correctly",
        "description": "Swap performed correctly",
        "acceptedAnswers": [
          "nums[i], nums[i + 1] = nums[i + 1], nums[i]",
          "temp"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Swapped flag reset each pass and set on swap",
        "description": "Swapped flag reset each pass and set on swap",
        "acceptedAnswers": [
          "swapped = False",
          "swapped = True"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Inner range reduces each pass / passes counted",
        "description": "Inner range reduces each pass / passes counted",
        "acceptedAnswers": [
          "n - passes",
          "passes + 1"
        ]
      },
      {
        "id": "MP6",
        "marks": 1,
        "criterion": "Correct output format",
        "description": "Correct output format",
        "acceptedAnswers": [
          "Sorted:",
          "Passes:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_080",
    "unit": "B2",
    "title": "B2.4 Selection sort descending",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "Write a program that inputs exam scores separated by spaces and uses a selection sort (do NOT use sort() or sorted()) to arrange them in descending order. Output the sorted list and the number of swaps performed (do not count a swap when the largest item is already in position).\n\n• Prompt: `Scores: `\n• Output example:\n`[90, 72, 55, 41]`\n`Swaps: 2`",
    "marks": 5,
    "specReference": "B2.4.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "scores = [int(x) for x in input(\"Scores: \").split()]\n",
    "solution": "scores = [int(x) for x in input(\"Scores: \").split()]\nswaps = 0\nfor i in range(len(scores) - 1):\n    big = i\n    for j in range(i + 1, len(scores)):\n        if scores[j] > scores[big]:\n            big = j\n    if big != i:\n        scores[i], scores[big] = scores[big], scores[i]\n        swaps = swaps + 1\nprint(scores)\nprint(f\"Swaps: {swaps}\")",
    "tests": [
      {
        "in": [
          "55 90 41 72"
        ],
        "out": "[90, 72, 55, 41]\nSwaps: 3",
        "m": 2
      },
      {
        "in": [
          "100 80 60"
        ],
        "out": "[100, 80, 60]\nSwaps: 0",
        "m": 1
      },
      {
        "in": [
          "1 2 3 4 5"
        ],
        "out": "[5, 4, 3, 2, 1]\nSwaps: 2",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Outer loop over positions 0 to n-2 [1]\n• Inner loop finds index of largest remaining item [1]\n• Swap into position i [1]\n• Swap counted only when big != i [1]\n• Outputs list and swap count [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Outer loop over positions 0 to n-2",
        "description": "Outer loop over positions 0 to n-2",
        "acceptedAnswers": [
          "range(len(scores) - 1)"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Inner loop finds index of largest remaining item",
        "description": "Inner loop finds index of largest remaining item",
        "acceptedAnswers": [
          "scores[j] > scores[big]"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Swap into position i",
        "description": "Swap into position i",
        "acceptedAnswers": [
          "scores[i], scores[big] = scores[big], scores[i]"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Swap counted only when big != i",
        "description": "Swap counted only when big != i",
        "acceptedAnswers": [
          "if big != i"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Outputs list and swap count",
        "description": "Outputs list and swap count",
        "acceptedAnswers": [
          "print(scores)",
          "Swaps:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_081",
    "unit": "B2",
    "title": "B2.4 Evaluate bubble and selection sort",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A school sorts the results of 30 students after every test. The list is usually almost sorted already because results change little between tests.\n\nEvaluate the use of bubble sort and selection sort for this task.",
    "marks": 6,
    "specReference": "B2.4.3",
    "commandWord": "Evaluate",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Evaluate the use of bubble sort and selection sort for this task.",
        "keywords": [
          "O(n^2)",
          "O(n)",
          "early exit",
          "swaps",
          "nearly sorted",
          "conclusion"
        ],
        "maxMarks": 6,
        "criteria": [
          "0: No relevant knowledge.",
          "1-2: Describes how one or both sorts work with little evaluation.",
          "3-4: Compares efficiency of both sorts with some use of Big O, partly applied to the almost-sorted scenario.",
          "5-6: Balanced evaluation of time/space complexity and swaps, clearly applied to small, nearly-sorted data, with a justified conclusion.",
          "Both O(n²) worst case, O(1) space.",
          "Optimised bubble sort best case O(n).",
          "Selection sort comparisons fixed at n(n-1)/2.",
          "Selection sort minimises swaps.",
          "With n = 30 the difference is small."
        ]
      }
    ],
    "markScheme": "Use the markbands below. Award the band that best fits the response.\nMarks | Level descriptor\n0 | No relevant knowledge.\n1-2 | Describes how one or both sorts work with little evaluation.\n3-4 | Compares efficiency of both sorts with some use of Big O, partly applied to the almost-sorted scenario.\n5-6 | Balanced evaluation of time/space complexity and swaps, clearly applied to small, nearly-sorted data, with a justified conclusion.\n\nIndicative content (responses may include):\n• Both O(n²) worst case, O(1) space.\n• Optimised bubble sort best case O(n).\n• Selection sort comparisons fixed at n(n-1)/2.\n• Selection sort minimises swaps.\n• With n = 30 the difference is small.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Both are O(n²) in the worst case and O(1) extra space (in-place)",
        "description": "Both are O(n²) in the worst case and O(1) extra space (in-place)",
        "acceptedAnswers": [
          "O(n²)",
          "O(n^2)",
          "O(1)"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Bubble sort with an early-exit flag is O(n) on an almost sorted list - one or two passes",
        "description": "Bubble sort with an early-exit flag is O(n) on an almost sorted list - one or two passes",
        "acceptedAnswers": [
          "early exit",
          "O(n)",
          "best case"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Selection sort always makes about n²/2 comparisons even if sorted - no early exit",
        "description": "Selection sort always makes about n²/2 comparisons even if sorted - no early exit",
        "acceptedAnswers": [
          "always",
          "n²/2",
          "no early exit"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Selection sort makes at most n-1 swaps, bubble sort may make many swaps (writes)",
        "description": "Selection sort makes at most n-1 swaps, bubble sort may make many swaps (writes)",
        "acceptedAnswers": [
          "n-1 swaps",
          "fewer swaps"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "For only 30 items either is fast; scalability matters little here",
        "description": "For only 30 items either is fast; scalability matters little here",
        "acceptedAnswers": [
          "small n",
          "30 items"
        ]
      },
      {
        "id": "MP6",
        "marks": 1,
        "criterion": "Justified conclusion: bubble sort (with flag) better for nearly sorted data",
        "description": "Justified conclusion: bubble sort (with flag) better for nearly sorted data",
        "acceptedAnswers": [
          "conclusion",
          "bubble sort"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_082",
    "unit": "B2",
    "title": "B2.4 Counting comparisons and swaps",
    "level": "Core",
    "difficulty": "Hard",
    "type": "inspect",
    "brief": "A bubble sort without an early-exit flag always makes n - 1 passes, and pass k compares n - k pairs.",
    "marks": 4,
    "specReference": "B2.4.3",
    "commandWord": "Calculate",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "How many comparisons does it make for 6 items?",
        "a": [
          "15"
        ]
      },
      {
        "q": "How many comparisons does a selection sort make for 6 items?",
        "a": [
          "15"
        ]
      },
      {
        "q": "How many swaps does a bubble sort make to sort [4, 3, 2, 1] into ascending order?",
        "a": [
          "6"
        ]
      },
      {
        "q": "How many swaps does a selection sort make to sort [4, 3, 2, 1] into ascending order? (no swap when an item is already in place)",
        "a": [
          "2"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• How many comparisons does it make for 6 items? → 15 [1]\n• How many comparisons does a selection sort make for 6 items? → 15 [1]\n• How many swaps does a bubble sort make to sort [4, 3, 2, 1] into ascending order? → 6 [1]\n• How many swaps does a selection sort make to sort [4, 3, 2, 1] into ascending order? (no swap when an item is already in place) → 2 [1]"
  },
  {
    "id": "ib_b2_083",
    "unit": "B2",
    "title": "B2.4 Fundamentals of recursion",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Explain the fundamental concept of recursion, referring to the base case and the recursive case.",
    "marks": 4,
    "specReference": "B2.4.4",
    "commandWord": "Explain",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain the fundamental concept of recursion, referring to the base case and the recursive case.",
        "keywords": [
          "calls itself",
          "base case",
          "recursive case",
          "smaller",
          "stack"
        ],
        "maxMarks": 4,
        "criteria": [
          "A recursive function calls itself",
          "Recursive case: solves the problem in terms of a smaller/simpler instance of the same problem",
          "Base case: a condition with a direct answer that stops further calls",
          "Each call moves closer to the base case; calls are stored on the call stack and return in reverse order"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• A recursive function calls itself [1]\n• Recursive case: solves the problem in terms of a smaller/simpler instance of the same problem [1]\n• Base case: a condition with a direct answer that stops further calls [1]\n• Each call moves closer to the base case; calls are stored on the call stack and return in reverse order [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "A recursive function calls itself",
        "description": "A recursive function calls itself",
        "acceptedAnswers": [
          "calls itself"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Recursive case: solves the problem in terms of a smaller/simpler instance of the same problem",
        "description": "Recursive case: solves the problem in terms of a smaller/simpler instance of the same problem",
        "acceptedAnswers": [
          "smaller",
          "simpler",
          "sub-problem"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Base case: a condition with a direct answer that stops further calls",
        "description": "Base case: a condition with a direct answer that stops further calls",
        "acceptedAnswers": [
          "base case",
          "stops",
          "terminates"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Each call moves closer to the base case; calls are stored on the call stack and return in reverse order",
        "description": "Each call moves closer to the base case; calls are stored on the call stack and return in reverse order",
        "acceptedAnswers": [
          "closer to base case",
          "call stack",
          "unwind"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_084",
    "unit": "B2",
    "title": "B2.4 Limitations of recursion",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Describe three limitations of using recursion.",
    "marks": 3,
    "specReference": "B2.4.4",
    "commandWord": "Describe",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Describe three limitations of using recursion.",
        "keywords": [
          "stack",
          "memory",
          "overflow",
          "overhead",
          "debug"
        ],
        "maxMarks": 3,
        "criteria": [
          "Each call adds a stack frame, so memory use grows with the depth of recursion",
          "Too many calls / missing base case causes stack overflow (RecursionError in Python)",
          "Function call overhead makes it slower than an equivalent loop / can be harder to trace and debug / some versions repeat work"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• Each call adds a stack frame, so memory use grows with the depth of recursion [1]\n• Too many calls / missing base case causes stack overflow (RecursionError in Python) [1]\n• Function call overhead makes it slower than an equivalent loop / can be harder to trace and debug / some versions repeat work [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Each call adds a stack frame, so memory use grows with the depth of recursion",
        "description": "Each call adds a stack frame, so memory use grows with the depth of recursion",
        "acceptedAnswers": [
          "stack frame",
          "memory"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Too many calls / missing base case causes stack overflow (RecursionError in Python)",
        "description": "Too many calls / missing base case causes stack overflow (RecursionError in Python)",
        "acceptedAnswers": [
          "stack overflow",
          "RecursionError"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Function call overhead makes it slower than an equivalent loop / can be harder to trace and debug / some versions repeat work",
        "description": "Function call overhead makes it slower than an equivalent loop / can be harder to trace and debug / some versions repeat work",
        "acceptedAnswers": [
          "overhead",
          "slower",
          "hard to trace",
          "repeated calculation"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_085",
    "unit": "B2",
    "title": "B2.4 Trace a recursive function",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "inspect",
    "brief": "Study the recursive function below.",
    "marks": 4,
    "specReference": "B2.4.5",
    "commandWord": "Trace",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "code": "1  def mystery(n):\n2      if n == 1:\n3          return 1\n4      return n + mystery(n - 1)",
    "questions": [
      {
        "q": "State the value returned by mystery(4)",
        "a": [
          "10"
        ]
      },
      {
        "q": "State the value returned by mystery(1)",
        "a": [
          "1"
        ]
      },
      {
        "q": "How many times is mystery called in total when mystery(5) is called?",
        "a": [
          "5"
        ]
      },
      {
        "q": "State the line number of the base case condition",
        "a": [
          "2",
          "line 2"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• State the value returned by mystery(4) → 10 [1]\n• State the value returned by mystery(1) → 1 [1]\n• How many times is mystery called in total when mystery(5) is called? → 5 [1]\n• State the line number of the base case condition → 2 (accept line 2) [1]"
  },
  {
    "id": "ib_b2_086",
    "unit": "B2",
    "title": "B2.4 Trace recursive calls",
    "level": "Trace table",
    "difficulty": "Moderate",
    "type": "table",
    "brief": "def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n\nprint(power(3, 4))\n\nComplete the table for each call, in the order the calls are made, and the value each call returns.",
    "marks": 5,
    "specReference": "B2.4.5",
    "commandWord": "Trace",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "columns": [
      {
        "label": "Call",
        "type": "text"
      },
      {
        "label": "exp == 0?",
        "type": "text"
      },
      {
        "label": "Value returned",
        "type": "text"
      }
    ],
    "rows": [
      [
        {
          "v": "power(3, 4)",
          "g": true
        },
        {
          "v": "No"
        },
        {
          "v": "81"
        }
      ],
      [
        {
          "v": "power(3, 3)",
          "g": true
        },
        {
          "v": "No"
        },
        {
          "v": "27"
        }
      ],
      [
        {
          "v": "power(3, 2)",
          "g": true
        },
        {
          "v": "No"
        },
        {
          "v": "9"
        }
      ],
      [
        {
          "v": "power(3, 1)",
          "g": true
        },
        {
          "v": "No"
        },
        {
          "v": "3"
        }
      ],
      [
        {
          "v": "power(3, 0)",
          "g": true
        },
        {
          "v": "Yes"
        },
        {
          "v": "1"
        }
      ]
    ],
    "markScheme": "Award [5] for a fully correct table; marks are awarded in proportion to correct cells (10 cells to complete). Award follow-through for values that are correct given an earlier error."
  },
  {
    "id": "ib_b2_087",
    "unit": "B2",
    "title": "B2.4 Recursive factorial",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "code",
    "brief": "Write a recursive function factorial(n) that returns n! (with 0! = 1). The main program inputs n and outputs the result. You must use recursion, not a loop.\n\n• Prompt: `n: `\n• Output example: `5! = 120`",
    "marks": 4,
    "specReference": "B2.4.5",
    "commandWord": "Construct",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "def factorial(n):\n    pass\n\nn = int(input(\"n: \"))\n",
    "solution": "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nn = int(input(\"n: \"))\nprint(f\"{n}! = {factorial(n)}\")",
    "tests": [
      {
        "in": [
          "5"
        ],
        "out": "5! = 120",
        "m": 1
      },
      {
        "in": [
          "0"
        ],
        "out": "0! = 1",
        "m": 1
      },
      {
        "in": [
          "1"
        ],
        "out": "1! = 1",
        "m": 1
      },
      {
        "in": [
          "10"
        ],
        "out": "10! = 3628800",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Base case returns 1 for n == 0 [1]\n• Recursive call with n - 1 [1]\n• Result multiplied by n and returned [1]\n• Output in required format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Base case returns 1 for n == 0",
        "description": "Base case returns 1 for n == 0",
        "acceptedAnswers": [
          "if n == 0",
          "return 1"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Recursive call with n - 1",
        "description": "Recursive call with n - 1",
        "acceptedAnswers": [
          "factorial(n - 1)"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Result multiplied by n and returned",
        "description": "Result multiplied by n and returned",
        "acceptedAnswers": [
          "return n *"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Output in required format",
        "description": "Output in required format",
        "acceptedAnswers": [
          "! ="
        ]
      }
    ]
  },
  {
    "id": "ib_b2_088",
    "unit": "B2",
    "title": "B2.4 Recursive sum of digits",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a recursive function digit_sum(n) that returns the sum of the digits of a non-negative integer using n % 10 and n // 10. No loops are allowed.\n\n• Prompt: `Number: `\n• Output example: `Digit sum: 19`",
    "marks": 4,
    "specReference": "B2.4.5",
    "commandWord": "Construct",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "def digit_sum(n):\n    pass\n\nnum = int(input(\"Number: \"))\n",
    "solution": "def digit_sum(n):\n    if n < 10:\n        return n\n    return n % 10 + digit_sum(n // 10)\n\nnum = int(input(\"Number: \"))\nprint(f\"Digit sum: {digit_sum(num)}\")",
    "tests": [
      {
        "in": [
          "4096"
        ],
        "out": "Digit sum: 19",
        "m": 1
      },
      {
        "in": [
          "7"
        ],
        "out": "Digit sum: 7",
        "m": 1
      },
      {
        "in": [
          "0"
        ],
        "out": "Digit sum: 0",
        "m": 1
      },
      {
        "in": [
          "123456789"
        ],
        "out": "Digit sum: 45",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Base case for a single digit [1]\n• Last digit extracted with % 10 [1]\n• Recursive call on n // 10 [1]\n• Results combined and output [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Base case for a single digit",
        "description": "Base case for a single digit",
        "acceptedAnswers": [
          "if n < 10",
          "if n == 0"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Last digit extracted with % 10",
        "description": "Last digit extracted with % 10",
        "acceptedAnswers": [
          "n % 10"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Recursive call on n // 10",
        "description": "Recursive call on n // 10",
        "acceptedAnswers": [
          "digit_sum(n // 10)"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Results combined and output",
        "description": "Results combined and output",
        "acceptedAnswers": [
          "Digit sum:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_089",
    "unit": "B2",
    "title": "B2.4 Recursive string reverse",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a recursive function reverse(s) that returns the string s reversed. Do not use loops or [::-1].\n\n• Prompt: `Text: `\n• Output example: `Reversed: nohtyp`",
    "marks": 4,
    "specReference": "B2.4.5",
    "commandWord": "Construct",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "def reverse(s):\n    pass\n\ntext = input(\"Text: \")\n",
    "solution": "def reverse(s):\n    if len(s) <= 1:\n        return s\n    return reverse(s[1:]) + s[0]\n\ntext = input(\"Text: \")\nprint(\"Reversed: \" + reverse(text))",
    "tests": [
      {
        "in": [
          "python"
        ],
        "out": "Reversed: nohtyp",
        "m": 1
      },
      {
        "in": [
          "a"
        ],
        "out": "Reversed: a",
        "m": 1
      },
      {
        "in": [
          "level up"
        ],
        "out": "Reversed: pu level",
        "m": 1
      },
      {
        "in": [
          "IB"
        ],
        "out": "Reversed: BI",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• Base case for empty/one-character string [1]\n• Recursive call on a shorter substring [1]\n• First character appended after the reversed remainder [1]\n• Output in required format [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Base case for empty/one-character string",
        "description": "Base case for empty/one-character string",
        "acceptedAnswers": [
          "len(s) <= 1",
          "s == \"\""
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Recursive call on a shorter substring",
        "description": "Recursive call on a shorter substring",
        "acceptedAnswers": [
          "reverse(s[1:])"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "First character appended after the reversed remainder",
        "description": "First character appended after the reversed remainder",
        "acceptedAnswers": [
          "+ s[0]"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Output in required format",
        "description": "Output in required format",
        "acceptedAnswers": [
          "Reversed: "
        ]
      }
    ]
  },
  {
    "id": "ib_b2_090",
    "unit": "B2",
    "title": "B2.4 Recursive countdown and count of steps",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "The Collatz rule: if n is even, the next value is n // 2; if odd, the next value is 3n + 1. Write a recursive function collatz(n) that prints each value on its own line, starting with n and ending with 1, and returns the number of steps taken to reach 1. The main program then outputs `Steps: x`.\n\n• Prompt: `Start: `\n• Example for 6: lines 6 3 10 5 16 8 4 2 1, then `Steps: 8`",
    "marks": 5,
    "specReference": "B2.4.5",
    "commandWord": "Construct",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "def collatz(n):\n    pass\n\nstart = int(input(\"Start: \"))\n",
    "solution": "def collatz(n):\n    print(n)\n    if n == 1:\n        return 0\n    if n % 2 == 0:\n        return 1 + collatz(n // 2)\n    return 1 + collatz(3 * n + 1)\n\nstart = int(input(\"Start: \"))\nsteps = collatz(start)\nprint(f\"Steps: {steps}\")",
    "tests": [
      {
        "in": [
          "6"
        ],
        "out": "6\n3\n10\n5\n16\n8\n4\n2\n1\nSteps: 8",
        "m": 2
      },
      {
        "in": [
          "1"
        ],
        "out": "1\nSteps: 0",
        "m": 1
      },
      {
        "in": [
          "7"
        ],
        "out": "7\n22\n11\n34\n17\n52\n26\n13\n40\n20\n10\n5\n16\n8\n4\n2\n1\nSteps: 16",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• Prints the current value at each call [1]\n• Base case n == 1 returns 0 [1]\n• Even case recursive call with n // 2 [1]\n• Odd case recursive call with 3 * n + 1 [1]\n• Steps accumulated by returning 1 + recursive result and output [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Prints the current value at each call",
        "description": "Prints the current value at each call",
        "acceptedAnswers": [
          "print(n)"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Base case n == 1 returns 0",
        "description": "Base case n == 1 returns 0",
        "acceptedAnswers": [
          "if n == 1",
          "return 0"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Even case recursive call with n // 2",
        "description": "Even case recursive call with n // 2",
        "acceptedAnswers": [
          "collatz(n // 2)"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Odd case recursive call with 3 * n + 1",
        "description": "Odd case recursive call with 3 * n + 1",
        "acceptedAnswers": [
          "collatz(3 * n + 1)"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Steps accumulated by returning 1 + recursive result and output",
        "description": "Steps accumulated by returning 1 + recursive result and output",
        "acceptedAnswers": [
          "return 1 +",
          "Steps:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_091",
    "unit": "B2",
    "title": "B2.4 Quicksort as a recursive algorithm",
    "level": "Core",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "Explain how quicksort uses recursion to sort a list.",
    "marks": 4,
    "specReference": "B2.4.4",
    "commandWord": "Explain",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Explain how quicksort uses recursion to sort a list.",
        "keywords": [
          "pivot",
          "partition",
          "recursive",
          "base case",
          "sub-list"
        ],
        "maxMarks": 4,
        "criteria": [
          "A pivot element is chosen",
          "The list is partitioned into items less than the pivot and items greater than (or equal to) the pivot",
          "Quicksort is called recursively on each partition/sub-list",
          "Base case: a sub-list of 0 or 1 items is already sorted; results combined (left + pivot + right)"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• A pivot element is chosen [1]\n• The list is partitioned into items less than the pivot and items greater than (or equal to) the pivot [1]\n• Quicksort is called recursively on each partition/sub-list [1]\n• Base case: a sub-list of 0 or 1 items is already sorted; results combined (left + pivot + right) [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "A pivot element is chosen",
        "description": "A pivot element is chosen",
        "acceptedAnswers": [
          "pivot"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "The list is partitioned into items less than the pivot and items greater than (or equal to) the pivot",
        "description": "The list is partitioned into items less than the pivot and items greater than (or equal to) the pivot",
        "acceptedAnswers": [
          "partition",
          "less than",
          "greater than"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Quicksort is called recursively on each partition/sub-list",
        "description": "Quicksort is called recursively on each partition/sub-list",
        "acceptedAnswers": [
          "recursively",
          "each sub-list"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Base case: a sub-list of 0 or 1 items is already sorted; results combined (left + pivot + right)",
        "description": "Base case: a sub-list of 0 or 1 items is already sorted; results combined (left + pivot + right)",
        "acceptedAnswers": [
          "0 or 1 item",
          "base case",
          "combine"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_092",
    "unit": "B2",
    "title": "B2.4 Discuss recursion versus iteration",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "Recursion is often used for fractal image generation, traversing binary trees and sorting algorithms such as quicksort.\n\nDiscuss the advantages and disadvantages of using recursion rather than iteration to solve problems in computer science.",
    "marks": 8,
    "specReference": "B2.4.4",
    "commandWord": "Discuss",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Discuss the advantages and disadvantages of using recursion rather than iteration to solve problems in computer science.",
        "keywords": [
          "sub-problem",
          "tree",
          "fractal",
          "stack",
          "overflow",
          "overhead",
          "clearer",
          "conclusion"
        ],
        "maxMarks": 8,
        "criteria": [
          "0: No relevant knowledge.",
          "1-2: Limited points about recursion; mainly descriptive; little or no reference to iteration.",
          "3-4: Some advantages and disadvantages identified with partial explanation; limited use of examples.",
          "5-6: Advantages and disadvantages explained with examples such as trees, fractals or quicksort; reference to memory or efficiency; conclusion present.",
          "7-8: Balanced, well-reasoned discussion of a range of factors (clarity, suitability, memory/stack, speed, debugging) supported by examples, with a clear justified conclusion.",
          "Self-similar problems: fractals, binary tree traversal, quicksort/merge sort.",
          "Concise, readable code mirroring the definition.",
          "Call stack memory and stack overflow; Python's recursion limit.",
          "Call overhead makes iteration faster.",
          "Harder to trace; need for a reachable base case.",
          "Repeated work in naive recursion."
        ]
      }
    ],
    "markScheme": "Use the markbands below. Award the band that best fits the response.\nMarks | Level descriptor\n0 | No relevant knowledge.\n1-2 | Limited points about recursion; mainly descriptive; little or no reference to iteration.\n3-4 | Some advantages and disadvantages identified with partial explanation; limited use of examples.\n5-6 | Advantages and disadvantages explained with examples such as trees, fractals or quicksort; reference to memory or efficiency; conclusion present.\n7-8 | Balanced, well-reasoned discussion of a range of factors (clarity, suitability, memory/stack, speed, debugging) supported by examples, with a clear justified conclusion.\n\nIndicative content (responses may include):\n• Self-similar problems: fractals, binary tree traversal, quicksort/merge sort.\n• Concise, readable code mirroring the definition.\n• Call stack memory and stack overflow; Python's recursion limit.\n• Call overhead makes iteration faster.\n• Harder to trace; need for a reachable base case.\n• Repeated work in naive recursion.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "Recursion suits problems that divide into smaller self-similar sub-problems (fractals, trees, quicksort)",
        "description": "Recursion suits problems that divide into smaller self-similar sub-problems (fractals, trees, quicksort)",
        "acceptedAnswers": [
          "self-similar",
          "sub-problems"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Recursive code is often shorter/clearer and closer to the mathematical definition",
        "description": "Recursive code is often shorter/clearer and closer to the mathematical definition",
        "acceptedAnswers": [
          "shorter",
          "clearer",
          "elegant"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Natural for branching structures such as binary trees where iteration needs an explicit stack",
        "description": "Natural for branching structures such as binary trees where iteration needs an explicit stack",
        "acceptedAnswers": [
          "tree",
          "explicit stack"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Each call uses a stack frame - memory O(depth); risk of stack overflow for deep recursion",
        "description": "Each call uses a stack frame - memory O(depth); risk of stack overflow for deep recursion",
        "acceptedAnswers": [
          "stack frame",
          "stack overflow"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Function call overhead makes recursion generally slower than loops",
        "description": "Function call overhead makes recursion generally slower than loops",
        "acceptedAnswers": [
          "overhead",
          "slower"
        ]
      },
      {
        "id": "MP6",
        "marks": 1,
        "criterion": "Can be harder to trace/debug; missing base case causes infinite recursion",
        "description": "Can be harder to trace/debug; missing base case causes infinite recursion",
        "acceptedAnswers": [
          "harder to debug",
          "base case"
        ]
      },
      {
        "id": "MP7",
        "marks": 1,
        "criterion": "Some naive recursive solutions repeat work (e.g. Fibonacci) giving poor time complexity",
        "description": "Some naive recursive solutions repeat work (e.g. Fibonacci) giving poor time complexity",
        "acceptedAnswers": [
          "repeated work",
          "Fibonacci",
          "exponential"
        ]
      },
      {
        "id": "MP8",
        "marks": 1,
        "criterion": "Balanced conclusion: choose recursion when the problem structure is recursive and depth is limited, otherwise iteration",
        "description": "Balanced conclusion: choose recursion when the problem structure is recursive and depth is limited, otherwise iteration",
        "acceptedAnswers": [
          "conclusion",
          "depends"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_093",
    "unit": "B2",
    "title": "B2.4 Exam-style: recursive list total",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A program stores the number of steps walked each day in a list, e.g. steps = [4200, 8100, 6500, 9900].\n\ndef total(data, i):\n    if i == len(data):\n        return 0\n    return data[i] + total(data, i + 1)",
    "marks": 9,
    "specReference": "B2.4.5",
    "commandWord": "Construct",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "6(a)",
        "question": "Identify the base case in total.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• i == len(data), returning 0 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "i == len(data), returning 0",
            "description": "i == len(data), returning 0",
            "acceptedAnswers": [
              "i == len(data)",
              "return 0"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "6(b)",
        "question": "State the value returned by total(steps, 2).",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• 16400 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "16400",
            "description": "16400",
            "acceptedAnswers": [
              "16400"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "6(c)",
        "question": "State the number of calls made to total when total(steps, 0) is executed.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• 5 (indices 0, 1, 2, 3 and the base case at 4) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "5 (indices 0, 1, 2, 3 and the base case at 4)",
            "description": "5 (indices 0, 1, 2, 3 and the base case at 4)",
            "acceptedAnswers": [
              "5"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "6(d)",
        "question": "Construct a recursive function count_over(data, i, limit) that returns how many values from index i onwards are greater than limit.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Base case at end of list returns 0 [1]\n• Compares data[i] with limit [1]\n• Adds 1 when greater, otherwise 0 [1]\n• Recursive call with i + 1 in both branches [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Base case at end of list returns 0",
            "description": "Base case at end of list returns 0",
            "acceptedAnswers": [
              "i == len(data)",
              "return 0"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Compares data[i] with limit",
            "description": "Compares data[i] with limit",
            "acceptedAnswers": [
              "data[i] > limit"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Adds 1 when greater, otherwise 0",
            "description": "Adds 1 when greater, otherwise 0",
            "acceptedAnswers": [
              "1 +"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Recursive call with i + 1 in both branches",
            "description": "Recursive call with i + 1 in both branches",
            "acceptedAnswers": [
              "count_over(data, i + 1, limit)"
            ]
          }
        ],
        "solution": "def count_over(data, i, limit):\n    if i == len(data):\n        return 0\n    if data[i] > limit:\n        return 1 + count_over(data, i + 1, limit)\n    return count_over(data, i + 1, limit)"
      },
      {
        "id": "p5",
        "label": "6(e)",
        "question": "Explain why an iterative solution may be preferred for a list containing one million values.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Recursion would need one million stack frames / exceed the recursion limit causing stack overflow [1]\n• A loop uses constant extra memory and avoids call overhead [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Recursion would need one million stack frames / exceed the recursion limit causing stack overflow",
            "description": "Recursion would need one million stack frames / exceed the recursion limit causing stack overflow",
            "acceptedAnswers": [
              "stack overflow",
              "recursion limit",
              "stack frames"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "A loop uses constant extra memory and avoids call overhead",
            "description": "A loop uses constant extra memory and avoids call overhead",
            "acceptedAnswers": [
              "O(1) memory",
              "constant",
              "overhead"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "6(a) Identify the base case in total.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "i == len(data), returning 0"
        ]
      },
      {
        "q": "6(b) State the value returned by total(steps, 2).",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "16400"
        ]
      },
      {
        "q": "6(c) State the number of calls made to total when total(steps, 0) is executed.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "5 (indices 0, 1, 2, 3 and the base case at 4)"
        ]
      },
      {
        "q": "6(d) Construct a recursive function count_over(data, i, limit) that returns how many values from index i onwards are greater than limit.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Base case at end of list returns 0",
          "Compares data[i] with limit",
          "Adds 1 when greater, otherwise 0",
          "Recursive call with i + 1 in both branches"
        ]
      },
      {
        "q": "6(e) Explain why an iterative solution may be preferred for a list containing one million values.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Recursion would need one million stack frames / exceed the recursion limit causing stack overflow",
          "A loop uses constant extra memory and avoids call overhead"
        ]
      }
    ],
    "markScheme": "6(a): Award [1] for each of the following, up to [1]:\n• i == len(data), returning 0 [1]\n6(b): Award [1] for each of the following, up to [1]:\n• 16400 [1]\n6(c): Award [1] for each of the following, up to [1]:\n• 5 (indices 0, 1, 2, 3 and the base case at 4) [1]\n6(d): Award [1] for each of the following, up to [4]:\n• Base case at end of list returns 0 [1]\n• Compares data[i] with limit [1]\n• Adds 1 when greater, otherwise 0 [1]\n• Recursive call with i + 1 in both branches [1]\n6(e): Award [1] for each of the following, up to [2]:\n• Recursion would need one million stack frames / exceed the recursion limit causing stack overflow [1]\n• A loop uses constant extra memory and avoids call overhead [1]"
  },
  {
    "id": "ib_b2_094",
    "unit": "B2",
    "title": "B2.5 File modes",
    "level": "Starter",
    "difficulty": "Easy",
    "type": "theory",
    "brief": "Describe the effect of opening a text file in Python with each of the modes \"r\", \"w\" and \"a\".",
    "marks": 3,
    "specReference": "B2.5.1",
    "commandWord": "Describe",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "questions": [
      {
        "q": "Describe the effect of opening a text file in Python with each of the modes \"r\", \"w\" and \"a\".",
        "keywords": [
          "read",
          "write",
          "overwrite",
          "append",
          "end"
        ],
        "maxMarks": 3,
        "criteria": [
          "\"r\": opens an existing file for reading only; error (FileNotFoundError) if it does not exist",
          "\"w\": opens for writing, creating the file or overwriting/erasing existing contents",
          "\"a\": opens for appending - new data is added to the end, existing contents kept"
        ]
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [3]:\n• \"r\": opens an existing file for reading only; error (FileNotFoundError) if it does not exist [1]\n• \"w\": opens for writing, creating the file or overwriting/erasing existing contents [1]\n• \"a\": opens for appending - new data is added to the end, existing contents kept [1]",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "\"r\": opens an existing file for reading only; error (FileNotFoundError) if it does not exist",
        "description": "\"r\": opens an existing file for reading only; error (FileNotFoundError) if it does not exist",
        "acceptedAnswers": [
          "read",
          "FileNotFoundError"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "\"w\": opens for writing, creating the file or overwriting/erasing existing contents",
        "description": "\"w\": opens for writing, creating the file or overwriting/erasing existing contents",
        "acceptedAnswers": [
          "overwrite",
          "erase",
          "create"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "\"a\": opens for appending - new data is added to the end, existing contents kept",
        "description": "\"a\": opens for appending - new data is added to the end, existing contents kept",
        "acceptedAnswers": [
          "append",
          "end",
          "kept"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_095",
    "unit": "B2",
    "title": "B2.5 Predict file contents",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "inspect",
    "brief": "Study the code below. The file log.txt does not exist before the program runs.",
    "marks": 4,
    "specReference": "B2.5.1",
    "commandWord": "Deduce",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "code": "f = open(\"log.txt\", \"w\")\nf.write(\"first\\n\")\nf.close()\nf = open(\"log.txt\", \"w\")\nf.write(\"start\\n\")\nf.close()\nf = open(\"log.txt\", \"a\")\nf.write(\"end\\n\")\nf.close()\nf = open(\"log.txt\", \"r\")\nprint(f.readlines())\nf.close()",
    "questions": [
      {
        "q": "How many lines does log.txt contain after the program runs?",
        "a": [
          "2"
        ]
      },
      {
        "q": "State the first line of log.txt",
        "a": [
          "start"
        ]
      },
      {
        "q": "State the last line of log.txt",
        "a": [
          "end"
        ]
      },
      {
        "q": "State the output of the final print statement",
        "a": [
          "['start\\n', 'end\\n']",
          "['start\\\\n', 'end\\\\n']"
        ]
      }
    ],
    "markScheme": "Award marks in proportion to correct answers (total [4]):\n• How many lines does log.txt contain after the program runs? → 2 [1]\n• State the first line of log.txt → start [1]\n• State the last line of log.txt → end [1]\n• State the output of the final print statement → ['start\\n', 'end\\n'] (accept ['start\\\\n', 'end\\\\n']) [1]"
  },
  {
    "id": "ib_b2_096",
    "unit": "B2",
    "title": "B2.5 Read scores from a file",
    "level": "Core",
    "difficulty": "Easy",
    "type": "code",
    "brief": "The file scores.txt contains one student per line in the form name,score, for example:\n\nAlice,85\nBob,42\n...\n\nWrite a program that inputs a pass mark, reads the file and outputs the name of every student whose score is at least the pass mark (in file order), followed by the count.\n\n• Prompt: `Pass mark: `\n• Output example:\nAlice\nCharlie\n`Passed: 2`",
    "marks": 4,
    "specReference": "B2.5.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "pass_mark = int(input(\"Pass mark: \"))\n",
    "solution": "pass_mark = int(input(\"Pass mark: \"))\npassed = 0\nf = open(\"scores.txt\", \"r\")\nfor line in f:\n    parts = line.strip().split(\",\")\n    if int(parts[1]) >= pass_mark:\n        print(parts[0])\n        passed = passed + 1\nf.close()\nprint(f\"Passed: {passed}\")",
    "tests": [
      {
        "in": [
          "80"
        ],
        "out": "Alice\nCharlie\nPassed: 2",
        "m": 1
      },
      {
        "in": [
          "50"
        ],
        "out": "Alice\nCharlie\nDiana\nEthan\nPassed: 4",
        "m": 1
      },
      {
        "in": [
          "95"
        ],
        "out": "Passed: 0",
        "m": 1
      },
      {
        "in": [
          "0"
        ],
        "out": "Alice\nBob\nCharlie\nDiana\nEthan\nPassed: 5",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• File opened in read mode and closed [1]\n• Each line stripped and split on comma [1]\n• Score converted to integer and compared with pass mark [1]\n• Names and count output correctly [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "File opened in read mode and closed",
        "description": "File opened in read mode and closed",
        "acceptedAnswers": [
          "open(\"scores.txt\", \"r\")",
          "close()"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Each line stripped and split on comma",
        "description": "Each line stripped and split on comma",
        "acceptedAnswers": [
          "strip()",
          "split(\",\")"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Score converted to integer and compared with pass mark",
        "description": "Score converted to integer and compared with pass mark",
        "acceptedAnswers": [
          "int(parts[1]) >= pass_mark"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Names and count output correctly",
        "description": "Names and count output correctly",
        "acceptedAnswers": [
          "Passed:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_097",
    "unit": "B2",
    "title": "B2.5 Write then read a file",
    "level": "Core",
    "difficulty": "Hard",
    "type": "code",
    "brief": "Write a program that inputs how many club members to register, then each member's name. Write each name to roster.txt on its own line (mode \"w\"), close the file, then reopen it in read mode and output the names in upper case with a line number.\n\n• Prompts: `How many: ` then `Name: ` for each member\n• Output example:\n`1 ALI`\n`2 BEA`",
    "marks": 5,
    "specReference": "B2.5.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "count = int(input(\"How many: \"))\n",
    "solution": "count = int(input(\"How many: \"))\nf = open(\"roster.txt\", \"w\")\nfor i in range(count):\n    name = input(\"Name: \")\n    f.write(name + \"\\n\")\nf.close()\nf = open(\"roster.txt\", \"r\")\nnumber = 1\nline = f.readline()\nwhile line != \"\":\n    print(f\"{number} {line.strip().upper()}\")\n    number = number + 1\n    line = f.readline()\nf.close()",
    "tests": [
      {
        "in": [
          "2",
          "Ali",
          "Bea"
        ],
        "out": "1 ALI\n2 BEA",
        "m": 2
      },
      {
        "in": [
          "1",
          "zoe"
        ],
        "out": "1 ZOE",
        "m": 1
      },
      {
        "in": [
          "3",
          "Max",
          "Ivy",
          "Sam"
        ],
        "out": "1 MAX\n2 IVY\n3 SAM",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• File opened with mode \"w\" [1]\n• Each name written followed by a newline [1]\n• File closed before re-opening in read mode [1]\n• Lines read until end of file (readline/for loop) [1]\n• Output numbered, stripped, upper-case lines [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "File opened with mode \"w\"",
        "description": "File opened with mode \"w\"",
        "acceptedAnswers": [
          "open(\"roster.txt\", \"w\")"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Each name written followed by a newline",
        "description": "Each name written followed by a newline",
        "acceptedAnswers": [
          "write(name + \"\\n\")"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "File closed before re-opening in read mode",
        "description": "File closed before re-opening in read mode",
        "acceptedAnswers": [
          "close()",
          "\"r\""
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Lines read until end of file (readline/for loop)",
        "description": "Lines read until end of file (readline/for loop)",
        "acceptedAnswers": [
          "readline",
          "for line in"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Output numbered, stripped, upper-case lines",
        "description": "Output numbered, stripped, upper-case lines",
        "acceptedAnswers": [
          "strip()",
          "upper()"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_098",
    "unit": "B2",
    "title": "B2.5 Append to a log file",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "Write a program that appends a new entry to audit.txt and then outputs the number of lines now in the file. The program inputs a user name and an action and appends one line in the form `user:action`. It repeats until the user name entered is `done`.\n\n• Prompts: `User: ` then `Action: ` (do not ask for an action after `done`)\n• Output example: `Lines in file: 2`\n\n(audit.txt starts empty.)",
    "marks": 4,
    "specReference": "B2.5.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "user = input(\"User: \")\n",
    "solution": "user = input(\"User: \")\nwhile user != \"done\":\n    action = input(\"Action: \")\n    f = open(\"audit.txt\", \"a\")\n    f.write(user + \":\" + action + \"\\n\")\n    f.close()\n    user = input(\"User: \")\nf = open(\"audit.txt\", \"r\")\nlines = f.readlines()\nf.close()\nprint(f\"Lines in file: {len(lines)}\")",
    "tests": [
      {
        "in": [
          "sam",
          "login",
          "kim",
          "print",
          "done"
        ],
        "out": "Lines in file: 2",
        "m": 1
      },
      {
        "in": [
          "done"
        ],
        "out": "Lines in file: 0",
        "m": 1
      },
      {
        "in": [
          "a",
          "x",
          "b",
          "y",
          "c",
          "z",
          "done"
        ],
        "out": "Lines in file: 3",
        "m": 2
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• File opened in append mode \"a\" [1]\n• Line written in user:action form with newline [1]\n• Loop until done [1]\n• File read back and lines counted [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "File opened in append mode \"a\"",
        "description": "File opened in append mode \"a\"",
        "acceptedAnswers": [
          "\"a\""
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Line written in user:action form with newline",
        "description": "Line written in user:action form with newline",
        "acceptedAnswers": [
          "user + \":\" + action"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Loop until done",
        "description": "Loop until done",
        "acceptedAnswers": [
          "while user != \"done\""
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "File read back and lines counted",
        "description": "File read back and lines counted",
        "acceptedAnswers": [
          "readlines",
          "len("
        ]
      }
    ]
  },
  {
    "id": "ib_b2_099",
    "unit": "B2",
    "title": "B2.5 Sales report from a file",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "code",
    "brief": "The file sales.txt stores one product per line as name,price,quantity, e.g. `Book,12.50,4`. Write a program that inputs a minimum value, reads the file and outputs every product whose sales value (price × quantity) is at least that minimum, formatted to 2 decimal places, then the grand total of ALL products.\n\n• Prompt: `Minimum: `\n• Output example:\n`Book 50.00`\n`Pen 12.00`\n`Total: 73.00`",
    "marks": 5,
    "specReference": "B2.5.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "minimum = float(input(\"Minimum: \"))\n",
    "solution": "minimum = float(input(\"Minimum: \"))\ngrand = 0\nwith open(\"sales.txt\", \"r\") as f:\n    for line in f:\n        name, price, qty = line.strip().split(\",\")\n        value = float(price) * int(qty)\n        grand = grand + value\n        if value >= minimum:\n            print(f\"{name} {value:.2f}\")\nprint(f\"Total: {grand:.2f}\")",
    "tests": [
      {
        "in": [
          "10"
        ],
        "out": "Book 50.00\nPen 12.00\nTotal: 73.00",
        "m": 2
      },
      {
        "in": [
          "0"
        ],
        "out": "Book 50.00\nPen 12.00\nRuler 4.00\nFolder 7.00\nTotal: 73.00",
        "m": 1
      },
      {
        "in": [
          "100"
        ],
        "out": "Total: 73.00",
        "m": 1
      },
      {
        "in": [
          "7"
        ],
        "out": "Book 50.00\nPen 12.00\nFolder 7.00\nTotal: 73.00",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [5]:\n• File opened for reading [1]\n• Each line split into three fields [1]\n• Value calculated with conversions [1]\n• Only qualifying products output to 2 d.p. [1]\n• Grand total of all products output [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "File opened for reading",
        "description": "File opened for reading",
        "acceptedAnswers": [
          "open(\"sales.txt\""
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Each line split into three fields",
        "description": "Each line split into three fields",
        "acceptedAnswers": [
          "split(\",\")"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Value calculated with conversions",
        "description": "Value calculated with conversions",
        "acceptedAnswers": [
          "float(price) * int(qty)"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Only qualifying products output to 2 d.p.",
        "description": "Only qualifying products output to 2 d.p.",
        "acceptedAnswers": [
          ">= minimum",
          ":.2f"
        ]
      },
      {
        "id": "MP5",
        "marks": 1,
        "criterion": "Grand total of all products output",
        "description": "Grand total of all products output",
        "acceptedAnswers": [
          "Total:"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_100",
    "unit": "B2",
    "title": "B2.5 Temperature file analysis",
    "level": "Core",
    "difficulty": "Moderate",
    "type": "code",
    "brief": "The file temperatures.txt contains one temperature per line. Write a program that reads all the values using read() and split(), then outputs how many readings are above a threshold entered by the user and the mean of all readings to 1 decimal place.\n\n• Prompt: `Threshold: `\n• Output example:\n`Above: 3`\n`Mean: 20.3`",
    "marks": 4,
    "specReference": "B2.5.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "starter": "threshold = float(input(\"Threshold: \"))\n",
    "solution": "threshold = float(input(\"Threshold: \"))\nf = open(\"temperatures.txt\", \"r\")\nvalues = f.read().split()\nf.close()\nabove = 0\ntotal = 0\nfor v in values:\n    t = float(v)\n    total = total + t\n    if t > threshold:\n        above = above + 1\nprint(f\"Above: {above}\")\nprint(f\"Mean: {total / len(values):.1f}\")",
    "tests": [
      {
        "in": [
          "20"
        ],
        "out": "Above: 3\nMean: 20.3",
        "m": 1
      },
      {
        "in": [
          "25"
        ],
        "out": "Above: 0\nMean: 20.3",
        "m": 1
      },
      {
        "in": [
          "18"
        ],
        "out": "Above: 6\nMean: 20.3",
        "m": 1
      },
      {
        "in": [
          "21.0"
        ],
        "out": "Above: 2\nMean: 20.3",
        "m": 1
      }
    ],
    "markScheme": "Award [1] for each of the following, up to [4]:\n• File read with read() and split into values [1]\n• Values converted to float and totalled [1]\n• Count of values above threshold (strictly greater) [1]\n• Both outputs with mean to 1 d.p. [1]\nNote to examiners: automated tests check the exact output; award method marks above where output differs only in formatting.",
    "markPoints": [
      {
        "id": "MP1",
        "marks": 1,
        "criterion": "File read with read() and split into values",
        "description": "File read with read() and split into values",
        "acceptedAnswers": [
          "read().split()"
        ]
      },
      {
        "id": "MP2",
        "marks": 1,
        "criterion": "Values converted to float and totalled",
        "description": "Values converted to float and totalled",
        "acceptedAnswers": [
          "float(v)"
        ]
      },
      {
        "id": "MP3",
        "marks": 1,
        "criterion": "Count of values above threshold (strictly greater)",
        "description": "Count of values above threshold (strictly greater)",
        "acceptedAnswers": [
          "> threshold"
        ]
      },
      {
        "id": "MP4",
        "marks": 1,
        "criterion": "Both outputs with mean to 1 d.p.",
        "description": "Both outputs with mean to 1 d.p.",
        "acceptedAnswers": [
          ":.1f"
        ]
      }
    ]
  },
  {
    "id": "ib_b2_101",
    "unit": "B2",
    "title": "B2.5 Exam-style: student records file",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A school stores student records in students.txt, one per line, in the form id,name,grade, for example:\n101,Maya Patel,Grade 9",
    "marks": 9,
    "specReference": "B2.5.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "7(a)",
        "question": "State the Python statement that opens students.txt so that new records can be added without deleting existing ones.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• open(\"students.txt\", \"a\") [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "open(\"students.txt\", \"a\")",
            "description": "open(\"students.txt\", \"a\")",
            "acceptedAnswers": [
              "open(\"students.txt\", \"a\")",
              "open('students.txt', 'a')"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "7(b)",
        "question": "Construct a function find_name(student_id) that reads the file and returns the name for the given id, or \"Unknown\" if not found.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Opens file in read mode [1]\n• Loops through lines and splits on commas [1]\n• Compares id field and returns name [1]\n• Returns \"Unknown\" after loop and closes file [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Opens file in read mode",
            "description": "Opens file in read mode",
            "acceptedAnswers": [
              "open(\"students.txt\", \"r\")"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Loops through lines and splits on commas",
            "description": "Loops through lines and splits on commas",
            "acceptedAnswers": [
              "for line in f",
              "split(\",\")"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Compares id field and returns name",
            "description": "Compares id field and returns name",
            "acceptedAnswers": [
              "parts[0] == student_id",
              "return parts[1]"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Returns \"Unknown\" after loop and closes file",
            "description": "Returns \"Unknown\" after loop and closes file",
            "acceptedAnswers": [
              "return \"Unknown\"",
              "close()"
            ]
          }
        ],
        "solution": "def find_name(student_id):\n    f = open(\"students.txt\", \"r\")\n    for line in f:\n        parts = line.strip().split(\",\")\n        if parts[0] == student_id:\n            f.close()\n            return parts[1]\n    f.close()\n    return \"Unknown\""
      },
      {
        "id": "p3",
        "label": "7(c)",
        "question": "Describe how the program should handle the file being missing, using exception handling.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Place the open/read in a try block with except FileNotFoundError [1]\n• Output a helpful message/return a default instead of crashing; use finally/with to close the file [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Place the open/read in a try block with except FileNotFoundError",
            "description": "Place the open/read in a try block with except FileNotFoundError",
            "acceptedAnswers": [
              "try",
              "except FileNotFoundError"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Output a helpful message/return a default instead of crashing; use finally/with to close the file",
            "description": "Output a helpful message/return a default instead of crashing; use finally/with to close the file",
            "acceptedAnswers": [
              "message",
              "default",
              "finally",
              "with"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "7(d)",
        "question": "Explain why the file should be closed after it has been written to.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Buffered data is written/flushed to the file so it is not lost [1]\n• Releases the file/resource so other programs or later code can open it [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Buffered data is written/flushed to the file so it is not lost",
            "description": "Buffered data is written/flushed to the file so it is not lost",
            "acceptedAnswers": [
              "flush",
              "buffer",
              "saved"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Releases the file/resource so other programs or later code can open it",
            "description": "Releases the file/resource so other programs or later code can open it",
            "acceptedAnswers": [
              "release",
              "resource",
              "other programs"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "7(a) State the Python statement that opens students.txt so that new records can be added without deleting existing ones.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "open(\"students.txt\", \"a\")"
        ]
      },
      {
        "q": "7(b) Construct a function find_name(student_id) that reads the file and returns the name for the given id, or \"Unknown\" if not found.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Opens file in read mode",
          "Loops through lines and splits on commas",
          "Compares id field and returns name",
          "Returns \"Unknown\" after loop and closes file"
        ]
      },
      {
        "q": "7(c) Describe how the program should handle the file being missing, using exception handling.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Place the open/read in a try block with except FileNotFoundError",
          "Output a helpful message/return a default instead of crashing; use finally/with to close the file"
        ]
      },
      {
        "q": "7(d) Explain why the file should be closed after it has been written to.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Buffered data is written/flushed to the file so it is not lost",
          "Releases the file/resource so other programs or later code can open it"
        ]
      }
    ],
    "markScheme": "7(a): Award [1] for each of the following, up to [1]:\n• open(\"students.txt\", \"a\") [1]\n7(b): Award [1] for each of the following, up to [4]:\n• Opens file in read mode [1]\n• Loops through lines and splits on commas [1]\n• Compares id field and returns name [1]\n• Returns \"Unknown\" after loop and closes file [1]\n7(c): Award [1] for each of the following, up to [2]:\n• Place the open/read in a try block with except FileNotFoundError [1]\n• Output a helpful message/return a default instead of crashing; use finally/with to close the file [1]\n7(d): Award [1] for each of the following, up to [2]:\n• Buffered data is written/flushed to the file so it is not lost [1]\n• Releases the file/resource so other programs or later code can open it [1]"
  },
  {
    "id": "ib_b1_027",
    "unit": "B1",
    "title": "B1.1 Exam-style: fitness tracker specification",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A sports centre wants an app that records members' workouts. Members enter the type of exercise, its duration in minutes and their heart rate. The app must work offline and show a weekly summary. Members' data must not be shared outside the centre.",
    "marks": 8,
    "specReference": "B1.1.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "1(a)",
        "question": "State one output that the app should produce.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• Weekly summary, e.g. total minutes per exercise type / average heart rate / calories estimate [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Weekly summary, e.g. total minutes per exercise type / average heart rate / calories estimate",
            "description": "Weekly summary, e.g. total minutes per exercise type / average heart rate / calories estimate",
            "acceptedAnswers": [
              "weekly summary",
              "total minutes",
              "average heart rate"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "1(b)",
        "question": "Identify two constraints or limitations given in the scenario.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Must work offline [1]\n• Data must not be shared outside the centre / privacy [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Must work offline",
            "description": "Must work offline",
            "acceptedAnswers": [
              "offline"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Data must not be shared outside the centre / privacy",
            "description": "Data must not be shared outside the centre / privacy",
            "acceptedAnswers": [
              "not shared",
              "privacy"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "1(c)",
        "question": "Construct an input specification for the duration field, including its data type and validation rules.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Data type: integer (whole minutes) [1]\n• Range check, e.g. 1 to 300 minutes [1]\n• Presence/type check with re-entry and error message if invalid [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Data type: integer (whole minutes)",
            "description": "Data type: integer (whole minutes)",
            "acceptedAnswers": [
              "integer"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Range check, e.g. 1 to 300 minutes",
            "description": "Range check, e.g. 1 to 300 minutes",
            "acceptedAnswers": [
              "range",
              "1 to 300",
              "greater than 0"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Presence/type check with re-entry and error message if invalid",
            "description": "Presence/type check with re-entry and error message if invalid",
            "acceptedAnswers": [
              "presence check",
              "type check",
              "error message"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "1(d)",
        "question": "Outline two objectives for the app that could later be used as evaluation criteria.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Measurable objective, e.g. a workout can be recorded in under 30 seconds [1]\n• Second measurable objective, e.g. weekly summary totals are 100% accurate in testing / works with no network [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Measurable objective, e.g. a workout can be recorded in under 30 seconds",
            "description": "Measurable objective, e.g. a workout can be recorded in under 30 seconds",
            "acceptedAnswers": [
              "under 30 seconds",
              "quickly"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Second measurable objective, e.g. weekly summary totals are 100% accurate in testing / works with no network",
            "description": "Second measurable objective, e.g. weekly summary totals are 100% accurate in testing / works with no network",
            "acceptedAnswers": [
              "accurate",
              "works offline"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "1(a) State one output that the app should produce.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "Weekly summary, e.g. total minutes per exercise type / average heart rate / calories estimate"
        ]
      },
      {
        "q": "1(b) Identify two constraints or limitations given in the scenario.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Must work offline",
          "Data must not be shared outside the centre / privacy"
        ]
      },
      {
        "q": "1(c) Construct an input specification for the duration field, including its data type and validation rules.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Data type: integer (whole minutes)",
          "Range check, e.g. 1 to 300 minutes",
          "Presence/type check with re-entry and error message if invalid"
        ]
      },
      {
        "q": "1(d) Outline two objectives for the app that could later be used as evaluation criteria.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Measurable objective, e.g. a workout can be recorded in under 30 seconds",
          "Second measurable objective, e.g. weekly summary totals are 100% accurate in testing / works with no network"
        ]
      }
    ],
    "markScheme": "1(a): Award [1] for each of the following, up to [1]:\n• Weekly summary, e.g. total minutes per exercise type / average heart rate / calories estimate [1]\n1(b): Award [1] for each of the following, up to [2]:\n• Must work offline [1]\n• Data must not be shared outside the centre / privacy [1]\n1(c): Award [1] for each of the following, up to [3]:\n• Data type: integer (whole minutes) [1]\n• Range check, e.g. 1 to 300 minutes [1]\n• Presence/type check with re-entry and error message if invalid [1]\n1(d): Award [1] for each of the following, up to [2]:\n• Measurable objective, e.g. a workout can be recorded in under 30 seconds [1]\n• Second measurable objective, e.g. weekly summary totals are 100% accurate in testing / works with no network [1]"
  },
  {
    "id": "ib_b1_028",
    "unit": "B1",
    "title": "B1.1 Exam-style: login attempts flowchart",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A login system uses the following flowchart.\n\n1  [Start]\n2  [Process] TRIES ← 0, OK ← FALSE\n3  [Decision] Is TRIES < 3 AND OK = FALSE?  Yes → 4,  No → 8\n4  [Input/Output] INPUT PIN\n5  [Process] TRIES ← TRIES + 1\n6  [Decision] Is PIN = 4721?  Yes → 7,  No → 3\n7  [Process] OK ← TRUE, go to 3\n8  [Decision] Is OK = TRUE?  Yes → 9,  No → 10\n9  [Input/Output] OUTPUT \"Welcome\", go to 11\n10 [Input/Output] OUTPUT \"Locked\"\n11 [End]",
    "marks": 10,
    "specReference": "B1.1.4",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "2(a)",
        "question": "State the output and the final value of TRIES for the inputs 1111, 4721.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Output Welcome [1]\n• TRIES = 2 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Output Welcome",
            "description": "Output Welcome",
            "acceptedAnswers": [
              "Welcome"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "TRIES = 2",
            "description": "TRIES = 2",
            "acceptedAnswers": [
              "2"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "2(b)",
        "question": "State the output and the final value of TRIES for the inputs 1111, 2222, 3333, 4721.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Output Locked [1]\n• TRIES = 3 (the fourth input is never read) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Output Locked",
            "description": "Output Locked",
            "acceptedAnswers": [
              "Locked"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "TRIES = 3 (the fourth input is never read)",
            "description": "TRIES = 3 (the fourth input is never read)",
            "acceptedAnswers": [
              "3"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "2(c)",
        "question": "Identify the type of loop represented by boxes 3 to 7 and explain why it is suitable.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Conditional (pre-condition/while) loop [1]\n• Number of repetitions is not known in advance - stops when the PIN is correct or after 3 tries [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Conditional (pre-condition/while) loop",
            "description": "Conditional (pre-condition/while) loop",
            "acceptedAnswers": [
              "conditional",
              "while",
              "pre-condition"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Number of repetitions is not known in advance - stops when the PIN is correct or after 3 tries",
            "description": "Number of repetitions is not known in advance - stops when the PIN is correct or after 3 tries",
            "acceptedAnswers": [
              "not known",
              "stops when correct"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "2(d)",
        "question": "Construct a Python program that implements this flowchart.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Variables initialised [1]\n• while loop with compound condition [1]\n• Input, increment and PIN check inside loop [1]\n• Correct final selection and outputs [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Variables initialised",
            "description": "Variables initialised",
            "acceptedAnswers": [
              "tries = 0",
              "ok = False"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "while loop with compound condition",
            "description": "while loop with compound condition",
            "acceptedAnswers": [
              "while tries < 3 and not ok"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Input, increment and PIN check inside loop",
            "description": "Input, increment and PIN check inside loop",
            "acceptedAnswers": [
              "tries + 1",
              "== 4721"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Correct final selection and outputs",
            "description": "Correct final selection and outputs",
            "acceptedAnswers": [
              "Welcome",
              "Locked"
            ]
          }
        ],
        "solution": "tries = 0\nok = False\nwhile tries < 3 and not ok:\n    pin = int(input(\"PIN: \"))\n    tries = tries + 1\n    if pin == 4721:\n        ok = True\nif ok:\n    print(\"Welcome\")\nelse:\n    print(\"Locked\")"
      }
    ],
    "questions": [
      {
        "q": "2(a) State the output and the final value of TRIES for the inputs 1111, 4721.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Output Welcome",
          "TRIES = 2"
        ]
      },
      {
        "q": "2(b) State the output and the final value of TRIES for the inputs 1111, 2222, 3333, 4721.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Output Locked",
          "TRIES = 3 (the fourth input is never read)"
        ]
      },
      {
        "q": "2(c) Identify the type of loop represented by boxes 3 to 7 and explain why it is suitable.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Conditional (pre-condition/while) loop",
          "Number of repetitions is not known in advance - stops when the PIN is correct or after 3 tries"
        ]
      },
      {
        "q": "2(d) Construct a Python program that implements this flowchart.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Variables initialised",
          "while loop with compound condition",
          "Input, increment and PIN check inside loop",
          "Correct final selection and outputs"
        ]
      }
    ],
    "markScheme": "2(a): Award [1] for each of the following, up to [2]:\n• Output Welcome [1]\n• TRIES = 2 [1]\n2(b): Award [1] for each of the following, up to [2]:\n• Output Locked [1]\n• TRIES = 3 (the fourth input is never read) [1]\n2(c): Award [1] for each of the following, up to [2]:\n• Conditional (pre-condition/while) loop [1]\n• Number of repetitions is not known in advance - stops when the PIN is correct or after 3 tries [1]\n2(d): Award [1] for each of the following, up to [4]:\n• Variables initialised [1]\n• while loop with compound condition [1]\n• Input, increment and PIN check inside loop [1]\n• Correct final selection and outputs [1]"
  },
  {
    "id": "ib_b1_029",
    "unit": "B1",
    "title": "B1.1 Exam-style: supermarket data analysis",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A supermarket chain has five years of loyalty-card data: what each customer bought, when and in which store. Managers want to decide which products to promote in each store.",
    "marks": 9,
    "specReference": "B1.1.3",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "3(a)",
        "question": "Describe how abstraction could be applied to this data.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Keep only the attributes relevant to the decision, e.g. product, store, date, quantity [1]\n• Ignore/remove irrelevant details such as customer names or card numbers / summarise to weekly totals [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Keep only the attributes relevant to the decision, e.g. product, store, date, quantity",
            "description": "Keep only the attributes relevant to the decision, e.g. product, store, date, quantity",
            "acceptedAnswers": [
              "relevant attributes",
              "product",
              "store"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Ignore/remove irrelevant details such as customer names or card numbers / summarise to weekly totals",
            "description": "Ignore/remove irrelevant details such as customer names or card numbers / summarise to weekly totals",
            "acceptedAnswers": [
              "remove names",
              "aggregate",
              "summarise"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "3(b)",
        "question": "Explain how pattern recognition could identify products to promote.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Look for trends/regularities in sales over time or by store [1]\n• Example: products often bought together / seasonal peaks / differences between stores [1]\n• Use the pattern to choose promotions, e.g. promote the second product of a pair or before the peak [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Look for trends/regularities in sales over time or by store",
            "description": "Look for trends/regularities in sales over time or by store",
            "acceptedAnswers": [
              "trends",
              "seasonal"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Example: products often bought together / seasonal peaks / differences between stores",
            "description": "Example: products often bought together / seasonal peaks / differences between stores",
            "acceptedAnswers": [
              "bought together",
              "seasonal",
              "region"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Use the pattern to choose promotions, e.g. promote the second product of a pair or before the peak",
            "description": "Use the pattern to choose promotions, e.g. promote the second product of a pair or before the peak",
            "acceptedAnswers": [
              "promote",
              "before peak"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "3(c)",
        "question": "Outline how decomposition could be used to organise the analysis.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Split into sub-tasks [1]\n• Examples: clean data, group by store, calculate totals, compare periods, report [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Split into sub-tasks",
            "description": "Split into sub-tasks",
            "acceptedAnswers": [
              "sub-tasks"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Examples: clean data, group by store, calculate totals, compare periods, report",
            "description": "Examples: clean data, group by store, calculate totals, compare periods, report",
            "acceptedAnswers": [
              "clean",
              "group by store",
              "report"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "3(d)",
        "question": "Discuss one ethical or practical issue of using loyalty-card data in this way.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Issue identified, e.g. privacy/consent or data quality/bias [1]\n• Developed with consequence or mitigation, e.g. anonymise data / customers not using cards are not represented [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Issue identified, e.g. privacy/consent or data quality/bias",
            "description": "Issue identified, e.g. privacy/consent or data quality/bias",
            "acceptedAnswers": [
              "privacy",
              "consent",
              "bias"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Developed with consequence or mitigation, e.g. anonymise data / customers not using cards are not represented",
            "description": "Developed with consequence or mitigation, e.g. anonymise data / customers not using cards are not represented",
            "acceptedAnswers": [
              "anonymise",
              "not represented"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "3(a) Describe how abstraction could be applied to this data.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Keep only the attributes relevant to the decision, e.g. product, store, date, quantity",
          "Ignore/remove irrelevant details such as customer names or card numbers / summarise to weekly totals"
        ]
      },
      {
        "q": "3(b) Explain how pattern recognition could identify products to promote.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Look for trends/regularities in sales over time or by store",
          "Example: products often bought together / seasonal peaks / differences between stores",
          "Use the pattern to choose promotions, e.g. promote the second product of a pair or before the peak"
        ]
      },
      {
        "q": "3(c) Outline how decomposition could be used to organise the analysis.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Split into sub-tasks",
          "Examples: clean data, group by store, calculate totals, compare periods, report"
        ]
      },
      {
        "q": "3(d) Discuss one ethical or practical issue of using loyalty-card data in this way.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Issue identified, e.g. privacy/consent or data quality/bias",
          "Developed with consequence or mitigation, e.g. anonymise data / customers not using cards are not represented"
        ]
      }
    ],
    "markScheme": "3(a): Award [1] for each of the following, up to [2]:\n• Keep only the attributes relevant to the decision, e.g. product, store, date, quantity [1]\n• Ignore/remove irrelevant details such as customer names or card numbers / summarise to weekly totals [1]\n3(b): Award [1] for each of the following, up to [3]:\n• Look for trends/regularities in sales over time or by store [1]\n• Example: products often bought together / seasonal peaks / differences between stores [1]\n• Use the pattern to choose promotions, e.g. promote the second product of a pair or before the peak [1]\n3(c): Award [1] for each of the following, up to [2]:\n• Split into sub-tasks [1]\n• Examples: clean data, group by store, calculate totals, compare periods, report [1]\n3(d): Award [1] for each of the following, up to [2]:\n• Issue identified, e.g. privacy/consent or data quality/bias [1]\n• Developed with consequence or mitigation, e.g. anonymise data / customers not using cards are not represented [1]"
  },
  {
    "id": "ib_b1_030",
    "unit": "B1",
    "title": "B1.1 Exam-style: average of positive numbers flowchart",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A flowchart is intended to input numbers until 0 is entered and output the average of the positive numbers only.\n\n1  [Start]\n2  [Process] TOTAL ← 0, COUNT ← 0\n3  [Input/Output] INPUT X\n4  [Decision] Is X = 0?  Yes → 9,  No → 5\n5  [Decision] Is X > 0?  Yes → 6,  No → 8\n6  [Process] TOTAL ← TOTAL + X\n7  [Process] COUNT ← COUNT + 1\n8  [Input/Output] INPUT X, go to 4\n9  [Input/Output] OUTPUT TOTAL / COUNT\n10 [End]",
    "marks": 7,
    "specReference": "B1.1.4",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "4(a)",
        "question": "Trace the flowchart for the inputs 6, -3, 9, 0 and state the output.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• TOTAL = 15 and COUNT = 2 at the end [1]\n• Output 7.5 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "TOTAL = 15 and COUNT = 2 at the end",
            "description": "TOTAL = 15 and COUNT = 2 at the end",
            "acceptedAnswers": [
              "15",
              "2"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Output 7.5",
            "description": "Output 7.5",
            "acceptedAnswers": [
              "7.5"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "4(b)",
        "question": "Identify the input sequence that causes a run-time error and state the error.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• First input 0 / only negative numbers then 0 [1]\n• Division by zero because COUNT = 0 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "First input 0 / only negative numbers then 0",
            "description": "First input 0 / only negative numbers then 0",
            "acceptedAnswers": [
              "0",
              "only negatives"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Division by zero because COUNT = 0",
            "description": "Division by zero because COUNT = 0",
            "acceptedAnswers": [
              "division by zero",
              "ZeroDivisionError"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "4(c)",
        "question": "Describe a change to the flowchart that prevents this error.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Add a decision before box 9: Is COUNT > 0? [1]\n• If No, output a message such as \"No positive numbers\" instead of dividing [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Add a decision before box 9: Is COUNT > 0?",
            "description": "Add a decision before box 9: Is COUNT > 0?",
            "acceptedAnswers": [
              "decision",
              "COUNT > 0"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "If No, output a message such as \"No positive numbers\" instead of dividing",
            "description": "If No, output a message such as \"No positive numbers\" instead of dividing",
            "acceptedAnswers": [
              "message",
              "no positive numbers"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "4(d)",
        "question": "State the name of the flowchart symbol that would be used to continue the flowchart on a second page.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• Connector [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Connector",
            "description": "Connector",
            "acceptedAnswers": [
              "connector"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "4(a) Trace the flowchart for the inputs 6, -3, 9, 0 and state the output.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "TOTAL = 15 and COUNT = 2 at the end",
          "Output 7.5"
        ]
      },
      {
        "q": "4(b) Identify the input sequence that causes a run-time error and state the error.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "First input 0 / only negative numbers then 0",
          "Division by zero because COUNT = 0"
        ]
      },
      {
        "q": "4(c) Describe a change to the flowchart that prevents this error.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Add a decision before box 9: Is COUNT > 0?",
          "If No, output a message such as \"No positive numbers\" instead of dividing"
        ]
      },
      {
        "q": "4(d) State the name of the flowchart symbol that would be used to continue the flowchart on a second page.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "Connector"
        ]
      }
    ],
    "markScheme": "4(a): Award [1] for each of the following, up to [2]:\n• TOTAL = 15 and COUNT = 2 at the end [1]\n• Output 7.5 [1]\n4(b): Award [1] for each of the following, up to [2]:\n• First input 0 / only negative numbers then 0 [1]\n• Division by zero because COUNT = 0 [1]\n4(c): Award [1] for each of the following, up to [2]:\n• Add a decision before box 9: Is COUNT > 0? [1]\n• If No, output a message such as \"No positive numbers\" instead of dividing [1]\n4(d): Award [1] for each of the following, up to [1]:\n• Connector [1]"
  },
  {
    "id": "ib_b2_102",
    "unit": "B2",
    "title": "B2.1 Exam-style: weather station variables",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A weather station program contains the following code.\n\nstation = \"Hilltop\"\nreadings = 0\nrain_today = False\n\ndef add_reading(mm):\n    global readings\n    readings = readings + 1\n    total = mm * 1.0\n    return total > 5.0\n\nrain_today = add_reading(7)\nadd_reading(2)\nprint(station[0], readings, rain_today)",
    "marks": 9,
    "specReference": "B2.1.1",
    "commandWord": "Trace",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "1(a)",
        "question": "State the data type of station, readings and rain_today.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• station: string [1]\n• readings: integer [1]\n• rain_today: Boolean [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "station: string",
            "description": "station: string",
            "acceptedAnswers": [
              "string",
              "str"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "readings: integer",
            "description": "readings: integer",
            "acceptedAnswers": [
              "integer",
              "int"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "rain_today: Boolean",
            "description": "rain_today: Boolean",
            "acceptedAnswers": [
              "Boolean",
              "bool"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "1(b)",
        "question": "State the output of the program.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• H 2 [1]\n• True [1]\nFull output: H 2 True",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "H 2",
            "description": "H 2",
            "acceptedAnswers": [
              "H 2"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "True",
            "description": "True",
            "acceptedAnswers": [
              "True"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "1(c)",
        "question": "Identify one local variable and one global variable in the program.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Local: total (or mm) [1]\n• Global: station / readings / rain_today [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Local: total (or mm)",
            "description": "Local: total (or mm)",
            "acceptedAnswers": [
              "total",
              "mm"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Global: station / readings / rain_today",
            "description": "Global: station / readings / rain_today",
            "acceptedAnswers": [
              "station",
              "readings",
              "rain_today"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "1(d)",
        "question": "Explain what would happen if the line global readings were removed.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• readings would be treated as a local variable inside the function [1]\n• It is used before it is assigned, so an UnboundLocalError (run-time error) occurs [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "readings would be treated as a local variable inside the function",
            "description": "readings would be treated as a local variable inside the function",
            "acceptedAnswers": [
              "local"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "It is used before it is assigned, so an UnboundLocalError (run-time error) occurs",
            "description": "It is used before it is assigned, so an UnboundLocalError (run-time error) occurs",
            "acceptedAnswers": [
              "UnboundLocalError",
              "error before assignment"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "1(a) State the data type of station, readings and rain_today.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "station: string",
          "readings: integer",
          "rain_today: Boolean"
        ]
      },
      {
        "q": "1(b) State the output of the program.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "H 2",
          "True"
        ]
      },
      {
        "q": "1(c) Identify one local variable and one global variable in the program.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Local: total (or mm)",
          "Global: station / readings / rain_today"
        ]
      },
      {
        "q": "1(d) Explain what would happen if the line global readings were removed.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "readings would be treated as a local variable inside the function",
          "It is used before it is assigned, so an UnboundLocalError (run-time error) occurs"
        ]
      }
    ],
    "markScheme": "1(a): Award [1] for each of the following, up to [3]:\n• station: string [1]\n• readings: integer [1]\n• rain_today: Boolean [1]\n1(b): Award [1] for each of the following, up to [2]:\n• H 2 [1]\n• True [1]\nFull output: H 2 True\n1(c): Award [1] for each of the following, up to [2]:\n• Local: total (or mm) [1]\n• Global: station / readings / rain_today [1]\n1(d): Award [1] for each of the following, up to [2]:\n• readings would be treated as a local variable inside the function [1]\n• It is used before it is assigned, so an UnboundLocalError (run-time error) occurs [1]"
  },
  {
    "id": "ib_b2_103",
    "unit": "B2",
    "title": "B2.1 Exam-style: product code processing",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A warehouse uses product codes in the form AAA-9999-X, e.g. \"KIT-0452-B\": a three-letter category, a four-digit number and a one-letter size.",
    "marks": 9,
    "specReference": "B2.1.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "2(a)",
        "question": "code = \"KIT-0452-B\". State the result of code[4:8], code[-1] and code[:3].lower().",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• 0452 [1]\n• B [1]\n• kit [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "0452",
            "description": "0452",
            "acceptedAnswers": [
              "0452"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "B",
            "description": "B",
            "acceptedAnswers": [
              "B"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "kit",
            "description": "kit",
            "acceptedAnswers": [
              "kit"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "2(b)",
        "question": "Construct a function is_valid(code) that returns True only if the code has length 10, hyphens in positions 3 and 8, upper-case letters in the category and size, and digits in positions 4 to 7.",
        "marks": 5,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [5]:\n• Length check [1]\n• Hyphen positions checked [1]\n• Category letters checked as upper case [1]\n• Digits checked with substring and isdigit [1]\n• Returns Boolean correctly in all cases [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Length check",
            "description": "Length check",
            "acceptedAnswers": [
              "len(code) != 10"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Hyphen positions checked",
            "description": "Hyphen positions checked",
            "acceptedAnswers": [
              "code[3]",
              "code[8]"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Category letters checked as upper case",
            "description": "Category letters checked as upper case",
            "acceptedAnswers": [
              "code[0:3]",
              "isupper"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Digits checked with substring and isdigit",
            "description": "Digits checked with substring and isdigit",
            "acceptedAnswers": [
              "code[4:8].isdigit()"
            ]
          },
          {
            "id": "MP5",
            "marks": 1,
            "criterion": "Returns Boolean correctly in all cases",
            "description": "Returns Boolean correctly in all cases",
            "acceptedAnswers": [
              "return"
            ]
          }
        ],
        "solution": "def is_valid(code):\n    if len(code) != 10:\n        return False\n    if code[3] != \"-\" or code[8] != \"-\":\n        return False\n    if not (code[0:3].isalpha() and code[0:3].isupper()):\n        return False\n    if not code[4:8].isdigit():\n        return False\n    return code[9].isalpha() and code[9].isupper()"
      },
      {
        "id": "p3",
        "label": "2(c)",
        "question": "Construct a statement that creates a new code with the size changed to \"L\", using concatenation.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• new_code = code[:9] + \"L\" [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "new_code = code[:9] + \"L\"",
            "description": "new_code = code[:9] + \"L\"",
            "acceptedAnswers": [
              "code[:9] + \"L\"",
              "code[0:9] + \"L\""
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "2(a) code = \"KIT-0452-B\". State the result of code[4:8], code[-1] and code[:3].lower().",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "0452",
          "B",
          "kit"
        ]
      },
      {
        "q": "2(b) Construct a function is_valid(code) that returns True only if the code has length 10, hyphens in positions 3 and 8, upper-case letters in the category and size, and digits in positions 4 to 7.",
        "keywords": [],
        "maxMarks": 5,
        "criteria": [
          "Length check",
          "Hyphen positions checked",
          "Category letters checked as upper case",
          "Digits checked with substring and isdigit",
          "Returns Boolean correctly in all cases"
        ]
      },
      {
        "q": "2(c) Construct a statement that creates a new code with the size changed to \"L\", using concatenation.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "new_code = code[:9] + \"L\""
        ]
      }
    ],
    "markScheme": "2(a): Award [1] for each of the following, up to [3]:\n• 0452 [1]\n• B [1]\n• kit [1]\n2(b): Award [1] for each of the following, up to [5]:\n• Length check [1]\n• Hyphen positions checked [1]\n• Category letters checked as upper case [1]\n• Digits checked with substring and isdigit [1]\n• Returns Boolean correctly in all cases [1]\n2(c): Award [1] for each of the following, up to [1]:\n• new_code = code[:9] + \"L\" [1]"
  },
  {
    "id": "ib_b2_104",
    "unit": "B2",
    "title": "B2.1 Exam-style: concert ticket booking",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A program asks a customer how many concert tickets they want (1 to 6), reads the seat plan from a file and calculates the cost.",
    "marks": 9,
    "specReference": "B2.1.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "3(a)",
        "question": "Identify three potential points of failure in this program, one for each category: unexpected input, resource unavailability, logic error.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Unexpected input: letters or 0/7 entered for number of tickets [1]\n• Resource unavailability: seat plan file missing/locked [1]\n• Logic error: e.g. wrong boundary (< 6 instead of <= 6) or wrong price calculation [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Unexpected input: letters or 0/7 entered for number of tickets",
            "description": "Unexpected input: letters or 0/7 entered for number of tickets",
            "acceptedAnswers": [
              "letters",
              "out of range"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Resource unavailability: seat plan file missing/locked",
            "description": "Resource unavailability: seat plan file missing/locked",
            "acceptedAnswers": [
              "file missing",
              "locked"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Logic error: e.g. wrong boundary (< 6 instead of <= 6) or wrong price calculation",
            "description": "Logic error: e.g. wrong boundary (< 6 instead of <= 6) or wrong price calculation",
            "acceptedAnswers": [
              "boundary",
              "wrong calculation"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "3(b)",
        "question": "Construct a function get_tickets() that repeatedly asks for the number of tickets until an integer from 1 to 6 is entered, using try/except, and returns it.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Loop repeats until valid [1]\n• int(input()) inside try [1]\n• except ValueError handled with message [1]\n• Range check 1-6 and return of valid value [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Loop repeats until valid",
            "description": "Loop repeats until valid",
            "acceptedAnswers": [
              "while"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "int(input()) inside try",
            "description": "int(input()) inside try",
            "acceptedAnswers": [
              "try",
              "int(input"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "except ValueError handled with message",
            "description": "except ValueError handled with message",
            "acceptedAnswers": [
              "except ValueError"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Range check 1-6 and return of valid value",
            "description": "Range check 1-6 and return of valid value",
            "acceptedAnswers": [
              "1 <= n <= 6",
              "return n"
            ]
          }
        ],
        "solution": "def get_tickets():\n    while True:\n        try:\n            n = int(input(\"Tickets (1-6): \"))\n            if 1 <= n <= 6:\n                return n\n            print(\"Must be 1 to 6\")\n        except ValueError:\n            print(\"Whole numbers only\")"
      },
      {
        "id": "p3",
        "label": "3(c)",
        "question": "Explain why the code that closes the seat plan file should be placed in a finally block.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• finally runs whether or not an exception occurred [1]\n• so the file is always closed/resource released even after an error [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "finally runs whether or not an exception occurred",
            "description": "finally runs whether or not an exception occurred",
            "acceptedAnswers": [
              "always runs"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "so the file is always closed/resource released even after an error",
            "description": "so the file is always closed/resource released even after an error",
            "acceptedAnswers": [
              "file closed",
              "released"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "3(a) Identify three potential points of failure in this program, one for each category: unexpected input, resource unavailability, logic error.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Unexpected input: letters or 0/7 entered for number of tickets",
          "Resource unavailability: seat plan file missing/locked",
          "Logic error: e.g. wrong boundary (< 6 instead of <= 6) or wrong price calculation"
        ]
      },
      {
        "q": "3(b) Construct a function get_tickets() that repeatedly asks for the number of tickets until an integer from 1 to 6 is entered, using try/except, and returns it.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Loop repeats until valid",
          "int(input()) inside try",
          "except ValueError handled with message",
          "Range check 1-6 and return of valid value"
        ]
      },
      {
        "q": "3(c) Explain why the code that closes the seat plan file should be placed in a finally block.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "finally runs whether or not an exception occurred",
          "so the file is always closed/resource released even after an error"
        ]
      }
    ],
    "markScheme": "3(a): Award [1] for each of the following, up to [3]:\n• Unexpected input: letters or 0/7 entered for number of tickets [1]\n• Resource unavailability: seat plan file missing/locked [1]\n• Logic error: e.g. wrong boundary (< 6 instead of <= 6) or wrong price calculation [1]\n3(b): Award [1] for each of the following, up to [4]:\n• Loop repeats until valid [1]\n• int(input()) inside try [1]\n• except ValueError handled with message [1]\n• Range check 1-6 and return of valid value [1]\n3(c): Award [1] for each of the following, up to [2]:\n• finally runs whether or not an exception occurred [1]\n• so the file is always closed/resource released even after an error [1]"
  },
  {
    "id": "ib_b2_105",
    "unit": "B2",
    "title": "B2.1 Exam-style: debugging an average program",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "The following program should output the average of the even numbers in the list, but it outputs 3.0.\n\n1  nums = [4, 7, 10, 3, 6]\n2  total = 0\n3  count = 0\n4  for i in range(len(nums)):\n5      if nums[i] % 2 == 1:\n6          total = total + nums[i]\n7          count = count + 1\n8  print(total / len(nums))",
    "marks": 8,
    "specReference": "B2.1.4",
    "commandWord": "Identify",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "4(a)",
        "question": "State the expected output.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• 6.666... / 6.67 (20 / 3) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "6.666... / 6.67 (20 / 3)",
            "description": "6.666... / 6.67 (20 / 3)",
            "acceptedAnswers": [
              "6.67",
              "6.666",
              "20/3"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "4(b)",
        "question": "Identify the two lines that contain logic errors and write the corrected lines.",
        "marks": 4,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Line 5 identified [1]\n• if nums[i] % 2 == 0: [1]\n• Line 8 identified [1]\n• print(total / count) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Line 5 identified",
            "description": "Line 5 identified",
            "acceptedAnswers": [
              "line 5"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "if nums[i] % 2 == 0:",
            "description": "if nums[i] % 2 == 0:",
            "acceptedAnswers": [
              "% 2 == 0"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Line 8 identified",
            "description": "Line 8 identified",
            "acceptedAnswers": [
              "line 8"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "print(total / count)",
            "description": "print(total / count)",
            "acceptedAnswers": [
              "total / count"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "4(c)",
        "question": "Describe how print statements could have been used to locate these errors.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Insert print statements inside the loop/after the if to show i, nums[i], total and count [1]\n• Compare printed values with hand-calculated expected values to find where they first differ [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Insert print statements inside the loop/after the if to show i, nums[i], total and count",
            "description": "Insert print statements inside the loop/after the if to show i, nums[i], total and count",
            "acceptedAnswers": [
              "print inside loop",
              "show variables"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Compare printed values with hand-calculated expected values to find where they first differ",
            "description": "Compare printed values with hand-calculated expected values to find where they first differ",
            "acceptedAnswers": [
              "compare",
              "expected"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "4(d)",
        "question": "Outline one advantage of breakpoint debugging over print statements.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• No need to edit/remove code; can pause and inspect all variables at any point/step line by line [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "No need to edit/remove code; can pause and inspect all variables at any point/step line by line",
            "description": "No need to edit/remove code; can pause and inspect all variables at any point/step line by line",
            "acceptedAnswers": [
              "no code changes",
              "inspect all variables",
              "step"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "4(a) State the expected output.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "6.666... / 6.67 (20 / 3)"
        ]
      },
      {
        "q": "4(b) Identify the two lines that contain logic errors and write the corrected lines.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Line 5 identified",
          "if nums[i] % 2 == 0:",
          "Line 8 identified",
          "print(total / count)"
        ]
      },
      {
        "q": "4(c) Describe how print statements could have been used to locate these errors.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Insert print statements inside the loop/after the if to show i, nums[i], total and count",
          "Compare printed values with hand-calculated expected values to find where they first differ"
        ]
      },
      {
        "q": "4(d) Outline one advantage of breakpoint debugging over print statements.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "No need to edit/remove code; can pause and inspect all variables at any point/step line by line"
        ]
      }
    ],
    "markScheme": "4(a): Award [1] for each of the following, up to [1]:\n• 6.666... / 6.67 (20 / 3) [1]\n4(b): Award [1] for each of the following, up to [4]:\n• Line 5 identified [1]\n• if nums[i] % 2 == 0: [1]\n• Line 8 identified [1]\n• print(total / count) [1]\n4(c): Award [1] for each of the following, up to [2]:\n• Insert print statements inside the loop/after the if to show i, nums[i], total and count [1]\n• Compare printed values with hand-calculated expected values to find where they first differ [1]\n4(d): Award [1] for each of the following, up to [1]:\n• No need to edit/remove code; can pause and inspect all variables at any point/step line by line [1]"
  },
  {
    "id": "ib_b2_106",
    "unit": "B2",
    "title": "B2.2 Exam-style: class register list",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A teacher keeps a Python list of the names of students present: present = [\"Ana\", \"Bo\", \"Cy\"].",
    "marks": 9,
    "specReference": "B2.2.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "5(a)",
        "question": "State the effect of present.insert(1, \"Dee\") and the resulting list.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Inserts Dee at index 1, shifting the others right [1]\n• [\"Ana\", \"Dee\", \"Bo\", \"Cy\"] [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Inserts Dee at index 1, shifting the others right",
            "description": "Inserts Dee at index 1, shifting the others right",
            "acceptedAnswers": [
              "index 1",
              "shift"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "[\"Ana\", \"Dee\", \"Bo\", \"Cy\"]",
            "description": "[\"Ana\", \"Dee\", \"Bo\", \"Cy\"]",
            "acceptedAnswers": [
              "Ana, Dee, Bo, Cy"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "5(b)",
        "question": "Construct a function mark_absent(present, name) that removes name if it is in the list and returns True, otherwise returns False.",
        "marks": 3,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Traverse list comparing each name [1]\n• Remove the matching element [1]\n• Return True/False correctly [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Traverse list comparing each name",
            "description": "Traverse list comparing each name",
            "acceptedAnswers": [
              "for i in range",
              "== name"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Remove the matching element",
            "description": "Remove the matching element",
            "acceptedAnswers": [
              "pop(i)",
              "remove"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Return True/False correctly",
            "description": "Return True/False correctly",
            "acceptedAnswers": [
              "return True",
              "return False"
            ]
          }
        ],
        "solution": "def mark_absent(present, name):\n    for i in range(len(present)):\n        if present[i] == name:\n            present.pop(i)\n            return True\n    return False"
      },
      {
        "id": "p3",
        "label": "5(c)",
        "question": "Construct code that outputs each name in present with its position, starting at 1, e.g. 1 Ana.",
        "marks": 2,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Loop over every index [1]\n• Output position + 1 and name [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Loop over every index",
            "description": "Loop over every index",
            "acceptedAnswers": [
              "range(len(present))"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Output position + 1 and name",
            "description": "Output position + 1 and name",
            "acceptedAnswers": [
              "i + 1"
            ]
          }
        ],
        "solution": "for i in range(len(present)):\n    print(i + 1, present[i])"
      },
      {
        "id": "p4",
        "label": "5(d)",
        "question": "Explain why a dynamic list is more suitable than a static array for this register.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Number of students present varies/not known in advance [1]\n• A dynamic list grows and shrinks as names are added/removed, with no wasted space or overflow [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Number of students present varies/not known in advance",
            "description": "Number of students present varies/not known in advance",
            "acceptedAnswers": [
              "varies",
              "unknown"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "A dynamic list grows and shrinks as names are added/removed, with no wasted space or overflow",
            "description": "A dynamic list grows and shrinks as names are added/removed, with no wasted space or overflow",
            "acceptedAnswers": [
              "grow",
              "shrink",
              "no wasted space"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "5(a) State the effect of present.insert(1, \"Dee\") and the resulting list.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Inserts Dee at index 1, shifting the others right",
          "[\"Ana\", \"Dee\", \"Bo\", \"Cy\"]"
        ]
      },
      {
        "q": "5(b) Construct a function mark_absent(present, name) that removes name if it is in the list and returns True, otherwise returns False.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Traverse list comparing each name",
          "Remove the matching element",
          "Return True/False correctly"
        ]
      },
      {
        "q": "5(c) Construct code that outputs each name in present with its position, starting at 1, e.g. 1 Ana.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Loop over every index",
          "Output position + 1 and name"
        ]
      },
      {
        "q": "5(d) Explain why a dynamic list is more suitable than a static array for this register.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Number of students present varies/not known in advance",
          "A dynamic list grows and shrinks as names are added/removed, with no wasted space or overflow"
        ]
      }
    ],
    "markScheme": "5(a): Award [1] for each of the following, up to [2]:\n• Inserts Dee at index 1, shifting the others right [1]\n• [\"Ana\", \"Dee\", \"Bo\", \"Cy\"] [1]\n5(b): Award [1] for each of the following, up to [3]:\n• Traverse list comparing each name [1]\n• Remove the matching element [1]\n• Return True/False correctly [1]\n5(c): Award [1] for each of the following, up to [2]:\n• Loop over every index [1]\n• Output position + 1 and name [1]\n5(d): Award [1] for each of the following, up to [2]:\n• Number of students present varies/not known in advance [1]\n• A dynamic list grows and shrinks as names are added/removed, with no wasted space or overflow [1]"
  },
  {
    "id": "ib_b2_107",
    "unit": "B2",
    "title": "B2.2 Exam-style: noughts and crosses board",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A game stores its 3 × 3 board as a 2D list, e.g.\n\nboard = [[\"X\", \"O\", \"X\"],\n         [\"O\", \"X\", \" \"],\n         [\"O\", \" \", \"X\"]]",
    "marks": 8,
    "specReference": "B2.2.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "6(a)",
        "question": "State the value of board[1][0] and of board[2][2].",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• O [1]\n• X [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "O",
            "description": "O",
            "acceptedAnswers": [
              "O"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "X",
            "description": "X",
            "acceptedAnswers": [
              "X"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "6(b)",
        "question": "Construct a function count_empty(board) that returns the number of empty squares (\" \").",
        "marks": 3,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Nested loops over rows and cells [1]\n• Compare each cell with \" \" and count [1]\n• Return the count [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Nested loops over rows and cells",
            "description": "Nested loops over rows and cells",
            "acceptedAnswers": [
              "for row in board",
              "for cell in row"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Compare each cell with \" \" and count",
            "description": "Compare each cell with \" \" and count",
            "acceptedAnswers": [
              "== \" \""
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Return the count",
            "description": "Return the count",
            "acceptedAnswers": [
              "return empty"
            ]
          }
        ],
        "solution": "def count_empty(board):\n    empty = 0\n    for row in board:\n        for cell in row:\n            if cell == \" \":\n                empty = empty + 1\n    return empty"
      },
      {
        "id": "p3",
        "label": "6(c)",
        "question": "Construct a function wins_diagonal(board, player) that returns True if player occupies the leading diagonal (top-left to bottom-right).",
        "marks": 3,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Loop i from 0 to 2 [1]\n• Access board[i][i] [1]\n• Return False on mismatch, True otherwise [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Loop i from 0 to 2",
            "description": "Loop i from 0 to 2",
            "acceptedAnswers": [
              "range(3)"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Access board[i][i]",
            "description": "Access board[i][i]",
            "acceptedAnswers": [
              "board[i][i]"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Return False on mismatch, True otherwise",
            "description": "Return False on mismatch, True otherwise",
            "acceptedAnswers": [
              "return False",
              "return True"
            ]
          }
        ],
        "solution": "def wins_diagonal(board, player):\n    for i in range(3):\n        if board[i][i] != player:\n            return False\n    return True"
      }
    ],
    "questions": [
      {
        "q": "6(a) State the value of board[1][0] and of board[2][2].",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "O",
          "X"
        ]
      },
      {
        "q": "6(b) Construct a function count_empty(board) that returns the number of empty squares (\" \").",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Nested loops over rows and cells",
          "Compare each cell with \" \" and count",
          "Return the count"
        ]
      },
      {
        "q": "6(c) Construct a function wins_diagonal(board, player) that returns True if player occupies the leading diagonal (top-left to bottom-right).",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Loop i from 0 to 2",
          "Access board[i][i]",
          "Return False on mismatch, True otherwise"
        ]
      }
    ],
    "markScheme": "6(a): Award [1] for each of the following, up to [2]:\n• O [1]\n• X [1]\n6(b): Award [1] for each of the following, up to [3]:\n• Nested loops over rows and cells [1]\n• Compare each cell with \" \" and count [1]\n• Return the count [1]\n6(c): Award [1] for each of the following, up to [3]:\n• Loop i from 0 to 2 [1]\n• Access board[i][i] [1]\n• Return False on mismatch, True otherwise [1]"
  },
  {
    "id": "ib_b2_108",
    "unit": "B2",
    "title": "B2.2 Exam-style: browser history stack",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A web browser stores the pages a user has visited in a stack called history so that the Back button works. The stack is a Python list where the top is the last element.",
    "marks": 9,
    "specReference": "B2.2.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "7(a)",
        "question": "The user visits home, news, sport, then presses Back once, then visits weather. State the contents of history (bottom to top) at the end, assuming the current page is the top of the stack.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• home, news [1]\n• then weather on top: home, news, weather [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "home, news",
            "description": "home, news",
            "acceptedAnswers": [
              "home, news"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "then weather on top: home, news, weather",
            "description": "then weather on top: home, news, weather",
            "acceptedAnswers": [
              "home, news, weather"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "7(b)",
        "question": "Construct functions visit(history, page) and back(history). back removes the current page and returns the new current page, or returns None if there is no earlier page.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• visit pushes with append [1]\n• back checks that an earlier page exists [1]\n• pop removes the current page [1]\n• Returns the new top with peek history[-1] [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "visit pushes with append",
            "description": "visit pushes with append",
            "acceptedAnswers": [
              "append"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "back checks that an earlier page exists",
            "description": "back checks that an earlier page exists",
            "acceptedAnswers": [
              "len(history) <= 1"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "pop removes the current page",
            "description": "pop removes the current page",
            "acceptedAnswers": [
              "pop()"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Returns the new top with peek history[-1]",
            "description": "Returns the new top with peek history[-1]",
            "acceptedAnswers": [
              "history[-1]"
            ]
          }
        ],
        "solution": "def visit(history, page):\n    history.append(page)\n\ndef back(history):\n    if len(history) <= 1:\n        return None\n    history.pop()\n    return history[-1]"
      },
      {
        "id": "p3",
        "label": "7(c)",
        "question": "Explain why a stack is appropriate for this feature and why a queue would not be.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Back must return to the most recently visited page - LIFO [1]\n• A queue is FIFO and would return the oldest page first [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Back must return to the most recently visited page - LIFO",
            "description": "Back must return to the most recently visited page - LIFO",
            "acceptedAnswers": [
              "most recent",
              "LIFO"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "A queue is FIFO and would return the oldest page first",
            "description": "A queue is FIFO and would return the oldest page first",
            "acceptedAnswers": [
              "FIFO",
              "oldest"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "7(d)",
        "question": "Outline one way to stop the history using too much memory.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• Limit the stack size, removing the oldest (bottom) entries when full [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Limit the stack size, removing the oldest (bottom) entries when full",
            "description": "Limit the stack size, removing the oldest (bottom) entries when full",
            "acceptedAnswers": [
              "limit",
              "remove oldest",
              "maximum size"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "7(a) The user visits home, news, sport, then presses Back once, then visits weather. State the contents of history (bottom to top) at the end, assuming the current page is the top of the stack.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "home, news",
          "then weather on top: home, news, weather"
        ]
      },
      {
        "q": "7(b) Construct functions visit(history, page) and back(history). back removes the current page and returns the new current page, or returns None if there is no earlier page.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "visit pushes with append",
          "back checks that an earlier page exists",
          "pop removes the current page",
          "Returns the new top with peek history[-1]"
        ]
      },
      {
        "q": "7(c) Explain why a stack is appropriate for this feature and why a queue would not be.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Back must return to the most recently visited page - LIFO",
          "A queue is FIFO and would return the oldest page first"
        ]
      },
      {
        "q": "7(d) Outline one way to stop the history using too much memory.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "Limit the stack size, removing the oldest (bottom) entries when full"
        ]
      }
    ],
    "markScheme": "7(a): Award [1] for each of the following, up to [2]:\n• home, news [1]\n• then weather on top: home, news, weather [1]\n7(b): Award [1] for each of the following, up to [4]:\n• visit pushes with append [1]\n• back checks that an earlier page exists [1]\n• pop removes the current page [1]\n• Returns the new top with peek history[-1] [1]\n7(c): Award [1] for each of the following, up to [2]:\n• Back must return to the most recently visited page - LIFO [1]\n• A queue is FIFO and would return the oldest page first [1]\n7(d): Award [1] for each of the following, up to [1]:\n• Limit the stack size, removing the oldest (bottom) entries when full [1]"
  },
  {
    "id": "ib_b2_109",
    "unit": "B2",
    "title": "B2.2 Exam-style: evaluating postfix expressions",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A calculator evaluates postfix (reverse Polish) expressions such as \"3 4 + 2 *\" using a stack: numbers are pushed; an operator pops two values, applies the operator (second popped value first) and pushes the result.",
    "marks": 10,
    "specReference": "B2.2.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "8(a)",
        "question": "Trace the evaluation of \"5 1 2 + 4 * + 3 -\" and state the final result.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• 1 2 + gives 3 (stack 5 3) [1]\n• 3 4 * gives 12, then 5 + 12 = 17 [1]\n• 17 3 - gives final result 14 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "1 2 + gives 3 (stack 5 3)",
            "description": "1 2 + gives 3 (stack 5 3)",
            "acceptedAnswers": [
              "5 3"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "3 4 * gives 12, then 5 + 12 = 17",
            "description": "3 4 * gives 12, then 5 + 12 = 17",
            "acceptedAnswers": [
              "12",
              "17"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "17 3 - gives final result 14",
            "description": "17 3 - gives final result 14",
            "acceptedAnswers": [
              "14"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "8(b)",
        "question": "Construct a function evaluate(expr) that returns the result for expressions using + - * and integer operands separated by spaces.",
        "marks": 5,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [5]:\n• Split expression into tokens and loop [1]\n• Numbers pushed as integers [1]\n• Operator pops two values in the correct order [1]\n• Correct operation applied and result pushed [1]\n• Final result popped and returned [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Split expression into tokens and loop",
            "description": "Split expression into tokens and loop",
            "acceptedAnswers": [
              "split()"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Numbers pushed as integers",
            "description": "Numbers pushed as integers",
            "acceptedAnswers": [
              "append(int(token))"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Operator pops two values in the correct order",
            "description": "Operator pops two values in the correct order",
            "acceptedAnswers": [
              "b = stack.pop()",
              "a = stack.pop()"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Correct operation applied and result pushed",
            "description": "Correct operation applied and result pushed",
            "acceptedAnswers": [
              "a - b",
              "append"
            ]
          },
          {
            "id": "MP5",
            "marks": 1,
            "criterion": "Final result popped and returned",
            "description": "Final result popped and returned",
            "acceptedAnswers": [
              "return stack.pop()"
            ]
          }
        ],
        "solution": "def evaluate(expr):\n    stack = []\n    for token in expr.split():\n        if token in \"+-*\":\n            b = stack.pop()\n            a = stack.pop()\n            if token == \"+\":\n                stack.append(a + b)\n            elif token == \"-\":\n                stack.append(a - b)\n            else:\n                stack.append(a * b)\n        else:\n            stack.append(int(token))\n    return stack.pop()"
      },
      {
        "id": "p3",
        "label": "8(c)",
        "question": "State what happens in your function if the expression is \"4 +\" and suggest how to handle it.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• pop from empty list raises IndexError (stack underflow) [1]\n• Check isEmpty/length before popping or use try/except and report an invalid expression [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "pop from empty list raises IndexError (stack underflow)",
            "description": "pop from empty list raises IndexError (stack underflow)",
            "acceptedAnswers": [
              "IndexError",
              "underflow"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Check isEmpty/length before popping or use try/except and report an invalid expression",
            "description": "Check isEmpty/length before popping or use try/except and report an invalid expression",
            "acceptedAnswers": [
              "check length",
              "try/except"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "8(a) Trace the evaluation of \"5 1 2 + 4 * + 3 -\" and state the final result.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "1 2 + gives 3 (stack 5 3)",
          "3 4 * gives 12, then 5 + 12 = 17",
          "17 3 - gives final result 14"
        ]
      },
      {
        "q": "8(b) Construct a function evaluate(expr) that returns the result for expressions using + - * and integer operands separated by spaces.",
        "keywords": [],
        "maxMarks": 5,
        "criteria": [
          "Split expression into tokens and loop",
          "Numbers pushed as integers",
          "Operator pops two values in the correct order",
          "Correct operation applied and result pushed",
          "Final result popped and returned"
        ]
      },
      {
        "q": "8(c) State what happens in your function if the expression is \"4 +\" and suggest how to handle it.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "pop from empty list raises IndexError (stack underflow)",
          "Check isEmpty/length before popping or use try/except and report an invalid expression"
        ]
      }
    ],
    "markScheme": "8(a): Award [1] for each of the following, up to [3]:\n• 1 2 + gives 3 (stack 5 3) [1]\n• 3 4 * gives 12, then 5 + 12 = 17 [1]\n• 17 3 - gives final result 14 [1]\n8(b): Award [1] for each of the following, up to [5]:\n• Split expression into tokens and loop [1]\n• Numbers pushed as integers [1]\n• Operator pops two values in the correct order [1]\n• Correct operation applied and result pushed [1]\n• Final result popped and returned [1]\n8(c): Award [1] for each of the following, up to [2]:\n• pop from empty list raises IndexError (stack underflow) [1]\n• Check isEmpty/length before popping or use try/except and report an invalid expression [1]"
  },
  {
    "id": "ib_b2_110",
    "unit": "B2",
    "title": "B2.3 Exam-style: delivery charges",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "An online shop charges delivery as follows: orders of 75 or more have free delivery; otherwise standard delivery costs 4.99 and express costs 9.99. Members get express delivery for the standard price.",
    "marks": 9,
    "specReference": "B2.3.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "9(a)",
        "question": "Construct a function delivery(total, express, member) that returns the delivery charge.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Free delivery when total >= 75 [1]\n• Express non-member charged 9.99 [1]\n• Otherwise 4.99 [1]\n• Uses if/elif/else with Boolean operators correctly [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Free delivery when total >= 75",
            "description": "Free delivery when total >= 75",
            "acceptedAnswers": [
              ">= 75",
              "return 0"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Express non-member charged 9.99",
            "description": "Express non-member charged 9.99",
            "acceptedAnswers": [
              "express and not member",
              "9.99"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Otherwise 4.99",
            "description": "Otherwise 4.99",
            "acceptedAnswers": [
              "4.99"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Uses if/elif/else with Boolean operators correctly",
            "description": "Uses if/elif/else with Boolean operators correctly",
            "acceptedAnswers": [
              "elif",
              "and",
              "not"
            ]
          }
        ],
        "solution": "def delivery(total, express, member):\n    if total >= 75:\n        return 0\n    elif express and not member:\n        return 9.99\n    else:\n        return 4.99"
      },
      {
        "id": "p2",
        "label": "9(b)",
        "question": "Complete the test plan by stating the expected charge for: (i) 75, express, not member; (ii) 74.99, express, member; (iii) 10, standard, not member.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• (i) 0 [1]\n• (ii) 4.99 [1]\n• (iii) 4.99 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "(i) 0",
            "description": "(i) 0",
            "acceptedAnswers": [
              "0"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "(ii) 4.99",
            "description": "(ii) 4.99",
            "acceptedAnswers": [
              "4.99"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "(iii) 4.99",
            "description": "(iii) 4.99",
            "acceptedAnswers": [
              "4.99"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "9(c)",
        "question": "Explain why the test value 75 is important.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• It is the boundary value of the free delivery condition [1]\n• Detects use of > instead of >= [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "It is the boundary value of the free delivery condition",
            "description": "It is the boundary value of the free delivery condition",
            "acceptedAnswers": [
              "boundary"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Detects use of > instead of >=",
            "description": "Detects use of > instead of >=",
            "acceptedAnswers": [
              "> instead of >="
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "9(a) Construct a function delivery(total, express, member) that returns the delivery charge.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Free delivery when total >= 75",
          "Express non-member charged 9.99",
          "Otherwise 4.99",
          "Uses if/elif/else with Boolean operators correctly"
        ]
      },
      {
        "q": "9(b) Complete the test plan by stating the expected charge for: (i) 75, express, not member; (ii) 74.99, express, member; (iii) 10, standard, not member.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "(i) 0",
          "(ii) 4.99",
          "(iii) 4.99"
        ]
      },
      {
        "q": "9(c) Explain why the test value 75 is important.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "It is the boundary value of the free delivery condition",
          "Detects use of > instead of >="
        ]
      }
    ],
    "markScheme": "9(a): Award [1] for each of the following, up to [4]:\n• Free delivery when total >= 75 [1]\n• Express non-member charged 9.99 [1]\n• Otherwise 4.99 [1]\n• Uses if/elif/else with Boolean operators correctly [1]\n9(b): Award [1] for each of the following, up to [3]:\n• (i) 0 [1]\n• (ii) 4.99 [1]\n• (iii) 4.99 [1]\n9(c): Award [1] for each of the following, up to [2]:\n• It is the boundary value of the free delivery condition [1]\n• Detects use of > instead of >= [1]"
  },
  {
    "id": "ib_b2_111",
    "unit": "B2",
    "title": "B2.3 Exam-style: savings target",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A student saves money each week. Each week the savings increase by the weekly amount and then 1% bonus interest is added on the new balance.",
    "marks": 8,
    "specReference": "B2.3.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "10(a)",
        "question": "Construct a program that inputs a weekly amount and a target, and outputs the number of weeks needed to reach or exceed the target.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Inputs converted to float [1]\n• Conditional loop while balance < target [1]\n• Balance updated with weekly amount then 1% [1]\n• Week counter incremented and output [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Inputs converted to float",
            "description": "Inputs converted to float",
            "acceptedAnswers": [
              "float(input"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Conditional loop while balance < target",
            "description": "Conditional loop while balance < target",
            "acceptedAnswers": [
              "while balance < target"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Balance updated with weekly amount then 1%",
            "description": "Balance updated with weekly amount then 1%",
            "acceptedAnswers": [
              "* 1.01"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Week counter incremented and output",
            "description": "Week counter incremented and output",
            "acceptedAnswers": [
              "weeks + 1",
              "print(weeks)"
            ]
          }
        ],
        "solution": "weekly = float(input(\"Weekly amount: \"))\ntarget = float(input(\"Target: \"))\nbalance = 0\nweeks = 0\nwhile balance < target:\n    balance = (balance + weekly) * 1.01\n    weeks = weeks + 1\nprint(weeks)"
      },
      {
        "id": "p2",
        "label": "10(b)",
        "question": "Explain why a conditional loop is more appropriate than a counted loop here.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Number of weeks is not known in advance [1]\n• Loop must stop when the condition (balance >= target) is met [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Number of weeks is not known in advance",
            "description": "Number of weeks is not known in advance",
            "acceptedAnswers": [
              "not known"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Loop must stop when the condition (balance >= target) is met",
            "description": "Loop must stop when the condition (balance >= target) is met",
            "acceptedAnswers": [
              "stops when target reached"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "10(c)",
        "question": "Identify the input that would cause an infinite loop and describe how to prevent it.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Weekly amount 0 (or negative) with a positive target [1]\n• Validate weekly amount > 0 before the loop [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Weekly amount 0 (or negative) with a positive target",
            "description": "Weekly amount 0 (or negative) with a positive target",
            "acceptedAnswers": [
              "0",
              "negative"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Validate weekly amount > 0 before the loop",
            "description": "Validate weekly amount > 0 before the loop",
            "acceptedAnswers": [
              "validate",
              "> 0"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "10(a) Construct a program that inputs a weekly amount and a target, and outputs the number of weeks needed to reach or exceed the target.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Inputs converted to float",
          "Conditional loop while balance < target",
          "Balance updated with weekly amount then 1%",
          "Week counter incremented and output"
        ]
      },
      {
        "q": "10(b) Explain why a conditional loop is more appropriate than a counted loop here.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Number of weeks is not known in advance",
          "Loop must stop when the condition (balance >= target) is met"
        ]
      },
      {
        "q": "10(c) Identify the input that would cause an infinite loop and describe how to prevent it.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Weekly amount 0 (or negative) with a positive target",
          "Validate weekly amount > 0 before the loop"
        ]
      }
    ],
    "markScheme": "10(a): Award [1] for each of the following, up to [4]:\n• Inputs converted to float [1]\n• Conditional loop while balance < target [1]\n• Balance updated with weekly amount then 1% [1]\n• Week counter incremented and output [1]\n10(b): Award [1] for each of the following, up to [2]:\n• Number of weeks is not known in advance [1]\n• Loop must stop when the condition (balance >= target) is met [1]\n10(c): Award [1] for each of the following, up to [2]:\n• Weekly amount 0 (or negative) with a positive target [1]\n• Validate weekly amount > 0 before the loop [1]"
  },
  {
    "id": "ib_b2_112",
    "unit": "B2",
    "title": "B2.3 Exam-style: vending machine sequence",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A vending machine program contains:\n\n1  credit = 0\n2  price = 120\n3  coin = int(input(\"Coin: \"))\n4  while credit < price:\n5      credit = credit + coin\n6  coin = int(input(\"Coin: \"))\n7  change = credit - price\n8  print(\"Change:\", change)",
    "marks": 8,
    "specReference": "B2.3.1",
    "commandWord": "Explain",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "11(a)",
        "question": "The user enters 50, 50, 50. State the output and explain why the program does not behave as intended.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Output Change: 30 after only one coin is read inside the loop (credit 150) [1]\n• The same first coin is added repeatedly [1]\n• Because line 6 is outside the loop - instruction order/indentation error [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Output Change: 30 after only one coin is read inside the loop (credit 150)",
            "description": "Output Change: 30 after only one coin is read inside the loop (credit 150)",
            "acceptedAnswers": [
              "30"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "The same first coin is added repeatedly",
            "description": "The same first coin is added repeatedly",
            "acceptedAnswers": [
              "same coin",
              "added repeatedly"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Because line 6 is outside the loop - instruction order/indentation error",
            "description": "Because line 6 is outside the loop - instruction order/indentation error",
            "acceptedAnswers": [
              "line 6 outside loop",
              "indentation"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "11(b)",
        "question": "State the input that would make this program loop forever.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• 0 (or a negative coin) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "0 (or a negative coin)",
            "description": "0 (or a negative coin)",
            "acceptedAnswers": [
              "0"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "11(c)",
        "question": "Construct a corrected version of lines 3 to 8 that reads a new coin each time and rejects coins that are not 10, 20, 50 or 100.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Input inside the loop [1]\n• Valid coin check [1]\n• Only valid coins added; invalid rejected [1]\n• Change calculated after the loop [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Input inside the loop",
            "description": "Input inside the loop",
            "acceptedAnswers": [
              "input inside loop"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Valid coin check",
            "description": "Valid coin check",
            "acceptedAnswers": [
              "in [10, 20, 50, 100]"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Only valid coins added; invalid rejected",
            "description": "Only valid coins added; invalid rejected",
            "acceptedAnswers": [
              "Rejected"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Change calculated after the loop",
            "description": "Change calculated after the loop",
            "acceptedAnswers": [
              "credit - price"
            ]
          }
        ],
        "solution": "while credit < price:\n    coin = int(input(\"Coin: \"))\n    if coin in [10, 20, 50, 100]:\n        credit = credit + coin\n    else:\n        print(\"Rejected\")\nchange = credit - price\nprint(\"Change:\", change)"
      }
    ],
    "questions": [
      {
        "q": "11(a) The user enters 50, 50, 50. State the output and explain why the program does not behave as intended.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Output Change: 30 after only one coin is read inside the loop (credit 150)",
          "The same first coin is added repeatedly",
          "Because line 6 is outside the loop - instruction order/indentation error"
        ]
      },
      {
        "q": "11(b) State the input that would make this program loop forever.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "0 (or a negative coin)"
        ]
      },
      {
        "q": "11(c) Construct a corrected version of lines 3 to 8 that reads a new coin each time and rejects coins that are not 10, 20, 50 or 100.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Input inside the loop",
          "Valid coin check",
          "Only valid coins added; invalid rejected",
          "Change calculated after the loop"
        ]
      }
    ],
    "markScheme": "11(a): Award [1] for each of the following, up to [3]:\n• Output Change: 30 after only one coin is read inside the loop (credit 150) [1]\n• The same first coin is added repeatedly [1]\n• Because line 6 is outside the loop - instruction order/indentation error [1]\n11(b): Award [1] for each of the following, up to [1]:\n• 0 (or a negative coin) [1]\n11(c): Award [1] for each of the following, up to [4]:\n• Input inside the loop [1]\n• Valid coin check [1]\n• Only valid coins added; invalid rejected [1]\n• Change calculated after the loop [1]"
  },
  {
    "id": "ib_b2_113",
    "unit": "B2",
    "title": "B2.3 Exam-style: temperature module",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A science department needs reusable functions for temperature data. Readings are stored in a list in degrees Celsius.",
    "marks": 9,
    "specReference": "B2.3.4",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "12(a)",
        "question": "Construct a function to_fahrenheit(c) that returns c × 9 / 5 + 32.",
        "marks": 1,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• Correct function returning the formula [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Correct function returning the formula",
            "description": "Correct function returning the formula",
            "acceptedAnswers": [
              "return c * 9 / 5 + 32"
            ]
          }
        ],
        "solution": "def to_fahrenheit(c):\n    return c * 9 / 5 + 32"
      },
      {
        "id": "p2",
        "label": "12(b)",
        "question": "Construct a function summary(readings) that returns the minimum, maximum and mean of the list without using min(), max() or sum().",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• low/high initialised from first element [1]\n• Loop updating low and high [1]\n• Total accumulated and mean calculated [1]\n• All three values returned [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "low/high initialised from first element",
            "description": "low/high initialised from first element",
            "acceptedAnswers": [
              "readings[0]"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Loop updating low and high",
            "description": "Loop updating low and high",
            "acceptedAnswers": [
              "r < low",
              "r > high"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Total accumulated and mean calculated",
            "description": "Total accumulated and mean calculated",
            "acceptedAnswers": [
              "total / len(readings)"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "All three values returned",
            "description": "All three values returned",
            "acceptedAnswers": [
              "return low, high"
            ]
          }
        ],
        "solution": "def summary(readings):\n    low = readings[0]\n    high = readings[0]\n    total = 0\n    for r in readings:\n        if r < low:\n            low = r\n        if r > high:\n            high = r\n        total = total + r\n    return low, high, total / len(readings)"
      },
      {
        "id": "p3",
        "label": "12(c)",
        "question": "Construct code that uses both functions to output the mean of readings in Fahrenheit to 1 decimal place.",
        "marks": 2,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• summary called and mean extracted [1]\n• to_fahrenheit applied and formatted to 1 d.p. [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "summary called and mean extracted",
            "description": "summary called and mean extracted",
            "acceptedAnswers": [
              "summary(readings)"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "to_fahrenheit applied and formatted to 1 d.p.",
            "description": "to_fahrenheit applied and formatted to 1 d.p.",
            "acceptedAnswers": [
              ":.1f"
            ]
          }
        ],
        "solution": "low, high, mean = summary(readings)\nprint(f\"{to_fahrenheit(mean):.1f}\")"
      },
      {
        "id": "p4",
        "label": "12(d)",
        "question": "Explain two benefits of writing these as functions rather than repeating the code in each program.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Reusable in many programs with different lists - write once, call many times [1]\n• Easier to test/maintain - fix an error in one place [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Reusable in many programs with different lists - write once, call many times",
            "description": "Reusable in many programs with different lists - write once, call many times",
            "acceptedAnswers": [
              "reuse"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Easier to test/maintain - fix an error in one place",
            "description": "Easier to test/maintain - fix an error in one place",
            "acceptedAnswers": [
              "test",
              "one place"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "12(a) Construct a function to_fahrenheit(c) that returns c × 9 / 5 + 32.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "Correct function returning the formula"
        ]
      },
      {
        "q": "12(b) Construct a function summary(readings) that returns the minimum, maximum and mean of the list without using min(), max() or sum().",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "low/high initialised from first element",
          "Loop updating low and high",
          "Total accumulated and mean calculated",
          "All three values returned"
        ]
      },
      {
        "q": "12(c) Construct code that uses both functions to output the mean of readings in Fahrenheit to 1 decimal place.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "summary called and mean extracted",
          "to_fahrenheit applied and formatted to 1 d.p."
        ]
      },
      {
        "q": "12(d) Explain two benefits of writing these as functions rather than repeating the code in each program.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Reusable in many programs with different lists - write once, call many times",
          "Easier to test/maintain - fix an error in one place"
        ]
      }
    ],
    "markScheme": "12(a): Award [1] for each of the following, up to [1]:\n• Correct function returning the formula [1]\n12(b): Award [1] for each of the following, up to [4]:\n• low/high initialised from first element [1]\n• Loop updating low and high [1]\n• Total accumulated and mean calculated [1]\n• All three values returned [1]\n12(c): Award [1] for each of the following, up to [2]:\n• summary called and mean extracted [1]\n• to_fahrenheit applied and formatted to 1 d.p. [1]\n12(d): Award [1] for each of the following, up to [2]:\n• Reusable in many programs with different lists - write once, call many times [1]\n• Easier to test/maintain - fix an error in one place [1]"
  },
  {
    "id": "ib_b2_114",
    "unit": "B2",
    "title": "B2.4 Exam-style: finding duplicates efficiently",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A program checks whether a list of n student ID numbers contains duplicates.\n\ndef has_duplicate(ids):\n    for i in range(len(ids)):\n        for j in range(i + 1, len(ids)):\n            if ids[i] == ids[j]:\n                return True\n    return False",
    "marks": 9,
    "specReference": "B2.4.1",
    "commandWord": "Calculate",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "13(a)",
        "question": "State the number of comparisons made in the worst case when n = 5, and when n = 1000.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• n = 5: 10 [1]\n• n = 1000: 499 500 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "n = 5: 10",
            "description": "n = 5: 10",
            "acceptedAnswers": [
              "10"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "n = 1000: 499 500",
            "description": "n = 1000: 499 500",
            "acceptedAnswers": [
              "499500",
              "499 500"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "13(b)",
        "question": "State the worst-case time complexity and the space complexity of has_duplicate.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Time O(n²) [1]\n• Space O(1) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Time O(n²)",
            "description": "Time O(n²)",
            "acceptedAnswers": [
              "O(n^2)",
              "O(n²)"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Space O(1)",
            "description": "Space O(1)",
            "acceptedAnswers": [
              "O(1)"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "13(c)",
        "question": "An alternative first sorts the list (taking O(n²) with bubble sort) and then compares neighbours once. State the complexity of the comparison step and explain whether this improves on has_duplicate.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Comparing neighbours is O(n) [1]\n• But the bubble sort step is O(n²), which dominates [1]\n• So overall still O(n²) - no improvement in Big O (though best case may be faster) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Comparing neighbours is O(n)",
            "description": "Comparing neighbours is O(n)",
            "acceptedAnswers": [
              "O(n)"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "But the bubble sort step is O(n²), which dominates",
            "description": "But the bubble sort step is O(n²), which dominates",
            "acceptedAnswers": [
              "dominates",
              "O(n^2)"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "So overall still O(n²) - no improvement in Big O (though best case may be faster)",
            "description": "So overall still O(n²) - no improvement in Big O (though best case may be faster)",
            "acceptedAnswers": [
              "no improvement",
              "still O(n^2)"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "13(d)",
        "question": "Explain what is meant by the scalability of an algorithm, with reference to your answer to (a).",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• How well the algorithm's time/memory requirements grow as the input size increases [1]\n• Increasing n by 200 times increased comparisons by about 50 000 times, so O(n²) scales poorly [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "How well the algorithm's time/memory requirements grow as the input size increases",
            "description": "How well the algorithm's time/memory requirements grow as the input size increases",
            "acceptedAnswers": [
              "grows with input size"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Increasing n by 200 times increased comparisons by about 50 000 times, so O(n²) scales poorly",
            "description": "Increasing n by 200 times increased comparisons by about 50 000 times, so O(n²) scales poorly",
            "acceptedAnswers": [
              "50 000",
              "scales poorly",
              "quadratic"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "13(a) State the number of comparisons made in the worst case when n = 5, and when n = 1000.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "n = 5: 10",
          "n = 1000: 499 500"
        ]
      },
      {
        "q": "13(b) State the worst-case time complexity and the space complexity of has_duplicate.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Time O(n²)",
          "Space O(1)"
        ]
      },
      {
        "q": "13(c) An alternative first sorts the list (taking O(n²) with bubble sort) and then compares neighbours once. State the complexity of the comparison step and explain whether this improves on has_duplicate.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Comparing neighbours is O(n)",
          "But the bubble sort step is O(n²), which dominates",
          "So overall still O(n²) - no improvement in Big O (though best case may be faster)"
        ]
      },
      {
        "q": "13(d) Explain what is meant by the scalability of an algorithm, with reference to your answer to (a).",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "How well the algorithm's time/memory requirements grow as the input size increases",
          "Increasing n by 200 times increased comparisons by about 50 000 times, so O(n²) scales poorly"
        ]
      }
    ],
    "markScheme": "13(a): Award [1] for each of the following, up to [2]:\n• n = 5: 10 [1]\n• n = 1000: 499 500 [1]\n13(b): Award [1] for each of the following, up to [2]:\n• Time O(n²) [1]\n• Space O(1) [1]\n13(c): Award [1] for each of the following, up to [3]:\n• Comparing neighbours is O(n) [1]\n• But the bubble sort step is O(n²), which dominates [1]\n• So overall still O(n²) - no improvement in Big O (though best case may be faster) [1]\n13(d): Award [1] for each of the following, up to [2]:\n• How well the algorithm's time/memory requirements grow as the input size increases [1]\n• Increasing n by 200 times increased comparisons by about 50 000 times, so O(n²) scales poorly [1]"
  },
  {
    "id": "ib_b2_115",
    "unit": "B2",
    "title": "B2.4 Exam-style: library catalogue search",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A library catalogue stores 4096 book records sorted by ISBN.",
    "marks": 9,
    "specReference": "B2.4.2",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "14(a)",
        "question": "State the maximum number of comparisons needed to find an ISBN using (i) linear search, (ii) binary search.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• (i) 4096 [1]\n• (ii) 13 (accept 12) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "(i) 4096",
            "description": "(i) 4096",
            "acceptedAnswers": [
              "4096"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "(ii) 13 (accept 12)",
            "description": "(ii) 13 (accept 12)",
            "acceptedAnswers": [
              "13",
              "12"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "14(b)",
        "question": "Construct a function binary_search(isbns, target) that returns the index of target or -1.",
        "marks": 5,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [5]:\n• low and high initialised [1]\n• Loop while low <= high [1]\n• mid calculated with // [1]\n• Correct updates of low/high [1]\n• Returns mid when found and -1 otherwise [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "low and high initialised",
            "description": "low and high initialised",
            "acceptedAnswers": [
              "low = 0",
              "len(isbns) - 1"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Loop while low <= high",
            "description": "Loop while low <= high",
            "acceptedAnswers": [
              "while low <= high"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "mid calculated with //",
            "description": "mid calculated with //",
            "acceptedAnswers": [
              "// 2"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Correct updates of low/high",
            "description": "Correct updates of low/high",
            "acceptedAnswers": [
              "low = mid + 1",
              "high = mid - 1"
            ]
          },
          {
            "id": "MP5",
            "marks": 1,
            "criterion": "Returns mid when found and -1 otherwise",
            "description": "Returns mid when found and -1 otherwise",
            "acceptedAnswers": [
              "return mid",
              "return -1"
            ]
          }
        ],
        "solution": "def binary_search(isbns, target):\n    low = 0\n    high = len(isbns) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if isbns[mid] == target:\n            return mid\n        elif isbns[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1"
      },
      {
        "id": "p3",
        "label": "14(c)",
        "question": "Librarians also need to find all books by a given author. Explain which search technique must be used and why.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Linear search [1]\n• Records are not sorted by author / need to find all matches, so every record must be checked [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Linear search",
            "description": "Linear search",
            "acceptedAnswers": [
              "linear"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Records are not sorted by author / need to find all matches, so every record must be checked",
            "description": "Records are not sorted by author / need to find all matches, so every record must be checked",
            "acceptedAnswers": [
              "not sorted by author",
              "all matches"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "14(a) State the maximum number of comparisons needed to find an ISBN using (i) linear search, (ii) binary search.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "(i) 4096",
          "(ii) 13 (accept 12)"
        ]
      },
      {
        "q": "14(b) Construct a function binary_search(isbns, target) that returns the index of target or -1.",
        "keywords": [],
        "maxMarks": 5,
        "criteria": [
          "low and high initialised",
          "Loop while low <= high",
          "mid calculated with //",
          "Correct updates of low/high",
          "Returns mid when found and -1 otherwise"
        ]
      },
      {
        "q": "14(c) Librarians also need to find all books by a given author. Explain which search technique must be used and why.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Linear search",
          "Records are not sorted by author / need to find all matches, so every record must be checked"
        ]
      }
    ],
    "markScheme": "14(a): Award [1] for each of the following, up to [2]:\n• (i) 4096 [1]\n• (ii) 13 (accept 12) [1]\n14(b): Award [1] for each of the following, up to [5]:\n• low and high initialised [1]\n• Loop while low <= high [1]\n• mid calculated with // [1]\n• Correct updates of low/high [1]\n• Returns mid when found and -1 otherwise [1]\n14(c): Award [1] for each of the following, up to [2]:\n• Linear search [1]\n• Records are not sorted by author / need to find all matches, so every record must be checked [1]"
  },
  {
    "id": "ib_b2_116",
    "unit": "B2",
    "title": "B2.4 Exam-style: sorting race times",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Race times (seconds) are stored in a list: times = [12.4, 11.8, 13.1, 12.0, 11.5].",
    "marks": 9,
    "specReference": "B2.4.3",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "15(a)",
        "question": "State the list after the first pass of a bubble sort into ascending order.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• [11.8, 12.4, 12.0, 11.5, 13.1] [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "[11.8, 12.4, 12.0, 11.5, 13.1]",
            "description": "[11.8, 12.4, 12.0, 11.5, 13.1]",
            "acceptedAnswers": [
              "11.8, 12.4, 12.0, 11.5, 13.1"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "15(b)",
        "question": "State the list after the first two passes of a selection sort into ascending order.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Pass 1: [11.5, 11.8, 13.1, 12.0, 12.4] [1]\n• Pass 2: unchanged [11.5, 11.8, 13.1, 12.0, 12.4] [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Pass 1: [11.5, 11.8, 13.1, 12.0, 12.4]",
            "description": "Pass 1: [11.5, 11.8, 13.1, 12.0, 12.4]",
            "acceptedAnswers": [
              "11.5, 11.8, 13.1, 12.0, 12.4"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Pass 2: unchanged [11.5, 11.8, 13.1, 12.0, 12.4]",
            "description": "Pass 2: unchanged [11.5, 11.8, 13.1, 12.0, 12.4]",
            "acceptedAnswers": [
              "11.5, 11.8, 13.1, 12.0, 12.4"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "15(c)",
        "question": "Construct a selection sort function sort_times(times) that sorts the list into ascending order in place.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• Outer loop over positions [1]\n• Inner loop finds index of smallest remaining [1]\n• Swap into position i [1]\n• Sorts in place correctly [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Outer loop over positions",
            "description": "Outer loop over positions",
            "acceptedAnswers": [
              "for i in range(len(times) - 1)"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Inner loop finds index of smallest remaining",
            "description": "Inner loop finds index of smallest remaining",
            "acceptedAnswers": [
              "times[j] < times[smallest]"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Swap into position i",
            "description": "Swap into position i",
            "acceptedAnswers": [
              "times[i], times[smallest]"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Sorts in place correctly",
            "description": "Sorts in place correctly",
            "acceptedAnswers": [
              "in place"
            ]
          }
        ],
        "solution": "def sort_times(times):\n    for i in range(len(times) - 1):\n        smallest = i\n        for j in range(i + 1, len(times)):\n            if times[j] < times[smallest]:\n                smallest = j\n        times[i], times[smallest] = times[smallest], times[i]"
      },
      {
        "id": "p4",
        "label": "15(d)",
        "question": "State the worst-case time complexity and space complexity of selection sort.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Time O(n²) [1]\n• Space O(1) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Time O(n²)",
            "description": "Time O(n²)",
            "acceptedAnswers": [
              "O(n^2)",
              "O(n²)"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Space O(1)",
            "description": "Space O(1)",
            "acceptedAnswers": [
              "O(1)"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "15(a) State the list after the first pass of a bubble sort into ascending order.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "[11.8, 12.4, 12.0, 11.5, 13.1]"
        ]
      },
      {
        "q": "15(b) State the list after the first two passes of a selection sort into ascending order.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Pass 1: [11.5, 11.8, 13.1, 12.0, 12.4]",
          "Pass 2: unchanged [11.5, 11.8, 13.1, 12.0, 12.4]"
        ]
      },
      {
        "q": "15(c) Construct a selection sort function sort_times(times) that sorts the list into ascending order in place.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "Outer loop over positions",
          "Inner loop finds index of smallest remaining",
          "Swap into position i",
          "Sorts in place correctly"
        ]
      },
      {
        "q": "15(d) State the worst-case time complexity and space complexity of selection sort.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Time O(n²)",
          "Space O(1)"
        ]
      }
    ],
    "markScheme": "15(a): Award [1] for each of the following, up to [1]:\n• [11.8, 12.4, 12.0, 11.5, 13.1] [1]\n15(b): Award [1] for each of the following, up to [2]:\n• Pass 1: [11.5, 11.8, 13.1, 12.0, 12.4] [1]\n• Pass 2: unchanged [11.5, 11.8, 13.1, 12.0, 12.4] [1]\n15(c): Award [1] for each of the following, up to [4]:\n• Outer loop over positions [1]\n• Inner loop finds index of smallest remaining [1]\n• Swap into position i [1]\n• Sorts in place correctly [1]\n15(d): Award [1] for each of the following, up to [2]:\n• Time O(n²) [1]\n• Space O(1) [1]"
  },
  {
    "id": "ib_b2_117",
    "unit": "B2",
    "title": "B2.4 Exam-style: recursive binary search",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "The following recursive function searches a sorted list.\n\n1  def search(data, target, low, high):\n2      if low > high:\n3          return -1\n4      mid = (low + high) // 2\n5      if data[mid] == target:\n6          return mid\n7      if data[mid] < target:\n8          return search(data, target, mid + 1, high)\n9      return search(data, target, low, mid - 1)",
    "marks": 9,
    "specReference": "B2.4.5",
    "commandWord": "Trace",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "16(a)",
        "question": "Identify the two base cases.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• low > high returns -1 (not found) [1]\n• data[mid] == target returns mid [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "low > high returns -1 (not found)",
            "description": "low > high returns -1 (not found)",
            "acceptedAnswers": [
              "low > high"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "data[mid] == target returns mid",
            "description": "data[mid] == target returns mid",
            "acceptedAnswers": [
              "data[mid] == target"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "16(b)",
        "question": "data = [2, 5, 8, 12, 16, 23, 38]. Trace search(data, 23, 0, 6), stating low, high and mid for each call, and the value returned.",
        "marks": 3,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Call 1: low 0, high 6, mid 3 (12 < 23) [1]\n• Call 2: low 4, high 6, mid 5 (23 found) [1]\n• Returns 5 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Call 1: low 0, high 6, mid 3 (12 < 23)",
            "description": "Call 1: low 0, high 6, mid 3 (12 < 23)",
            "acceptedAnswers": [
              "0 6 3"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Call 2: low 4, high 6, mid 5 (23 found)",
            "description": "Call 2: low 4, high 6, mid 5 (23 found)",
            "acceptedAnswers": [
              "4 6 5"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Returns 5",
            "description": "Returns 5",
            "acceptedAnswers": [
              "5"
            ]
          }
        ]
      },
      {
        "id": "p3",
        "label": "16(c)",
        "question": "Explain why this function is an example of a non-branching recursive algorithm.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Each call makes at most one recursive call [1]\n• so calls form a single chain rather than a tree of calls [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Each call makes at most one recursive call",
            "description": "Each call makes at most one recursive call",
            "acceptedAnswers": [
              "one recursive call"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "so calls form a single chain rather than a tree of calls",
            "description": "so calls form a single chain rather than a tree of calls",
            "acceptedAnswers": [
              "single chain",
              "not a tree"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "16(d)",
        "question": "State the maximum depth of recursion for a list of 1000 items and explain why stack overflow is unlikely.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• About 10 (11) calls - log2 n [1]\n• Depth grows logarithmically so far below the recursion limit [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "About 10 (11) calls - log2 n",
            "description": "About 10 (11) calls - log2 n",
            "acceptedAnswers": [
              "10",
              "11",
              "log"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Depth grows logarithmically so far below the recursion limit",
            "description": "Depth grows logarithmically so far below the recursion limit",
            "acceptedAnswers": [
              "logarithmic",
              "recursion limit"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "16(a) Identify the two base cases.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "low > high returns -1 (not found)",
          "data[mid] == target returns mid"
        ]
      },
      {
        "q": "16(b) data = [2, 5, 8, 12, 16, 23, 38]. Trace search(data, 23, 0, 6), stating low, high and mid for each call, and the value returned.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Call 1: low 0, high 6, mid 3 (12 < 23)",
          "Call 2: low 4, high 6, mid 5 (23 found)",
          "Returns 5"
        ]
      },
      {
        "q": "16(c) Explain why this function is an example of a non-branching recursive algorithm.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Each call makes at most one recursive call",
          "so calls form a single chain rather than a tree of calls"
        ]
      },
      {
        "q": "16(d) State the maximum depth of recursion for a list of 1000 items and explain why stack overflow is unlikely.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "About 10 (11) calls - log2 n",
          "Depth grows logarithmically so far below the recursion limit"
        ]
      }
    ],
    "markScheme": "16(a): Award [1] for each of the following, up to [2]:\n• low > high returns -1 (not found) [1]\n• data[mid] == target returns mid [1]\n16(b): Award [1] for each of the following, up to [3]:\n• Call 1: low 0, high 6, mid 3 (12 < 23) [1]\n• Call 2: low 4, high 6, mid 5 (23 found) [1]\n• Returns 5 [1]\n16(c): Award [1] for each of the following, up to [2]:\n• Each call makes at most one recursive call [1]\n• so calls form a single chain rather than a tree of calls [1]\n16(d): Award [1] for each of the following, up to [2]:\n• About 10 (11) calls - log2 n [1]\n• Depth grows logarithmically so far below the recursion limit [1]"
  },
  {
    "id": "ib_b2_118",
    "unit": "B2",
    "title": "B2.4 Exam-style: recursion applications",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "Recursion is used in many areas of computer science, including drawing fractal images and traversing binary trees.",
    "marks": 9,
    "specReference": "B2.4.4",
    "commandWord": "Explain",
    "ibLevel": "HL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "17(a)",
        "question": "Outline why a fractal image such as a branching tree is suited to recursion.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• The image is self-similar - each part is a smaller copy of the whole [1]\n• Each branch can be drawn by the same function with a smaller size until a minimum size (base case) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "The image is self-similar - each part is a smaller copy of the whole",
            "description": "The image is self-similar - each part is a smaller copy of the whole",
            "acceptedAnswers": [
              "self-similar",
              "smaller copy"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Each branch can be drawn by the same function with a smaller size until a minimum size (base case)",
            "description": "Each branch can be drawn by the same function with a smaller size until a minimum size (base case)",
            "acceptedAnswers": [
              "same function",
              "base case",
              "minimum size"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "17(b)",
        "question": "Construct a recursive function countdown(n) that outputs n, n-1, ... 1 on separate lines and then outputs Go.",
        "marks": 3,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Base case at n == 0 outputs Go [1]\n• Outputs n before the recursive call [1]\n• Recursive call with n - 1 [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Base case at n == 0 outputs Go",
            "description": "Base case at n == 0 outputs Go",
            "acceptedAnswers": [
              "n == 0",
              "Go"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Outputs n before the recursive call",
            "description": "Outputs n before the recursive call",
            "acceptedAnswers": [
              "print(n)"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Recursive call with n - 1",
            "description": "Recursive call with n - 1",
            "acceptedAnswers": [
              "countdown(n - 1)"
            ]
          }
        ],
        "solution": "def countdown(n):\n    if n == 0:\n        print(\"Go\")\n    else:\n        print(n)\n        countdown(n - 1)"
      },
      {
        "id": "p3",
        "label": "17(c)",
        "question": "State what would happen if countdown(-1) were called and explain why.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Infinite recursion leading to stack overflow / RecursionError [1]\n• n never reaches 0 as it decreases from -1, so the base case is never reached [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Infinite recursion leading to stack overflow / RecursionError",
            "description": "Infinite recursion leading to stack overflow / RecursionError",
            "acceptedAnswers": [
              "RecursionError",
              "stack overflow"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "n never reaches 0 as it decreases from -1, so the base case is never reached",
            "description": "n never reaches 0 as it decreases from -1, so the base case is never reached",
            "acceptedAnswers": [
              "never reaches base case"
            ]
          }
        ]
      },
      {
        "id": "p4",
        "label": "17(d)",
        "question": "Explain one reason why an iterative version of countdown would use less memory.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• Each recursive call stores a new stack frame (parameters, return address) [1]\n• A loop reuses the same variables - O(1) memory instead of O(n) [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Each recursive call stores a new stack frame (parameters, return address)",
            "description": "Each recursive call stores a new stack frame (parameters, return address)",
            "acceptedAnswers": [
              "stack frame"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "A loop reuses the same variables - O(1) memory instead of O(n)",
            "description": "A loop reuses the same variables - O(1) memory instead of O(n)",
            "acceptedAnswers": [
              "O(1)",
              "same variables"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "17(a) Outline why a fractal image such as a branching tree is suited to recursion.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "The image is self-similar - each part is a smaller copy of the whole",
          "Each branch can be drawn by the same function with a smaller size until a minimum size (base case)"
        ]
      },
      {
        "q": "17(b) Construct a recursive function countdown(n) that outputs n, n-1, ... 1 on separate lines and then outputs Go.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Base case at n == 0 outputs Go",
          "Outputs n before the recursive call",
          "Recursive call with n - 1"
        ]
      },
      {
        "q": "17(c) State what would happen if countdown(-1) were called and explain why.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Infinite recursion leading to stack overflow / RecursionError",
          "n never reaches 0 as it decreases from -1, so the base case is never reached"
        ]
      },
      {
        "q": "17(d) Explain one reason why an iterative version of countdown would use less memory.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "Each recursive call stores a new stack frame (parameters, return address)",
          "A loop reuses the same variables - O(1) memory instead of O(n)"
        ]
      }
    ],
    "markScheme": "17(a): Award [1] for each of the following, up to [2]:\n• The image is self-similar - each part is a smaller copy of the whole [1]\n• Each branch can be drawn by the same function with a smaller size until a minimum size (base case) [1]\n17(b): Award [1] for each of the following, up to [3]:\n• Base case at n == 0 outputs Go [1]\n• Outputs n before the recursive call [1]\n• Recursive call with n - 1 [1]\n17(c): Award [1] for each of the following, up to [2]:\n• Infinite recursion leading to stack overflow / RecursionError [1]\n• n never reaches 0 as it decreases from -1, so the base case is never reached [1]\n17(d): Award [1] for each of the following, up to [2]:\n• Each recursive call stores a new stack frame (parameters, return address) [1]\n• A loop reuses the same variables - O(1) memory instead of O(n) [1]"
  },
  {
    "id": "ib_b2_119",
    "unit": "B2",
    "title": "B2.5 Exam-style: stock file processing",
    "level": "Exam-style",
    "difficulty": "Moderate",
    "type": "theory",
    "brief": "A shop stores its stock in inventory.txt, one item per line as name,quantity,price, e.g.\nApples,15,0.60\nBananas,30,0.40",
    "marks": 9,
    "specReference": "B2.5.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "18(a)",
        "question": "Construct a program that reads inventory.txt and outputs the name of each item with a quantity below a threshold entered by the user.",
        "marks": 4,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [4]:\n• File opened in read mode and closed [1]\n• Loop through each line [1]\n• Line stripped and split into fields [1]\n• Quantity converted and compared, names output [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "File opened in read mode and closed",
            "description": "File opened in read mode and closed",
            "acceptedAnswers": [
              "open(\"inventory.txt\", \"r\")",
              "close()"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Loop through each line",
            "description": "Loop through each line",
            "acceptedAnswers": [
              "for line in f"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Line stripped and split into fields",
            "description": "Line stripped and split into fields",
            "acceptedAnswers": [
              "strip()",
              "split(\",\")"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Quantity converted and compared, names output",
            "description": "Quantity converted and compared, names output",
            "acceptedAnswers": [
              "int(qty) < threshold"
            ]
          }
        ],
        "solution": "threshold = int(input(\"Threshold: \"))\nf = open(\"inventory.txt\", \"r\")\nfor line in f:\n    name, qty, price = line.strip().split(\",\")\n    if int(qty) < threshold:\n        print(name)\nf.close()"
      },
      {
        "id": "p2",
        "label": "18(b)",
        "question": "Construct code that writes a file reorder.txt containing each item name whose quantity is below 20, one per line.",
        "marks": 3,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [3]:\n• Output file opened with mode \"w\" [1]\n• Each qualifying name written with a newline [1]\n• Both files closed [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Output file opened with mode \"w\"",
            "description": "Output file opened with mode \"w\"",
            "acceptedAnswers": [
              "\"w\""
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Each qualifying name written with a newline",
            "description": "Each qualifying name written with a newline",
            "acceptedAnswers": [
              "write(",
              "\\n"
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Both files closed",
            "description": "Both files closed",
            "acceptedAnswers": [
              "close()"
            ]
          }
        ],
        "solution": "src = open(\"inventory.txt\", \"r\")\nout = open(\"reorder.txt\", \"w\")\nfor line in src:\n    parts = line.strip().split(\",\")\n    if int(parts[1]) < 20:\n        out.write(parts[0] + \"\\n\")\nsrc.close()\nout.close()"
      },
      {
        "id": "p3",
        "label": "18(c)",
        "question": "Explain the difference between opening reorder.txt with mode \"w\" and mode \"a\" if the program runs every day.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• \"w\" overwrites, so the file contains only today's list [1]\n• \"a\" appends, so items from previous days remain and may be duplicated [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "\"w\" overwrites, so the file contains only today's list",
            "description": "\"w\" overwrites, so the file contains only today's list",
            "acceptedAnswers": [
              "overwrite",
              "only today"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "\"a\" appends, so items from previous days remain and may be duplicated",
            "description": "\"a\" appends, so items from previous days remain and may be duplicated",
            "acceptedAnswers": [
              "append",
              "previous days",
              "duplicates"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "18(a) Construct a program that reads inventory.txt and outputs the name of each item with a quantity below a threshold entered by the user.",
        "keywords": [],
        "maxMarks": 4,
        "criteria": [
          "File opened in read mode and closed",
          "Loop through each line",
          "Line stripped and split into fields",
          "Quantity converted and compared, names output"
        ]
      },
      {
        "q": "18(b) Construct code that writes a file reorder.txt containing each item name whose quantity is below 20, one per line.",
        "keywords": [],
        "maxMarks": 3,
        "criteria": [
          "Output file opened with mode \"w\"",
          "Each qualifying name written with a newline",
          "Both files closed"
        ]
      },
      {
        "q": "18(c) Explain the difference between opening reorder.txt with mode \"w\" and mode \"a\" if the program runs every day.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "\"w\" overwrites, so the file contains only today's list",
          "\"a\" appends, so items from previous days remain and may be duplicated"
        ]
      }
    ],
    "markScheme": "18(a): Award [1] for each of the following, up to [4]:\n• File opened in read mode and closed [1]\n• Loop through each line [1]\n• Line stripped and split into fields [1]\n• Quantity converted and compared, names output [1]\n18(b): Award [1] for each of the following, up to [3]:\n• Output file opened with mode \"w\" [1]\n• Each qualifying name written with a newline [1]\n• Both files closed [1]\n18(c): Award [1] for each of the following, up to [2]:\n• \"w\" overwrites, so the file contains only today's list [1]\n• \"a\" appends, so items from previous days remain and may be duplicated [1]"
  },
  {
    "id": "ib_b2_120",
    "unit": "B2",
    "title": "B2.5 Exam-style: password audit file",
    "level": "Exam-style",
    "difficulty": "Hard",
    "type": "theory",
    "brief": "A system administrator has a file passwords.txt with one password per line. Weak passwords must be reported.",
    "marks": 8,
    "specReference": "B2.5.1",
    "commandWord": "Construct",
    "ibLevel": "SL",
    "paper": "Paper 2",
    "examBoard": "IB",
    "parts": [
      {
        "id": "p1",
        "label": "19(a)",
        "question": "State the Python method that reads one line of a file at a time, and the value it returns at the end of the file.",
        "marks": 2,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [2]:\n• readline() [1]\n• An empty string \"\" [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "readline()",
            "description": "readline()",
            "acceptedAnswers": [
              "readline"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "An empty string \"\"",
            "description": "An empty string \"\"",
            "acceptedAnswers": [
              "empty string",
              "\"\""
            ]
          }
        ]
      },
      {
        "id": "p2",
        "label": "19(b)",
        "question": "Construct a program that reads passwords.txt using readline() and outputs every password shorter than 9 characters or containing no digit, then the number reported.",
        "marks": 5,
        "type": "code",
        "markScheme": "Award [1] for each of the following, up to [5]:\n• File opened and first line read before loop [1]\n• Loop until empty string [1]\n• Newline stripped and digit detection [1]\n• Correct weak condition and count [1]\n• Next line read in loop, file closed, count output [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "File opened and first line read before loop",
            "description": "File opened and first line read before loop",
            "acceptedAnswers": [
              "readline()"
            ]
          },
          {
            "id": "MP2",
            "marks": 1,
            "criterion": "Loop until empty string",
            "description": "Loop until empty string",
            "acceptedAnswers": [
              "while line != \"\""
            ]
          },
          {
            "id": "MP3",
            "marks": 1,
            "criterion": "Newline stripped and digit detection",
            "description": "Newline stripped and digit detection",
            "acceptedAnswers": [
              "strip()",
              "isdigit"
            ]
          },
          {
            "id": "MP4",
            "marks": 1,
            "criterion": "Correct weak condition and count",
            "description": "Correct weak condition and count",
            "acceptedAnswers": [
              "len(pw) < 9 or not has_digit"
            ]
          },
          {
            "id": "MP5",
            "marks": 1,
            "criterion": "Next line read in loop, file closed, count output",
            "description": "Next line read in loop, file closed, count output",
            "acceptedAnswers": [
              "f.readline()",
              "close()",
              "Weak"
            ]
          }
        ],
        "solution": "f = open(\"passwords.txt\", \"r\")\nweak = 0\nline = f.readline()\nwhile line != \"\":\n    pw = line.strip()\n    has_digit = False\n    for ch in pw:\n        if ch.isdigit():\n            has_digit = True\n    if len(pw) < 9 or not has_digit:\n        print(pw)\n        weak = weak + 1\n    line = f.readline()\nf.close()\nprint(\"Weak:\", weak)"
      },
      {
        "id": "p3",
        "label": "19(c)",
        "question": "Outline one security concern with storing passwords in a plain text file.",
        "marks": 1,
        "type": "theory",
        "markScheme": "Award [1] for each of the following, up to [1]:\n• Anyone who gains access to the file can read every password - they should be hashed [1]",
        "markPoints": [
          {
            "id": "MP1",
            "marks": 1,
            "criterion": "Anyone who gains access to the file can read every password - they should be hashed",
            "description": "Anyone who gains access to the file can read every password - they should be hashed",
            "acceptedAnswers": [
              "plain text readable",
              "hash"
            ]
          }
        ]
      }
    ],
    "questions": [
      {
        "q": "19(a) State the Python method that reads one line of a file at a time, and the value it returns at the end of the file.",
        "keywords": [],
        "maxMarks": 2,
        "criteria": [
          "readline()",
          "An empty string \"\""
        ]
      },
      {
        "q": "19(b) Construct a program that reads passwords.txt using readline() and outputs every password shorter than 9 characters or containing no digit, then the number reported.",
        "keywords": [],
        "maxMarks": 5,
        "criteria": [
          "File opened and first line read before loop",
          "Loop until empty string",
          "Newline stripped and digit detection",
          "Correct weak condition and count",
          "Next line read in loop, file closed, count output"
        ]
      },
      {
        "q": "19(c) Outline one security concern with storing passwords in a plain text file.",
        "keywords": [],
        "maxMarks": 1,
        "criteria": [
          "Anyone who gains access to the file can read every password - they should be hashed"
        ]
      }
    ],
    "markScheme": "19(a): Award [1] for each of the following, up to [2]:\n• readline() [1]\n• An empty string \"\" [1]\n19(b): Award [1] for each of the following, up to [5]:\n• File opened and first line read before loop [1]\n• Loop until empty string [1]\n• Newline stripped and digit detection [1]\n• Correct weak condition and count [1]\n• Next line read in loop, file closed, count output [1]\n19(c): Award [1] for each of the following, up to [1]:\n• Anyone who gains access to the file can read every password - they should be hashed [1]"
  }
];
