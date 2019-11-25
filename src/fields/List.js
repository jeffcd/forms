import React from 'react'
import asFieldHoc from '../asFieldHoc'

const List = ({ children, name, value }) => {
  const arr = Array(value.length).fill(1)
  const childrenArr = Array.isArray(children) ? children : [children]
  return (
    <>
      {arr.map((a, i) => (
        <React.Fragment key={i}>
          {childrenArr.map((child, j) => {
            const fullName = `${name}.value[${i}].${child.props.name}`
            const id = `${name}:${i}::${child.props.name}:`
            const Clone = React.cloneElement(child, { name: fullName, id })
            return <React.Fragment key={j}>{Clone}</React.Fragment>
          })}
        </React.Fragment>
      ))}
    </>
  )
}

List.type = 'list'

export default asFieldHoc(List)
