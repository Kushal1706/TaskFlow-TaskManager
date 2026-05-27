import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'
import API from '../api/axios'

const STAGES = ['Todo', 'In Progress', 'Done']

const stageIcons = {
  'Todo': '📋',
  'In Progress': '🔄',
  'Done': '✅',
}

const stageDotClass = {
  'Todo': 'dot-todo',
  'In Progress': 'dot-progress',
  'Done': 'dot-done',
}

const DashboardPage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [error, setError] = useState('')

  // ─── Fetch all tasks on mount ────────────────────────
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const { data } = await API.get('/tasks')
      setTasks(data)
    } catch (err) {
      setError('Failed to load tasks. Please refresh.')
    } finally {
      setLoading(false)
    }
  }

  // ─── Get tasks filtered by stage ─────────────────────
  const getTasksByStage = (stage) => {
    return tasks.filter((task) => task.stage === stage)
  }

  // ─── Open modal for new task ──────────────────────────
  const handleAddTask = () => {
    setEditTask(null)
    setModalOpen(true)
  }

  // ─── Open modal for editing ───────────────────────────
  const handleEditTask = (task) => {
    setEditTask(task)
    setModalOpen(true)
  }

  // ─── Close modal ──────────────────────────────────────
  const handleCloseModal = () => {
    setModalOpen(false)
    setEditTask(null)
  }

  // ─── Create or Update task ────────────────────────────
  const handleSubmitTask = async (formData) => {
    setModalLoading(true)
    try {
      if (editTask) {
        // UPDATE
        const { data } = await API.put(`/tasks/${editTask._id}`, formData)
        setTasks(tasks.map((t) => (t._id === editTask._id ? data : t)))
      } else {
        // CREATE
        const { data } = await API.post('/tasks', formData)
        setTasks([data, ...tasks])
      }
      handleCloseModal()
    } catch (err) {
      setError('Failed to save task. Try again.')
    } finally {
      setModalLoading(false)
    }
  }

  // ─── Delete task ──────────────────────────────────────
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await API.delete(`/tasks/${taskId}`)
      setTasks(tasks.filter((t) => t._id !== taskId))
    } catch (err) {
      setError('Failed to delete task. Try again.')
    }
  }

  // ─── Move task to different stage ────────────────────
  const handleStageChange = async (taskId, newStage) => {
    try {
      const { data } = await API.put(`/tasks/${taskId}`, { stage: newStage })
      setTasks(tasks.map((t) => (t._id === taskId ? data : t)))
    } catch (err) {
      setError('Failed to update task stage.')
    }
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="dashboard">

        {/* Error message */}
        {error && (
          <div
            className="error-msg"
            style={{ marginBottom: '20px', cursor: 'pointer' }}
            onClick={() => setError('')}
          >
            {error} (click to dismiss)
          </div>
        )}

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2>My Tasks</h2>
            <p>Manage and track your tasks across stages</p>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={handleAddTask}>
            ➕ Add Task
          </button>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-number">{tasks.length}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getTasksByStage('Todo').length}</div>
            <div className="stat-label">Todo</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getTasksByStage('In Progress').length}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getTasksByStage('Done').length}</div>
            <div className="stat-label">Done</div>
          </div>
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          /* Kanban Board */
          <div className="kanban-board">
            {STAGES.map((stage) => (
              <div key={stage} className="kanban-column">

                {/* Column Header */}
                <div className="column-header">
                  <div className="column-title">
                    <div className={`column-dot ${stageDotClass[stage]}`}></div>
                    {stageIcons[stage]} {stage}
                  </div>
                  <span className="column-count">
                    {getTasksByStage(stage).length}
                  </span>
                </div>

                {/* Tasks */}
                <div className="column-tasks">
                  {getTasksByStage(stage).length === 0 ? (
                    <div className="empty-state">
                      <div style={{ fontSize: '32px' }}>📭</div>
                      <p>No tasks here</p>
                    </div>
                  ) : (
                    getTasksByStage(stage).map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onStageChange={handleStageChange}
                      />
                    ))
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
        editTask={editTask}
        loading={modalLoading}
      />
    </div>
  )
}

export default DashboardPage