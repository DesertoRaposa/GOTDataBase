import React from 'react';
import { Col } from 'react-bootstrap';

const RowBlock = ({ left, right }) => (
  <>
    <Col md="4" className="ml-4">
      {left}
    </Col>
    <Col md={{ span: 4, offset: 1 }}>
      {right}
    </Col>
  </>
);

export default RowBlock;
