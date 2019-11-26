import React, { useState } from 'react'
import VisibilityContext from '../VisibilityContext'
import withFormStateHoc from '../hoc/withFormState'

const hidden = children => <div style={{ display: 'none' }}>{children}</div>

const SimpleStates = ({ form, isVisible, children }) => {
  const [visible, setVisible] = useState({})

  const inboundIsVisible = isVisible(form)
  if (visible.isVisible !== inboundIsVisible) {
    setVisible({ isVisible: inboundIsVisible })
  }

  return (
    <VisibilityContext.Provider value={visible}>
      {visible.isVisible !== false && children}
      {visible.isVisible === false && hidden(children)}
    </VisibilityContext.Provider>
  )
}

export default withFormStateHoc(SimpleStates)
