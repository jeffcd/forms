import React, { useState } from 'react'
import Button from '../observers/Button'

const List = ({ children, name, addLabel, maxSize }) => {
  const [size, setSize] = useState(0)
  const arr = Array(size).fill(1)
  const childrenArr = Array.isArray(children) ? children : [children]
  return (
    <>
      {arr.map((a, i) => (
        <React.Fragment key={i}>
          {childrenArr.map((child, j) => {
            const fullName = `${name}--${child.props.name}-${i}`
            const id = `${name}--${child.props.name}-${i}`
            const Clone = React.cloneElement(child, { name: fullName, id })
            return <React.Fragment key={j}>{Clone}</React.Fragment>
          })}
        </React.Fragment>
      ))}
      {size < maxSize && (
        <Button text={addLabel} onClick={() => setSize(size + 1)} />
      )}
    </>
  )
}

export default List
