import React from "react"

function Input(
    {
        type="text",
        ...props
    },ref
) {
  return (
    <input type={type} {...props} ref={ref} />
  )
}

export default React.forwardRef(Input)
