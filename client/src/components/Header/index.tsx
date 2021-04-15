import React from "react";
import { Container, Menu, Icon, Button } from "semantic-ui-react";
import Modal from "../Modal/index"
import Welcome from "../Welcome/index"

interface Props {
  toggleModal: () => void
  hideModal: () => void
  modalActive: boolean
}

export default function Header({modalActive, toggleModal, hideModal}: Props) {
  return (
    <header
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        boxShadow: "var(--shadow)",
        zIndex: 500000,
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
          <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <div style={{display: "flex"}}>
              <Menu.Item header>
                <Icon style={{ marginRight: 0 }} name="cube" /> &nbsp; PYNEWS
              </Menu.Item>
              <Menu.Item header>
                  <p style={{fontWeight: "normal"}}>a python-built news aggregation application.</p>
              </Menu.Item>
            </div>
            <div>
              <Menu.Item style={{height: "100%", borderLeft: "1px solid rgba(34,36,38,.1)"}}>
                <Button
                  style={{color: "black", fontWeight: "normal"}}
                  primary
                  labelPosition="right"
                  onClick={() => toggleModal()}
                >
                  <Icon name="info circle" />
                  <span>More Info</span>
                </Button>
              </Menu.Item>
              {
                modalActive &&
                <Modal hideModal={hideModal}>
                  <Welcome />
                </Modal>
              }
            </div>
          </div>
        </Container>
      </Menu>
    </header>
  );
}
