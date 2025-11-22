import React, { useState } from 'react'
import { Member } from '../App'
import { Plus, Wallet, CreditCard, Edit2, Check, X } from 'lucide-react'
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
    <path d="M16 11h-6a2 2 0 0 1 -2 -2v-6" />
    <path d="M11 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
    <line x1="16" y1="11" x2="16" y2="13" />
    <text x="12" y="18" textAnchor="middle" fontSize="24" fontWeight="bold" stroke="none" fill="currentColor">৳</text>
  </svg>
)

interface PaymentTrackerProps {
  members: Member[]
  onAddPayment: (memberId: number, amount: number) => void
  onUpdatePayment: (memberId: number, newTotal: number) => void
}

export const PaymentTracker = ({
  members,
  onAddPayment,
  onUpdatePayment,
}: PaymentTrackerProps) => {
  const [payments, setPayments] = useState<{ [key: number]: number }>({})
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTotal, setEditTotal] = useState<string>('')

  const handlePaymentChange = (memberId: number, amount: number) => {
    setPayments({ ...payments, [memberId]: amount })
  }

  const startEditing = (member: Member) => {
    setEditingId(member.id)
    setEditTotal(member.payments.toString())
  }

  const saveEdit = (memberId: number) => {
    const newTotal = parseFloat(editTotal)
    if (!isNaN(newTotal) && newTotal >= 0) {
      onUpdatePayment(memberId, newTotal)
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTotal('')
  }

  const handleAddPayment = (memberId: number) => {
    const amount = payments[memberId] || 0
    if (amount > 0) {
      onAddPayment(memberId, amount)
      setPayments({ ...payments, [memberId]: 0 })
    }
  }

  const totalPayments = members.reduce((sum, member) => sum + member.payments, 0)

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            Payment Tracker
          </h2>
          <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
            <Wallet className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-semibold text-green-700 dark:text-green-300">
              Total: {totalPayments.toFixed(2)} tk
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: MRT {member.id}</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-medium flex items-center">
                  <CreditCard className="w-3 h-3 mr-1" />
                  Paid
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Total Paid</span>
                  {editingId === member.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editTotal}
                        onChange={(e) => setEditTotal(e.target.value)}
                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-primary bg-white dark:bg-gray-700 dark:border-gray-600"
                        autoFocus
                      />
                      <button onClick={() => saveEdit(member.id)} className="text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 p-1 rounded">
                        <Check size={16} />
                      </button>
                      <button onClick={cancelEdit} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg text-green-600 dark:text-green-400">
                        {member.payments.toFixed(2)} tk
                      </span>
                      <button 
                        onClick={() => startEditing(member)}
                        className="text-gray-400 hover:text-primary transition-colors p-1"
                        title="Edit Total Payment"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <TakaSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={payments[member.id] || ''}
                      onChange={(e) => handlePaymentChange(member.id, parseFloat(e.target.value) || 0)}
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                      placeholder="Amount"
                    />
                  </div>
                  <button
                    onClick={() => handleAddPayment(member.id)}
                    disabled={!payments[member.id]}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
