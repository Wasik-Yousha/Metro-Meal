import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, CreditCard, Receipt, PieChart, LayoutDashboard } from 'lucide-react'
import { MembersList } from './components/MembersList'
import { PaymentTracker } from './components/PaymentTracker'
import { ExpenseTracker } from './components/ExpenseTracker'
import { Summary } from './components/Summary'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'

// Constants for extra item prices
export const RICE_PRICE = 20 // taka
export const EGG_PRICE = 15 // taka

export interface Member {
  id: number
  name: string
  meals: number
  riceCount: number
  eggCount: number
  payments: number
  isActive: boolean
}

export interface Expense {
  id: number
  description: string
  amount: number
  date: string
}

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = localStorage.getItem('members')
    return savedMembers ? JSON.parse(savedMembers) : [
      {
        id: 1,
        name: 'Member 1',
        meals: 0,
        riceCount: 0,
        eggCount: 0,
        payments: 0,
        isActive: true,
      },
      {
        id: 2,
        name: 'Member 2',
        meals: 0,
        riceCount: 0,
        eggCount: 0,
        payments: 0,
        isActive: true,
      },
      {
        id: 3,
        name: 'Member 3',
        meals: 0,
        riceCount: 0,
        eggCount: 0,
        payments: 0,
        isActive: true,
      },
      {
        id: 4,
        name: 'Member 4',
        meals: 0,
        riceCount: 0,
        eggCount: 0,
        payments: 0,
        isActive: true,
      },
      {
        id: 5,
        name: 'Member 5',
        meals: 0,
        riceCount: 0,
        eggCount: 0,
        payments: 0,
        isActive: true,
      },
    ]
  })
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses')
    return savedExpenses ? JSON.parse(savedExpenses) : []
  })

  // Save to localStorage whenever members or expenses change
  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members))
  }, [members])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'members' | 'payments' | 'expenses' | 'summary'
  >('dashboard')

  // Calculate total meals, payments, and expenses
  const totalMeals = members.reduce((sum: number, member: Member) => sum + (member.isActive ? member.meals : 0), 0)
  const totalRice = members.reduce((sum: number, member: Member) => sum + (member.isActive ? member.riceCount : 0), 0)
  const totalEggs = members.reduce((sum: number, member: Member) => sum + (member.isActive ? member.eggCount : 0), 0)
  const totalPayments = members.reduce(
    (sum: number, member: Member) => sum + member.payments,
    0,
  )
  const totalExpenses = expenses.reduce(
    (sum: number, expense: Expense) => sum + expense.amount,
    0,
  )

  // Calculate extra costs
  const riceCost = totalRice * RICE_PRICE
  const eggCost = totalEggs * EGG_PRICE

  // Calculate meal rate (excluding rice and egg costs)
  const baseExpenses = totalExpenses - riceCost - eggCost
  const mealRate = totalMeals > 0 ? baseExpenses / totalMeals : 0

  // Handle adding meals to a member
  const handleAddMeal = (memberId: number, mealCount: number) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              meals: member.meals + mealCount,
            }
          : member,
      ),
    )
  }

  // Handle adding rice to a member
  const handleAddRice = (memberId: number, count: number) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              riceCount: member.riceCount + count,
            }
          : member,
      ),
    )
  }

  // Handle adding eggs to a member
  const handleAddEgg = (memberId: number, count: number) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              eggCount: member.eggCount + count,
            }
          : member,
      ),
    )
  }

  // Handle adding payment from a member
  const handleAddPayment = (memberId: number, amount: number) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              payments: member.payments + amount,
            }
          : member,
      ),
    )
  }

  // Handle adding an expense
  const handleAddExpense = (description: string, amount: number) => {
    const newExpense: Expense = {
      id: Date.now(),
      description,
      amount,
      date: new Date().toISOString().split('T')[0],
    }
    setExpenses((prevExpenses) => [...prevExpenses, newExpense])
  }

  // Handle toggling member active status
  const handleToggleActive = (memberId: number) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? { ...member, isActive: !member.isActive }
          : member
      )
    )
  }

  // Handle updating member name
  const handleUpdateName = (memberId: number, newName: string) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? { ...member, name: newName }
          : member
      )
    )
  }

  // Handle adding a new member
  const handleAddMember = (name: string) => {
    setMembers((prevMembers) => {
      const maxId = prevMembers.length > 0 ? Math.max(...prevMembers.map(m => m.id)) : 0
      const newMember: Member = {
        id: maxId + 1,
        name,
        meals: 0,
        riceCount: 0,
        eggCount: 0,
        payments: 0,
        isActive: true,
      }
      return [...prevMembers, newMember]
    })
  }

  // Handle removing a member
  const handleRemoveMember = (memberId: number) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId))
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'members', label: 'Meals', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'summary', label: 'Summary', icon: PieChart },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-24">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && (
              <Dashboard
                members={members}
                expenses={expenses}
                totalMeals={totalMeals}
                totalExpenses={totalExpenses}
                mealRate={mealRate}
                totalPayments={totalPayments}
              />
            )}
            {activeTab === 'members' && (
              <MembersList
                members={members}
                onAddMeal={handleAddMeal}
                onAddRice={handleAddRice}
                onAddEgg={handleAddEgg}
                onToggleActive={handleToggleActive}
                onUpdateName={handleUpdateName}
                onAddMember={handleAddMember}
                onRemoveMember={handleRemoveMember}
                ricePrice={RICE_PRICE}
                eggPrice={EGG_PRICE}
              />
            )}


            {activeTab === 'payments' && (
              <PaymentTracker members={members} onAddPayment={handleAddPayment} />
            )}
            {activeTab === 'expenses' && (
              <ExpenseTracker expenses={expenses} onAddExpense={handleAddExpense} />
            )}
            {activeTab === 'summary' && (
              <Summary
                members={members}
                expenses={expenses}
                totalMeals={totalMeals}
                totalRice={totalRice}
                totalEggs={totalEggs}
                totalPayments={totalPayments}
                totalExpenses={totalExpenses}
                mealRate={mealRate}
                ricePrice={RICE_PRICE}
                eggPrice={EGG_PRICE}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe z-50">
        <div className="flex justify-around items-center px-2 py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center w-full space-y-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <div className={`p-1.5 rounded-full transition-all duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                </div>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
