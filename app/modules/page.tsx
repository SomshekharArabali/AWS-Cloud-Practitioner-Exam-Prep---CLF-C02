"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Play } from "lucide-react"
import Link from "next/link"

export default function ModulesPage() {
  const modules = [
    {
      id: 1,
      title: "Cloud Concepts",
      description: "Introduction to cloud computing and AWS fundamentals",
      questions: 30,
    },
    {
      id: 2,
      title: "Cloud Economics and Billing",
      description: "AWS pricing models and cost optimization strategies",
      questions: 32,
    },
    {
      id: 3,
      title: "AWS Global Infrastructure",
      description: "Regions, Availability Zones, and global services",
      questions: 34,
    },
    {
      id: 4,
      title: "AWS Cloud Security",
      description: "Security model, IAM, and compliance frameworks",
      questions: 40,
    },
    {
      id: 5,
      title: "Networking and Content Delivery",
      description: "VPC, CloudFront, and networking concepts",
      questions: 30,
    },
    {
      id: 6,
      title: "Compute",
      description: "EC2, Lambda, and other compute services",
      questions: 47,
    },
    {
      id: 7,
      title: "Storage",
      description: "S3, EBS, and AWS storage solutions",
      questions: 35,
    },
    {
      id: 8,
      title: "Databases",
      description: "RDS, DynamoDB, and database options",
      questions: 30,
    },
    {
      id: 9,
      title: "Cloud Architecture",
      description: "Well-Architected Framework and best practices",
      questions: 20,
    },
    {
      id: 10,
      title: "Auto Scaling and Monitoring",
      description: "CloudWatch, Auto Scaling, and monitoring services",
      questions: 20,
    },
    {
      id: 11,
      title: "Mock Exam",
      description: "Full-length practice exam simulation",
      questions: 65,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-slate-800">Learning Modules</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            AWS CLF-C02
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              Learning Modules
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Structured learning path covering all AWS Cloud Practitioner exam domains with comprehensive questions and
            explanations.
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <Card
                key={module.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      Module {module.id}: {module.title}
                    </CardTitle>
                    <Badge variant="outline" className="border-blue-500 text-blue-700">
                      {module.questions} Questions
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-base">{module.description}</CardDescription>
                  <Link href={`/modules/${module.id}/quiz`}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 group-hover:shadow-lg transition-all">
                      <Play className="w-4 h-4 mr-2" />
                      Start Module {module.id}
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
