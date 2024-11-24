function TodoList() {
  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input className="todo-input" placeholder="Add a new task" />
        <button className="add-button">
          <i className="fa fa-plus-circle"></i>
        </button>
      </div>
      <div className="filters">
        <button className="filter" id="show-complete">
          Complete
        </button>
        <button className="filter" id="show-incomplete">
          Incomplete
        </button>
        <button className="filter" id="delete-all">
          Delete All
        </button>
      </div>
      <div className="todos-container">
        <ul className="todos"></ul>
      </div>
    </div>
  );
}

export default TodoList;
