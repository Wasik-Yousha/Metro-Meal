import React from 'react'
import { Utensils, Moon, Sun, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { MetroBoysLogo } from './MetroBoysLogo'

interface HeaderProps {
  isDarkMode: boolean
  toggleTheme: () => void
  activeTab: string
  setActiveTab: (tab: any) => void
  tabs: Array<{ id: string; label: string; icon: any }>
}

export const Header = ({ isDarkMode, toggleTheme, activeTab, setActiveTab, tabs }: HeaderProps) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <MetroBoysLogo className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Metro Meal
            </h1>
            <p className="text-xs text-muted-foreground">
              Made for MetroBoys
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {tabs.filter(tab => tab.id !== 'settings').map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-full transition-colors ${
              activeTab === 'settings' 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-foreground'
            }`}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative overflow-hidden"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-blue-400" />
              ) : (
                <Sun className="w-5 h-5 text-orange-500" />
              )}
            </motion.div>
          </button>
        </div>
      </div>
    </header>
  )
}
