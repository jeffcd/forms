import React from 'react'
import { LayoutProvider as LP } from '@glueit/material-theme'

const headerOpts = {
  title: 'Glue It',
  Links: () => null
}

const footerOpts = {
  copyright: 'Copyright 2019. Glue It.'
}

const LayoutProvider = ({ children }) => {
  return (
    <LP headerOpts={headerOpts} footerOpts={footerOpts}>
      {children}
    </LP>
  )
}

export { LayoutProvider }
