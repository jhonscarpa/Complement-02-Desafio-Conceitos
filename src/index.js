const express = require('express')

const { v4: uuid } = require('uuid')

const app = express()

app.use(express.json())

const repositories = []

app.get('/repositories', (request, response) => {
  return response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository)

  return response.status(201).json(repository)
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const updatedRepository = request.body
  console.log(updatedRepository)

  const repositoryIndex = repositories.findIndex(
    repository => repository.id === id,
  )

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Mensagem do erro' })
  }

  const repository = {
    ...repositories[repositoryIndex],
    ...updatedRepository,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(
    repository => repository.id === id,
  )

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Mensagem do erro' })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(
    repository => repository.id === id,
  )

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Mensagem do erro' })
  }

  const likes = ++repositories[repositoryIndex].likes

  repositories[repositoryIndex].likes = likes


  return response.json(repositories[repositoryIndex])
})

module.exports = app
