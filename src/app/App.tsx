import { TodoForm } from '_components/todo-form/TodoForm';
import { TodoList } from '_components/todo-list/TodoList';
import './styles.css';

function App() {
    return (
        <div className="wrapper">
            <header className="header">Todo List</header>
            <main className="main">
                <TodoForm />
                <TodoList />
            </main>
            <footer className="footer">Salpan Inc.</footer>
        </div>
    );
}

export default App;
