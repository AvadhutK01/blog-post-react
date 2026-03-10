import './App.css'
import { BlogProvider } from './context/BlogContext'
import { BlogList } from './components/BlogList'

function App() {
  return (
    <BlogProvider>
      <BlogList />
    </BlogProvider>
  )
}

export default App
