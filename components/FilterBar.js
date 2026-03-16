'use client'

import { motion } from 'framer-motion'

const SEMESTERS = ['all', '1', '2', '3', '4', '5', '6', '7', '8']
const SUBJECTS = [
  'all',
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

export default function FilterBar({
  selectedSemester,
  setSelectedSemester,
  selectedSubject,
  setSelectedSubject,
  searchQuery,
  setSearchQuery
}) {
  return (
    <motion.div 
      className="mb-10 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="🔍 Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field flex-1"
        />

        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="input-field md:w-48"
        >
          <option value="all">All Semesters</option>
          {SEMESTERS.slice(1).map(sem => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="input-field md:w-64"
        >
          {SUBJECTS.map(subject => (
            <option key={subject} value={subject}>
              {subject === 'all' ? 'All Subjects' : subject}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  )
}
