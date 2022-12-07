import React from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from './routes'

export default function RenderRouter () {
  const ItemRoutes = routes.map((route, idx) => {
    let routeChild = null
    if (route.children) {
      routeChild = route.children.map((child, idx) => {
        return (
          <Route
            key={idx}
            path={child.path}
            element={child.element}
            index={child.index}
          />
        )
      })
    }
    return (
      <Route
        key={idx}
        path={route.path}
        element={route.element}
      >
        {routeChild}
      </Route>
    )
  })
  return (
    <Routes>
      {ItemRoutes}
    </Routes>
  )
}
