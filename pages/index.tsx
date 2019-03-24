import React from "react";
import styled from "styled-components";
import "../global.css";

const Background = styled.div`
  margin: 0;
  height: 100%;
  background: #f7f9fc;
  padding: 24px;
`;

const Centered = styled.div`
  display: "flex";
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Card = styled.div`
  background: white;
  border-radius: 3px;
  padding: 24px;
  border: 1px solid #f0f1f5;
`;

const H1 = styled.h1`
  margin-top: 0;
  font-weight: 900;
`;

const TextInput = styled.input`
  margin-top: 0;
  font-weight: 800;
`;

const Badge = styled.span`
  background: #778beb;
  border-radius: 24px;
  padding: 4px 8px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  align-self: center;
  justify-self: center;
`;

export default () => (
  <Background>
    <Centered>
      <Card>
        <H1> Usage Limit</H1>

        <p>
          Usage Limits let you give a maximum that you'd like a user to
          experience certain features, for example notifications.
        </p>
      </Card>
    </Centered>
  </Background>
);
