import { Member, Expense } from '../App'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Activity, BarChart3 } from 'lucide-react'

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
    <div className="space-y-4 pb-safe">
      {/* Page Title */}
      <div className="flex items-center space-x-2 px-1">
        <Activity className="w-5 h-5 text-violet-500" />
        <h2 className="text-lg font-bold bg-gradient-to-r from-violet-500 to-fuchsia-600 bg-clip-text text-transparent">
          Dashboard
        </h2>
      </div>

      {/* Hero Stats - Stacked on mobile, grid on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Users className="w-16 h-16" />
          </div>
          <h3 className="text-violet-100 font-medium text-sm mb-1">Meal Rate</h3>
          <p className="text-3xl font-bold">{mealRate.toFixed(2)} <span className="text-base opacity-70">tk</span></p>
          <div className="mt-3 flex items-center text-xs text-violet-100 bg-white/10 w-fit px-2 py-1 rounded-lg">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>Current Rate</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-muted-foreground font-medium text-sm mb-1">Group Balance</h3>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(balance).toFixed(0)} tk
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {balance >= 0 ? 'Surplus' : 'Deficit'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl ${balance >= 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}>
              <TakaSign className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-muted-foreground font-medium text-sm mb-1">Total Expenses</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalExpenses.toFixed(0)} tk
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Lifetime spending
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Meal Distribution */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm"
      >
        <h3 className="font-bold text-base mb-4 flex items-center">
          <Users className="w-4 h-4 mr-2 text-primary" />
          Meal Distribution
        </h3>
        <div className="space-y-3">
          {sortedByMeals.map((member, index) => (
            <div key={member.id} className="relative">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-sm">{member.name}</span>
                <span className="text-muted-foreground text-xs">{member.meals} meals</span>
              </div>
              <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
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

      {/* Recent Expenses */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm"
      >
        <h3 className="font-bold text-base mb-4 flex items-center">
          <Activity className="w-4 h-4 mr-2 text-orange-500" />
          Recent Expenses
        </h3>
        <div className="space-y-2">
          {recentExpenses.length > 0 ? (
            recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl active:scale-[0.98] transition-transform">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                    <TakaSign className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
                <span className="font-bold text-sm text-red-500">-{expense.amount} tk</span>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No recent activity
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
