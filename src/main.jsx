import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from 'antd'
import Paths from './routes/Paths'
import AntProvider from './contexts/AntContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services'


createRoot(document.getElementById('root')).render(
  <App>
    <AntProvider>
      <QueryClientProvider client={queryClient}>
        <Paths />
      </QueryClientProvider>
    </AntProvider>
  </App>
)
