import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';

const Preferences = () => {
  // Stato per i generi preferiti
  const [preferredGenres, setPreferredGenres] = useState([]);
  // Stato per il salvataggio
  const [saved, setSaved] = useState(false);
  // Stato per il caricamento
  const [loading, setLoading] = useState(true);

  // Lista di tutti i generi disponibili
  const allGenres = [
    { id: 1, name: 'Anime' },
    { id: 2, name: 'Azione' },
    { id: 3, name: 'Avventura' },
    { id: 4, name: 'Commedia' },
    { id: 5, name: 'Crime' },
    { id: 6, name: 'Documentario' },
    { id: 7, name: 'Drammatico' },
    { id: 8, name: 'Fantascienza' },
    { id: 9, name: 'Fantasy' },
    { id: 10, name: 'Horror' },
    { id: 11, name: 'Mistero' },
    { id: 12, name: 'Romantico' },
    { id: 13, name: 'Thriller' },
  ];

  // Stato per le serie viste importate
  const [viewedSeries, setViewedSeries] = useState([]);

  useEffect(() => {
    // Simuliamo il caricamento dei dati delle preferenze
    // In un'implementazione reale, qui faremmo una chiamata API
    setTimeout(() => {
      // Impostiamo alcuni generi di default basati sulle serie viste
      setPreferredGenres([1, 5, 7, 8, 13]);
      
      // Caricamento delle prime 5 serie viste per categoria
      setViewedSeries([
        { id: 1, title: 'Naruto', category: 'Anime' },
        { id: 2, title: 'Dragon Ball', category: 'Anime' },
        { id: 3, title: 'Breaking Bad', category: 'Crime' },
        { id: 4, title: 'Ozark', category: 'Crime' },
        { id: 5, title: 'Dark', category: 'Sci-Fi' },
        { id: 6, title: 'Stranger Things', category: 'Sci-Fi' },
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Gestisce il toggle di un genere
  const toggleGenre = (genreId) => {
    if (preferredGenres.includes(genreId)) {
      setPreferredGenres(preferredGenres.filter(id => id !== genreId));
    } else {
      setPreferredGenres([...preferredGenres, genreId]);
    }
  };

  // Gestisce il salvataggio delle preferenze
  const savePreferences = () => {
    // In un'implementazione reale, qui faremmo una chiamata API
    console.log('Preferenze salvate:', preferredGenres);
    setSaved(true);
    
    // Nascondi il messaggio dopo 3 secondi
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 pt-4">
        <Col>
          <h1 className="display-5 netflix-red">Le Tue Preferenze</h1>
          <p className="lead">
            Personalizza le tue raccomandazioni selezionando i generi che preferisci
          </p>
        </Col>
      </Row>

      {saved && (
        <Alert variant="success" className="mb-4">
          Preferenze salvate con successo!
        </Alert>
      )}

      {loading ? (
        <p>Caricamento preferenze...</p>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={6}>
              <Card className="bg-dark">
                <Card.Header as="h5">Generi Preferiti</Card.Header>
                <Card.Body>
                  <p>Seleziona i generi che preferisci:</p>
                  <div className="d-flex flex-wrap">
                    {allGenres.map(genre => (
                      <Badge 
                        key={genre.id}
                        onClick={() => toggleGenre(genre.id)}
                        className={`genre-badge ${preferredGenres.includes(genre.id) ? 'selected' : ''}`}
                        bg={preferredGenres.includes(genre.id) ? 'danger' : 'secondary'}
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="bg-dark">
                <Card.Header as="h5">Serie Viste</Card.Header>
                <Card.Body>
                  <p>Alcune delle serie che hai visto (estratte dal file):</p>
                  <ul className="list-group list-group-flush bg-dark">
                    {viewedSeries.map(series => (
                      <li key={series.id} className="list-group-item bg-dark text-white">
                        {series.title} <span className="badge bg-info">{series.category}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-muted">
                    Il sistema utilizza l'elenco completo delle serie viste per creare le raccomandazioni.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={12}>
              <Card className="bg-dark">
                <Card.Header as="h5">Impostazioni delle Notifiche</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="checkbox" 
                      id="notification-check" 
                      label="Attiva notifiche per nuove serie consigliate" 
                      defaultChecked 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Frequenza delle notifiche</Form.Label>
                    <Form.Select className="bg-dark text-white">
                      <option value="daily">Giornaliera</option>
                      <option value="weekly">Settimanale</option>
                      <option value="monthly">Mensile</option>
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button 
                variant="secondary" 
                className="me-md-2"
                onClick={() => window.location.reload()}
              >
                Annulla
              </Button>
              <Button 
                variant="danger" 
                className="netflix-btn"
                onClick={savePreferences}
              >
                Salva Preferenze
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Preferences;