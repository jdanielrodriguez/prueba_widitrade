export class Rol {
  constructor() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.state = 1;
  }
  id?: number | null | undefined;
  name?: string;
  description?: string;
  state?: number;
}
export class Menus {
  constructor() {
    this.inicio = false;
    this.nombre = '';
    this.url = '';
    this.rol = 1;
  }
  sesion?: boolean;
  select?: boolean;
  clienteOnly?: boolean;
  inicio?: boolean;
  url: string;
  evento?: any;
  nombre?: string;
  rol?: number;
  submenu?: Menus[];
}
export class Perfil {
  constructor(form?: { email: string, password: string }
  ) {
    this.last_link = '';
    this.facebook_id = '';
    this.google_id = '';
    this.username = '';
    this.token = '';
    this.google_token = '';
    this.picture = 'https://robohash.org/68.186.255.198.png';
    this.google_id_token = '';
    this.twitter_id = '';
    this.tiktok_id = '';
    this.code = '';
    this.names = '';
    this.description = '';
    this.lastnames = '';
    this.pic1 = '';
    this.pic2 = '';
    this.state = 1;
    this.pic3 = '';
    this.auth_type = 'simple';
    this.id = null;
    if (form) {
      this.email = form.email;
      this.username = form.email.split("@")[0];
      this.password = form.password;
    }
  }
  id?: number | null;
  username?: string;
  password?: string;
  password_rep?: string;
  email?: string;
  code?: string;
  names?: string;
  lastnames?: string;
  description?: string;
  image?: string;
  birth?: string;
  picture?: string;
  last_conection?: Date;
  twitter_id?: string;
  tiktok_id?: string;
  facebook_id?: string;
  google_id?: string;
  google_token?: string;
  google_id_token?: string;
  pic1?: string;
  pic2?: string;
  pic3?: string;
  token?: string;
  auth_type?: string;
  state?: number;
  rol_id?: number;
  rol?: Rol;

  last_link?: string;
}
export class Socialusers extends Perfil {
  firstName?: string;
  lastName?: string;
  authToken?: string;
  photoUrl?: string;
  idToken?: string;
  google_idToken?: string;
  google?: string;
  imagen?: string;
}
export class Comentario {
  constructor(
  ) {
    this.comentario = '';
    this.id = null;
    this.usuario = null;
    this.comment = null;
    this.recive = null;
    this.inventario = null;
    this.url = null;
  }
  comentario?: string;
  creado?: Date;
  leido?: Date;
  recive?: boolean | null;
  usuario?: number | null;
  usuario_obj?: Perfil;
  id?: number | null | undefined;
  comment?: number | null;
  comment_obj?: Perfil;
  inventario?: number | null;
  url?: string | null;
}
export class Reaccion {
  constructor(
  ) {
    this.url = '';
    this.id = null;
    this.usuario = null;
    this.default = null;
    this.estado = null;
    this.path = null;
    this.orden = '0';
  }
  url?: string;
  default?: number | null;
  orden?: string;
  path?: string | null;
  estado?: number | null;
  id?: number | null | undefined;
  usuario?: number | null;
  usuario_obj?: Perfil;
  proveedor?: number;
  like?: number;
  like_obj?: Perfil;
  tipo_forma_pago?: number;
  direccion?: number;
  tipo_item?: number;
}
export class ChangePasswordForm {
  constructor(form?: { old_pass: string, new_pass: string, new_pass_rep: string }) {
    this.id = null;
    this.old_pass = '';
    this.new_pass = '';
    this.new_pass_rep = '';
    this.perfil = new Perfil();
    if (form) {
      this.old_pass = btoa(form.old_pass);
      this.new_pass = btoa(form.new_pass);
      this.new_pass_rep = btoa(form.new_pass_rep);
    }
  }
  id?: number | null | undefined | string;
  old_pass?: string | null;
  new_pass?: string;
  new_pass_rep?: string;
  token?: string;
  perfil?: Perfil;

}
export class ListaBusqueda {
  constructor() {
    this.id = null;
    this.title = '';
    this.content = '';
    this.nombre = '';
    this.slug = '';
    this.imagen = 'https://via.placeholder.com/250x200';
    this.validacion = 5;
  }
  id?: number | null | undefined;
  content?: string;
  nombre?: string;
  description?: string;
  address?: string;
  title?: string;
  imagen?: string;
  picture?: string;
  name?: string;
  price?: number;
  total?: number;
  withdrawall?: number;
  tasa_cambio?: number;
  tasa_iva?: number;
  slug?: string;
  event_slug?: string;
  imagenes?: Imagen[];
  objeto?: any;
  validacion?: number;
  date_start?: Date;
  time_start?: string;
  cantidad?: number;
  defaultPlaces?: Place[];
  selectedPlaces?: Place[];
}
export class Producto {
  constructor() {
    this.id = null;
    this.estado = 1;
    this.inventario = 0;
    this.cantidad = 0;
    this.color = '';
    this.talla = '';
    this.tamanio = '';
    this.estilo = '';
    this.imagenes = [];
  }
  id?: number | null | undefined;
  codigo?: string;
  estilo?: string;
  cantidad?: number;
  talla?: string;
  tamanio?: string;
  color?: string;
  estado?: number;
  pasarela?: number;
  comision?: number;
  retiro?: number;
  inventario?: number;
  imagenes?: Imagen[];
}

