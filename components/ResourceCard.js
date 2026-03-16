'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ResourceCard({ resource, onUpvote }) {
  const [upvoted, setUpvoted] = useState(false)

  const handleUpvote = () => {
    if (!upvoted) {
      onUpvote(resource.id)
      setUpvoted(true)
    }
  }

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return '📄'
    if (fileType?.includes('image')) return '🖼️'
    if (fileType?.includes('video')) return '🎥'
    return '📎'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-xl p-6 card-shadow transition-all duration-300 hover:-translate-y-1 paper-texture border-l-4 border-primary-500"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
            {resource.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {resource.description}
          </p>
        </div>
        <motion.button
          onClick={handleUpvote}
          className={`ml-3 flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
            upvoted 
              ? 'bg-primary-100 text-primary-700' 
              : 'bg-gray-100 hover:bg-primary-50 text-gray-700'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={upvoted}
        >
          <span className="text-xl">{upvoted ? '❤️' : '🤍'}</span>
          <span className="text-xs font-semibold">{resource.upvotes}</span>
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
          Sem {resource.semester}
        </span>
        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
          {resource.subject}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
          {getFileIcon(resource.file_type)} {resource.file_type?.split('/')[1]?.toUpperCase()}
        </span>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
        <span>By {resource.uploaded_by || 'Anonymous'}</span>
        <span>{new Date(resource.created_at).toLocaleDateString()}</span>
      </div>

      {resource.file_url && (
        <motion.a
          href={resource.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Download Resource
        </motion.a>
      )}
    </motion.div>
  )
}
