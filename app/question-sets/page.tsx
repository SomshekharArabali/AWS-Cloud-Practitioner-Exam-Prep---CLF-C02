"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Target, Brain, Play } from "lucide-react"
import Link from "next/link"

export default function QuestionSetsPage() {
  const questionSets = [
    { id: 1, questions: 100, difficulty: "Beginner", topics: "Cloud Concepts, Basic Services" },
    { id: 2, questions: 100, difficulty: "Intermediate", topics: "Security, Compliance" },
    { id: 3, questions: 100, difficulty: "Intermediate", topics: "Core Services, Architecture" },
    { id: 4, questions: 100, difficulty: "Advanced", topics: "Cost Optimization, Billing" },
    { id: 5, questions: 100, difficulty: "Beginner", topics: "Compute Services" },
    { id: 6, questions: 100, difficulty: "Intermediate", topics: "Storage, Database" },
    { id: 7, questions: 100, difficulty: "Advanced", topics: "Networking, Content Delivery" },
    { id: 8, questions: 100, difficulty: "Intermediate", topics: "Management, Monitoring" },
    { id: 9, questions: 100, difficulty: "Advanced", topics: "Security Best Practices" },
    { id: 10, questions: 100, difficulty: "Intermediate", topics: "Migration, Hybrid Cloud" },
    { id: 11, questions: 100, difficulty: "Mixed", topics: "Remaining Topics, Review" },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-600"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-600"
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-600"
      case "Mixed":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-600"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-orange-500 transition-colors dark:text-gray-300 dark:hover:text-orange-400"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-orange-500 dark:text-orange-400" />
              <span className="text-xl font-bold text-slate-800 dark:text-white">Question Sets</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 dark:text-white">
            AWS CLF-C02
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Question Sets
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 dark:text-gray-300">
            Practice with our comprehensive collection of 1100+ AWS Cloud Practitioner exam questions organized into 11
            focused question sets covering all exam domains.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-gray-300">
            
            
          </div>
        </div>
      </section>

      {/* Question Sets Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questionSets.map((set) => (
              <Card
                key={set.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group dark:bg-card dark:text-card-foreground dark:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">Question Set {set.id}</CardTitle>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-muted-foreground">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {set.questions} Questions
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      ~150 min
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                 
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-gray-300">Estimated Time:</span>
                      <span className="font-medium dark:text-white">150 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-gray-300">Question Count:</span>
                      <span className="font-medium dark:text-white">{set.questions} questions</span>
                    </div>
                  </div>
                  <Link href={`/question-sets/${set.id}/quiz`}>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 group-hover:shadow-lg transition-all">
                      <Play className="w-4 h-4 mr-2" />
                      Start Question Set {set.id}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}