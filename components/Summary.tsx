import { Member, Expense } from '../App'
import { Calculator, TrendingUp, TrendingDown, AlertCircle, Utensils, Egg, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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

  const generatePDF = () => {
    const doc = new jsPDF()

    // Title
    doc.setFontSize(20)
    doc.setTextColor(79, 70, 229) // Indigo color
    doc.text('Metro Meal - Monthly Summary', 14, 22)
    
    // Date
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)

    // Summary Metrics
    doc.setFontSize(12)
    doc.setTextColor(0)
    doc.text(`Total Meals: ${totalMeals}`, 14, 45)
    doc.text(`Total Payments: ${totalPayments.toFixed(2)} tk`, 14, 52)
    doc.text(`Total Expenses: ${totalExpenses.toFixed(2)} tk`, 14, 59)
    doc.text(`Meal Rate: ${mealRate.toFixed(2)} tk`, 14, 66)
    
    const balanceText = `Group Balance: ${Math.abs(groupBalance).toFixed(2)} tk ${groupBalance >= 0 ? '(Surplus)' : '(Deficit)'}`
    doc.text(balanceText, 14, 73)

    // Payments summary table (per member)
    const paymentsTable = members.map((m) => [m.name, m.payments.toFixed(2)])
    autoTable(doc, {
      startY: 85,
      head: [['Member', 'Paid (tk)']],
      body: paymentsTable,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 9, cellPadding: 3 },
      foot: [['', totalPayments.toFixed(2)]],
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    })

    // Expenses table
    const expensesTable = expenses.map((ex) => [ex.date || '', ex.description, ex.amount.toFixed(2)])
    const afterPaymentsY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 8 : 110
    autoTable(doc, {
      startY: afterPaymentsY,
      head: [['Date', 'Description', 'Amount (tk)']],
      body: expensesTable,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 9, cellPadding: 3 },
      foot: [['', 'Total', totalExpenses.toFixed(2)]],
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    })

    // Member detailed table (balances)
    const afterExpensesY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 8 : (afterPaymentsY + 60)
    const tableData = members.map(member => {
      const mealCost = member.meals * mealRate
      const riceCost = member.riceCount * ricePrice
      const eggCost = member.eggCount * eggPrice
      const extraCost = riceCost + eggCost
      const totalCost = mealCost + extraCost
      const balance = member.payments - totalCost
      
      return [
        member.name,
        member.meals,
        member.riceCount,
        member.eggCount,
        mealCost.toFixed(2),
        extraCost.toFixed(2),
        totalCost.toFixed(2),
        member.payments.toFixed(2),
        `${Math.abs(balance).toFixed(2)} ${balance >= 0 ? 'Cr' : 'Dr'}`
      ]
    })

    autoTable(doc, {
      startY: afterExpensesY,
      head: [['Name', 'Meals', 'Rice', 'Eggs', 'Meal Cost', 'Extra', 'Total', 'Paid', 'Balance']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 8, cellPadding: 2 },
      foot: [['', '', '', '', '', '', 'Total', totalPayments.toFixed(2), '']],
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    })

    // Final save
    doc.save('metro-meal-summary.pdf')
  }

  return (
    <div className="space-y-4 pb-safe">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
          Summary
        </h2>
        <button
          onClick={generatePDF}
          className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-xl transition-all text-sm font-medium shadow-sm active:scale-95"
        >
          <Download className="w-4 h-4 mr-1.5" />
          Export
        </button>
      </div>

      {/* Key Metrics - Stacked on mobile, grid on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-medium text-muted-foreground">Meals</h3>
            <Utensils className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <p className="text-xl font-bold">{totalMeals}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-medium text-muted-foreground">Payments</h3>
            <TakaSign className="w-3.5 h-3.5 text-green-500" />
          </div>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">{totalPayments.toFixed(0)} tk</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-medium text-muted-foreground">Expenses</h3>
            <TrendingDown className="w-3.5 h-3.5 text-red-500" />
          </div>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">{totalExpenses.toFixed(0)} tk</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-4 rounded-2xl shadow-sm border ${
            groupBalance >= 0 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-medium opacity-80">Balance</h3>
            {groupBalance >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <p className={`text-xl font-bold ${groupBalance >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {Math.abs(groupBalance).toFixed(0)} tk
          </p>
        </motion.div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <h3 className="font-medium text-xs">Rice</h3>
          </div>
          <p className="text-sm font-semibold">{totalRiceCost} tk</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-1.5 mb-1">
            <Egg className="w-3 h-3 text-yellow-500" />
            <h3 className="font-medium text-xs">Eggs</h3>
          </div>
          <p className="text-sm font-semibold">{totalEggCost} tk</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-1.5 mb-1">
            <Calculator className="w-3 h-3 text-blue-500" />
            <h3 className="font-medium text-xs">Base</h3>
          </div>
          <p className="text-sm font-semibold">{(totalExpenses - totalRiceCost - totalEggCost).toFixed(0)} tk</p>
        </div>
      </div>

      {/* Meal Rate Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium opacity-90">Meal Rate</h3>
            <p className="text-xs opacity-75">Excludes rice & egg</p>
          </div>
          <p className="text-3xl font-bold">
            {mealRate.toFixed(2)} <span className="text-sm font-normal opacity-75">tk</span>
          </p>
        </div>
      </motion.div>

      {/* Member Balances - Mobile Cards */}
      <div>
        <h3 className="font-semibold text-sm mb-3 flex items-center">
          <Calculator className="w-4 h-4 mr-2 text-primary" />
          Member Balances
        </h3>
        
        {/* Mobile: Cards view */}
        <div className="md:hidden space-y-2">
          {members.map((member) => {
            const mealCost = member.meals * mealRate
            const riceCost = member.riceCount * ricePrice
            const eggCost = member.eggCount * eggPrice
            const extraCost = riceCost + eggCost
            const totalCost = mealCost + extraCost
            const balance = member.payments - totalCost
            return (
              <div key={member.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {member.meals} meals • {member.riceCount} rice • {member.eggCount} eggs
                    </p>
                  </div>
                  <span className={`text-lg font-bold ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {Math.abs(balance).toFixed(0)} {balance >= 0 ? 'Cr' : 'Dr'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg text-center">
                    <p className="text-muted-foreground">Cost</p>
                    <p className="font-semibold">{totalCost.toFixed(0)} tk</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg text-center">
                    <p className="text-muted-foreground">Paid</p>
                    <p className="font-semibold text-green-600">{member.payments.toFixed(0)} tk</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg text-center">
                    <p className="text-muted-foreground">Extra</p>
                    <p className="font-semibold">{extraCost.toFixed(0)} tk</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop: Table view */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
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
