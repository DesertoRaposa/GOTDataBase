import React from 'react';
import { Col } from 'react-bootstrap';

const RowBlock = ({ left, right }) => (
  <>
    <Col md="" className="py-4">
      {right}
      {left}
    </Col>
  </>
);

export default RowBlock;
