import React from "react"
import { StyleSheet } from "react-native"
import { theme } from "../constants"
import Block from "./Block"

const Card = (props) => {
  const { color, style, children, ...otherProps } = props
  const cardStyles = [styles.card, style]

  return (
    <Block
      color={color || theme.colors.white}
      style={cardStyles}
      {...otherProps}
    >
      {children}
    </Block>
  )
}

export default Card

export const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.base + 4,
    marginBottom: theme.sizes.base,
  },
})
