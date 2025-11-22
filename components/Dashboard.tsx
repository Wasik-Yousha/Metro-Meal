import React from 'react'
import { Member, Expense } from '../App'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, Activity, BarChart3 } from 'lucide-react'

const TakaSign = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <text x="12" y="18" textAnchor="middle" fontSize="24" fontWeight="bold" stroke="none" fill="currentColor">৳</text>
  </svg>
)

interface DashboardProps {
  members: Member[]
  expenses: Expense[]
  totalMeals: number
  totalExpenses: number
  mealRate: number
  totalPayments: number
}

export const Dashboard = ({
  members,
  expenses,
  totalMeals,
  totalExpenses,
  mealRate,
  totalPayments
}: DashboardProps) => {
  const balance = totalPayments - totalExpenses
  
  // Sort members by meals for the chart
  const sortedByMeals = [...members].sort((a, b) => b.meals - a.meals)
  const maxMeals = Math.max(...members.map(m => m.meals), 1)

  // Recent expenses (last 5)
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-fuchsia-600 bg-clip-text text-transparent flex items-center">
          <Activity className="w-6 h-6 mr-2 text-violet-500" />
          Dashboard Overview
        </h2>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Users className="w-24 h-24" />
            </div>
            <h3 className="text-violet-100 font-medium mb-1">Meal Rate</h3>
            <p className="text-4xl font-bold">{mealRate.toFixed(2)} <span className="text-lg opacity-70">tk</span></p>
            <div className="mt-4 flex items-center text-sm text-violet-100 bg-white/10 w-fit px-2 py-1 rounded-lg">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Current Rate</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-muted-foreground font-medium mb-1">Group Balance</h3>
                <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(balance).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {balance >= 0 ? 'Surplus' : 'Deficit'}
                </p>
              </div>
              <div className={`p-3 rounded-full ${balance >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <TakaSign className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-muted-foreground font-medium mb-1">Total Expenses</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalExpenses.toFixed(0)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Lifetime spending
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Meal Distribution Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Meal Distribution
            </h3>
            <div className="space-y-4">
              {sortedByMeals.map((member, index) => (
                <div key={member.id} className="relative">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-muted-foreground">{member.meals} meals</span>
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(member.meals / maxMeals) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-orange-500" />
              Recent Expenses
            </h3>
            <div className="space-y-4">
              {recentExpenses.length > 0 ? (
                recentExpenses.map((expense, index) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                        <TakaSign className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{expense.description}</p>
                        <p className="text-xs text-muted-foreground">{expense.date}</p>
                      </div>
                    </div>
                    <span className="font-bold text-red-500">-{expense.amount} tk</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No recent activity
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
