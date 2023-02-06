import { Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import NotFound from './Components/pages/NotFound';
import Table from './Components/pages/Table';
import { Container } from 'react-bootstrap';
import Footer from './Components/vievs/Footer';
import Header from './Components/vievs/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTables } from './Redux/tablesRedux';


function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
  <Container>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/table/:id" element={<Table />} />
      <Route path="*" element={<NotFound />}/>
    </Routes>
    <Footer/>
  </Container>
  );
}

export default App;
