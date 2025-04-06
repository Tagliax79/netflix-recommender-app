import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, Button } from 'react-bootstrap';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simuliamo il caricamento dei dati
    // In un'implementazione reale, faremmo una chiamata API
    setTimeout(() => {
      setRecommendations([
        {
          id: 1,
          title: "Demon Slayer: Temporada 4",
          image: "https://via.placeholder.com/300x450?text=Demon+Slayer+S4",
          description: "Tanjiro e i suoi amici continuano la lotta contro i demoni nell'era Taisho.",
          match: 98,
          genres: ["Anime", "Action", "Fantasy"],
          category: "anime"
        },
        {
          id: 2,
          title: "Fargo: Stagione 5",
          image: "https://via.placeholder.com/300x450?text=Fargo+S5",
          description: "Una nuova storia ambientata nel Midwest americano con il tipico stile dei fratelli Coen.",
          match: 89,
          genres: ["Crime", "Drama", "Thriller"],
          category: "crime"
        },
        {
          id: 3,
          title: "Mind Hunter: Il Ritorno",
          image: "https://via.placeholder.com/300x450?text=Mind+Hunter+Return",
          description: "Holden Ford e Bill Tench tornano per una nuova serie di casi di serial killer.",
          match: 95,
          genres: ["Crime", "Drama", "Thriller"],
          category: "crime"
        },
        {
          id: 4,
          title: "The Expanse: Origins",
          image: "https://via.placeholder.com/300x450?text=The+Expanse+Origins",
          description: "Prequel della famosa serie di fantascienza che esplora l'inizio della colonizzazione del sistema solare.",
          match: 91,
          genres: ["Sci-Fi", "Drama", "Mystery"],
          category: "scifi"
        },
        {
          id: 5,
          title: "Attack on Titan: Final Chapters",
          image: "https://via.placeholder.com/300x450?text=AoT+Final",
          description: "Gli ultimi episodi della serie che concludono la lotta dell'umanità contro i Titani.",
          match: 99,
          genres: ["Anime", "Action", "Drama"],
          category: "anime"
        },
        {
          id: 6,
          title: "House of Cards: Legacy",
          image: "https://via.placeholder.com/300x450?text=HoC+Legacy",
          description: "Un nuovo capitolo del dramma politico con nuovi personaggi che lottano per il potere a Washington.",
          match: 87,
          genres: ["Drama", "Political"],
          category: "drama"
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredRecommendations = filter === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === filter);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 pt-4">
        <Col>
          <h1 className="display-5 netflix-red">Raccomandazioni per Te</h1>
          <p className="lead">
            Basate sulle serie che hai già visto e sulle tue preferenze
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filtra per genere:</Form.Label>
            <Form.Select 
              value={filter}
              onChange={handleFilterChange}
              className="bg-dark text-white"
            >
              <option value="all">Tutti i generi</option>
              <option value="anime">Anime</option>
              <option value="crime">Crime/Thriller</option>
              <option value="scifi">Sci-Fi/Fantasy</option>
              <option value="drama">Drama</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={8} className="text-md-end">
          <Button variant="outline-light" className="mt-4" onClick={() => setFilter('all')}>
            Reset Filtri
          </Button>
        </Col>
      </Row>

      {loading ? (
        <p>Caricamento raccomandazioni...</p>
      ) : (
        <Row>
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map(rec => (
              <Col key={rec.id} md={4} className="mb-4">
                <Card className="recommendation-card h-100">
                  <Card.Img variant="top" src={rec.image} alt={rec.title} className="recommendation-image" />
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title>{rec.title}</Card.Title>
                      <span className="badge bg-success">{rec.match}% match</span>
                    </div>
                    <Card.Text>{rec.description}</Card.Text>
                    <div>
                      {rec.genres.map((genre, index) => (
                        <Badge key={index} bg="secondary" className="me-1">{genre}</Badge>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>Nessuna raccomandazione trovata per il filtro selezionato.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Recommendations;