import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';

export default function Recipes() {
  const { API } = useContext(AppContext);
  console.log(API);
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
