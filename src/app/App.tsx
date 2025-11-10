import { TodoList } from '_components/todo-list/TodoList';
import './styles.css';

function App() {
    return (
        <div className="wrapper">
            <header className="header">Todo List</header>
            <main className="main">
                <TodoList />
            </main>
            <footer className="footer">Salpanov Inc.</footer>
        </div>
    );
}

export default App;
