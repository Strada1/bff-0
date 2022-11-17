import {useEffect, useState} from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    async function get() {
        try {
            let response = await fetch("http://localhost:3000/api/data");
            let hello = await response.json();
            console.log(hello);
        } catch (err) {
            alert(err); // TypeError: failed to fetch
        }
    }
    async function updateMovie() {
        try {
            let response = await fetch("http://localhost:3000/api/movies/6374f96d4797a6ad2c33f663", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"title": "Начало"})
            });
            let result = await response.json();
            console.log(result);
        } catch (err) {
            console.log(err); // TypeError: failed to fetch
        }
    }

    useEffect(() => {
        get();
    }, []);

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            <button onClick={updateMovie}>Обновить фильм по id</button>
        </div>
    );
}

export default App;
