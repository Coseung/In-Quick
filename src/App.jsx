import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// We will create these pages next
import AuthPage from './features/auth/AuthPage';
import EditorLayout from './features/editor/EditorLayout';
import ViewerPage from './features/viewer/ViewerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/editor" element={<EditorLayout />} />
        <Route path="/view/:id" element={<ViewerPage />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
