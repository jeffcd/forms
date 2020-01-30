import React, { useState } from 'react'
import ScopeContext from '../ScopeContext'

const Scope = ({ children, path = '' }) => {
  const [fullPath, setFullPath] = useState(false)
  const [cachePath, setCachePath] = useState(path)
  return (
    <ScopeContext.Consumer>
      {scope => {
        if (cachePath !== path) {
          setFullPath(false)
          setCachePath(path)
          return null
        }
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
