import React, { useState, useEffect } from 'react'
import ScopeContext from '../ScopeContext'

const Scope = ({ children, path = '' }) => {
  const [fullPath, setFullPath] = useState(path)
  useEffect(() => {
    setFullPath(path)
  }, [path])
  return (
    <ScopeContext.Consumer>
      {scope => {
        if (scope) {
          setFullPath(`${scope}.${path}`)
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
