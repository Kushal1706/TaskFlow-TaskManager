import { useState, useEffect } from 'react'

const TaskModal = ({ isOpen, onClose, onSubmit, editTask, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stage: 'Todo',
    priority: 'Medium',
  })
  const [error, setError] = useState('')

  // If editing — prefill the form
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description || '',
        stage: editTask.stage,
        priority: editTask.priority,
      })
    } else {
      // Reset form for new task
      setFormData({
        title: '',
        description: '',
        stage: 'Todo',
        priority: 'Medium',
      })
    }
    setError('')
  }, [editTask, isOpen])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      return setError('Task title is required')
    }
    onSubmit(formData)
  }

  // Don't render if not open
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop click from closing when clicking inside modal */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h3>{editTask ? '✏️ Edit Task' : '➕ New Task'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Error */}
        {error && <div className="error-msg">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title *</label>
            <input
              type="text"
              name="title"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Add more details... (optional)"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
            >
              <option value="Todo">📋 Todo</option>
              <option value="In Progress">🔄 In Progress</option>
              <option value="Done">✅ Done</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>

          {/* Footer buttons */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: 'auto' }}
              disabled={loading}
            >
              {loading
                ? 'Saving...'
                : editTask
                ? 'Update Task'
                : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal