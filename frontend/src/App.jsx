import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {

  // Prevent the mock interview from being finished more than once.
  const mockFinishedRef = useRef(false);

  // =========================================================
  // PAGE STATES
  // =========================================================

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [showDashboard, setShowDashboard] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showMockInterview, setShowMockInterview] = useState(false);
  const [showMockResults, setShowMockResults] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAiFeedback, setShowAiFeedback] = useState(false);

  // =========================================================
  // LOGIN / REGISTER
  // =========================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(null);

  // =========================================================
  // PRACTICE
  // =========================================================

  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [aiFeedback, setAiFeedback] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [practiceCount, setPracticeCount] = useState(10);
  const [practiceLoading, setPracticeLoading] = useState(false);

  // =========================================================
  // LEADERBOARD
  // =========================================================

  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  // =========================================================
  // PERFORMANCE HISTORY
  // =========================================================

  const [testHistory, setTestHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  // =========================================================
  // MOCK INTERVIEW
  // =========================================================

  const [mockQuestions, setMockQuestions] = useState([]);
  const [mockCurrentQuestion, setMockCurrentQuestion] = useState(0);
  const [mockSelectedAnswer, setMockSelectedAnswer] = useState("");
  const [mockScore, setMockScore] = useState(0);
  const [mockCorrectAnswers, setMockCorrectAnswers] = useState(0);
  const [mockAnswers, setMockAnswers] = useState([]);

  const [mockAiFeedback, setMockAiFeedback] = useState("");
  const [mockAiLoading, setMockAiLoading] = useState(false);

  const [mockCount, setMockCount] = useState(10);
  const [mockCompany, setMockCompany] = useState("All");
  const [mockRole, setMockRole] = useState("All");
  const [mockDifficulty, setMockDifficulty] = useState("All");

  const [mockTimeLeft, setMockTimeLeft] = useState(120);
  const [mockStarted, setMockStarted] = useState(false);
  const [mockLoading, setMockLoading] = useState(false);

  // =========================================================
  // OPEN LOGIN
  // =========================================================

  const openLogin = () => {

    setShowLogin(true);
    setShowRegister(false);

    setShowDashboard(false);
    setShowPractice(false);
    setShowLeaderboard(false);
    setShowMockInterview(false);
    setShowMockResults(false);
    setShowHistory(false);
    setShowProfile(false);
    setShowAiFeedback(false);

    setMessage("");
  };

  // =========================================================
  // OPEN REGISTER
  // =========================================================

  const openRegister = () => {

    setShowRegister(true);
    setShowLogin(false);

    setShowDashboard(false);
    setShowPractice(false);
    setShowLeaderboard(false);
    setShowMockInterview(false);
    setShowMockResults(false);
    setShowHistory(false);
    setShowProfile(false);
    setShowAiFeedback(false);

    setMessage("");
  };

  // =========================================================
  // REGISTER USER
  // =========================================================

  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("Registering...");

    try {

      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setMessage("Registration successful! Please login.");

      setName("");
      setEmail("");
      setPassword("");

      setShowRegister(false);
      setShowLogin(true);

    } catch (error) {

      console.error(error);

      setMessage(
        "Registration failed. Try another email."
      );

    }
  };

  // =========================================================
  // LOGIN USER
  // =========================================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setMessage("Logging in...");

    try {

      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const user = await response.json();

      setLoggedInUser(user);

      setShowLogin(false);
      setShowRegister(false);

      setShowDashboard(true);
      setShowPractice(false);
      setShowLeaderboard(false);
      setShowMockInterview(false);
      setShowMockResults(false);
      setShowHistory(false);
      setShowProfile(false);
      setShowAiFeedback(false);

      setMessage("");

    } catch (error) {

      console.error(error);

      setMessage("Invalid email or password.");

    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {

    setLoggedInUser(null);

    setShowLogin(false);
    setShowRegister(false);
    setShowDashboard(false);
    setShowPractice(false);
    setShowLeaderboard(false);
    setShowMockInterview(false);
    setShowMockResults(false);
    setShowHistory(false);
    setShowProfile(false);
    setShowAiFeedback(false);

    setEmail("");
    setPassword("");
    setName("");

    setAiFeedback("");
    setAiLoading(false);

    setMockQuestions([]);
    setMockAnswers([]);
    setMockStarted(false);
    mockFinishedRef.current = false;
  };

  // =========================================================
  // START PRACTICE
  // =========================================================

  const startPractice = () => {

    setShowDashboard(false);
    setShowPractice(true);
    setShowLeaderboard(false);
    setShowMockInterview(false);
    setShowMockResults(false);
    setShowHistory(false);
    setShowProfile(false);
    setShowAiFeedback(false);

    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setCorrectAnswers(0);
    setPracticeQuestions([]);

    setAiFeedback("");
    setAiLoading(false);
  };

  // =========================================================
  // START GEMINI PRACTICE
  // =========================================================

  const startFilteredPractice = async () => {

    setPracticeLoading(true);

    setPracticeQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setCorrectAnswers(0);

    try {

      console.log("Starting Gemini Practice...");

      console.log({
        company: selectedCompany,
        role: selectedRole,
        difficulty: selectedDifficulty,
        count: Number(practiceCount)
      });

      const response = await fetch(
        "http://localhost:8080/api/ai/generate-questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            company: selectedCompany,
            role: selectedRole,
            difficulty: selectedDifficulty,
            count: Number(practiceCount)
          })
        }
      );

      const responseText = await response.text();

      console.log(
        "Gemini Practice Backend Response:",
        response.status,
        responseText
      );

      if (!response.ok) {

        let errorMessage =
          "Failed to generate practice questions.";

        try {

          const errorData =
            JSON.parse(responseText);

          errorMessage =
            errorData.error ||
            errorMessage;

        } catch {

          if (responseText) {
            errorMessage = responseText;
          }

        }

        throw new Error(errorMessage);
      }

      let data;

      try {

        data = JSON.parse(responseText);

      } catch {

        throw new Error(
          "Backend returned invalid JSON."
        );
      }

      if (!data.questions) {

        throw new Error(
          "Backend did not return a 'questions' field."
        );
      }

      let questionsText =
        String(data.questions)
          .replace(/```json/gi, "")
          .replace(/```/g, "")
          .trim();

      let generatedQuestions;

      try {

        generatedQuestions =
          JSON.parse(questionsText);

      } catch {

        throw new Error(
          "Gemini returned invalid question JSON. Check the backend console."
        );
      }

      if (!Array.isArray(generatedQuestions)) {

        if (
          generatedQuestions?.questions &&
          Array.isArray(
            generatedQuestions.questions
          )
        ) {

          generatedQuestions =
            generatedQuestions.questions;

        } else {

          throw new Error(
            "Gemini did not return a valid question array."
          );
        }
      }

      const expectedCount =
        Number(practiceCount);

      if (
        generatedQuestions.length !==
        expectedCount
      ) {

        throw new Error(
          `Gemini generated ${generatedQuestions.length} questions instead of ${expectedCount}.`
        );
      }

      const normalizedQuestions =
        generatedQuestions.map(
          (question, index) => {

            const options =
              Array.isArray(question.options)
                ? question.options
                : [
                    question.optionA,
                    question.optionB,
                    question.optionC,
                    question.optionD
                  ];

            if (
              !question.question ||
              !options[0] ||
              !options[1] ||
              !options[2] ||
              !options[3]
            ) {

              throw new Error(
                `Question ${index + 1} is incomplete. Gemini must return 4 options.`
              );
            }

            let correctAnswer =
              String(
                question.correctAnswer ??
                question.answer ??
                ""
              )
                .trim()
                .toUpperCase();

            const answerMap = {

              "OPTION A": "A",
              "OPTION B": "B",
              "OPTION C": "C",
              "OPTION D": "D",

              "A)": "A",
              "B)": "B",
              "C)": "C",
              "D)": "D",

              "A.": "A",
              "B.": "B",
              "C.": "C",
              "D.": "D"
            };

            correctAnswer =
              answerMap[correctAnswer] ||
              correctAnswer;

            const optionIndex =
              options.findIndex(
                option =>
                  String(option)
                    .trim()
                    .toLowerCase() ===
                  correctAnswer
                    .trim()
                    .toLowerCase()
              );

            if (optionIndex !== -1) {

              correctAnswer =
                ["A", "B", "C", "D"][
                  optionIndex
                ];
            }

            if (
              !["A", "B", "C", "D"]
                .includes(correctAnswer)
            ) {

              throw new Error(
                `Invalid correct answer for question ${index + 1}: ${correctAnswer}`
              );
            }

            return {

              id:
                `gemini-practice-${Date.now()}-${index}`,

              questionText:
                question.question,

              optionA:
                options[0],

              optionB:
                options[1],

              optionC:
                options[2],

              optionD:
                options[3],

              correctAnswer:
                correctAnswer,

              company:
                selectedCompany,

              role:
                selectedRole,

              difficulty:
                selectedDifficulty,

              topic:
                question.topic ||
                "General"
            };
          }
        );

      console.log(
        `Successfully generated ${normalizedQuestions.length} Practice questions`
      );

      setPracticeQuestions(
        normalizedQuestions
      );

      setCurrentQuestion(0);
      setSelectedAnswer("");
      setScore(0);
      setCorrectAnswers(0);

      setAiFeedback("");
      setAiLoading(false);

    } catch (error) {

      console.error(
        "Gemini Practice generation error:",
        error
      );

      setPracticeQuestions([]);

      alert(
        "Unable to start Practice Session.\n\n" +
        (
          error?.message ||
          "Unknown error"
        ) +
        "\n\nPlease check the backend terminal."
      );

    } finally {

      setPracticeLoading(false);

    }
  };

  // =========================================================
  // LEADERBOARD
  // =========================================================

  const loadLeaderboard = async () => {

    setShowDashboard(false);
    setShowPractice(false);
    setShowMockInterview(false);
    setShowMockResults(false);
    setShowHistory(false);
    setShowProfile(false);
    setShowAiFeedback(false);

    setShowLeaderboard(true);
    setLeaderboardLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/api/users/leaderboard"
      );

      const data =
        await response.json();

      setLeaderboard(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLeaderboardLoading(false);

    }
  };

  // =========================================================
  // PERFORMANCE HISTORY
  // =========================================================

  const loadHistory = async () => {

    if (!loggedInUser) return;

    setShowDashboard(false);
    setShowPractice(false);
    setShowLeaderboard(false);
    setShowMockInterview(false);
    setShowMockResults(false);
    setShowProfile(false);
    setShowAiFeedback(false);

    setShowHistory(true);
    setHistoryLoading(true);
    setHistoryError("");

    try {

      const response = await fetch(
        `http://localhost:8080/api/tests/user/${loggedInUser.id}`
      );

      if (!response.ok) {

        throw new Error(
          "Failed to load history"
        );
      }

      const data =
        await response.json();

      setTestHistory(data);

    } catch (error) {

      console.error(error);

      setHistoryError(
        "Unable to load performance history."
      );

    } finally {

      setHistoryLoading(false);

    }
  };

  // =========================================================
  // OPEN PROFILE
  // =========================================================

  const openProfile = () => {

    setShowLogin(false);
    setShowRegister(false);

    setShowDashboard(false);
    setShowPractice(false);
    setShowLeaderboard(false);
    setShowMockInterview(false);
    setShowMockResults(false);
    setShowHistory(false);
    setShowAiFeedback(false);

    setShowProfile(true);
  };

  // =========================================================
  // SAVE TEST HISTORY
  // =========================================================

  const saveTestHistory = async (
    company,
    role,
    totalQuestions,
    correctAnswers,
    durationMinutes
  ) => {

    if (!loggedInUser) return;

    try {

      await fetch(
        "http://localhost:8080/api/tests/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            userId:
              loggedInUser.id,

            company:
              company,

            jobRole:
              role,

            totalQuestions:
              totalQuestions,

            correctAnswers:
              correctAnswers,

            durationMinutes:
              durationMinutes
          })
        }
      );

    } catch (error) {

      console.error(
        "Failed to save test history",
        error
      );
    }
  };

  // =========================================================
  // GET AI FEEDBACK
  // =========================================================

  const getAIFeedback = async (
    totalQuestions,
    correctAnswers,
    score
  ) => {

    setAiLoading(true);
    setAiFeedback("");

    try {

      const response = await fetch(
        "http://localhost:8080/api/ai/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            totalQuestions,
            correctAnswers,
            score
          })
        }
      );

      if (!response.ok) {

        throw new Error(
          "Failed to get AI feedback"
        );
      }

      const data =
        await response.json();

      console.log(
        "AI Feedback Response:",
        data
      );

      setAiFeedback(
        data.feedback ||
        "AI feedback was generated, but no feedback text was returned."
      );

    } catch (error) {

      console.error(
        "AI feedback error:",
        error
      );

      setAiFeedback(
        "Unable to generate AI feedback right now. Please try again."
      );

    } finally {

      setAiLoading(false);

    }
  };

  // =========================================================
  // GET AI FEEDBACK FOR MOCK INTERVIEW
  // =========================================================

  const getMockAIFeedback = async (
    totalQuestions,
    correctAnswers,
    score
  ) => {

    setMockAiLoading(true);
    setMockAiFeedback("");

    try {

      const response = await fetch(
        "http://localhost:8080/api/ai/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            totalQuestions,
            correctAnswers,
            score
          })
        }
      );

      if (!response.ok) {

        throw new Error(
          "Failed to get mock AI feedback"
        );
      }

      const data =
        await response.json();

      setMockAiFeedback(
        data.feedback ||
        "AI feedback was generated, but no feedback text was returned."
      );

    } catch (error) {

      console.error(
        "Mock AI feedback error:",
        error
      );

      setMockAiFeedback(
        "Unable to generate AI feedback right now. Please try again."
      );

    } finally {

      setMockAiLoading(false);

    }
  };

  // =========================================================
  // PRACTICE NEXT QUESTION
  // =========================================================

  const handleNextQuestion = async () => {

    if (!selectedAnswer) {

      alert(
        "Please select an answer."
      );

      return;
    }

    const question =
      practiceQuestions[currentQuestion];

    let newScore =
      score;

    let newCorrect =
      correctAnswers;

    if (
      selectedAnswer ===
      question.correctAnswer
    ) {

      newScore =
        score + 10;

      newCorrect =
        correctAnswers + 1;

      setScore(newScore);
      setCorrectAnswers(newCorrect);
    }

    // =======================================================
    // FINISHED PRACTICE
    // =======================================================

    if (
      currentQuestion ===
      practiceQuestions.length - 1
    ) {

      const total =
        practiceQuestions.length;

      const xpEarned =
        newScore;

      try {

        const response = await fetch(
          `http://localhost:8080/api/users/${loggedInUser.id}/practice-result`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({

              xpEarned:
                xpEarned,

              totalQuestions:
                total,

              correctAnswers:
                newCorrect
            })
          }
        );

        if (response.ok) {

          const updatedUser =
            await response.json();

          setLoggedInUser(
            updatedUser
          );
        }

      } catch (error) {

        console.error(
          "Failed to save practice result:",
          error
        );
      }

      await saveTestHistory(
        selectedCompany,
        selectedRole,
        total,
        newCorrect,
        0
      );

      const percentageScore =
        Math.round(
          (newCorrect / total) * 100
        );

      setShowPractice(false);
      setShowAiFeedback(true);

      getAIFeedback(
        total,
        newCorrect,
        percentageScore
      );

      return;
    }

    setScore(newScore);
    setCorrectAnswers(newCorrect);

    setCurrentQuestion(
      currentQuestion + 1
    );

    setSelectedAnswer("");
  };

  // =========================================================
  // START MOCK INTERVIEW
  // =========================================================

  const startMockInterview = async () => {

    setShowDashboard(false);
    setShowPractice(false);
    setShowLeaderboard(false);
    setShowHistory(false);
    setShowProfile(false);
    setShowAiFeedback(false);
    setShowMockResults(false);
    setShowMockInterview(true);

    setMockQuestions([]);
    setMockCurrentQuestion(0);
    setMockSelectedAnswer("");
    setMockScore(0);
    setMockCorrectAnswers(0);
    setMockAnswers([]);
    setMockAiFeedback("");
    setMockAiLoading(false);
    setMockTimeLeft(120);
    setMockStarted(false);
    setMockLoading(true);

    mockFinishedRef.current = false;

    try {

      console.log(
        "Starting Gemini question generation..."
      );

      console.log({
        company: mockCompany,
        role: mockRole,
        difficulty: mockDifficulty,
        count: Number(mockCount)
      });

      const response = await fetch(
        "http://localhost:8080/api/ai/generate-questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            company:
              mockCompany,

            role:
              mockRole,

            difficulty:
              mockDifficulty,

            count:
              Number(mockCount)
          })
        }
      );

      const responseText =
        await response.text();

      console.log(
        "Backend response:",
        response.status,
        responseText
      );

      if (!response.ok) {

        let errorMessage =
          "Failed to generate questions";

        try {

          const errorData =
            JSON.parse(responseText);

          errorMessage =
            errorData.error ||
            errorMessage;

        } catch {

          if (responseText) {
            errorMessage =
              responseText;
          }
        }

        throw new Error(
          errorMessage
        );
      }

      let data;

      try {

        data =
          JSON.parse(responseText);

      } catch {

        throw new Error(
          "Backend returned invalid JSON."
        );
      }

      if (!data.questions) {

        throw new Error(
          "Backend did not return a 'questions' field."
        );
      }

      let questionsText =
        String(data.questions)
          .replace(/```json/gi, "")
          .replace(/```/g, "")
          .trim();

      let generatedQuestions;

      try {

        generatedQuestions =
          JSON.parse(questionsText);

      } catch {

        throw new Error(
          "Gemini returned invalid question JSON. Check the backend console for the Gemini response."
        );
      }

      if (!Array.isArray(generatedQuestions)) {

        if (
          generatedQuestions?.questions &&
          Array.isArray(
            generatedQuestions.questions
          )
        ) {

          generatedQuestions =
            generatedQuestions.questions;

        } else {

          throw new Error(
            "Gemini did not return a valid question array."
          );
        }
      }

      const expectedCount =
        Number(mockCount);

      if (
        generatedQuestions.length !==
        expectedCount
      ) {

        throw new Error(
          `Gemini generated ${generatedQuestions.length} questions instead of ${expectedCount}. Please try again.`
        );
      }

      const normalizedQuestions =
        generatedQuestions.map(
          (question, index) => {

            const options =
              Array.isArray(question.options)
                ? question.options
                : [
                    question.optionA,
                    question.optionB,
                    question.optionC,
                    question.optionD
                  ];

            if (
              !question.question ||
              !options[0] ||
              !options[1] ||
              !options[2] ||
              !options[3]
            ) {

              throw new Error(
                `Question ${index + 1} is incomplete. Gemini must return 4 options.`
              );
            }

            let correctAnswer =
              String(
                question.correctAnswer ??
                question.answer ??
                ""
              )
                .trim()
                .toUpperCase();

            const answerMap = {

              "OPTION A": "A",
              "OPTION B": "B",
              "OPTION C": "C",
              "OPTION D": "D",

              "A)": "A",
              "B)": "B",
              "C)": "C",
              "D)": "D",

              "A.": "A",
              "B.": "B",
              "C.": "C",
              "D.": "D"
            };

            correctAnswer =
              answerMap[correctAnswer] ||
              correctAnswer;

            const optionIndex =
              options.findIndex(
                option =>
                  String(option)
                    .trim()
                    .toLowerCase() ===
                  correctAnswer
                    .trim()
                    .toLowerCase()
              );

            if (optionIndex !== -1) {

              correctAnswer =
                ["A", "B", "C", "D"][
                  optionIndex
                ];
            }

            if (
              !["A", "B", "C", "D"]
                .includes(correctAnswer)
            ) {

              throw new Error(
                `Invalid correct answer for question ${index + 1}: ${correctAnswer}`
              );
            }

            return {

              id:
                `gemini-${Date.now()}-${index}`,

              questionText:
                question.question,

              optionA:
                options[0],

              optionB:
                options[1],

              optionC:
                options[2],

              optionD:
                options[3],

              correctAnswer:
                correctAnswer,

              company:
                mockCompany,

              role:
                mockRole,

              difficulty:
                mockDifficulty,

              topic:
                question.topic ||
                "General"
            };
          }
        );

      console.log(
        `Successfully generated ${normalizedQuestions.length} questions`
      );

      setMockQuestions(
        normalizedQuestions
      );

      setMockCurrentQuestion(0);
      setMockSelectedAnswer("");
      setMockScore(0);
      setMockCorrectAnswers(0);
      setMockAnswers([]);
      setMockTimeLeft(120);

      setMockStarted(true);

    } catch (error) {

      console.error(
        "Gemini question generation error:",
        error
      );

      setMockQuestions([]);
      setMockStarted(false);

      alert(
        "Unable to start Mock Interview.\n\n" +
        (
          error?.message ||
          "Unknown error"
        ) +
        "\n\nPlease check the backend terminal for the exact error."
      );

    } finally {

      setMockLoading(false);

    }
  };

  // =========================================================
  // FINISH MOCK INTERVIEW
  // =========================================================

  const finishMockInterview = async (
    finalScore = mockScore,
    finalCorrect = mockCorrectAnswers,
    finalAnswers = mockAnswers
  ) => {

    if (
      mockFinishedRef.current
    ) {
      return;
    }

    if (
      mockQuestions.length === 0
    ) {
      return;
    }

    mockFinishedRef.current = true;

    const total =
      mockQuestions.length;

    const xpEarned =
      finalScore;

    const percentage =
      Math.round(
        (finalCorrect / total) * 100
      );

    // =======================================================
    // SAVE MOCK RESULT
    // =======================================================

    try {

      const response = await fetch(
        `http://localhost:8080/api/users/${loggedInUser.id}/mock-result`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            xpEarned:
              xpEarned,

            totalQuestions:
              total,

            correctAnswers:
              finalCorrect
          })
        }
      );

      if (response.ok) {

        const updatedUser =
          await response.json();

        setLoggedInUser(
          updatedUser
        );
      }

    } catch (error) {

      console.error(
        "Failed to save mock result:",
        error
      );
    }

    // =======================================================
    // DETERMINE COMPANY
    // =======================================================

    let company =
      mockCompany;

    if (
      company === "All"
    ) {

      const companies =
        mockQuestions.map(
          q => q.company
        );

      if (
        companies.length > 0 &&
        companies.every(
          c => c === companies[0]
        )
      ) {

        company =
          companies[0];

      } else {

        company =
          "Mixed";
      }
    }

    // =======================================================
    // DETERMINE ROLE
    // =======================================================

    let role =
      mockRole;

    if (
      role === "All"
    ) {

      const roles =
        mockQuestions.map(
          q => q.role
        );

      if (
        roles.length > 0 &&
        roles.every(
          r => r === roles[0]
        )
      ) {

        role =
          roles[0];

      } else {

        role =
          "Mixed";
      }
    }

    // =======================================================
    // SAVE TEST HISTORY
    // =======================================================

    await saveTestHistory(
      company,
      role,
      total,
      finalCorrect,
      2
    );

    // =======================================================
    // UPDATE FINAL STATE
    // =======================================================

    setMockScore(
      finalScore
    );

    setMockCorrectAnswers(
      finalCorrect
    );

    setMockAnswers(
      finalAnswers
    );

    setMockStarted(false);

    // =======================================================
    // SHOW RESULTS
    // =======================================================

    setShowMockInterview(false);
    setShowMockResults(true);

    getMockAIFeedback(
      total,
      finalCorrect,
      percentage
    );
  };

  // =========================================================
  // MOCK TIMER
  // =========================================================

  useEffect(() => {

    if (
      !mockStarted ||
      !showMockInterview
    ) {
      return;
    }

    if (
      mockTimeLeft <= 0
    ) {

      finishMockInterview();

      return;
    }

    const timer =
      setInterval(() => {

        setMockTimeLeft(
          prev => prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [
    mockStarted,
    mockTimeLeft,
    showMockInterview
  ]);

  // =========================================================
  // MOCK NEXT QUESTION
  // =========================================================

  const handleMockNextQuestion = () => {

    if (!mockSelectedAnswer) {

      alert(
        "Please select an answer."
      );

      return;
    }

    const question =
      mockQuestions[
        mockCurrentQuestion
      ];

    const answerRecord = {

      questionId:
        question.id,

      question:
        question.questionText,

      selectedAnswer:
        mockSelectedAnswer,

      correctAnswer:
        question.correctAnswer,

      topic:
        question.topic,

      isCorrect:
        mockSelectedAnswer ===
        question.correctAnswer
    };

    const updatedAnswers = [
      ...mockAnswers,
      answerRecord
    ];

    let newScore =
      mockScore;

    let newCorrect =
      mockCorrectAnswers;

    if (
      mockSelectedAnswer ===
      question.correctAnswer
    ) {

      newScore =
        mockScore + 10;

      newCorrect =
        mockCorrectAnswers + 1;
    }

    setMockAnswers(
      updatedAnswers
    );

    // =======================================================
    // LAST QUESTION
    // =======================================================

    if (
      mockCurrentQuestion ===
      mockQuestions.length - 1
    ) {

      finishMockInterview(
        newScore,
        newCorrect,
        updatedAnswers
      );

      return;
    }

    // =======================================================
    // NEXT QUESTION
    // =======================================================

    setMockScore(
      newScore
    );

    setMockCorrectAnswers(
      newCorrect
    );

    setMockCurrentQuestion(
      mockCurrentQuestion + 1
    );

    setMockSelectedAnswer("");
  };

  // =========================================================
  // BACK FROM AI FEEDBACK
  // =========================================================

  const backFromAiFeedback = () => {

    setShowAiFeedback(false);
    setShowPractice(false);
    setShowDashboard(true);

    setAiFeedback("");
    setAiLoading(false);
  };

  // =========================================================
  // BACK TO DASHBOARD
  // =========================================================

  const backToDashboard = () => {

    setShowLogin(false);
    setShowRegister(false);

    setShowDashboard(true);
    setShowPractice(false);
    setShowLeaderboard(false);
    setShowMockInterview(false);
    setShowMockResults(false);
    setShowHistory(false);
    setShowProfile(false);
    setShowAiFeedback(false);
  };

  // =========================================================
  // OPEN MOCK INTERVIEW SETUP
  // =========================================================

  const openMockInterviewSetup = () => {

    setMockQuestions([]);
    setMockCurrentQuestion(0);
    setMockSelectedAnswer("");
    setMockScore(0);
    setMockCorrectAnswers(0);
    setMockAnswers([]);
    setMockAiFeedback("");
    setMockAiLoading(false);
    setMockTimeLeft(120);
    setMockStarted(false);
    setMockLoading(false);

    mockFinishedRef.current = false;

    setShowDashboard(false);
    setShowPractice(false);
    setShowLeaderboard(false);
    setShowHistory(false);
    setShowProfile(false);
    setShowAiFeedback(false);
    setShowMockResults(false);
    setShowMockInterview(true);
  };

  // =========================================================
  // ACCURACY
  // =========================================================

  const getAccuracy = () => {

    if (
      !loggedInUser ||
      !loggedInUser.totalQuestions ||
      loggedInUser.totalQuestions === 0
    ) {

      return 0;
    }

    return Math.round(
      (
        loggedInUser.correctAnswers /
        loggedInUser.totalQuestions
      ) * 100
    );
  };

  // =========================================================
  // AI FEEDBACK PAGE
  // =========================================================

  if (showAiFeedback) {

    return (

      <div className="dashboard">

        <nav className="navbar">

          <div className="logo">
            AI Interview Prep
          </div>

          <div className="nav-links">

            <span
              onClick={backFromAiFeedback}
              style={{ cursor: "pointer" }}
            >
              Dashboard
            </span>

            <span
              onClick={startPractice}
              style={{ cursor: "pointer" }}
            >
              Practice
            </span>

            <span
              onClick={loadHistory}
              style={{ cursor: "pointer" }}
            >
              Performance
            </span>

            <span
              onClick={loadLeaderboard}
              style={{ cursor: "pointer" }}
            >
              Leaderboard
            </span>

            <span
              onClick={openProfile}
              style={{ cursor: "pointer" }}
            >
              Profile
            </span>

          </div>

          <button
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

        <div className="dashboard-content">

          <h1>
            🎯 Practice Test Completed!
          </h1>

          <div className="practice-card">

            <h2>
              🤖 AI Performance Feedback
            </h2>

            {aiLoading ? (

              <div>

                <h3>
                  Gemini is analyzing your performance...
                </h3>

                <p>
                  ⏳ Please wait while AI prepares
                  personalized feedback.
                </p>

              </div>

            ) : (

              <div>

                <h3>
                  Your Personalized Feedback
                </h3>

                <div
                  style={{
                    background: "#f8f9fc",
                    padding: "25px",
                    borderRadius: "15px",
                    marginTop: "20px",
                    lineHeight: "1.7",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {aiFeedback}
                </div>

                <button
                  className="primary-btn"
                  onClick={backFromAiFeedback}
                  style={{
                    marginTop: "25px"
                  }}
                >
                  ← Back to Dashboard
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    );
  }

  // =========================================================
  // MOCK RESULTS PAGE
  // =========================================================

  if (showMockResults) {

    const total =
      mockQuestions.length;

    const percentage =
      total > 0
        ? Math.round(
            (mockCorrectAnswers / total) * 100
          )
        : 0;

    const wrongAnswers =
      total - mockCorrectAnswers;

    const maxScore =
      total * 10;

    return (

      <div className="dashboard">

        <nav className="navbar">

          <div className="logo">
            AI Interview Prep
          </div>

          <div className="nav-links">

            <span
              onClick={backToDashboard}
              style={{ cursor: "pointer" }}
            >
              Dashboard
            </span>

            <span
              onClick={startPractice}
              style={{ cursor: "pointer" }}
            >
              Practice
            </span>

            <span
              onClick={loadHistory}
              style={{ cursor: "pointer" }}
            >
              Performance
            </span>

            <span
              onClick={loadLeaderboard}
              style={{ cursor: "pointer" }}
            >
              Leaderboard
            </span>

            <span
              onClick={openProfile}
              style={{ cursor: "pointer" }}
            >
              Profile
            </span>

          </div>

          <button
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

        <div className="dashboard-content">

          <h1>
            🎯 Mock Interview Results
          </h1>

          <p>
            Great job! Here is your interview performance.
          </p>

          <div
            style={{
              maxWidth: "900px",
              margin: "30px auto",
              background: "white",
              borderRadius: "20px",
              padding: "35px",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.08)"
            }}
          >

            {/* OVERALL PERFORMANCE */}

            <div
              style={{
                textAlign: "center",
                marginBottom: "35px"
              }}
            >

              <div
                style={{
                  fontSize: "55px"
                }}
              >
                🏆
              </div>

              <h2>
                {percentage}%
              </h2>

              <p>
                Overall Performance
              </p>

            </div>

            {/* INTERVIEW DETAILS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginBottom: "30px"
              }}
            >

              <div
                style={{
                  padding: "20px",
                  background: "#f8f9fc",
                  borderRadius: "15px"
                }}
              >

                <h3>
                  🏢 Company
                </h3>

                <p>
                  {mockCompany}
                </p>

              </div>

              <div
                style={{
                  padding: "20px",
                  background: "#f8f9fc",
                  borderRadius: "15px"
                }}
              >

                <h3>
                  💼 Role
                </h3>

                <p>
                  {mockRole}
                </p>

              </div>

              <div
                style={{
                  padding: "20px",
                  background: "#f8f9fc",
                  borderRadius: "15px"
                }}
              >

                <h3>
                  📈 Difficulty
                </h3>

                <p>
                  {mockDifficulty}
                </p>

              </div>

              <div
                style={{
                  padding: "20px",
                  background: "#f8f9fc",
                  borderRadius: "15px"
                }}
              >

                <h3>
                  📝 Questions
                </h3>

                <p>
                  {total}
                </p>

              </div>

            </div>

            {/* PERFORMANCE SUMMARY */}

            <h2>
              📊 Performance Summary
            </h2>

            <div
              className="dashboard-stats"
              style={{
                marginTop: "20px"
              }}
            >

              <div className="dashboard-card">

                <div className="dashboard-card-icon">
                  🎯
                </div>

                <h2>
                  {mockScore}/{maxScore}
                </h2>

                <p>
                  Score
                </p>

              </div>

              <div className="dashboard-card">

                <div className="dashboard-card-icon">
                  ✅
                </div>

                <h2>
                  {mockCorrectAnswers}
                </h2>

                <p>
                  Correct Answers
                </p>

              </div>

              <div className="dashboard-card">

                <div className="dashboard-card-icon">
                  ❌
                </div>

                <h2>
                  {wrongAnswers}
                </h2>

                <p>
                  Wrong Answers
                </p>

              </div>

              <div className="dashboard-card">

                <div className="dashboard-card-icon">
                  ⭐
                </div>

                <h2>
                  {mockScore}
                </h2>

                <p>
                  XP Earned
                </p>

              </div>

            </div>

            {/* PERFORMANCE MESSAGE */}

            <div
              style={{
                marginTop: "30px",
                padding: "25px",
                background: "#f8f9fc",
                borderRadius: "15px",
                textAlign: "center"
              }}
            >

              {percentage >= 80 ? (

                <div>

                  <h2>
                    🌟 Excellent Performance!
                  </h2>

                  <p>
                    You are performing very well.
                    Keep practicing to maintain your progress.
                  </p>

                </div>

              ) : percentage >= 60 ? (

                <div>

                  <h2>
                    👍 Good Performance!
                  </h2>

                  <p>
                    You have a good foundation.
                    Keep practicing to improve your accuracy.
                  </p>

                </div>

              ) : (

                <div>

                  <h2>
                    💪 Keep Practicing!
                  </h2>

                  <p>
                    Don't worry. Practice more questions
                    and focus on your weaker topics.
                  </p>

                </div>

              )}

            </div>

            {/* AI FEEDBACK */}

            <div
              style={{
                marginTop: "35px",
                padding: "25px",
                background: "#f8f9fc",
                borderRadius: "15px"
              }}
            >

              <h2>
                🤖 AI Performance Feedback
              </h2>

              {mockAiLoading ? (

                <div
                  style={{
                    textAlign: "center",
                    padding: "20px"
                  }}
                >

                  <h3>
                    Gemini is analyzing your mock interview...
                  </h3>

                  <p>
                    ⏳ Please wait while AI prepares your personalized feedback.
                  </p>

                </div>

              ) : (

                <div
                  style={{
                    marginTop: "15px",
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    lineHeight: "1.7",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {mockAiFeedback ||
                    "AI feedback will appear here after analysis."}
                </div>

              )}

            </div>

            {/* ANSWER REVIEW */}

            <h2
              style={{
                marginTop: "35px"
              }}
            >
              📝 Answer Review
            </h2>

            {mockAnswers.length === 0 ? (

              <p>
                No answer details available.
              </p>

            ) : (

              <div
                style={{
                  marginTop: "20px"
                }}
              >

                {mockAnswers.map(
                  (answer, index) => (

                    <div
                      key={`${answer.questionId || index}-${index}`}
                      style={{
                        padding: "20px",
                        marginBottom: "15px",
                        background: "#f8f9fc",
                        borderRadius: "15px",
                        borderLeft:
                          answer.isCorrect
                            ? "5px solid #28a745"
                            : "5px solid #dc3545"
                      }}
                    >

                      <h3>
                        Question {index + 1}
                      </h3>

                      <p>
                        <strong>
                          Question:
                        </strong>{" "}
                        {answer.question}
                      </p>

                      <p>
                        <strong>
                          Your Answer:
                        </strong>{" "}
                        {answer.selectedAnswer ||
                          "Not answered"}
                      </p>

                      <p>
                        <strong>
                          Correct Answer:
                        </strong>{" "}
                        {answer.correctAnswer}
                      </p>

                      {answer.topic && (

                        <p>
                          <strong>
                            Topic:
                          </strong>{" "}
                          {answer.topic}
                        </p>

                      )}

                      <p
                        style={{
                          fontWeight: "bold",
                          marginBottom: 0
                        }}
                      >
                        {answer.isCorrect
                          ? "✅ Correct"
                          : "❌ Incorrect"}
                      </p>

                    </div>

                  )
                )}

              </div>

            )}

            {/* RESULT BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "30px"
              }}
            >

              {/* TRY AGAIN */}

              <button
                className="primary-btn"
                onClick={
                  openMockInterviewSetup
                }
              >
                🔄 Try Again
              </button>

              {/* DASHBOARD */}

              <button
                className="secondary-btn"
                onClick={backToDashboard}
              >
                🏠 Back to Dashboard
              </button>

              {/* HISTORY */}

              <button
                className="secondary-btn"
                onClick={loadHistory}
              >
                📊 View History
              </button>

            </div>

          </div>

        </div>

      </div>

    );
  }

  // =========================================================
  // PROFILE PAGE
  // =========================================================

  if (showProfile) {

    return (

      <div className="dashboard">

        <nav className="navbar">

          <div className="logo">
            AI Interview Prep
          </div>

          <div className="nav-links">

            <span
              onClick={backToDashboard}
              style={{ cursor: "pointer" }}
            >
              Dashboard
            </span>

            <span
              onClick={startPractice}
              style={{ cursor: "pointer" }}
            >
              Practice
            </span>

            <span
              onClick={loadHistory}
              style={{ cursor: "pointer" }}
            >
              Performance
            </span>

            <span
              onClick={loadLeaderboard}
              style={{ cursor: "pointer" }}
            >
              Leaderboard
            </span>

            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Profile
            </span>

          </div>

          <button
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

        <div className="dashboard-content">

          <h1>
            👤 My Profile
          </h1>

          <p>
            View your account information and
            interview preparation progress.
          </p>

          <div
            style={{
              maxWidth: "800px",
              margin: "30px auto",
              background: "white",
              borderRadius: "20px",
              padding: "35px",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.08)"
            }}
          >

            {/* USER HEADER */}

            <div
              style={{
                textAlign: "center",
                marginBottom: "35px"
              }}
            >

              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "#f0f4ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "45px",
                  margin: "0 auto 15px"
                }}
              >
                👤
              </div>

              <h2>
                {loggedInUser?.name ||
                  "User"}
              </h2>

              <p>
                {loggedInUser?.email ||
                  "No email available"}
              </p>

            </div>

            {/* ACCOUNT INFORMATION */}

            <h3
              style={{
                marginBottom: "20px"
              }}
            >
              Account Information
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px"
              }}
            >

              <div
                style={{
                  padding: "18px",
                  background: "#f8f9fc",
                  borderRadius: "12px"
                }}
              >

                <strong>
                  👤 Name
                </strong>

                <p>
                  {loggedInUser?.name ||
                    "Not available"}
                </p>

              </div>

              <div
                style={{
                  padding: "18px",
                  background: "#f8f9fc",
                  borderRadius: "12px"
                }}
              >

                <strong>
                  📧 Email
                </strong>

                <p>
                  {loggedInUser?.email ||
                    "Not available"}
                </p>

              </div>

              <div
                style={{
                  padding: "18px",
                  background: "#f8f9fc",
                  borderRadius: "12px"
                }}
              >

                <strong>
                  🎓 Role
                </strong>

                <p>
                  {loggedInUser?.role ||
                    "Candidate"}
                </p>

              </div>

              <div
                style={{
                  padding: "18px",
                  background: "#f8f9fc",
                  borderRadius: "12px"
                }}
              >

                <strong>
                  🆔 User ID
                </strong>

                <p>
                  {loggedInUser?.id ||
                    "Not available"}
                </p>

              </div>

            </div>

            {/* PERFORMANCE */}

            <h3
              style={{
                marginTop: "35px",
                marginBottom: "20px"
              }}
            >
              📊 Interview Performance
            </h3>

            <div className="dashboard-stats">

              <div className="dashboard-card">

                <div className="dashboard-card-icon">
                  ⭐
                </div>

                <h2>
                  {loggedInUser?.xp || 0}
                </h2>

                <p>
                  Total XP
                </p>

              </div>

              <div className="dashboard-card">

                <div className="dashboard-card-icon">
                  📝
                </div>

                <h2>
                  {loggedInUser?.testsCompleted || 0}
                </h2>

                <p>
                  Tests Completed
                </p>

              </div>

              <div className="dashboard-card">

                <div className="dashboard-card-icon">
                  📚
                </div>

                <h2>
                  {loggedInUser?.totalQuestions || 0}
                </h2>

                <p>
                  Questions Attempted
                </p>

              </div>

              <div className="dashboard-card">

                <div className="dashboard-card-icon">
                  🎯
                </div>

                <h2>
                  {getAccuracy()}%
                </h2>

                <p>
                  Accuracy
                </p>

              </div>

            </div>

            {/* CORRECT ANSWERS */}

            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                background: "#f8f9fc",
                borderRadius: "12px",
                textAlign: "center"
              }}
            >

              <h3>
                ✅ Correct Answers
              </h3>

              <h2>
                {loggedInUser?.correctAnswers || 0}
              </h2>

              <p>
                Out of{" "}
                {loggedInUser?.totalQuestions || 0}
                {" "}questions attempted
              </p>

            </div>

            {/* BUTTONS */}

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "15px",
                flexWrap: "wrap"
              }}
            >

              <button
                className="primary-btn"
                onClick={startPractice}
              >
                📝 Start Practice
              </button>

              <button
                className="secondary-btn"
                onClick={loadHistory}
              >
                📊 View Performance History
              </button>

              <button
                className="secondary-btn"
                onClick={backToDashboard}
              >
                ← Back to Dashboard
              </button>

            </div>

          </div>

        </div>

      </div>

    );
  }

  // =========================================================
  // MOCK INTERVIEW PAGE
  // =========================================================

  if (showMockInterview) {

    return (

      <div className="dashboard">

        <nav className="navbar">

          <div className="logo">
            AI Interview Prep
          </div>

          <div className="nav-links">

            <span
              onClick={backToDashboard}
              style={{ cursor: "pointer" }}
            >
              Dashboard
            </span>

            <span
              onClick={startPractice}
              style={{ cursor: "pointer" }}
            >
              Practice
            </span>

            <span
              onClick={loadHistory}
              style={{ cursor: "pointer" }}
            >
              Performance
            </span>

            <span
              onClick={loadLeaderboard}
              style={{ cursor: "pointer" }}
            >
              Leaderboard
            </span>

            <span
              onClick={openProfile}
              style={{ cursor: "pointer" }}
            >
              Profile
            </span>

          </div>

          <button
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

        <div className="dashboard-content">

          <h1>
            🎤 Mock Interview
          </h1>

          <div className="practice-card">

            {/* LOADING */}

            {mockLoading ? (

              <div
                style={{
                  textAlign: "center",
                  padding: "30px"
                }}
              >

                <h2>
                  🤖 Gemini is generating your interview...
                </h2>

                <p>
                  Creating {mockCount} questions for{" "}
                  {mockCompany}, {mockRole},{" "}
                  {mockDifficulty} difficulty.
                </p>

                <p>
                  Please wait. This can take a few seconds.
                </p>

              </div>

            ) : mockQuestions.length === 0 ? (

              // =================================================
              // MOCK INTERVIEW SETUP
              // =================================================

              <div>

                <h2>
                  Mock Interview Setup
                </h2>

                {/* COMPANY */}

                <label>
                  Company
                </label>

                <select
                  value={mockCompany}
                  onChange={(e) =>
                    setMockCompany(
                      e.target.value
                    )
                  }
                >

                  <option value="All">
                    All Companies
                  </option>

                  <option value="Amazon">
                    Amazon
                  </option>

                  <option value="Google">
                    Google
                  </option>

                  <option value="Microsoft">
                    Microsoft
                  </option>

                  <option value="Meta">
                    Meta
                  </option>

                  <option value="Apple">
                    Apple
                  </option>

                  <option value="Netflix">
                    Netflix
                  </option>

                  <option value="Adobe">
                    Adobe
                  </option>

                </select>

                {/* ROLE */}

                <label>
                  Role
                </label>

                <select
                  value={mockRole}
                  onChange={(e) =>
                    setMockRole(
                      e.target.value
                    )
                  }
                >

                  <option value="All">
                    All Roles
                  </option>

                  <option value="Software Engineer">
                    Software Engineer
                  </option>

                  <option value="Data Scientist">
                    Data Scientist
                  </option>

                  <option value="Frontend Developer">
                    Frontend Developer
                  </option>

                  <option value="Backend Developer">
                    Backend Developer
                  </option>

                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>

                  <option value="Machine Learning Engineer">
                    Machine Learning Engineer
                  </option>

                  <option value="DevOps Engineer">
                    DevOps Engineer
                  </option>

                </select>

                {/* DIFFICULTY */}

                <label>
                  Difficulty
                </label>

                <select
                  value={mockDifficulty}
                  onChange={(e) =>
                    setMockDifficulty(
                      e.target.value
                    )
                  }
                >

                  <option value="All">
                    All
                  </option>

                  <option value="Easy">
                    Easy
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Hard">
                    Hard
                  </option>

                </select>

                {/* NUMBER OF QUESTIONS */}

                <label>
                  Number of Questions
                </label>

                <select
                  value={mockCount}
                  onChange={(e) =>
                    setMockCount(
                      Number(
                        e.target.value
                      )
                    )
                  }
                >

                  <option value={10}>
                    10 Questions
                  </option>

                  <option value={15}>
                    15 Questions
                  </option>

                  <option value={20}>
                    20 Questions
                  </option>

                </select>

                {/* START */}

                <button
                  className="primary-btn"
                  onClick={
                    startMockInterview
                  }
                >
                  Start Mock Interview
                </button>

              </div>

            ) : (

              // =================================================
              // MOCK QUESTIONS
              // =================================================

              <div>

                {/* TIMER */}

                <div className="timer">
                  ⏱️ {mockTimeLeft}s
                </div>

                {/* QUESTION NUMBER */}

                <h2>

                  Question{" "}

                  {mockCurrentQuestion + 1}

                  {" "}of{" "}

                  {mockQuestions.length}

                </h2>

                {/* QUESTION */}

                <h3>

                  {
                    mockQuestions[
                      mockCurrentQuestion
                    ].questionText
                  }

                </h3>

                {/* OPTIONS */}

                {[
                  "A",
                  "B",
                  "C",
                  "D"
                ].map(option => (

                  <button
                    key={option}
                    className={
                      mockSelectedAnswer === option
                        ? "answer-btn selected"
                        : "answer-btn"
                    }
                    onClick={() =>
                      setMockSelectedAnswer(
                        option
                      )
                    }
                  >

                    {
                      mockQuestions[
                        mockCurrentQuestion
                      ][
                        `option${option}`
                      ]
                    }

                  </button>

                ))}

                {/* NEXT / FINISH */}

                <button
                  className="primary-btn"
                  onClick={
                    handleMockNextQuestion
                  }
                >

                  {
                    mockCurrentQuestion ===
                    mockQuestions.length - 1
                      ? "Finish Interview"
                      : "Next Question"
                  }

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    );
  }

  // =========================================================
  // PRACTICE PAGE
  // =========================================================

  if (showPractice) {

    return (

      <div className="dashboard">

        <nav className="navbar">

          <div className="logo">
            AI Interview Prep
          </div>

          <div className="nav-links">

            <span
              onClick={backToDashboard}
              style={{ cursor: "pointer" }}
            >
              Dashboard
            </span>

            <span>
              Practice
            </span>

            <span
              onClick={loadHistory}
              style={{ cursor: "pointer" }}
            >
              Performance
            </span>

            <span
              onClick={loadLeaderboard}
              style={{ cursor: "pointer" }}
            >
              Leaderboard
            </span>

            <span
              onClick={openProfile}
              style={{ cursor: "pointer" }}
            >
              Profile
            </span>

          </div>

          <button
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

        <div className="dashboard-content">

          <h1>
            📝 Practice Test
          </h1>

          {practiceLoading ? (

            <div
              className="practice-card"
              style={{
                textAlign: "center",
                padding: "40px"
              }}
            >

              <h2>
                🤖 Gemini is generating your practice questions...
              </h2>

              <p>
                Creating {practiceCount} questions for{" "}
                {selectedCompany}, {selectedRole},{" "}
                {selectedDifficulty} difficulty.
              </p>

              <p>
                ⏳ Please wait...
              </p>

            </div>

          ) : practiceQuestions.length === 0 ? (

            <div className="practice-card">

              <h2>
                Choose Practice Options
              </h2>

              {/* COMPANY */}

              <label>
                Company
              </label>

              <select
                value={selectedCompany}
                onChange={(e) =>
                  setSelectedCompany(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Companies
                </option>

                <option value="Amazon">
                  Amazon
                </option>

                <option value="Google">
                  Google
                </option>

                <option value="Microsoft">
                  Microsoft
                </option>

                <option value="Meta">
                  Meta
                </option>

                <option value="Apple">
                  Apple
                </option>

                <option value="Netflix">
                  Netflix
                </option>

                <option value="Adobe">
                  Adobe
                </option>

              </select>

              {/* ROLE */}

              <label>
                Role
              </label>

              <select
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Roles
                </option>

                <option value="Software Engineer">
                  Software Engineer
                </option>

                <option value="Data Scientist">
                  Data Scientist
                </option>

                <option value="Frontend Developer">
                  Frontend Developer
                </option>

                <option value="Backend Developer">
                  Backend Developer
                </option>

                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>

                <option value="Machine Learning Engineer">
                  Machine Learning Engineer
                </option>

                <option value="DevOps Engineer">
                  DevOps Engineer
                </option>

              </select>

              {/* DIFFICULTY */}

              <label>
                Difficulty
              </label>

              <select
                value={selectedDifficulty}
                onChange={(e) =>
                  setSelectedDifficulty(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All
                </option>

                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>

              </select>

              {/* NUMBER OF QUESTIONS */}

              <label>
                Number of Questions
              </label>

              <select
                value={practiceCount}
                onChange={(e) =>
                  setPracticeCount(
                    Number(
                      e.target.value
                    )
                  )
                }
              >

                <option value={5}>
                  5 Questions
                </option>

                <option value={10}>
                  10 Questions
                </option>

                <option value={15}>
                  15 Questions
                </option>

              </select>

              {/* START PRACTICE */}

              <button
                className="primary-btn"
                onClick={
                  startFilteredPractice
                }
              >
                Start Practice
              </button>

            </div>

          ) : (

            <div className="practice-card">

              <h2>

                Question{" "}

                {currentQuestion + 1}

                {" "}of{" "}

                {practiceQuestions.length}

              </h2>

              <h3>

                {
                  practiceQuestions[
                    currentQuestion
                  ].questionText
                }

              </h3>

              {/* OPTIONS */}

              {[
                "A",
                "B",
                "C",
                "D"
              ].map(option => (

                <button
                  key={option}
                  className={
                    selectedAnswer === option
                      ? "answer-btn selected"
                      : "answer-btn"
                  }
                  onClick={() =>
                    setSelectedAnswer(
                      option
                    )
                  }
                >

                  {
                    practiceQuestions[
                      currentQuestion
                    ][
                      `option${option}`
                    ]
                  }

                </button>

              ))}

              {/* NEXT / FINISH */}

              <button
                className="primary-btn"
                onClick={
                  handleNextQuestion
                }
              >

                {
                  currentQuestion ===
                  practiceQuestions.length - 1
                    ? "Finish Practice"
                    : "Next Question"
                }

              </button>

            </div>

          )}

        </div>

      </div>

    );
  }

  // =========================================================
  // LEADERBOARD
  // =========================================================

  if (showLeaderboard) {

    return (

      <div className="dashboard">

        <nav className="navbar">

          <div className="logo">
            AI Interview Prep
          </div>

          <div className="nav-links">

            <span
              onClick={backToDashboard}
              style={{ cursor: "pointer" }}
            >
              Dashboard
            </span>

            <span
              onClick={startPractice}
              style={{ cursor: "pointer" }}
            >
              Practice
            </span>

            <span
              onClick={loadHistory}
              style={{ cursor: "pointer" }}
            >
              Performance
            </span>

            <span>
              Leaderboard
            </span>

            <span
              onClick={openProfile}
              style={{ cursor: "pointer" }}
            >
              Profile
            </span>

          </div>

          <button
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

        <div className="dashboard-content">

          <h1>
            🏆 Leaderboard
          </h1>

          {leaderboardLoading ? (

            <p>
              Loading leaderboard...
            </p>

          ) : (

            <div className="leaderboard">

              {leaderboard.map(
                (user, index) => (

                  <div
                    className="leaderboard-row"
                    key={user.id}
                  >

                    <strong>
                      #{index + 1}
                    </strong>

                    <span>
                      {user.name}
                    </span>

                    <span>
                      ⭐ {user.xp} XP
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    );
  }

  // =========================================================
  // PERFORMANCE HISTORY
  // =========================================================

  if (showHistory) {

    return (

      <div className="dashboard">

        <nav className="navbar">

          <div className="logo">
            AI Interview Prep
          </div>

          <div className="nav-links">

            <span
              onClick={backToDashboard}
              style={{ cursor: "pointer" }}
            >
              Dashboard
            </span>

            <span
              onClick={startPractice}
              style={{ cursor: "pointer" }}
            >
              Practice
            </span>

            <span>
              Performance
            </span>

            <span
              onClick={loadLeaderboard}
              style={{ cursor: "pointer" }}
            >
              Leaderboard
            </span>

            <span
              onClick={openProfile}
              style={{ cursor: "pointer" }}
            >
              Profile
            </span>

          </div>

          <button
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

        <div className="dashboard-content">

          <h1>
            📊 Performance History
          </h1>

          {historyLoading ? (

            <p>
              Loading history...
            </p>

          ) : historyError ? (

            <p>
              {historyError}
            </p>

          ) : testHistory.length === 0 ? (

            <p>
              No interview history found.
            </p>

          ) : (

            <div>

              <h2>
                Total Tests:{" "}
                {testHistory.length}
              </h2>

              <table>

                <thead>

                  <tr>

                    <th>
                      Company
                    </th>

                    <th>
                      Role
                    </th>

                    <th>
                      Questions
                    </th>

                    <th>
                      Correct
                    </th>

                    <th>
                      Score
                    </th>

                    <th>
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {testHistory.map(
                    test => (

                      <tr
                        key={test.id}
                      >

                        <td>
                          {test.company}
                        </td>

                        <td>
                          {test.jobRole}
                        </td>

                        <td>
                          {test.totalQuestions}
                        </td>

                        <td>
                          {test.correctAnswers}
                        </td>

                        <td>
                          {test.score}%
                        </td>

                        <td>

                          {test.testDate
                            ? new Date(
                                test.testDate
                              ).toLocaleDateString()
                            : "-"}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  if (showDashboard) {

    return (

      <div className="dashboard">

        <nav className="navbar">

          <div className="logo">
            AI Interview Prep
          </div>

          <div className="nav-links">

            <span>
              Dashboard
            </span>

            <span
              onClick={startPractice}
              style={{ cursor: "pointer" }}
            >
              Practice
            </span>

            <span
              onClick={loadHistory}
              style={{ cursor: "pointer" }}
            >
              Performance
            </span>

            <span
              onClick={loadLeaderboard}
              style={{ cursor: "pointer" }}
            >
              Leaderboard
            </span>

            <span
              onClick={openProfile}
              style={{ cursor: "pointer" }}
            >
              Profile
            </span>

          </div>

          <button
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

        <div className="dashboard-content">

          <h1>

            Welcome,{" "}

            {loggedInUser?.name}

            {" "}👋

          </h1>

          <p>
            Continue your interview preparation.
          </p>

          {/* STATS */}

          <div className="dashboard-stats">

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                ⭐
              </div>

              <h2>
                {loggedInUser?.xp || 0}
              </h2>

              <p>
                Total XP
              </p>

            </div>

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                📝
              </div>

              <h2>
                {loggedInUser?.testsCompleted || 0}
              </h2>

              <p>
                Tests Completed
              </p>

            </div>

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                📚
              </div>

              <h2>
                {loggedInUser?.totalQuestions || 0}
              </h2>

              <p>
                Questions Attempted
              </p>

            </div>

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                🎯
              </div>

              <h2>
                {getAccuracy()}%
              </h2>

              <p>
                Accuracy
              </p>

            </div>

          </div>

          {/* DASHBOARD ACTIONS */}

          <div className="dashboard-actions">

            {/* PRACTICE */}

            <button
              className="primary-btn"
              onClick={startPractice}
            >
              📝 Start Practice
            </button>

            {/* MOCK INTERVIEW */}

            <button
              className="secondary-btn"
              onClick={
                openMockInterviewSetup
              }
            >
              🎤 Mock Interview
            </button>

            {/* LEADERBOARD */}

            <button
              className="secondary-btn"
              onClick={loadLeaderboard}
            >
              🏆 Leaderboard
            </button>

            {/* HISTORY */}

            <button
              className="secondary-btn"
              onClick={loadHistory}
            >
              📊 Performance History
            </button>

            {/* PROFILE */}

            <button
              className="secondary-btn"
              onClick={openProfile}
            >
              👤 My Profile
            </button>

          </div>

        </div>

      </div>

    );
  }

  // =========================================================
  // HOME PAGE
  // =========================================================

  return (

    <div className="home-page">

      <nav className="navbar">

        <div className="logo">
          AI Interview Prep
        </div>

        <div className="nav-links">

          <span>
            Home
          </span>

          <span>
            About
          </span>

          <span
            onClick={openLogin}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>

          <span
            onClick={openRegister}
            style={{ cursor: "pointer" }}
          >
            Register
          </span>

          <span
            onClick={openLogin}
            style={{ cursor: "pointer" }}
          >
            Profile
          </span>

        </div>

      </nav>

      <div className="hero-section">

        <h1>
          AI Interview Preparation
        </h1>

        <p>
          Practice interview questions,
          improve your skills and prepare
          for your dream company.
        </p>

        <button
          className="primary-btn"
          onClick={openLogin}
        >
          Get Started
        </button>

      </div>

      {/* =====================================================
          LOGIN MODAL
          ===================================================== */}

      {showLogin && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              Login
            </h2>

            <form
              onSubmit={handleLogin}
            >

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                className="primary-btn"
                type="submit"
              >
                Login
              </button>

            </form>

            {message && (

              <p>
                {message}
              </p>

            )}

            <p>

              Don't have an account?

              <span
                onClick={openRegister}
                style={{
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {" "}Register
              </span>

            </p>

          </div>

        </div>

      )}

      {/* =====================================================
          REGISTER MODAL
          ===================================================== */}

      {showRegister && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              Register
            </h2>

            <form
              onSubmit={handleRegister}
            >

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                className="primary-btn"
                type="submit"
              >
                Register
              </button>

            </form>

            {message && (

              <p>
                {message}
              </p>

            )}

            <p>

              Already have an account?

              <span
                onClick={openLogin}
                style={{
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {" "}Login
              </span>

            </p>

          </div>

        </div>

      )}

    </div>

  );
}

export default App;