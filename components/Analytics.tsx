import { useState } from 'react'
import { Member } from '../App'
import { Calendar, TrendingUp, BarChart3, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface DailyRecord {
  date: string
  memberMeals: { [memberId: number]: { meals: number; rice: number; eggs: number } }
}

interface AnalyticsProps {
  members: Member[]
  dailyRecords: DailyRecord[]
}

export const Analytics = ({ members, dailyRecords }: AnalyticsProps) => {
  const [expandedDate, setExpandedDate] = useState<string | null>(null)

  // Sort records by date (newest first)
  const sortedRecords = [...dailyRecords].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    })
  }

  const getDayTotal = (record: DailyRecord) => {
    return Object.values(record.memberMeals).reduce((sum, data) => sum + data.meals, 0)
  }

  return (
    <div className="space-y-4 pb-safe">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Daily Analytics
          </h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {sortedRecords.length} days tracked
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl text-white">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs opacity-80">Avg/Day</span>
          </div>
          <p className="text-2xl font-bold">
            {sortedRecords.length > 0 
              ? (sortedRecords.reduce((sum, r) => sum + getDayTotal(r), 0) / sortedRecords.length).toFixed(1)
              : '0'
            }
          </p>
          <p className="text-xs opacity-70 mt-1">meals per day</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span className="text-xs text-muted-foreground">Last Update</span>
          </div>
          <p className="text-2xl font-bold">
            {sortedRecords.length > 0 ? formatDate(sortedRecords[0].date) : 'N/A'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {sortedRecords.length > 0 ? `${getDayTotal(sortedRecords[0])} meals` : 'No data'}
          </p>
        </div>
      </div>

      {/* Daily Records */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground px-1">Daily History</h3>
        
        {sortedRecords.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {sortedRecords.map((record) => {
              const isExpanded = expandedDate === record.date
              const dayTotal = getDayTotal(record)
              
              return (
                <motion.div
                  key={record.date}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {/* Date Header */}
                  <button
                    onClick={() => setExpandedDate(isExpanded ? null : record.date)}
                    className="w-full p-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-900/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm">{formatDate(record.date)}</p>
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="font-bold text-indigo-600 dark:text-indigo-400">{dayTotal}</p>
                        <p className="text-xs text-muted-foreground">meals</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-3">
                          {members.map((member) => {
                            const memberData = record.memberMeals[member.id]
                            if (!memberData || memberData.meals === 0) return null
                            
                            return (
                              <div
                                key={member.id}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
                              >
                                <span className="font-medium text-sm">{member.name}</span>
                                <div className="flex items-center space-x-4 text-xs">
                                  <span className="text-orange-600 dark:text-orange-400">
                                    🍽️ {memberData.meals}
                                  </span>
                                  {memberData.rice > 0 && (
                                    <span className="text-gray-600 dark:text-gray-400">
                                      🍚 {memberData.rice}
                                    </span>
                                  )}
                                  {memberData.eggs > 0 && (
                                    <span className="text-yellow-600 dark:text-yellow-400">
                                      🥚 {memberData.eggs}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No daily records yet</p>
            <p className="text-xs mt-1">Add meals to start tracking</p>
          </div>
        )}
      </div>
    </div>
  )
}
