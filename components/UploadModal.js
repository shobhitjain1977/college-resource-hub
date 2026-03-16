'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'English',
  'Other'
]

export default function UploadModal({ onClose, onUploadSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    semester: '1',
    subject: 'Computer Science',
    uploaded_by: '',
  })
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setUploading(true)

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `resources/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath)

      // Insert resource record
      const { error: insertError } = await supabase
        .from('resources')
        .insert([{
          ...formData,
          file_url: publicUrl,
          file_type: file.type,
          upvotes: 0,
        }])

      if (insertError) throw insertError

      onUploadSuccess()
      onClose()
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload resource. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto paper-texture shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-serif font-bold text-primary-900">
              Upload Resource
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="e.g., Calculus Chapter 5 Notes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field resize-none"
                rows="3"
                placeholder="Brief description of the resource..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester *
                </label>
                <select
                  required
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="input-field"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input-field"
                >
                  {SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name (Optional)
              </label>
              <input
                type="text"
                value={formData.uploaded_by}
                onChange={(e) => setFormData({ ...formData, uploaded_by: e.target.value })}
                className="input-field"
                placeholder="Anonymous"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              <input
                type="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="input-field"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                Accepted: PDF, Word, PowerPoint, Images
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1 flex items-center justify-center gap-2"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  '📤 Upload'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
