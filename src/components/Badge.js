import React from "react"
import { StyleSheet } from "react-native"
import { theme } from "../constants"
import Block from "./Block"

const Badge = (props) => {
  const { children, style, size, color, ...otherProps } = props

  const badgeStyles = StyleSheet.flatten([
    styles.badge,
    size && {
      height: size,
      width: size,
      borderRadius: size,
    },
    style,
  ])

  return (
    <Block
      flex={false}
      middle
      center
      color={color}
      style={badgeStyles}
      {...otherProps}
    >
      {children}
    </Block>
  )
}

export default Badge

const styles = StyleSheet.create({
  badge: {
    height: theme.sizes.base,
    width: theme.sizes.base,
    borderRadius: theme.sizes.border,
  },
})
