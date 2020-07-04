import { Text } from "native-base";
import React from "react";

const GenericList = ({ list }) => {
  if (!list || list.length === 0) {
    return <Text> Sin datos </Text>;
  }
  return list.map((item) => {
    return <Text key={item}>{item}</Text>;
  });
};

export default GenericList;