export class Imagen {
  constructor() {
    this.id = null;
    this.url = 'https://via.placeholder.com/50X50';
    this.titulo = '';
    this.descripcion = '';
    this.estado = 1;
  }
  id?: number | null | undefined;
  url: string;
  default?: string;
  orden?: string;
  titulo?: string;
  descripcion?: string;
  path?: string;
  estado?: number;
  cliente?: number;
  proveedor?: number;
  usuario?: number;
  producto?: number;
  configuracion?: number;
  inventario?: number;
  item?: number;
  tipo_item?: number;
}

export class FilterGET {
  constructor() {
    this.id = 0;
    this.estado = '0';
    this.filter = 'nada';
  }
  id: number | null | undefined;
  estado: string;
  filter: string;
}

// Prueba Widitrade
export class Event {
  constructor() {
    this.localities = []
  }
  localities: Locality[];
  address?: null | string;
  created_at?: null | string;
  date_end?: null | string;
  date_start?: null | string;
  description?: null | string;
  end?: null | string;
  id?: null | string;
  lat?: null | string;
  lng?: null | string;
  name?: null | string;
  picture?: null | string;
  reason_id?: null | string;
  slug?: null | string;
  start?: null | string;
  state?: null | string;
  time_end?: null | string;
  time_start?: null | string;
  type?: null | string;
  updated_at?: null | string;
}
export class Locality {
  constructor() {
    this.id = null;
    this.name = '';
    this.title = '';
    this.content = '';
    this.picture = '';
    this.description = '';
    this.address = '';
    this.places = [];
  }
  id?: number | null | undefined;
  name?: string;
  title?: string;
  content?: string;
  picture?: string;
  description?: string;
  address?: string;
  slug?: string;
  time_start?: Date;
  time_end?: Date;
  date_start?: Date;
  date_end?: Date;
  start?: Date;
  end?: Date;
  price?: number;
  total?: number;
  tasa_cambio?: number;
  tasa_iva?: number;

  lat?: number;
  lng?: number;
  type?: number;
  state?: number;

  event_id?: number;
  created_at!: Date;
  updated_at!: Date;

  places: Place[];
}
export class Place {
  constructor() {
    this.number = 0;
    this.state = 1;
    this.price = 1;
    this.no = '0';
  }
  id?: number | null | undefined;
  state?: string | number;
  name?: string;
  description?: string;
  slug?: string;
  no?: string;
  number?: number;
  price?: number;
  x?: number;
  y?: number;
  chaild?: string;
  sold?: number;
  avaliable?: number;
  type?: number;
}

// HTTP
class CaptchaObj {
  constructor() {
    this.success = false;
    this.challenge_ts = (new Date()).toLocaleString();
    this.hostname = '';
    this.score = 0;
    this.action = '';
  }
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score: number;
  action: string;
}

export class RSP {
  constructor() {
    this.status = 500;
  }
  status: number;
  msg?: string;
}

export class Response extends RSP {
  constructor() {
    super();
    this.objeto = null;
  }
  objeto: string | null;
}

export class ResponseUser extends RSP {
  constructor() {
    super();
    this.status = 500;
    this.objeto = null;
  }
  objeto: Perfil | null;
}
export class ResponseEvent extends RSP {
  constructor() {
    super();
    this.status = 500;
    this.objeto = null;
    this.count = null;
    this.cripto = null;
  }
  count: number | null;
  objeto: Event | null;
  cripto: string | null;
}
export class ResponseLocality extends RSP {
  constructor() {
    super();
    this.status = 500;
    this.objeto = null;
    this.count = null;
  }
  count: number | null;
  objeto: Locality | null;
}

export class ResponseCAPTCHA extends RSP {
  constructor() {
    super();
    this.status = 500;
    this.objeto = new CaptchaObj();
  }
  objeto: CaptchaObj;
}
