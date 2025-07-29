"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Brain,
  BadgeIcon as Certificate,
  Coffee,
  Play,
  Users,
  Award,
  Clock,
  Target,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Certificate className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">AWS Prep</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#modules" className="text-slate-600 hover:text-orange-500 transition-colors">
                Modules
              </Link>
              <Link href="#question-sets" className="text-slate-600 hover:text-orange-500 transition-colors">
                Question Sets
              </Link>
              <Link href="#about" className="text-slate-600 hover:text-orange-500 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
           <Image
  src="/img/awsLogo.png"
  alt="AWS Logo"
  width={400}             // Wider image
  height={200}            // Proportional height
  className="mx-auto mb-6 h-auto w-[300px] sm:w-[250px] md:w-[300px] lg:w-[350px]"
  priority                // Improves performance
/>

          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            Master AWS Cloud
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Practitioner Exam
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive preparation platform with 1100+ practice questions across 11 question sets and 10 structured
            modules to help you ace the CLF-C02 certification exam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/modules">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
            <Link href="/question-sets">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 text-lg bg-transparent"
              >
                <Brain className="w-5 h-5 mr-2" />
                Question Sets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">1100+</div>
              <div className="text-slate-600">Practice Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">11</div>
              <div className="text-slate-600">Question Sets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">10</div>
              <div className="text-slate-600">Learning Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">CLF-C02</div>
              <div className="text-slate-600">Latest Exam</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive study materials and practice tests designed to help you pass the AWS Cloud Practitioner exam
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Structured Learning</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
10 comprehensive modules covering all exam domains with targeted questions for focused practice.                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Practice Tests</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  11 question sets with 1100+ practice questions to test your knowledge and exam readiness
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Exam Simulation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Real exam experience with detailed performance analytics and progress tracking
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Question Sets Section */}
      <section id="question-sets" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Question Sets</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Practice with our comprehensive collection of 1100+ AWS Cloud Practitioner exam questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 11 }, (_, i) => (
              <Card
                key={i + 1}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Question Set {i + 1}</CardTitle>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      100 Questions
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Practice questions covering key AWS concepts and services for the CLF-C02 exam.
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      ~150 min
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      Mixed Topics
                    </div>
                  </div>
                  <Link href={`/question-sets/${i + 1}/quiz`}>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 group-hover:shadow-lg transition-all">
                      Start Practice
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Learning Modules</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Structured learning path covering all AWS Cloud Practitioner exam domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Cloud Concepts",
                description: "Introduction to cloud computing and AWS fundamentals",
                questions: 30,
              },
              {
                title: "Security & Compliance",
                description: "AWS security model and compliance frameworks",
                questions: 32,
              },
              { title: "Technology", description: "Core AWS services and their use cases", questions: 34 },
              { title: "Billing & Pricing", description: "AWS pricing models and cost optimization", questions: 40 },
              { title: "Compute Services", description: "EC2, Lambda, and other compute services", questions: 30 },
              { title: "Storage Services", description: "S3, EBS, and AWS storage solutions", questions: 47 },
              { title: "Database Services", description: "RDS, DynamoDB, and database options", questions: 35 },
              { title: "Networking", description: "VPC, CloudFront, and networking concepts", questions: 30 },
              {
                title: "Management Tools",
                description: "CloudWatch, CloudTrail, and management services",
                questions: 20,
              },
              { title: "Mock Exam", description: "Full-length practice exam simulation", questions: 65 },
            ].map((module, index) => (
              <Card
                key={index + 1}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      Module {index + 1}: {module.title}
                    </CardTitle>
                    <Badge variant="outline" className="border-blue-500 text-blue-700">
                      {module.questions} Questions
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-base">{module.description}</CardDescription>
                  <Link href={`/modules/${index + 1}/quiz`}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 group-hover:shadow-lg transition-all">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Module
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-8">About This Platform</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-orange-500 mr-3" />
              <span className="text-2xl font-semibold text-slate-800">Created by Somashekhar Arabali</span>
            </div>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              This comprehensive AWS Cloud Practitioner exam preparation platform is designed to help you succeed in
              your certification journey. With carefully curated questions and detailed explanations, you'll build the
              confidence needed to pass the CLF-C02 exam.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-slate-700">Mobile Responsive</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-slate-700">Progress Tracking</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-slate-700">Detailed Analytics</span>
              </div>
            </div>
            <p className="text-slate-600 mb-6">
              If you find this content helpful, please consider supporting the project:
            </p>
            <a
              href="https://buymeacoffee.com/omie9284n"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3">
                <Coffee className="w-5 h-5 mr-2" />
                Buy Me A Coffee
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Certificate className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">AWS Prep</span>
          </div>
          <p className="text-slate-400 mb-4">Comprehensive AWS Cloud Practitioner exam preparation platform</p>
          <p className="text-slate-500 text-sm">© 2025 AWS Prep by Somashekhar Arabali. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
