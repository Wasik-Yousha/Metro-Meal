import React, { useState } from 'react'
import { Member } from '../App'
import { Minus, Plus, Utensils, Egg, Edit2, Check, X, Power, Trash2, UserPlus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MembersListProps {
  members: Member[]
  onAddMeal: (memberId: number, mealCount: number) => void
  onAddRice: (memberId: number, count: number) => void
  onAddEgg: (memberId: number, count: number) => void
  onUpdateMeals: (memberId: number, newMeals: number) => void
  onUpdateRice: (memberId: number, newRice: number) => void
  onUpdateEggs: (memberId: number, newEggs: number) => void
  onToggleActive: (memberId: number) => void
  onUpdateName: (memberId: number, newName: string) => void
  onAddMember: (name: string) => void
  onRemoveMember: (memberId: number) => void
  ricePrice: number
  eggPrice: number
}

export const MembersList = ({
  members,
  onAddMeal,
  onAddRice,
  onAddEgg,
  onUpdateMeals,
  onUpdateRice,
  onUpdateEggs,
  onToggleActive,
  onUpdateName,
  onAddMember,
  onRemoveMember,
}: MembersListProps) => {
  const [mealCounts, setMealCounts] = useState<{ [key: number]: number }>({})
  const [riceCounts, setRiceCounts] = useState<{ [key: number]: number }>({})
  const [eggCounts, setEggCounts] = useState<{ [key: number]: number }>({})
  
  const [confirmedMeal, setConfirmedMeal] = useState<{ [key: number]: boolean }>({})
  const [confirmedRice, setConfirmedRice] = useState<{ [key: number]: boolean }>({})
  const [confirmedEgg, setConfirmedEgg] = useState<{ [key: number]: boolean }>({})
  
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  
  const [editingMealId, setEditingMealId] = useState<number | null>(null)
  const [editingRiceId, setEditingRiceId] = useState<number | null>(null)
  const [editingEggId, setEditingEggId] = useState<number | null>(null)
  const [editMealValue, setEditMealValue] = useState(0)
  const [editRiceValue, setEditRiceValue] = useState(0)
  const [editEggValue, setEditEggValue] = useState(0)
  
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [newMemberName, setNewMemberName] = useState('')

  const startEditing = (member: Member) => {
    setEditingId(member.id)
    setEditName(member.name)
  }

  const saveName = (memberId: number) => {
    if (editName.trim()) {
      onUpdateName(memberId, editName)
    }
    setEditingId(null)
  }

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMemberName.trim()) {
      onAddMember(newMemberName.trim())
      setNewMemberName('')
      setIsAddingMember(false)
    }
  }

  const handleMealCountChange = (memberId: number, count: number) => {
    setMealCounts({ ...mealCounts, [memberId]: count })
  }
  const handleRiceCountChange = (memberId: number, count: number) => {
    setRiceCounts({ ...riceCounts, [memberId]: count })
  }
  const handleEggCountChange = (memberId: number, count: number) => {
    setEggCounts({ ...eggCounts, [memberId]: count })
  }

  const handleAddMeal = (memberId: number) => {
    const count = mealCounts[memberId] || 0
    if (count > 0) {
      onAddMeal(memberId, count)
      setConfirmedMeal({ ...confirmedMeal, [memberId]: true })
      setTimeout(() => {
        setConfirmedMeal({ ...confirmedMeal, [memberId]: false })
        setMealCounts({ ...mealCounts, [memberId]: 0 })
      }, 300)
    }
  }
  const handleAddRice = (memberId: number) => {
    const count = riceCounts[memberId] || 0
    if (count > 0) {
      onAddRice(memberId, count)
      setConfirmedRice({ ...confirmedRice, [memberId]: true })
      setTimeout(() => {
        setConfirmedRice({ ...confirmedRice, [memberId]: false })
        setRiceCounts({ ...riceCounts, [memberId]: 0 })
      }, 300)
    }
  }
  const handleAddEgg = (memberId: number) => {
    const count = eggCounts[memberId] || 0
    if (count > 0) {
      onAddEgg(memberId, count)
      setConfirmedEgg({ ...confirmedEgg, [memberId]: true })
      setTimeout(() => {
        setConfirmedEgg({ ...confirmedEgg, [memberId]: false })
        setEggCounts({ ...eggCounts, [memberId]: 0 })
      }, 300)
    }
  }

  const getTickStyle = (count: number, confirmed: boolean) => {
    if (confirmed) return 'bg-green-500 text-white'
    if (count > 0) return 'bg-white dark:bg-gray-200 text-gray-700 border border-gray-300'
    return 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
  }

  const startEditMeal = (member: Member) => {
    setEditingMealId(member.id)
    setEditMealValue(member.meals)
  }
  const startEditRice = (member: Member) => {
    setEditingRiceId(member.id)
    setEditRiceValue(member.riceCount)
  }
  const startEditEgg = (member: Member) => {
    setEditingEggId(member.id)
    setEditEggValue(member.eggCount)
  }
  const saveMealEdit = (memberId: number) => {
    onUpdateMeals(memberId, editMealValue)
    setEditingMealId(null)
  }
  const saveRiceEdit = (memberId: number) => {
    onUpdateRice(memberId, editRiceValue)
    setEditingRiceId(null)
  }
  const saveEggEdit = (memberId: number) => {
    onUpdateEggs(memberId, editEggValue)
    setEditingEggId(null)
  }

  // Mobile-optimized stepper row component
  const StepperRow = ({ 
    icon, 
    label, 
    value, 
    count, 
    confirmed, 
    onDecrement, 
    onIncrement, 
    onConfirm,
    onEdit,
    isEditing,
    editValue,
    setEditValue,
    onSaveEdit,
    onCancelEdit,
    disabled 
  }: {
    icon: React.ReactNode
    label: string
    value: number
    count: number
    confirmed: boolean
    onDecrement: () => void
    onIncrement: () => void
    onConfirm: () => void
    onEdit: () => void
    isEditing: boolean
    editValue: number
    setEditValue: (v: number) => void
    onSaveEdit: () => void
    onCancelEdit: () => void
    disabled: boolean
  }) => (
    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl">
      {/* Top row: label and current value */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {icon}
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                value={editValue}
                onChange={(e) => setEditValue(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 text-base"
                style={{ fontSize: '16px' }}
                autoFocus
              />
              <button onClick={onSaveEdit} className="p-2 text-green-500 active:scale-90"><Check size={20}/></button>
              <button onClick={onCancelEdit} className="p-2 text-red-500 active:scale-90"><X size={20}/></button>
            </div>
          ) : (
            <button onClick={onEdit} className="flex items-center space-x-2 active:opacity-70">
              <span className="text-base font-medium">{label}: <span className="font-bold">{value}</span></span>
              <Edit2 size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
      
      {/* Bottom row: stepper controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onDecrement}
            disabled={disabled || count <= 0}
            className="stepper-btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-40"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="stepper-display">{count}</span>
          <button
            onClick={onIncrement}
            disabled={disabled || count >= 9}
            className="stepper-btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-40"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={onConfirm}
          disabled={!count || disabled}
          className={`confirm-btn ${getTickStyle(count, confirmed)} ${!count ? 'opacity-50' : ''}`}
        >
          <Check className="w-5 h-5" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Daily Tracker
        </h2>
        <button
          onClick={() => setIsAddingMember(true)}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-xl active:scale-95 transition-transform shadow-sm"
        >
          <UserPlus size={20} />
          <span className="text-sm font-medium">Add</span>
        </button>
      </div>

      {/* Add Member Form */}
      <AnimatePresence>
        {isAddingMember && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddMemberSubmit} className="mobile-card flex items-center gap-3 mb-4">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Enter member name"
                className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                style={{ fontSize: '16px' }}
                autoFocus
              />
              <button
                type="submit"
                disabled={!newMemberName.trim()}
                className="p-3 bg-green-500 text-white rounded-xl active:scale-90 disabled:opacity-50 transition-transform"
              >
                <Check size={22} />
              </button>
              <button
                type="button"
                onClick={() => setIsAddingMember(false)}
                className="p-3 bg-red-500 text-white rounded-xl active:scale-90 transition-transform"
              >
                <X size={22} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Member Cards - Single column on mobile */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {members.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`mobile-card ${!member.isActive ? 'opacity-60 grayscale-[0.5]' : ''}`}
            >
              {/* Member Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {editingId === member.id ? (
                    <div className="flex items-center space-x-2">
                      <input 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 bg-transparent border-b-2 border-primary focus:outline-none px-1 py-1 text-lg"
                        style={{ fontSize: '16px' }}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveName(member.id)
                          if (e.key === 'Escape') setEditingId(null)
                        }}
                      />
                      <button onClick={() => saveName(member.id)} className="p-2 text-green-500 active:scale-90"><Check size={20}/></button>
                      <button onClick={() => setEditingId(null)} className="p-2 text-red-500 active:scale-90"><X size={20}/></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => startEditing(member)}
                      className="flex items-center space-x-2 active:opacity-70"
                    >
                      <h3 className={`font-bold text-lg ${!member.isActive ? 'text-muted-foreground' : ''}`}>{member.name}</h3>
                      <Edit2 size={14} className="text-muted-foreground" />
                    </button>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">ID: MRT {member.id}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => onToggleActive(member.id)}
                    className={`p-2.5 rounded-xl transition-all border ${
                      member.isActive 
                        ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                        : 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                    }`}
                  >
                    <Power size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Remove this member?')) {
                        onRemoveMember(member.id)
                      }
                    }}
                    className="p-2.5 rounded-xl bg-red-50 text-red-500 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 active:scale-90"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Stepper Controls */}
              <div className={`space-y-3 ${!member.isActive ? 'pointer-events-none' : ''}`}>
                <StepperRow
                  icon={<Utensils className="w-5 h-5 text-orange-500" />}
                  label="Meals"
                  value={member.meals}
                  count={mealCounts[member.id] || 0}
                  confirmed={confirmedMeal[member.id] || false}
                  onDecrement={() => handleMealCountChange(member.id, Math.max(0, (mealCounts[member.id] || 0) - 1))}
                  onIncrement={() => handleMealCountChange(member.id, Math.min(9, (mealCounts[member.id] || 0) + 1))}
                  onConfirm={() => handleAddMeal(member.id)}
                  onEdit={() => startEditMeal(member)}
                  isEditing={editingMealId === member.id}
                  editValue={editMealValue}
                  setEditValue={setEditMealValue}
                  onSaveEdit={() => saveMealEdit(member.id)}
                  onCancelEdit={() => setEditingMealId(null)}
                  disabled={!member.isActive}
                />
                
                <StepperRow
                  icon={<div className="w-5 h-5 rounded-full border-2 border-gray-400" />}
                  label="Rice"
                  value={member.riceCount}
                  count={riceCounts[member.id] || 0}
                  confirmed={confirmedRice[member.id] || false}
                  onDecrement={() => handleRiceCountChange(member.id, Math.max(0, (riceCounts[member.id] || 0) - 1))}
                  onIncrement={() => handleRiceCountChange(member.id, Math.min(9, (riceCounts[member.id] || 0) + 1))}
                  onConfirm={() => handleAddRice(member.id)}
                  onEdit={() => startEditRice(member)}
                  isEditing={editingRiceId === member.id}
                  editValue={editRiceValue}
                  setEditValue={setEditRiceValue}
                  onSaveEdit={() => saveRiceEdit(member.id)}
                  onCancelEdit={() => setEditingRiceId(null)}
                  disabled={!member.isActive}
                />
                
                <StepperRow
                  icon={<Egg className="w-5 h-5 text-yellow-500" />}
                  label="Eggs"
                  value={member.eggCount}
                  count={eggCounts[member.id] || 0}
                  confirmed={confirmedEgg[member.id] || false}
                  onDecrement={() => handleEggCountChange(member.id, Math.max(0, (eggCounts[member.id] || 0) - 1))}
                  onIncrement={() => handleEggCountChange(member.id, Math.min(9, (eggCounts[member.id] || 0) + 1))}
                  onConfirm={() => handleAddEgg(member.id)}
                  onEdit={() => startEditEgg(member)}
                  isEditing={editingEggId === member.id}
                  editValue={editEggValue}
                  setEditValue={setEditEggValue}
                  onSaveEdit={() => saveEggEdit(member.id)}
                  onCancelEdit={() => setEditingEggId(null)}
                  disabled={!member.isActive}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stats-card bg-gradient-to-br from-orange-500 to-red-600 text-white"
        >
          <Utensils className="w-5 h-5 opacity-75 mb-2" />
          <p className="text-2xl font-bold">
            {members.reduce((sum, m) => sum + m.meals, 0)}
          </p>
          <p className="text-xs opacity-75">Meals</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stats-card bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
        >
          <div className="w-5 h-5 rounded-full border-2 border-white/75 mb-2" />
          <p className="text-2xl font-bold">
            {members.reduce((sum, m) => sum + m.riceCount, 0)}
          </p>
          <p className="text-xs opacity-75">Rice</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stats-card bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
        >
          <Egg className="w-5 h-5 opacity-75 mb-2" />
          <p className="text-2xl font-bold">
            {members.reduce((sum, m) => sum + m.eggCount, 0)}
          </p>
          <p className="text-xs opacity-75">Eggs</p>
        </motion.div>
      </div>
    </div>
  )
}
