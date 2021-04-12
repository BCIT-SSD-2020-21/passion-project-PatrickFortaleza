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
          borderBottom: "1px solid var(--lightborder)",
          boxShadow: "var(--shadow)",
        }}
      >
        <Container>
          <div>
            <Menu.Item header>
              <Icon style={{ marginRight: 0 }} name="cube" /> &nbsp; PYNEWS
            </Menu.Item>
          </div>
        </Container>
      </Menu>
    </header>
  );
}
