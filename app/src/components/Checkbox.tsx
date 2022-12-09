import React, { useEffect } from "react"

const Checkbox = ({ column, ...rest }) => {
    return (
        <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />
            <p>{column.Header}</p>
        </label>
    )
}

export default Checkbox
