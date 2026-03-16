'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import ResourceCard from '@/components/ResourceCard'
import UploadModal from '@/components/UploadModal'
import FilterBar from '@/components/FilterBar'
import Header from '@/components/Header'

export default function Home() {
  const [resources, setResources] = useState([])
  const [filteredResources, setFilteredResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchResources()
  }, [])

  useEffect(() => {
    filterResources()
  }, [resources, selectedSemester, selectedSubject, searchQuery])

  async function fetchResources() {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('upvotes', { ascending: false })
      
      if (error) throw error
      setResources(data || [])
    } catch (error) {
      console.error('Error fetching resources:', error)
    } finally {
      setLoading(false)
    }
  }

  function filterResources() {
    let filtered = [...resources]

    if (selectedSemester !== 'all') {
      filtered = filtered.filter(r => r.semester === selectedSemester)
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(r => r.subject === selectedSubject)
    }

    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredResources(filtered)
  }

  async function handleUpvote(resourceId) {
    const resource = resources.find(r => r.id === resourceId)
    if (!resource) return

    try {
      const { error } = await supabase
        .from('resources')
        .update({ upvotes: resource.upvotes + 1 })
        .eq('id', resourceId)

      if (error) throw error

      setResources(resources.map(r => 
        r.id === resourceId ? { ...r, upvotes: r.upvotes + 1 } : r
      ))
    } catch (error) {
      console.error('Error upvoting:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      <Header onUploadClick={() => setShowUploadModal(true)} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-6xl font-serif font-bold text-primary-900 mb-4">
            College Resource Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover, share, and upvote the best study materials from students across campus
          </p>
        </motion.div>

        <FilterBar
          selectedSemester={selectedSemester}
          setSelectedSemester={setSelectedSemester}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading resources...</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onUpvote={handleUpvote}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredResources.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-500">No resources found. Be the first to upload!</p>
          </motion.div>
        )}
      </main>

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={fetchResources}
        />
      )}
    </div>
  )
}
