import React, { useState } from 'react'
import VisibilityContext from '../VisibilityContext'
import withFormStateHoc from '../hoc/withFormState'

const hidden = children => <div style={{ display: 'none' }}>{children}</div>

const VisibilityGroup = ({ form, isVisible, children }) => {
  const [visible, setVisible] = useState({})
  const inboundIsVisible = isVisible(form)
  return (
    <VisibilityContext.Consumer>
      {visibility => {
        const parentIsVisible = visibility.isVisible !== false
        const isVisible = inboundIsVisible && parentIsVisible

        if (visible.isVisible !== isVisible) {
          setVisible({ isVisible: isVisible })
        }
        return (
          <VisibilityContext.Provider value={visible}>
            {visible.isVisible !== false && children}
            {visible.isVisible === false && hidden(children)}
          </VisibilityContext.Provider>
        )
      }}
    </VisibilityContext.Consumer>
  )
}

export default withFormStateHoc(VisibilityGroup)
