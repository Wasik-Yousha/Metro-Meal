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
    <div className="space-y-4 pb-safe">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
          Expenses
        </h2>
        <div className="flex items-center space-x-1.5 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-xl">
          <ShoppingBag className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="font-semibold text-sm text-red-700 dark:text-red-300">
            {totalExpenses.toFixed(0)} tk
          </span>
        </div>
      </div>

      {/* Add Expense Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
        <div className="space-y-3">
          <div className="relative">
            <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
              placeholder="What did you buy?"
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">৳</span>
              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                placeholder="Amount"
              />
            </div>

            <button
              type="submit"
              disabled={!description.trim() || !amount}
              className="h-12 px-5 bg-red-600 text-white rounded-xl transition-all flex items-center justify-center font-medium shadow-sm active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add
            </button>
          </div>
        </div>
      </form>

      {/* Expense List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                {editingId === expense.id ? (
                  <div className="p-4 space-y-3">
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Description"
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        min="0.01"
                        inputMode="decimal"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Amount"
                      />
                      <button 
                        onClick={() => saveEdit(expense.id)} 
                        className="h-10 w-10 flex items-center justify-center bg-green-100 text-green-600 rounded-xl active:scale-95 dark:bg-green-900/30 dark:text-green-400"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={cancelEdit} 
                        className="h-10 w-10 flex items-center justify-center bg-red-100 text-red-600 rounded-xl active:scale-95 dark:bg-red-900/30 dark:text-red-400"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">{expense.description}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                          <Calendar className="w-3 h-3 mr-1" />
                          {expense.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="font-bold text-sm text-red-600 dark:text-red-400 whitespace-nowrap">
                        -{expense.amount.toFixed(0)} tk
                      </div>
                      <button 
                        onClick={() => startEditing(expense)}
                        className="w-9 h-9 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors active:scale-95"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Delete this expense?')) {
                            onDeleteExpense(expense.id)
                          }
                        }}
                        className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors active:scale-95"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-muted-foreground"
            >
              <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No expenses recorded yet</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
