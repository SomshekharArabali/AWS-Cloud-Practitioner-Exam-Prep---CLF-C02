"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, CheckCircle, RotateCcw, Eye } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function QuizPage() {
  const params = useParams()
  const setId = params.id as string

  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(`/data/set_${setId}.json`)
        if (response.ok) {
          const data = await response.json()
          setQuestions(data)
        } else {
          console.error("Failed to load questions")
        }
        setLoading(false)
      } catch (error) {
        console.error("Error loading questions:", error)
        setLoading(false)
      }
    }

    loadQuestions()
  }, [setId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-gray-300">Loading questions...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-300">No questions found for this set.</p>
          <Link href="/question-sets">
            <Button className="mt-4">Back to Question Sets</Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-300">Error loading current question.</p>
          <Link href="/question-sets">
            <Button className="mt-4">Back to Question Sets</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isMultipleChoice =
    Array.isArray(currentQuestion.correct_answer_id) && currentQuestion.correct_answer_id.length > 1
  const requiredSelections = isMultipleChoice ? currentQuestion.correct_answer_id.length : 1

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Function to check if an option is correct
  const isOptionCorrect = (optionId: number) => {
    const correctAnswers = Array.isArray(currentQuestion.correct_answer_id)
      ? currentQuestion.correct_answer_id
      : [currentQuestion.correct_answer_id]
    return correctAnswers.includes(optionId)
  }

  // Function to get the option styling based on selection and correctness
  const getOptionStyling = (optionId: number) => {
    const isSelected = isOptionSelected(optionId)
    const isCorrect = isOptionCorrect(optionId)

    if (!showAnswerFeedback) {
      // Normal state - before revealing answers
      if (isSelected) {
        return "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
      }
      return "hover:bg-slate-50 dark:hover:bg-secondary dark:border-gray-600 dark:text-gray-200"
    } else {
      // After revealing answers
      if (isSelected && isCorrect) {
        return "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-500"
      } else if (isSelected && !isCorrect) {
        return "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500"
      } else if (!isSelected && isCorrect) {
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 dark:from-green-900/30 dark:to-green-900/40 dark:text-green-300 dark:border-green-600"
      } else {
        return "hover:bg-slate-50 dark:hover:bg-secondary dark:border-gray-600 dark:text-gray-200"
      }
    }
  }

  const handleAnswerSelect = (optionId: number) => {
    // Prevent selection if answers are revealed
    if (showAnswerFeedback) return

    const newAnswers = [...selectedAnswers]
    const currentSelections = newAnswers[currentQuestionIndex] || []

    if (isMultipleChoice) {
      let updatedSelections
      if (Array.isArray(currentSelections)) {
        if (currentSelections.includes(optionId)) {
          updatedSelections = currentSelections.filter((id) => id !== optionId)
        } else if (currentSelections.length < requiredSelections) {
          updatedSelections = [...currentSelections, optionId]
        } else {
          return
        }
      } else {
        updatedSelections = [optionId]
      }
      newAnswers[currentQuestionIndex] = updatedSelections
    } else {
      newAnswers[currentQuestionIndex] = optionId
    }

    setSelectedAnswers(newAnswers)
  }

  const isOptionSelected = (optionId: number) => {
    const currentSelections = selectedAnswers[currentQuestionIndex]
    if (isMultipleChoice) {
      return Array.isArray(currentSelections) && currentSelections.includes(optionId)
    }
    return currentSelections === optionId
  }

  const canProceed = () => {
    const currentSelections = selectedAnswers[currentQuestionIndex]
    if (isMultipleChoice) {
      return Array.isArray(currentSelections) && currentSelections.length === requiredSelections
    }
    return currentSelections !== undefined
  }

  const handleNext = () => {
    if (!showAnswerFeedback) {
      // First click - reveal answers
      setShowAnswerFeedback(true)
    } else {
      // Second click - move to next question
      setShowAnswerFeedback(false)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        completeQuiz()
      }
    }
  }

  const completeQuiz = () => {
    let correctCount = 0
    questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index]
      const correctAnswer = question.correct_answer_id

      if (Array.isArray(correctAnswer)) {
        if (
          Array.isArray(userAnswer) &&
          userAnswer.length === correctAnswer.length &&
          userAnswer.every((id) => correctAnswer.includes(id))
        ) {
          correctCount++
        }
      } else {
        if (userAnswer === correctAnswer) {
          correctCount++
        }
      }
    })
    setScore(correctCount)
    setQuizCompleted(true)
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setQuizCompleted(false)
    setScore(0)
    setTimeElapsed(0)
    setShowDetails(false)
    setShowAnswerFeedback(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 dark:bg-gray-900/80 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/question-sets"
                className="flex items-center space-x-2 text-slate-600 hover:text-orange-500 transition-colors dark:text-gray-300 dark:hover:text-orange-400"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Question Sets</span>
              </Link>
              <span className="text-lg font-semibold text-slate-800 dark:text-white">Quiz Results</span>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-0 shadow-xl dark:bg-card dark:text-card-foreground dark:shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30">
                <CheckCircle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
              <p className="text-xl text-slate-600 dark:text-gray-300">Here's your performance analysis for Question Set {setId}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-4 dark:bg-secondary">
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">
                    {score}/{questions.length}
                  </div>
                  <div className="text-slate-600 dark:text-gray-300">Correct Answers</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 dark:bg-secondary">
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">{percentage}%</div>
                  <div className="text-slate-600 dark:text-gray-300">Accuracy</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 dark:bg-secondary">
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">{formatTime(timeElapsed)}</div>
                  <div className="text-slate-600 dark:text-gray-300">Time Taken</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 dark:bg-secondary">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 dark:text-white">Performance Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-gray-300">Correct Answers:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{score} questions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-gray-300">Incorrect Answers:</span>
                    <span className="font-medium text-red-600 dark:text-red-400">{questions.length - score} questions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-gray-300">Average Time per Question:</span>
                    <span className="font-medium text-slate-800 dark:text-white">{Math.round(timeElapsed / questions.length)}s</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={restartQuiz}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retry Quiz
                </Button>
                <Button
                  onClick={() => setShowDetails(!showDetails)}
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900/20"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showDetails ? "Hide" : "View"} Detailed Review
                </Button>
              </div>

              {showDetails && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 dark:text-white">Question Review</h3>
                  {questions.map((question, index) => {
                    const userAnswer = selectedAnswers[index]
                    const correctAnswer = question.correct_answer_id

                    let isCorrect = false
                    let correctOptions = []
                    let userOptions = []

                    if (Array.isArray(correctAnswer)) {
                      correctOptions = question.options.filter((opt: any) => correctAnswer.includes(opt.option_id))
                      if (Array.isArray(userAnswer)) {
                        userOptions = question.options.filter((opt: any) => userAnswer.includes(opt.option_id))
                        isCorrect =
                          userAnswer.length === correctAnswer.length &&
                          userAnswer.every((id) => correctAnswer.includes(id))
                      }
                    } else {
                      correctOptions = question.options.filter((opt: any) => opt.option_id === correctAnswer)
                      if (userAnswer) {
                        userOptions = question.options.filter((opt: any) => opt.option_id === userAnswer)
                        isCorrect = userAnswer === correctAnswer
                      }
                    }

                    return (
                      <Card
                        key={question.question_id}
                        className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"} dark:bg-secondary dark:text-secondary-foreground`}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium text-slate-800 dark:text-white">Question {index + 1}</h4>
                            <Badge className={isCorrect ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}>
                              {isCorrect ? "Correct" : "Incorrect"}
                            </Badge>
                          </div>
                          <p className="text-slate-700 mb-4 dark:text-gray-300">{question.question_text}</p>
                          {Array.isArray(correctAnswer) && (
                            <p className="text-sm text-blue-600 mb-3 dark:text-blue-400">(Choose {correctAnswer.length} answers)</p>
                          )}
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium text-slate-600 dark:text-gray-400">Your Answer: </span>
                              <span
                                className={
                                  userOptions.length > 0
                                    ? isCorrect
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                    : "text-slate-500 dark:text-gray-500"
                                }
                              >
                                {userOptions.length > 0
                                  ? userOptions.map((opt) => opt.option_text).join(", ")
                                  : "No answer selected"}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div>
                                <span className="text-sm font-medium text-slate-600 dark:text-gray-400">Correct Answer: </span>
                                <span className="text-green-600 dark:text-green-400">
                                  {correctOptions.map((opt) => opt.option_text).join(", ")}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/question-sets"
              className="flex items-center space-x-2 text-slate-600 hover:text-orange-500 transition-colors dark:text-gray-300 dark:hover:text-orange-400"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Question Sets</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <Badge variant="outline" className="border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400">
                Set {setId}
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-gray-300">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-gray-300">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-0 shadow-xl dark:bg-card dark:text-card-foreground dark:shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{currentQuestion.question_text}</CardTitle>
            {isMultipleChoice && (
              <p className="text-sm text-blue-600 mt-2 dark:text-blue-400">
                Choose {requiredSelections} answer{requiredSelections > 1 ? "s" : ""}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {showAnswerFeedback && (
              <div >
                
              </div>
            )}

            {currentQuestion.options.map((option: any) => {
              const isSelected = isOptionSelected(option.option_id)
              const isCorrect = isOptionCorrect(option.option_id)

              return (
                <Button
                  key={option.option_id}
                  variant={isSelected && !showAnswerFeedback ? "default" : "outline"}
                  className={`w-full text-left justify-start p-4 h-auto whitespace-normal transition-all duration-300 ${getOptionStyling(option.option_id)}`}
                  onClick={() => handleAnswerSelect(option.option_id)}
                  disabled={showAnswerFeedback}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-6 h-6 ${isMultipleChoice ? "rounded-md" : "rounded-full"} border-2 flex items-center justify-center mt-0.5 transition-all duration-300 ${
                        showAnswerFeedback
                          ? isSelected && isCorrect
                            ? "border-white bg-white"
                            : isSelected && !isCorrect
                              ? "border-white bg-white"
                              : !isSelected && isCorrect
                                ? "border-green-600 bg-green-100 dark:bg-green-900/30"
                                : "border-slate-300 dark:border-gray-500"
                          : isSelected
                            ? "border-white bg-white"
                            : "border-slate-300 dark:border-gray-500"
                      }`}
                    >
                      {showAnswerFeedback ? (
                        isSelected && isCorrect ? (
                          <div
                            className={`w-3 h-3 ${isMultipleChoice ? "rounded-sm" : "rounded-full"} bg-green-500`}
                          ></div>
                        ) : isSelected && !isCorrect ? (
                          <div
                            className={`w-3 h-3 ${isMultipleChoice ? "rounded-sm" : "rounded-full"} bg-red-500`}
                          ></div>
                        ) : !isSelected && isCorrect ? (
                          <div
                            className={`w-3 h-3 ${isMultipleChoice ? "rounded-sm" : "rounded-full"} bg-green-600`}
                          ></div>
                        ) : null
                      ) : isSelected ? (
                        <div
                          className={`w-3 h-3 ${isMultipleChoice ? "rounded-sm" : "rounded-full"} bg-orange-500`}
                        ></div>
                      ) : null}
                    </div>
                    <span className="flex-1">{option.option_text}</span>
                  </div>
                </Button>
              )
            })}

            <div className="pt-6">
              <Button
                onClick={handleNext}
                disabled={!canProceed() && !showAnswerFeedback}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50"
              >
                {showAnswerFeedback
                  ? currentQuestionIndex === questions.length - 1
                    ? "Complete Quiz"
                    : "Next Question"
                  : "Show Answer"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}