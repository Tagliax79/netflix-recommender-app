import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuliamo il caricamento dei dati
    // In un'implementazione reale, qui faremmo una chiamata API
    setTimeout(() => {
      setNewReleases([
        {
          id: 1,
          title: "Breaking Bad: El Camino",
          image: "https://via.placeholder.com/300x450?text=Breaking+Bad:+El+Camino",
          description: "La storia di Jesse Pinkman dopo gli eventi di Breaking Bad.",
          match: 98,
          genres: ["Crime", "Drama", "Thriller"]
        },
        {
          id: 2,
          title: "Arcane: Season 2",
          image: "https://via.placeholder.com/300x450?text=Arcane+Season+2",
          description: "Continua la storia di Vi e Jinx nel mondo di League of Legends.",
          match: 95,
          genres: ["Animation", "Action", "Adventure"]
        },
        {
          id: 3,
          title: "Dark: Origini",
          image: "https://via.placeholder.com/300x450?text=Dark:+Origini",
          description: "Prequel della famosa serie Dark che esplora le origini del ciclo temporale.",
          match: 92,
          genres: ["Sci-Fi", "Mystery", "Drama"]
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-5 pt-4">
        <Col>
          <h1 className="display-4 netflix-red mb-4">Netflix Recommender</h1>
          <p className="lead">
            Scopri nuove serie TV su Netflix in base ai tuoi gusti. L'app analizza le serie che hai già visto
            e ti suggerisce nuove uscite che potrebbero interessarti.
          </p>
          <Button 
            as={Link} 
            to="/recommendations" 
            className="netflix-btn btn-lg mt-3"
          >
            Vedi Raccomandazioni
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>Ultime Novità su Netflix</h2>
          <p>Queste sono le serie appena uscite che potrebbero interessarti</p>
        </Col>
      </Row>

      {loading ? (
        <p>Caricamento in corso...</p>
      ) : (
        <Row>
          {newReleases.map(release => (
            <Col key={release.id} md={4} className="mb-4">
              <Card className="recommendation-card h-100">
                <Card.Img variant="top" src={release.image} alt={release.title} className="recommendation-image" />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{release.title}</Card.Title>
                    <span className="badge bg-success">{release.match}% match</span>
                  </div>
                  <Card.Text>{release.description}</Card.Text>
                  <div>
                    {release.genres.map((genre, index) => (
                      <span key={index} className="badge bg-secondary me-1">{genre}</span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;