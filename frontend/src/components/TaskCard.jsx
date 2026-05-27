const TaskCard = ({ task, onEdit, onDelete, onStageChange }) => {

    // Priority badge style
    const priorityClass = {
      Low: 'priority-low',
      Medium: 'priority-medium',
      High: 'priority-high',
    }
  
    // Next stage mapping
    const nextStage = {
      'Todo': 'In Progress',
      'In Progress': 'Done',
      'Done': null,
    }
  
    // Previous stage mapping
    const prevStage = {
      'Todo': null,
      'In Progress': 'Todo',
      'Done': 'In Progress',
    }
  
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    }
  
    return (
      <div className="task-card">
        {/* Title */}
        <div className="task-card-title">{task.title}</div>
  
        {/* Description */}
        {task.description && (
          <div className="task-card-desc">{task.description}</div>
        )}
  
        {/* Priority + Date */}
        <div className="task-card-footer">
          <span className={`priority-badge ${priorityClass[task.priority]}`}>
            {task.priority}
          </span>
          <span style={{ fontSize: '11px', color: '#aaa' }}>
            {formatDate(task.createdAt)}
          </span>
        </div>
  
        {/* Stage move buttons */}
        <div className="stage-actions">
          {prevStage[task.stage] && (
            <button
              className="stage-btn stage-btn-prev"
              onClick={() => onStageChange(task._id, prevStage[task.stage])}
              title={`Move to ${prevStage[task.stage]}`}
            >
              ← {prevStage[task.stage]}
            </button>
          )}
          {nextStage[task.stage] && (
            <button
              className="stage-btn stage-btn-next"
              onClick={() => onStageChange(task._id, nextStage[task.stage])}
              title={`Move to ${nextStage[task.stage]}`}
            >
              {nextStage[task.stage]} →
            </button>
          )}
        </div>
  
        {/* Edit / Delete actions */}
        <div className="task-card-actions">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => onEdit(task)}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(task._id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    )
  }
  
  export default TaskCard