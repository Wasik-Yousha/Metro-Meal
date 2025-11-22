import React, { useState } from 'react'
import { Expense } from '../App'
import { Plus, ShoppingBag, Receipt, Calendar, Edit2, Trash2, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExpenseTrackerProps {
  expenses: Expense[]
  onAddExpense: (description: string, amount: number) => void
  onUpdateExpense: (id: number, description: string, amount: number) => void
  onDeleteExpense: (id: number) => void
}

export const ExpenseTracker = ({
  expenses,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
}: ExpenseTrackerProps) => {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  // Editing state
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editDescription, setEditDescription] = useState('')
  const [editAmount, setEditAmount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description && amount) {
      onAddExpense(description, parseFloat(amount))
      setDescription('')
      setAmount('')
    }
  }

  const startEditing = (expense: Expense) => {
    setEditingId(expense.id)
    setEditDescription(expense.description)
    setEditAmount(expense.amount.toString())
  }

  const saveEdit = (id: number) => {
    if (editDescription && editAmount) {
      onUpdateExpense(id, editDescription, parseFloat(editAmount))
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditDescription('')
    setEditAmount('')
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            Expense Tracker
          </h2>
          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="font-semibold text-red-700 dark:text-red-300">
              Total: {totalExpenses.toFixed(2)} tk
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl mb-8 border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Description
              </label>
              <div className="relative">
                <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  placeholder="What did you buy?"
                  required
                />
              </div>
            </div>
            
            <div className="md:col-span-4">
              <label htmlFor="amount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Amount (tk)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">৳</span>
                <input
                  type="number"
                  id="amount"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center font-medium shadow-sm hover:shadow"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  {editingId === expense.id ? (
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600"
                          placeholder="Description"
                          autoFocus
                        />
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600"
                          placeholder="Amount"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => saveEdit(expense.id)} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEdit} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{expense.description}</h3>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {expense.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-bold text-lg text-red-600 dark:text-red-400">
                          -{expense.amount.toFixed(2)} tk
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => startEditing(expense)}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Edit Expense"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this expense?')) {
                                onDeleteExpense(expense.id)
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Expense"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No expenses recorded yet.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
