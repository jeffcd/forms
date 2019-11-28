import React from 'react'
import ListContext from '../ListContext'
import asField from '../hoc/asField'

const List = ({
  children,
  name,
  value,
  minLength = 0,
  maxLength = 1000000
}) => {
  const arr = Array(value.length).fill(1)
  const childrenArr = Array.isArray(children) ? children : [children]
  return (
    <>
      {arr.map((a, i) => {
        const listInfo = {
          name,
          i,
          minLength: parseInt(minLength),
          maxLength: parseInt(maxLength),
          length: value.length
        }
        return (
          <React.Fragment key={i}>
            <ListContext.Provider value={listInfo}>
              {childrenArr.map((child, j) => {
                if (!child.props) {
                  return child
                }
                const Clone = React.cloneElement(child)
                return <React.Fragment key={j}>{Clone}</React.Fragment>
              })}
            </ListContext.Provider>
          </React.Fragment>
        )
      })}
    </>
  )
}

List.type = 'list'

export default asField(List)
