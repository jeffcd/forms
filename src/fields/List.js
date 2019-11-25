import React from 'react'
import asField from '../hoc/asField'

const List = ({ children, name, value }) => {
  const arr = Array(value.length).fill(1)
  const childrenArr = Array.isArray(children) ? children : [children]
  return (
    <>
      {arr.map((a, i) => (
        <React.Fragment key={i}>
          {childrenArr.map((child, j) => {
            if (!child.props) {
              return child
            }
            const fullName = `${name}.value[${i}].${child.props.name}`
            const to = child.props.to
            const from = child.props.from
            const id = `${name}:${i}::${child.props.name}:`
            const listProps = { id }
            if (child.props.name) {
              listProps.name = fullName
            }
            if (to) {
              listProps.to = `${name}.value[${i}].${to}`
            }
            if (from) {
              listProps.from = `${name}`
              listProps.index = i
            }
            const Clone = React.cloneElement(child, listProps)
            return <React.Fragment key={j}>{Clone}</React.Fragment>
          })}
        </React.Fragment>
      ))}
    </>
  )
}

List.type = 'list'

export default asField(List)
