const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Creazione dell'app Express
const app = express();

// Configurazione middleware
app.use(cors());
app.use(express.json());

// Porta del server
const PORT = process.env.PORT || 5000;

// Funzione per leggere le serie viste dal file
const getViewedSeries = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../data/serie_viste_processed.json'), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Errore nella lettura del file delle serie viste:', err);
    return { series: [] };
  }
};

// Funzione per leggere i dati delle nuove serie Netflix
const getNewSeries = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../data/new_series.json'), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Errore nella lettura del file delle nuove serie:', err);
    return { series: [] };
  }
};

// Funzione per salvare le preferenze utente
const savePreferences = (preferences) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, '../data/preferences.json'),
      JSON.stringify(preferences, null, 2),
      'utf8'
    );
    return true;
  } catch (err) {
    console.error('Errore durante il salvataggio delle preferenze:', err);
    return false;
  }
};

// Rotte API

// Recupera le serie viste dall'utente
app.get('/api/viewed-series', (req, res) => {
  const viewedSeries = getViewedSeries();
  res.json(viewedSeries);
});

// Recupera le nuove serie su Netflix
app.get('/api/new-series', (req, res) => {
  const newSeries = getNewSeries();
  res.json(newSeries);
});

// Recupera le raccomandazioni personalizzate
app.get('/api/recommendations', (req, res) => {
  // In un'implementazione reale, qui ci sarebbe un algoritmo 
  // che confronta le serie viste con le nuove uscite
  const viewedSeries = getViewedSeries().series;
  const newSeries = getNewSeries().series;
  
  // Simuliamo un semplice algoritmo di raccomandazione
  // (In una versione reale, questo sarebbe molto più sofisticato)
  const recommendations = newSeries.filter(newSerie => {
    // Cerca corrispondenze nei generi
    return viewedSeries.some(viewedSerie => 
      viewedSerie.genres.some(genre => 
        newSerie.genres.includes(genre)
      )
    );
  });
  
  // Aggiungiamo un punteggio di match fittizio
  const recommendationsWithScore = recommendations.map(rec => {
    return {
      ...rec,
      matchScore: Math.floor(Math.random() * 30) + 70 // Punteggio tra 70 e 100
    };
  });
  
  // Ordiniamo per punteggio decrescente
  recommendationsWithScore.sort((a, b) => b.matchScore - a.matchScore);
  
  res.json({
    recommendations: recommendationsWithScore
  });
});

// Salva le preferenze utente
app.post('/api/preferences', (req, res) => {
  const preferences = req.body;
  const saved = savePreferences(preferences);
  
  if (saved) {
    res.status(200).json({ message: 'Preferenze salvate con successo' });
  } else {
    res.status(500).json({ message: 'Errore durante il salvataggio delle preferenze' });
  }
});

// Gestione per produzione
if (process.env.NODE_ENV === 'production') {
  // Servi file statici
  app.use(express.static(path.join(__dirname, '../build')));

  // Gestione route per React router
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});