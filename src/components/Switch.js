import React from "react"
import { Platform, Switch } from "react-native"
import { theme } from "../constants"

const GRAY_COLOR = "rgba(168, 182, 200, 0.30)"

const SwitchInput = (props) => {
  const { value, ...otherProps } = props
  let thumbColor = null

  if (Platform.OS === "android") {
    thumbColor = GRAY_COLOR
    if (props.value) thumbColor = theme.colors.secondary
  }

  return (
    <Switch
      thumbColor={thumbColor}
      ios_backgroundColor={GRAY_COLOR}
      trackColor={{
        // false: GRAY_COLOR,
        true: theme.colors.secondary,
      }}
      value={value}
      {...otherProps}
    />
  )
}

export default SwitchInput
