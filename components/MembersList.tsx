import React, { useState } from 'react'
import { Member } from '../App'
import { Minus, Plus, Utensils, Egg, Edit2, Check, X, Power, Trash2, UserPlus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MembersListProps {
  members: Member[]
  onAddMeal: (memberId: number, mealCount: number) => void
  onAddRice: (memberId: number, count: number) => void
  onAddEgg: (memberId: number, count: number) => void
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
  onToggleActive,
  onUpdateName,
  onAddMember,
  onRemoveMember,
  ricePrice,
  eggPrice,
}: MembersListProps) => {
  const [mealCounts, setMealCounts] = useState<{
    [key: number]: number
  }>({})
  const [riceCounts, setRiceCounts] = useState<{
    [key: number]: number
  }>({})
  const [eggCounts, setEggCounts] = useState<{
    [key: number]: number
  }>({})
  
  // State for editing names
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  
  // State for adding new member
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
    setMealCounts({
      ...mealCounts,
      [memberId]: count,
    })
  }
  const handleRiceCountChange = (memberId: number, count: number) => {
    setRiceCounts({
      ...riceCounts,
      [memberId]: count,
    })
  }
  const handleEggCountChange = (memberId: number, count: number) => {
    setEggCounts({
      ...eggCounts,
      [memberId]: count,
    })
  }
  const handleAddMeal = (memberId: number) => {
    const count = mealCounts[memberId] || 0
    if (count > 0) {
      onAddMeal(memberId, count)
      setMealCounts({
        ...mealCounts,
        [memberId]: 0,
      })
    }
  }
  const handleAddRice = (memberId: number) => {
    const count = riceCounts[memberId] || 0
    if (count > 0) {
      onAddRice(memberId, count)
      setRiceCounts({
        ...riceCounts,
        [memberId]: 0,
      })
    }
  }
  const handleAddEgg = (memberId: number) => {
    const count = eggCounts[memberId] || 0
    if (count > 0) {
      onAddEgg(memberId, count)
      setEggCounts({
        ...eggCounts,
        [memberId]: 0,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Daily Tracker
          </h2>
          <button
            onClick={() => setIsAddingMember(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            <UserPlus size={18} />
            <span className="hidden sm:inline">Add Member</span>
          </button>

        </div>

        {/* Add Member Form */}
        <AnimatePresence>
          {isAddingMember && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleAddMemberSubmit} className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Enter member name"
                  className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!newMemberName.trim()}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Check size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingMember(false)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 ${!member.isActive ? 'opacity-75 grayscale-[0.5]' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 mr-2">
                    {editingId === member.id ? (
                      <div className="flex items-center space-x-2">
                        <input 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-primary focus:outline-none px-1 py-0.5"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveName(member.id)
                            if (e.key === 'Escape') setEditingId(null)
                          }}
                        />
                        <button onClick={() => saveName(member.id)} className="text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 p-1 rounded"><Check size={16}/></button>
                        <button onClick={() => setEditingId(null)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded"><X size={16}/></button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 group">
                        <h3 className={`font-semibold text-lg ${!member.isActive ? 'text-muted-foreground' : ''}`}>{member.name}</h3>
                        <button 
                          onClick={() => startEditing(member)} 
                          className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          aria-label="Edit name"
                        >
                          <Edit2 size={14} />
                        </button>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">ID: MRT {member.id}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => onToggleActive(member.id)}
                      className={`p-1.5 rounded-lg transition-all duration-300 border ${
                        member.isActive 
                        ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50' 
                        : 'bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                      }`}
                      title={member.isActive ? "Deactivate Member" : "Activate Member"}
                    >
                      <Power size={14} />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to remove this member? This action cannot be undone.')) {
                          onRemoveMember(member.id)
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-50 text-red-500 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                      title="Remove Member"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className={`space-y-4 transition-opacity duration-300 ${!member.isActive ? 'pointer-events-none opacity-50' : ''}`}>
                  {/* Meals */}
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Utensils className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium">Meals: {member.meals}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleMealCountChange(member.id, Math.max(0, (mealCounts[member.id] || 0) - 1))}
                        disabled={!member.isActive || (mealCounts[member.id] || 0) <= 0}
                        className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold w-8 text-center">{mealCounts[member.id] || 0}</span>
                      <button
                        onClick={() => handleMealCountChange(member.id, Math.min(9, (mealCounts[member.id] || 0) + 1))}
                        disabled={!member.isActive || (mealCounts[member.id] || 0) >= 9}
                        className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAddMeal(member.id)}
                        disabled={!mealCounts[member.id] || !member.isActive}
                        className={`ml-3 p-2 rounded-lg transition-colors active:scale-95 ${mealCounts[member.id] ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}`}
                        title="Confirm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Rice */}
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                      <span className="text-sm font-medium">Rice: {member.riceCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleRiceCountChange(member.id, Math.max(0, (riceCounts[member.id] || 0) - 1))}
                        disabled={!member.isActive || (riceCounts[member.id] || 0) <= 0}
                        className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold w-8 text-center">{riceCounts[member.id] || 0}</span>
                      <button
                        onClick={() => handleRiceCountChange(member.id, Math.min(9, (riceCounts[member.id] || 0) + 1))}
                        disabled={!member.isActive || (riceCounts[member.id] || 0) >= 9}
                        className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAddRice(member.id)}
                        disabled={!riceCounts[member.id] || !member.isActive}
                        className={`ml-3 p-2 rounded-lg transition-colors active:scale-95 ${riceCounts[member.id] ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}`}
                        title="Confirm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Eggs */}
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Egg className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium">Eggs: {member.eggCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEggCountChange(member.id, Math.max(0, (eggCounts[member.id] || 0) - 1))}
                        disabled={!member.isActive || (eggCounts[member.id] || 0) <= 0}
                        className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold w-8 text-center">{eggCounts[member.id] || 0}</span>
                      <button
                        onClick={() => handleEggCountChange(member.id, Math.min(9, (eggCounts[member.id] || 0) + 1))}
                        disabled={!member.isActive || (eggCounts[member.id] || 0) >= 9}
                        className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAddEgg(member.id)}
                        disabled={!eggCounts[member.id] || !member.isActive}
                        className={`ml-3 p-2 rounded-lg transition-colors active:scale-95 ${eggCounts[member.id] ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}`}
                        title="Confirm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium opacity-90">Total Meals</h3>
            <Utensils className="w-5 h-5 opacity-75" />
          </div>
          <p className="text-3xl font-bold">
            {members.reduce((sum: number, member: Member) => sum + member.meals, 0)}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium opacity-90">Total Rice</h3>
            <div className="w-5 h-5 rounded-full border-2 border-white/75" />
          </div>
          <p className="text-3xl font-bold">
            {members.reduce((sum: number, member: Member) => sum + member.riceCount, 0)}
          </p>
          <p className="text-sm opacity-75 mt-1">{ricePrice} tk each</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium opacity-90">Total Eggs</h3>
            <Egg className="w-5 h-5 opacity-75" />
          </div>
          <p className="text-3xl font-bold">
            {members.reduce((sum: number, member: Member) => sum + member.eggCount, 0)}
          </p>
          <p className="text-sm opacity-75 mt-1">{eggPrice} tk each</p>
        </motion.div>
      </div>
    </div>
  )
}
