import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PortfolioPage from './pages/Portfolio'

function App() {
  return (
    <Router basename="/portfolio_react_test">
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
      </Routes>
    </Router>
  )
}

export default App
