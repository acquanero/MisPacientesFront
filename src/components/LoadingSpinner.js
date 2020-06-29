import { Container, Content, Spinner } from "native-base";
import React from "react";

const LoadingSpinner = ({ show }) => {
  if (show) {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Spinner color="blue" style={{ marginTop: -100 }} />
        </Content>
      </Container>
    );
  }
  return null;
};

export default LoadingSpinner;
