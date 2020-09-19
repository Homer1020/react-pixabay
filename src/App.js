import React, {Component} from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    // Leer es state de la página actual
    let pagina = this.state.pagina;

    // Leer si la pagina es 1, ya no ir hacia atras
    if(pagina === 1) return null;

    // Resta uno a la pagina actual
    pagina -= 1;

    // agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    // console.log(pagina);
  }

  paginaSiguiente = () => {
    // Leer es state de la página actual
    let pagina = this.state.pagina;

    // Sumar uno a la pagina actual
    pagina++;

    // agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    // console.log(pagina);
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=18364223-82a37710428f695447c39ac10&q=${termino}&per_page=30&page=${pagina}`;

    // console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({
        imagenes: resultado.hits
      }));

  }

  datosBusqueda = termino => {
    this.setState({
      termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    });
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda} 
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}
 
export default App;