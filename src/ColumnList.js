import React, { Component } from 'react';
import './ColumnList.css';
import If                   from "./If";

class ColumnList extends Component {

    createTask = event => {
        event.preventDefault();
        const description = event.target.querySelector('input').value;
        const task = {
            id: this.props.tasks.length + 1,
            description,
            status: 'To Do'
        };

        event.target.reset();
        this.props.onAddTask(task);
    };

    updateTask = (event, task) => {
        event.preventDefault();
        task.status = event.target.checked ? 'Done' : 'To Do';
        this.props.onUpdateTask(task);
    };

    render() {
        const { columnTitle, tasks } = this.props;

        const columnTasks = tasks.filter(task => task.status === columnTitle);

        return (
            <div className='column-list'>
                <h3>{columnTitle}</h3>

                <If test={columnTitle === 'To Do'}>
                    <form onSubmit={this.createTask}>
                        <input type='text'
                               placeholder='Description'
                               autoFocus/>
                        <button
                            type='submit'
                            className='btn btn-success'
                        >Create
                        </button>
                    </form>
                </If>

                <ul className='list-items'>
                    {columnTasks.map(task => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                onChange={event => this.updateTask(event, task)}
                                checked={columnTitle === 'Done'}
                            />
                            <span>{task.description}</span>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => this.props.onDeleteTask(task)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ColumnList;
