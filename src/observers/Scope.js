import React, { useState } from 'react'
import ScopeContext from '../ScopeContext'

const Scope = ({ children, path = '' }) => {
  const [fullPath, setFullPath] = useState(false)
  return (
    <ScopeContext.Consumer>
      {scope => {
        if (!fullPath) {
          if (scope) {
            setFullPath(`${scope}.${path}`)
          } else {
            setFullPath(path)
          }
          return null
        }
        return (
          <ScopeContext.Provider value={fullPath}>
            {children}
          </ScopeContext.Provider>
        )
      }}
    </ScopeContext.Consumer>
  )
}

export default Scope
