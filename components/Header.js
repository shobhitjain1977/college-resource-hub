'use client'

import { motion } from 'framer-motion'

export default function Header({ onUploadClick }) {
  return (
    <header className="border-b-2 border-primary-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">📚</span>
          </div>
          <span className="text-xl font-serif font-bold text-primary-900">
            Resource Hub
          </span>
        </motion.div>

        <motion.button
          onClick={onUploadClick}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span>➕</span>
          Upload Resource
        </motion.button>
      </div>
    </header>
  )
}
