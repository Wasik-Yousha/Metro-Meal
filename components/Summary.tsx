import React from 'react'
import { Member, Expense } from '../App'
import { Calculator, TrendingUp, TrendingDown, AlertCircle, Utensils, Egg } from 'lucide-react'
import { motion } from 'framer-motion'

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

interface SummaryProps {
  members: Member[]
  expenses: Expense[]
  totalMeals: number
  totalRice: number
  totalEggs: number
  totalPayments: number
  totalExpenses: number
  mealRate: number
  ricePrice: number
  eggPrice: number
}

export const Summary = ({
  members,
  expenses,
  totalMeals,
  totalRice,
  totalEggs,
  totalPayments,
  totalExpenses,
  mealRate,
  ricePrice,
  eggPrice,
}: SummaryProps) => {
  // Calculate total costs for rice and eggs
  const totalRiceCost = totalRice * ricePrice
  const totalEggCost = totalEggs * eggPrice
  const groupBalance = totalPayments - totalExpenses

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
          Monthly Summary
        </h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Meals</h3>
              <Utensils className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">{totalMeals}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Payments</h3>
              <TakaSign className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalPayments.toFixed(2)} tk</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{totalExpenses.toFixed(2)} tk</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-5 rounded-xl shadow-sm border ${
              groupBalance >= 0 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-80">Group Balance</h3>
              {groupBalance >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
            </div>
            <p className={`text-2xl font-bold ${groupBalance >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {Math.abs(groupBalance).toFixed(2)} tk
              <span className="text-xs font-normal ml-1 opacity-75">
                {groupBalance >= 0 ? '(surplus)' : '(deficit)'}
              </span>
            </p>
          </motion.div>
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <h3 className="font-medium text-sm">Rice Cost</h3>
            </div>
            <p className="text-lg font-semibold">
              {totalRice} × {ricePrice} = {totalRiceCost} tk
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Egg className="w-3 h-3 text-yellow-500" />
              <h3 className="font-medium text-sm">Egg Cost</h3>
            </div>
            <p className="text-lg font-semibold">
              {totalEggs} × {eggPrice} = {totalEggCost} tk
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Calculator className="w-3 h-3 text-blue-500" />
              <h3 className="font-medium text-sm">Base Expenses</h3>
            </div>
            <p className="text-lg font-semibold">
              {(totalExpenses - totalRiceCost - totalEggCost).toFixed(2)} tk
            </p>
          </div>
        </div>

        {/* Meal Rate Card */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium opacity-90 mb-1">Current Meal Rate</h3>
              <p className="text-sm opacity-75">
                Excludes individual rice & egg costs
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">
                {mealRate.toFixed(2)} <span className="text-lg font-normal opacity-75">tk</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Member Balances Table */}
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-primary" />
          Member Balances
        </h3>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Meals</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Rice</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Eggs</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Meal Cost</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Extra</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Total</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Paid</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-800">
                {members.map((member) => {
                  const mealCost = member.meals * mealRate
                  const riceCost = member.riceCount * ricePrice
                  const eggCost = member.eggCount * eggPrice
                  const extraCost = riceCost + eggCost
                  const totalCost = mealCost + extraCost
                  const balance = member.payments - totalCost
                  return (
                    <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-medium">{member.name}</td>
                      <td className="px-4 py-3 text-center">{member.meals}</td>
                      <td className="px-4 py-3 text-center">{member.riceCount}</td>
                      <td className="px-4 py-3 text-center">{member.eggCount}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{mealCost.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{extraCost.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-medium">{totalCost.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-green-600 dark:text-green-400">{member.payments.toFixed(2)}</td>
                      <td className={`px-4 py-3 text-right font-bold ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {Math.abs(balance).toFixed(2)} {balance >= 0 ? 'Cr' : 'Dr'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
