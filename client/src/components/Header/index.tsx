import React from "react";
import { Container, Menu, Icon } from "semantic-ui-react";

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        boxShadow: "var(--shadow)",
      }}
    >
      <Menu
        fixed="top"
        style={{
          borderBottom: "3px solid var(--highlight)",
          boxShadow: "var(--shadow)",
        }}
      >
        <Container>
          <div>
            <Menu.Item header>
              <Icon style={{ marginRight: 0 }} name="cube" /> &nbsp; PYNEWS
            </Menu.Item>
          </div>
          <Menu.Item header>
              <p style={{fontWeight: "normal"}}>a python-built news aggregation application.</p>
            </Menu.Item>
        </Container>
      </Menu>
    </header>
  );
}
