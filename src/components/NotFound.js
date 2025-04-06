import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="py-5 text-center">
      <Row className="mb-4 pt-5">
        <Col>
          <h1 className="display-1 netflix-red">404</h1>
          <h2 className="display-4">Pagina non trovata</h2>
          <p className="lead">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
          <Button 
            as={Link} 
            to="/" 
            className="netflix-btn btn-lg mt-3"
          >
            Torna alla Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;