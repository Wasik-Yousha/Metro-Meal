import { Settings as SettingsIcon, Info, Quote, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface SettingsProps {
  ricePrice: number
  setRicePrice: (price: number) => void
  eggPrice: number
  setEggPrice: (price: number) => void
  onClearData: () => void
}

export const Settings = ({
  ricePrice,
  setRicePrice,
  eggPrice,
  setEggPrice,
  onClearData,
}: SettingsProps) => {
  return (
    <div className="space-y-4 pb-safe">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <SettingsIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        <h2 className="text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          Settings
        </h2>
      </div>

      {/* Unit Prices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="font-semibold text-sm mb-4">Unit Prices</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Rice Price (per unit)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                inputMode="decimal"
                value={ricePrice}
                onChange={(e) => setRicePrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-base"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                tk
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Egg Price (per unit)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                inputMode="decimal"
                value={eggPrice}
                onChange={(e) => setEggPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-base"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                tk
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800"
      >
        <h3 className="font-semibold text-sm mb-1.5 text-blue-800 dark:text-blue-300">Note</h3>
        <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
          Changing these prices will update the calculations for all members immediately.
        </p>
      </motion.div>

      {/* About Us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center mb-3">
          <Info className="w-4 h-4 mr-2 text-primary" />
          <h3 className="font-semibold text-sm">About Us</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          Metro Meal is a simple, smart tool designed to help bachelor messes manage their daily meal tracking and expenses without the hassle of paper registers.
        </p>
        <div className="relative pl-3 italic text-xs text-blue-600 dark:text-blue-400">
          <Quote className="w-3 h-3 absolute -top-1 -left-1 text-primary/20" />
          "A small initiative to make your Bachelor life Easy"
          <span className="block mt-1 font-medium text-primary not-italic text-[10px]">— Wasik Yousha</span>
        </div>
      </motion.div>

      {/* Factory Reset */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-800"
      >
        <h3 className="font-semibold text-sm mb-1.5 text-red-800 dark:text-red-300 flex items-center">
          <Trash2 className="w-4 h-4 mr-2" />
          Factory Reset
        </h3>
        <p className="text-xs text-red-600 dark:text-red-400 mb-3">
          Wipe all data from this device. This includes members, expenses, and settings.
        </p>
        <button
          onClick={onClearData}
          className="w-full py-3 px-4 bg-red-600 text-white rounded-xl transition-all font-medium text-sm active:scale-[0.98]"
        >
          Reset Everything
        </button>
      </motion.div>
    </div>
  )
}
