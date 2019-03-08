import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import ColumnList from './ColumnList';

const TASKS_KEY = 'tasks';

class App extends Component {

    constructor(props) {
        super(props);
        const tasks = JSON.parse((window.localStorage.getItem(TASKS_KEY) || '[]'));
        this.state = { tasks };
    }

    addTask = task => {
        const tasks = this.state.tasks.concat([ task ]);
        this.updateAndSave(tasks);
    };

    updateTask = task => {
        const tasks = this.state.tasks.filter(currentTask => currentTask.id !== task.id).concat([ task ]);
        this.updateAndSave(tasks);
    };

    deleteTask = task => {
        const tasks = this.state.tasks.filter(currentTask => currentTask.id !== task.id);
        this.updateAndSave(tasks);
    };

    updateLocalStorage = tasks => {
        window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    };

    updateAndSave = tasks => {
        this.updateLocalStorage(tasks);
        this.setState({ tasks });
    };

    render() {
        const { tasks } = this.state;
        const columns = [
            {
                title: 'To Do',
                tasks
            },
            {
                title: 'Done',
                tasks
            }
        ];

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>To Do Lists</p>
                </header>
                <div className="App-container">
                    <div className='app-lists'>
                        {columns.map(column => (
                            <ColumnList
                                key={column.title}
                                columnTitle={column.title}
                                tasks={column.tasks}
                                onAddTask={this.addTask}
                                onUpdateTask={this.updateTask}
                                onDeleteTask={this.deleteTask}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
