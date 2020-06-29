import React from "react"
import { StyleSheet } from "react-native"
import { theme } from "../constants"
import Block from "./Block"

const Divider = (props) => {
  const { color, style, ...otherProps } = props
  const dividerStyles = [styles.divider, style]

  return (
    <Block
      color={color || theme.colors.gray2}
      style={dividerStyles}
      {...otherProps}
    />
  )
}

export default Divider

export const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
