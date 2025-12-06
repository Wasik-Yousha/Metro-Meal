import { useState } from 'react'
import { Member } from '../App'
import { Plus, Wallet, Edit2, Check, X } from 'lucide-react'
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
    <div className="space-y-4 pb-safe">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          Payments
        </h2>
        <div className="flex items-center space-x-1.5 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-xl">
          <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="font-semibold text-sm text-green-700 dark:text-green-300">
            {totalPayments.toFixed(0)} tk
          </span>
        </div>
      </div>

      {/* Member Cards */}
      <div className="space-y-3">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            {/* Member Info */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">ID: MRT {member.id}</p>
                </div>
              </div>
              <div className="text-right">
                {editingId === member.id ? (
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={editTotal}
                      onChange={(e) => setEditTotal(e.target.value)}
                      className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-700 dark:border-gray-600"
                      autoFocus
                    />
                    <button 
                      onClick={() => saveEdit(member.id)} 
                      className="w-8 h-8 flex items-center justify-center text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg active:scale-95"
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      onClick={cancelEdit} 
                      className="w-8 h-8 flex items-center justify-center text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg active:scale-95"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => startEditing(member)}
                    className="flex items-center space-x-1 active:scale-95 transition-transform"
                  >
                    <span className="font-bold text-lg text-green-600 dark:text-green-400">
                      {member.payments.toFixed(0)} tk
                    </span>
                    <Edit2 size={12} className="text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Add Payment Input */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <TakaSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={payments[member.id] || ''}
                  onChange={(e) => handlePaymentChange(member.id, parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  placeholder="Add payment"
                />
              </div>
              <button
                onClick={() => handleAddPayment(member.id)}
                disabled={!payments[member.id]}
                className="h-10 w-10 flex items-center justify-center bg-green-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
