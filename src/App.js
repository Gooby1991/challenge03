import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [URL, setURL] = useState("");
  const [techs, setTechs] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `${title}`,
      url: `${URL}`,
      techs: `${techs}`,
    };

    const response = await api.post("/repositories", repository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    let provisory = repositories;

    const indexFound = provisory.findIndex(
      (repository) => repository.id === id
    );

    provisory.splice(indexFound, 1);

    console.log(provisory);

    setRepositories([...provisory]);
  }

  function handleInputTitle(key) {
    setTitle(key);
  }

  function handleInputURL(key) {
    setURL(key);
  }

  function handleInputTechs(key) {
    setTechs(key);
  }

  function handleInputSearch(key) {
    setSearch(key);
  }

  async function handleSearch(e) {
    e.preventDefault();
    await api
      .get(`/repositories?query=${search}`)
      .then((response) => setRepositories(response.data));
  }

  return (
    <div>
      <h1>DOGO PEPEHANDS</h1>
      <form>
        <label>
          Search
          <input
            value={search}
            onChange={(e) => handleInputSearch(e.target.value)}
          />
        </label>
        <button onClick={(e) => handleSearch(e)}>Buscar</button>
      </form>

      <form>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => handleInputTitle(e.target.value)}
          />
        </label>
        <label>
          URL
          <input value={URL} onChange={(e) => handleInputURL(e.target.value)} />
        </label>
        <label>
          Techs
          <input
            value={techs}
            onChange={(e) => handleInputTechs(e.target.value)}
          />
        </label>
        <button onClick={handleAddRepository}>Adicionar</button>
      </form>

      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
