import React from 'react'
import { Container, Menu, Icon, Button } from "semantic-ui-react";

interface Props {
  children: any
  hideModal: () => void
}

export default function Modal({children, hideModal}: Props) {
  return (
    <div style={{
          position: "fixed", top: 0, left: 0, 
          width: "100vw", height: "100vh", 
          background: "rgba(0,0,0, 0.85)", backdropFilter: "blur(5px)"}}
    >
      <div className="modal__wrap">
        <div className="modal__container">
          <div className="modal__header">
              <Menu.Item style={{height: "100%" }}>
                <Button
                  style={{color: "black", fontWeight: "normal"}}
                  primary
                  labelPosition="right"
                  onClick={() => hideModal()}
                >
                  <Icon name="x" />
                  <span>Close</span>
                </Button>
              </Menu.Item>
          </div>
          <div className="modal__body">
          {children}
          </div>
        </div>
      </div>
    </div>
  )
}
