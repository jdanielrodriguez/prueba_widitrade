import { ListaBusqueda } from "./interfaces";

export const sliders = (n: number = 1) => {
  const slider = { url: 'https://via.placeholder.com/500x250.png?text=Cagando...', titulo: '', descripcion: '' };
  let sliders = [];
  for (let index = 0; index < n; index++) {
    sliders.push(slider);
  }
  return sliders;
}

export const listaBusqueda = (n: number = 1): ListaBusqueda[] => {
  const item: ListaBusqueda = {
    id: 1,
    nombre: 'Cargando...',
    slug: 'cargando',
    imagen: 'https://via.placeholder.com/500x250.png?text=Cagando...',
  };

  let items = [];
  for (let index = 0; index < n; index++) {
    items.push(item);
  }

  return items;
}
