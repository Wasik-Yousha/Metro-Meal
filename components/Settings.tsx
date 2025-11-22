import React from 'react'
import { Settings as SettingsIcon, Save, Info, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

interface SettingsProps {
  ricePrice: number
  setRicePrice: (price: number) => void
  eggPrice: number
  setEggPrice: (price: number) => void
}

export const Settings = ({
  ricePrice,
  setRicePrice,
  eggPrice,
  setEggPrice,
}: SettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent flex items-center">
          <SettingsIcon className="w-6 h-6 mr-2 text-gray-700 dark:text-gray-200" />
          Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="font-semibold text-lg mb-4">Unit Prices</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Rice Price (per unit)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={ricePrice}
                    onChange={(e) => setRicePrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    tk
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Egg Price (per unit)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={eggPrice}
                    onChange={(e) => setEggPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    tk
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800"
            >
              <h3 className="font-semibold text-lg mb-2 text-blue-800 dark:text-blue-300">Note</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Changing these prices will update the calculations for all members immediately. 
                Please ensure these values are correct as they affect the total meal rate and individual balances.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <Info className="w-5 h-5 mr-2 text-primary" />
                <h3 className="font-semibold text-lg">About Us</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Metro Meal is a simple, smart tool designed to help bachelor messes manage their daily meal tracking and expenses without the hassle of paper registers. It automatically calculates meal rates, individual costs, and balances, keeping everything transparent and easy.
              </p>
              <div className="relative pl-4 italic text-sm text-muted-foreground">
                <Quote className="w-4 h-4 absolute -top-2 -left-2 text-primary/20" />
                "A small initiative to make your Bachelor life Easy"
                <span className="block mt-1 font-medium text-primary not-italic text-xs">— Wasik Yousha</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
