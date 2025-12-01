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
  
  // State for confirmed animation
  const [confirmedMeal, setConfirmedMeal] = useState<{ [key: number]: boolean }>({})
  const [confirmedRice, setConfirmedRice] = useState<{ [key: number]: boolean }>({})
  const [confirmedEgg, setConfirmedEgg] = useState<{ [key: number]: boolean }>({})
  
  // State for editing names
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  
  // State for editing counts
  const [editingMealId, setEditingMealId] = useState<number | null>(null)
  const [editingRiceId, setEditingRiceId] = useState<number | null>(null)
  const [editingEggId, setEditingEggId] = useState<number | null>(null)
  const [editMealValue, setEditMealValue] = useState(0)
  const [editRiceValue, setEditRiceValue] = useState(0)
  const [editEggValue, setEditEggValue] = useState(0)
  
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
      // Show green confirmation
      setConfirmedMeal({ ...confirmedMeal, [memberId]: true })
      setTimeout(() => {
        setConfirmedMeal({ ...confirmedMeal, [memberId]: false })
        setMealCounts({
          ...mealCounts,
          [memberId]: 0,
        })
      }, 300)
    }
  }
  const handleAddRice = (memberId: number) => {
    const count = riceCounts[memberId] || 0
    if (count > 0) {
      onAddRice(memberId, count)
      // Show green confirmation
      setConfirmedRice({ ...confirmedRice, [memberId]: true })
      setTimeout(() => {
        setConfirmedRice({ ...confirmedRice, [memberId]: false })
        setRiceCounts({
          ...riceCounts,
          [memberId]: 0,
        })
      }, 300)
    }
  }
  const handleAddEgg = (memberId: number) => {
    const count = eggCounts[memberId] || 0
    if (count > 0) {
      onAddEgg(memberId, count)
      // Show green confirmation
      setConfirmedEgg({ ...confirmedEgg, [memberId]: true })
      setTimeout(() => {
        setConfirmedEgg({ ...confirmedEgg, [memberId]: false })
        setEggCounts({
          ...eggCounts,
          [memberId]: 0,
        })
      }, 300)
    }
  }

  // Get tick button style based on state
  const getTickStyle = (count: number, confirmed: boolean) => {
    if (confirmed) {
      return 'bg-green-500 text-white'
    }
    if (count > 0) {
      return 'bg-white dark:bg-gray-200 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-300 border border-gray-300'
    }
    return 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
  }

  // Edit handlers
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
                    <div className="flex items-center space-x-3 group">
                      <Utensils className="w-5 h-5 text-orange-500" />
                      {editingMealId === member.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            min="0"
                            value={editMealValue}
                            onChange={(e) => setEditMealValue(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5 text-sm"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveMealEdit(member.id)
                              if (e.key === 'Escape') setEditingMealId(null)
                            }}
                          />
                          <button onClick={() => saveMealEdit(member.id)} className="text-green-500 p-1"><Check size={14}/></button>
                          <button onClick={() => setEditingMealId(null)} className="text-red-500 p-1"><X size={14}/></button>
                        </div>
                      ) : (
                        <>
                          <span className="text-sm font-medium">Meals: {member.meals}</span>
                          <button 
                            onClick={() => startEditMeal(member)}
                            className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Edit2 size={12} />
                          </button>
                        </>
                      )}
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
                      <div className="w-4" /> {/* Spacer */}
                      <button
                        onClick={() => handleAddMeal(member.id)}
                        disabled={!mealCounts[member.id] || !member.isActive}
                        className={`p-2 rounded-lg transition-all active:scale-95 ${getTickStyle(mealCounts[member.id] || 0, confirmedMeal[member.id] || false)}`}
                        title="Confirm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Rice */}
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3 group">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                      {editingRiceId === member.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            min="0"
                            value={editRiceValue}
                            onChange={(e) => setEditRiceValue(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5 text-sm"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRiceEdit(member.id)
                              if (e.key === 'Escape') setEditingRiceId(null)
                            }}
                          />
                          <button onClick={() => saveRiceEdit(member.id)} className="text-green-500 p-1"><Check size={14}/></button>
                          <button onClick={() => setEditingRiceId(null)} className="text-red-500 p-1"><X size={14}/></button>
                        </div>
                      ) : (
                        <>
                          <span className="text-sm font-medium">Rice: {member.riceCount}</span>
                          <button 
                            onClick={() => startEditRice(member)}
                            className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Edit2 size={12} />
                          </button>
                        </>
                      )}
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
                      <div className="w-4" /> {/* Spacer */}
                      <button
                        onClick={() => handleAddRice(member.id)}
                        disabled={!riceCounts[member.id] || !member.isActive}
                        className={`p-2 rounded-lg transition-all active:scale-95 ${getTickStyle(riceCounts[member.id] || 0, confirmedRice[member.id] || false)}`}
                        title="Confirm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Eggs */}
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3 group">
                      <Egg className="w-5 h-5 text-yellow-500" />
                      {editingEggId === member.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            min="0"
                            value={editEggValue}
                            onChange={(e) => setEditEggValue(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5 text-sm"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEggEdit(member.id)
                              if (e.key === 'Escape') setEditingEggId(null)
                            }}
                          />
                          <button onClick={() => saveEggEdit(member.id)} className="text-green-500 p-1"><Check size={14}/></button>
                          <button onClick={() => setEditingEggId(null)} className="text-red-500 p-1"><X size={14}/></button>
                        </div>
                      ) : (
                        <>
                          <span className="text-sm font-medium">Eggs: {member.eggCount}</span>
                          <button 
                            onClick={() => startEditEgg(member)}
                            className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Edit2 size={12} />
                          </button>
                        </>
                      )}
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
                      <div className="w-4" /> {/* Spacer */}
                      <button
                        onClick={() => handleAddEgg(member.id)}
                        disabled={!eggCounts[member.id] || !member.isActive}
                        className={`p-2 rounded-lg transition-all active:scale-95 ${getTickStyle(eggCounts[member.id] || 0, confirmedEgg[member.id] || false)}`}
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
