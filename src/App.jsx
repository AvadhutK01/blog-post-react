import './App.css'
import { BlogProvider } from './context/BlogContext'
import { BlogMain } from './components/BlogMain'

function App() {
  return (
    <BlogProvider>
      <BlogMain />
    </BlogProvider>
  )
}

export default App
