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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading questions...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">No questions found for this set.</p>
          <Link href="/question-sets">
            <Button className="mt-4">Back to Question Sets</Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  // Check if question has multiple correct answers
  const isMultipleChoice = Array.isArray(currentQuestion.correct_answer_id)
  const requiredSelections = isMultipleChoice ? currentQuestion.correct_answer_id.length : 1

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (optionId: number) => {
    const newAnswers = [...selectedAnswers]
    const currentSelections = newAnswers[currentQuestionIndex] || []

    if (isMultipleChoice) {
      // Handle multiple choice
      let updatedSelections
      if (Array.isArray(currentSelections)) {
        if (currentSelections.includes(optionId)) {
          updatedSelections = currentSelections.filter((id) => id !== optionId)
        } else if (currentSelections.length < requiredSelections) {
          updatedSelections = [...currentSelections, optionId]
        } else {
          return // Don't allow more selections than required
        }
      } else {
        updatedSelections = [optionId]
      }
      newAnswers[currentQuestionIndex] = updatedSelections
    } else {
      // Handle single choice
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = () => {
    let correctCount = 0
    questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index]
      const correctAnswer = question.correct_answer_id

      if (Array.isArray(correctAnswer)) {
        // Multiple choice question
        if (
          Array.isArray(userAnswer) &&
          userAnswer.length === correctAnswer.length &&
          userAnswer.every((id) => correctAnswer.includes(id))
        ) {
          correctCount++
        }
      } else {
        // Single choice question
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
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/question-sets"
                className="flex items-center space-x-2 text-slate-600 hover:text-orange-500 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Question Sets</span>
              </Link>
              <span className="text-lg font-semibold text-slate-800">Quiz Results</span>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
              <p className="text-xl text-slate-600">Here's your performance analysis for Question Set {setId}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-slate-800">
                    {score}/{questions.length}
                  </div>
                  <div className="text-slate-600">Correct Answers</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-slate-800">{percentage}%</div>
                  <div className="text-slate-600">Accuracy</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-slate-800">{formatTime(timeElapsed)}</div>
                  <div className="text-slate-600">Time Taken</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Correct Answers:</span>
                    <span className="font-medium text-green-600">{score} questions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Incorrect Answers:</span>
                    <span className="font-medium text-red-600">{questions.length - score} questions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Average Time per Question:</span>
                    <span className="font-medium text-slate-800">{Math.round(timeElapsed / questions.length)}s</span>
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
                  className="border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showDetails ? "Hide" : "View"} Detailed Review
                </Button>
              </div>

              {showDetails && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Question Review</h3>
                  {questions.map((question, index) => {
                    const userAnswer = selectedAnswers[index]
                    const correctAnswer = question.correct_answer_id

                    let isCorrect = false
                    let correctOptions = []
                    let userOptions = []

                    if (Array.isArray(correctAnswer)) {
                      // Multiple choice
                      correctOptions = question.options.filter((opt: any) => correctAnswer.includes(opt.option_id))
                      if (Array.isArray(userAnswer)) {
                        userOptions = question.options.filter((opt: any) => userAnswer.includes(opt.option_id))
                        isCorrect =
                          userAnswer.length === correctAnswer.length &&
                          userAnswer.every((id) => correctAnswer.includes(id))
                      }
                    } else {
                      // Single choice
                      correctOptions = question.options.filter((opt: any) => opt.option_id === correctAnswer)
                      if (userAnswer) {
                        userOptions = question.options.filter((opt: any) => opt.option_id === userAnswer)
                        isCorrect = userAnswer === correctAnswer
                      }
                    }

                    return (
                      <Card
                        key={question.question_id}
                        className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium text-slate-800">Question {index + 1}</h4>
                            <Badge className={isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                              {isCorrect ? "Correct" : "Incorrect"}
                            </Badge>
                          </div>
                          <p className="text-slate-700 mb-4">{question.question_text}</p>
                          {Array.isArray(correctAnswer) && (
                            <p className="text-sm text-blue-600 mb-3">(Choose {correctAnswer.length} answers)</p>
                          )}
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium text-slate-600">Your Answer: </span>
                              <span
                                className={
                                  userOptions.length > 0
                                    ? isCorrect
                                      ? "text-green-600"
                                      : "text-red-600"
                                    : "text-slate-500"
                                }
                              >
                                {userOptions.length > 0
                                  ? userOptions.map((opt) => opt.option_text).join(", ")
                                  : "No answer selected"}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div>
                                <span className="text-sm font-medium text-slate-600">Correct Answer: </span>
                                <span className="text-green-600">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/question-sets"
              className="flex items-center space-x-2 text-slate-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Question Sets</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <Badge variant="outline" className="border-orange-500 text-orange-500">
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
            <span className="text-sm font-medium text-slate-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-slate-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{currentQuestion.question_text}</CardTitle>
            {isMultipleChoice && (
              <p className="text-sm text-blue-600 mt-2">
                Choose {requiredSelections} answer{requiredSelections > 1 ? "s" : ""}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.options.map((option: any) => {
              const isSelected = isOptionSelected(option.option_id)

              return (
                <Button
                  key={option.option_id}
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full text-left justify-start p-4 h-auto whitespace-normal ${
                    isSelected
                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      : "hover:bg-slate-50"
                  }`}
                  onClick={() => handleAnswerSelect(option.option_id)}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-6 h-6 ${isMultipleChoice ? "rounded-md" : "rounded-full"} border-2 flex items-center justify-center mt-0.5 ${
                        isSelected ? "border-white bg-white" : "border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <div
                          className={`w-3 h-3 ${isMultipleChoice ? "rounded-sm" : "rounded-full"} bg-orange-500`}
                        ></div>
                      )}
                    </div>
                    <span className="flex-1">{option.option_text}</span>
                  </div>
                </Button>
              )
            })}

            <div className="pt-6">
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50"
              >
                {currentQuestionIndex === questions.length - 1 ? "Complete Quiz" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
