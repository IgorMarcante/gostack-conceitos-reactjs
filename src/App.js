import React, { useState, useEffect } from 'react';
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Repository: ${Date.now()}`,
      "url": "github.com/repository",
      "techs": ["NodeJS", "ReactJS"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoriesList = repositories.filter(r => (r.id !== id));
  
    setRepositories([...repositoriesList]);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
