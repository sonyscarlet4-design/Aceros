(() => {
  'use strict';

  const STORAGE_KEYS = {
    TEMA: 'ais_tema_v2',
    CARRITO: 'ais_carrito_v2',
    HISTORIAL: 'ais_historial_v2',
    BIENVENIDA_VISTA: 'ais_bienvenida_v2',
    CATALOGO_ADMIN: 'ais_catalogo_admin_v2',
    SUCURSAL_ADMIN: 'ais_sucursal_admin_v2'
  };

  const ADMIN_PASSCODE = 'vaquita62';

  const SUCURSAL_INFO = {
    puntoVenta: 'No. Punto de Venta 0',
    referencia: 'FRENTE CASA COMUNAL MERCED',
    direccion: 'CARANAVI Nro.: 470 Edif.: SIN NOMBRE',
    ubicacionInterna: 'Piso.: PLANTA BAJA Depto.: CASA',
    zonaBarrio: 'Zona/Barrio.: VILLA FATIMA',
    ciudad: 'LA PAZ',
    telefono: '69076217',
    whatsappNumero: '59169076217',
    direccionCompleta:
      'No. Punto de Venta 0 · FRENTE CASA COMUNAL MERCED · CARANAVI Nro.: 470 Edif.: SIN NOMBRE · Piso.: PLANTA BAJA Depto.: CASA · Zona/Barrio.: VILLA FATIMA · LA PAZ'
  };

  const BLACKLIST = [
    // Pruebas y spam (ES / EN)
    'prueba123', 'spam', 'test_hack', 'admin_falso', 'scam', 'fake', 'trash',
    // Español
    'puta', 'puto', 'puteria', 'putear', 'mierda', 'cabron', 'cabrón',
    'imbecil', 'imbécil', 'idiota', 'estupido', 'estúpido', 'pendejo',
    'pendeja', 'malparido', 'malparida', 'culero', 'culera', 'zorra',
    'verga', 'chingar', 'chingada', 'baboso', 'babosa', 'tarado', 'tarada',
    'bastardo', 'bastarda', 'desgraciado', 'desgraciada', 'maricon', 'maricón',
    // Inglés
    'fuck', 'fucker', 'fucking', 'shit', 'shitty', 'bitch', 'bitches',
    'asshole', 'bastard', 'dick', 'dicks', 'pussy', 'whore', 'slut',
    'idiot', 'stupid', 'dumb', 'moron', 'crap', 'bullshit', 'motherfucker'
  ];

  const REFERENCIAS_POR_CATEGORIA = {
    barras: {
      url_referencia: 'https://www.acersahierros.com/productos/hierro-corrugado/',
      imagen_url: './hierro-corrugado.jpg'
    },
    perfiles: {
      url_referencia: 'https://www.jaderiversteel.com/es/ipn400-product/',
      imagen_url: './Viga Perfil IPN 100mm.jpg'
    },
    tubos: {
      url_referencia: 'https://www.hu-steel.com/es/news364_1181.html',
      imagen_url: './Tubo Cuadrado.png'
    },
    planchas: {
      url_referencia: 'http://treamperu.com/index.php/productos/calamina-galvanizada/',
      imagen_url: './Calamina Trapezoidal 0.40mm.jpg'
    }
  };

  function crearSvgRespaldo(etiqueta) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 140">
        <rect width="320" height="140" fill="#1e293b"/>
        <text x="160" y="75" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="14" font-weight="700">${etiqueta}</text>
      </svg>
    `.trim();
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function obtenerImagenCategoria(slug) {
    const cat = state.categorias.find((c) => c.slug === slug);
    if (cat && cat.imagen_url) return encodeURI(cat.imagen_url);
    const cfg = REFERENCIAS_POR_CATEGORIA[slug] || REFERENCIAS_POR_CATEGORIA.planchas;
    return encodeURI(cfg.imagen_url);
  }

  function obtenerImagenProducto(prod) {
    if (prod && prod.imagen_url) return encodeURI(prod.imagen_url);
    return obtenerImagenCategoria(prod ? prod.categoria_slug : 'planchas');
  }

  const CATALOGO_BASE = {
    categorias: [
      { id_categoria: 1, nombre: 'Barras y Fierros', slug: 'barras', tono: 'red', ...REFERENCIAS_POR_CATEGORIA.barras },
      { id_categoria: 2, nombre: 'Vigas y Perfiles', slug: 'perfiles', tono: 'red', ...REFERENCIAS_POR_CATEGORIA.perfiles },
      { id_categoria: 3, nombre: 'Tubos Estructurales', slug: 'tubos', tono: 'gold', ...REFERENCIAS_POR_CATEGORIA.tubos },
      { id_categoria: 4, nombre: 'Planchas y Calaminas', slug: 'planchas', tono: 'red', ...REFERENCIAS_POR_CATEGORIA.planchas }
    ],
    productos: [
      {
        id_producto: 1,
        codigo: 'AIS-BAR-12',
        nombre: 'Fierro Corrugado 12mm (1/2")',
        especificacion: 'Grado 60 · Barra 12m · ASTM A615',
        unidad: 'Barra 12m',
        categoria: 'Barras y Fierros',
        categoria_slug: 'barras',
        precio_usd: 17.5,
        stock: 320,
        bloqueado: 0,
        ...REFERENCIAS_POR_CATEGORIA.barras
      },
      {
        id_producto: 2,
        codigo: 'AIS-BAR-16',
        nombre: 'Fierro Corrugado 16mm (5/8")',
        especificacion: 'Grado 60 · Barra 12m · Alta resistencia',
        unidad: 'Barra 12m',
        categoria: 'Barras y Fierros',
        categoria_slug: 'barras',
        precio_usd: 30.5,
        stock: 180,
        bloqueado: 0,
        ...REFERENCIAS_POR_CATEGORIA.barras
      },
      {
        id_producto: 3,
        codigo: 'AIS-PER-IPN100',
        nombre: 'Viga Perfil IPN 100mm',
        especificacion: 'Acero estructural A36 · Largo 6m',
        unidad: 'Barra 6m',
        categoria: 'Vigas y Perfiles',
        categoria_slug: 'perfiles',
        precio_usd: 48.0,
        stock: 95,
        bloqueado: 0,
        ...REFERENCIAS_POR_CATEGORIA.perfiles
      },
      {
        id_producto: 4,
        codigo: 'AIS-ANG-50',
        nombre: 'Angular Estructural 50x50x5mm',
        especificacion: 'Laminado en caliente · Barra 6m',
        unidad: 'Barra 6m',
        categoria: 'Vigas y Perfiles',
        categoria_slug: 'perfiles',
        precio_usd: 18.0,
        stock: 140,
        bloqueado: 0,
        ...REFERENCIAS_POR_CATEGORIA.perfiles
      },
      {
        id_producto: 5,
        codigo: 'AIS-TUB-40C',
        nombre: 'Tubo Cuadrado 40x40x2mm',
        especificacion: 'Acero LAC · Largo 6m',
        unidad: 'Tubo 6m',
        categoria: 'Tubos Estructurales',
        categoria_slug: 'tubos',
        precio_usd: 22.5,
        stock: 210,
        bloqueado: 0,
        ...REFERENCIAS_POR_CATEGORIA.tubos
      },
      {
        id_producto: 6,
        codigo: 'AIS-TUB-60R',
        nombre: 'Tubo Rectangular 60x40x2mm',
        especificacion: 'Cerramientos y estructuras · Largo 6m',
        unidad: 'Tubo 6m',
        categoria: 'Tubos Estructurales',
        categoria_slug: 'tubos',
        precio_usd: 27.0,
        stock: 0,
        bloqueado: 0,
        ...REFERENCIAS_POR_CATEGORIA.tubos
      },
      {
        id_producto: 7,
        codigo: 'AIS-PLA-2MM',
        nombre: 'Plancha Negra Laminada 2.0mm',
        especificacion: 'Formato 1.20m x 2.40m · Acero A36',
        unidad: 'Plancha',
        categoria: 'Planchas y Calaminas',
        categoria_slug: 'planchas',
        precio_usd: 68.0,
        stock: 64,
        bloqueado: 0,
        ...REFERENCIAS_POR_CATEGORIA.planchas
      },
      {
        id_producto: 8,
        codigo: 'AIS-CAL-040',
        nombre: 'Calamina Trapezoidal 0.40mm',
        especificacion: 'Acero prepintado · Largo 3.00m',
        unidad: 'Hoja 3m',
        categoria: 'Planchas y Calaminas',
        categoria_slug: 'planchas',
        precio_usd: 14.5,
        stock: 400,
        bloqueado: 0,
        ...REFERENCIAS_POR_CATEGORIA.planchas
      }
    ]
  };

  const state = {
    vistaActiva: 'inicio',
    categorias: [],
    productos: [],
    categoriaActiva: 'todas',
    disponibilidadActiva: 'todos',
    busqueda: '',
    carrito: [],
    historial: [],
    productoDetalleId: null,
    deferredPrompt: null,
    timerId: null,
    segundosRestantes: 8,
    datosPedidoPendientes: null,
    splashTimeoutId: null,
    sucursal: { ...SUCURSAL_INFO },
    adminAutenticado: false
  };

  const els = {
    splashScreen: document.getElementById('splashScreen'),
    welcomeScreen: document.getElementById('welcomeScreen'),
    appContainer: document.getElementById('appContainer'),
    btnExplorarCatalogo: document.getElementById('btnExplorarCatalogo'),
    btnSaltarBienvenida: document.getElementById('btnSaltarBienvenida'),
    btnVolverInicio: document.getElementById('btnVolverInicio'),
    headerTituloVista: document.getElementById('headerTituloVista'),
    btnInstalarPWA: document.getElementById('btnInstalarPWA'),
    btnIrCotizacionTop: document.getElementById('btnIrCotizacionTop'),
    contadorCarrito: document.getElementById('contadorCarrito'),
    btnTema: document.getElementById('btnTema'),
    btnAbrirMenu: document.getElementById('btnAbrirMenu'),
    btnCerrarMenu: document.getElementById('btnCerrarMenu'),
    drawerBackdrop: document.getElementById('drawerBackdrop'),
    drawerMenu: document.getElementById('drawerMenu'),
    drawerCategorias: document.getElementById('drawerCategorias'),
    btnVerBienvenida: document.getElementById('btnVerBienvenida'),
    btnReproducirSplash: document.getElementById('btnReproducirSplash'),
    vistaInicio: document.getElementById('vistaInicio'),
    vistaCatalogo: document.getElementById('vistaCatalogo'),
    vistaCotizacion: document.getElementById('vistaCotizacion'),
    vistaContacto: document.getElementById('vistaContacto'),
    btnBannerExplorar: document.getElementById('btnBannerExplorar'),
    btnBannerCotizar: document.getElementById('btnBannerCotizar'),
    gridCategoriasInicio: document.getElementById('gridCategoriasInicio'),
    filtrosCategoria: document.getElementById('filtrosCategoria'),
    subfiltrosDisponibilidad: document.getElementById('subfiltrosDisponibilidad'),
    inputBuscar: document.getElementById('inputBuscar'),
    contadorProductos: document.getElementById('contadorProductos'),
    estadoCatalogo: document.getElementById('estadoCatalogo'),
    gridProductos: document.getElementById('gridProductos'),
    listaCotizacion: document.getElementById('listaCotizacion'),
    totalCotizacion: document.getElementById('totalCotizacion'),
    listaHistorial: document.getElementById('listaHistorial'),
    formPedido: document.getElementById('formPedido'),
    clienteNombre: document.getElementById('clienteNombre'),
    clienteContacto: document.getElementById('clienteContacto'),
    errorNombre: document.getElementById('errorNombre'),
    errorContacto: document.getElementById('errorContacto'),
    btnConfirmarCuentaRegresiva: document.getElementById('btnConfirmarCuentaRegresiva'),
    btnCancelarCuentaRegresiva: document.getElementById('btnCancelarCuentaRegresiva'),
    estadoPedido: document.getElementById('estadoPedido'),
    formContacto: document.getElementById('formContacto'),
    contactoNombre: document.getElementById('contactoNombre'),
    contactoCorreo: document.getElementById('contactoCorreo'),
    contactoMensaje: document.getElementById('contactoMensaje'),
    errorContactoNombre: document.getElementById('errorContactoNombre'),
    errorContactoCorreo: document.getElementById('errorContactoCorreo'),
    errorContactoMensaje: document.getElementById('errorContactoMensaje'),
    estadoContacto: document.getElementById('estadoContacto'),
    btnSmokeTest: document.getElementById('btnSmokeTest'),
    btnAuditarA11Y: document.getElementById('btnAuditarA11Y'),
    resultadoAuditoria: document.getElementById('resultadoAuditoria'),
    modalDetalle: document.getElementById('modalDetalle'),
    modalImagen: document.getElementById('modalImagen'),
    modalCodigoCat: document.getElementById('modalCodigoCat'),
    modalTitulo: document.getElementById('modalTitulo'),
    modalEspecificacion: document.getElementById('modalEspecificacion'),
    modalPrecioStock: document.getElementById('modalPrecioStock'),
    btnModalAgregar: document.getElementById('btnModalAgregar'),
    btnCerrarModal: document.getElementById('btnCerrarModal')
  };

  function configurarBotonBienvenidaAdmin() {
    if (els.btnSaltarBienvenida) {
      els.btnSaltarBienvenida.textContent = 'Ingresar como administrador';
    }
  }

  function persistirCatalogoAdmin() {
    try {
      localStorage.setItem(STORAGE_KEYS.CATALOGO_ADMIN, JSON.stringify(state.productos));
    } catch (_) {}
  }

  function persistirSucursalAdmin() {
    try {
      localStorage.setItem(STORAGE_KEYS.SUCURSAL_ADMIN, JSON.stringify(state.sucursal));
    } catch (_) {}
  }

  function construirSeccionAdmin() {
    const main = document.querySelector('.main-content');
    if (!main || document.getElementById('vistaAdmin')) return;

    const seccion = document.createElement('section');
    seccion.id = 'vistaAdmin';
    seccion.className = 'view-section';
    seccion.setAttribute('aria-label', 'Panel de Administración');
    seccion.innerHTML = `
      <div class="hero-banner">
        <span class="banner-tag">ACCESO RESTRINGIDO · SOLO ADMIN</span>
        <h2 class="hero-title">Administración <span>Aceros Import Silver</span></h2>
        <p class="hero-copy">Privilegios exclusivos de administración: crear materiales, editar precios en USD y stock, bloquear productos, revisar pedidos y actualizar WhatsApp o dirección.</p>
      </div>

      <div id="adminLoginCard" class="form-card">
        <h3>Ingresar como administrador</h3>
        <p class="product-spec">Escribe la contraseña de administrador para desbloquear las herramientas exclusivas.</p>
        <div class="field-group">
          <label for="adminPassInput">Contraseña de administrador</label>
          <input type="password" id="adminPassInput" class="input-field" placeholder="Escribe la contraseña">
          <span id="adminLoginError" class="field-error" role="alert"></span>
        </div>
        <div class="action-row">
          <button type="button" id="btnIngresarAdmin" class="btn btn-cta">Ingresar como administrador</button>
          <button type="button" id="btnVolverClienteDesdeAdmin" class="btn btn-secondary">Volver a vista cliente</button>
        </div>
      </div>

      <div id="adminPanelContent" hidden>
        <div class="form-card">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <h3>Privilegios de Administrador Activos</h3>
            <button type="button" id="btnCerrarSesionAdmin" class="btn btn-secondary btn-sm">Cerrar sesión admin</button>
          </div>
          <p id="adminEstadoMsg" class="status-text" role="status">Sesión de administrador verificada. Los clientes no tienen acceso a estas herramientas.</p>
        </div>

        <div class="form-card" style="margin-top:1rem;">
          <h3>Agregar nuevo material al catálogo</h3>
          <div class="field-group">
            <label for="nuevoProdCodigo">Código</label>
            <input type="text" id="nuevoProdCodigo" class="input-field" placeholder="Ej. AIS-PER-120">
          </div>
          <div class="field-group">
            <label for="nuevoProdNombre">Nombre del material</label>
            <input type="text" id="nuevoProdNombre" class="input-field" placeholder="Ej. Perfil C Galvanizado 100mm">
          </div>
          <div class="field-group">
            <label for="nuevoProdSpec">Especificación y unidad</label>
            <input type="text" id="nuevoProdSpec" class="input-field" placeholder="Ej. Acero galvanizado · Barra 6m">
          </div>
          <div class="field-group">
            <label for="nuevoProdCat">Categoría</label>
            <select id="nuevoProdCat" class="input-field">
              <option value="barras">Barras y Fierros</option>
              <option value="perfiles">Vigas y Perfiles</option>
              <option value="tubos">Tubos Estructurales</option>
              <option value="planchas">Planchas y Calaminas</option>
            </select>
          </div>
          <div class="field-group">
            <label for="nuevoProdPrecio">Precio unitario (USD)</label>
            <input type="number" id="nuevoProdPrecio" class="input-field" step="0.01" min="0.1" placeholder="Ej. 25.00">
          </div>
          <div class="field-group">
            <label for="nuevoProdStock">Stock disponible</label>
            <input type="number" id="nuevoProdStock" class="input-field" min="0" step="1" placeholder="Ej. 50">
          </div>
          <div class="action-row">
            <button type="button" id="btnCrearProductoAdmin" class="btn btn-confirm">Guardar material</button>
            <button type="button" id="btnRestaurarCatalogoAdmin" class="btn btn-secondary">Restaurar catálogo base</button>
          </div>
        </div>

        <div class="history-card" style="margin-top:1rem;">
          <h3>Control de precios (USD), stock y bloqueo de productos</h3>
          <div id="adminListaProductos" class="quote-items"></div>
        </div>

        <div class="history-card" style="margin-top:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <h3>Historial de pedidos registrados (Admin)</h3>
            <button type="button" id="btnLimpiarHistorialAdmin" class="btn btn-outline-red btn-sm">Limpiar historial</button>
          </div>
          <div id="adminListaHistorial" class="quote-items"></div>
        </div>

        <div class="form-card" style="margin-top:1rem;">
          <h3>WhatsApp y Dirección Oficial de la Empresa</h3>
          <div class="field-group">
            <label for="adminWhatsappInput">WhatsApp empresa (con código de país, ej. 59169076217)</label>
            <input type="text" id="adminWhatsappInput" class="input-field">
          </div>
          <div class="field-group">
            <label for="adminTelefonoInput">Teléfono visible</label>
            <input type="text" id="adminTelefonoInput" class="input-field">
          </div>
          <div class="field-group">
            <label for="adminDireccionInput">Dirección completa</label>
            <input type="text" id="adminDireccionInput" class="input-field">
          </div>
          <div class="action-row">
            <button type="button" id="btnGuardarSucursalAdmin" class="btn btn-cta">Guardar contacto y dirección</button>
          </div>
        </div>
      </div>
    `;
    main.appendChild(seccion);
  }

  function renderAdminPanel() {
    const loginCard = document.getElementById('adminLoginCard');
    const panelContent = document.getElementById('adminPanelContent');
    if (!loginCard || !panelContent) return;

    if (state.adminAutenticado) {
      loginCard.hidden = true;
      loginCard.style.display = 'none';
      panelContent.hidden = false;
      panelContent.style.display = 'flex';
      panelContent.style.flexDirection = 'column';
      panelContent.style.gap = '1rem';
    } else {
      loginCard.hidden = false;
      loginCard.style.display = 'block';
      panelContent.hidden = true;
      panelContent.style.display = 'none';
      return;
    }

    const wpInput = document.getElementById('adminWhatsappInput');
    const telInput = document.getElementById('adminTelefonoInput');
    const dirInput = document.getElementById('adminDireccionInput');
    if (wpInput) wpInput.value = state.sucursal.whatsappNumero;
    if (telInput) telInput.value = state.sucursal.telefono;
    if (dirInput) dirInput.value = state.sucursal.direccionCompleta;

    const listaAdmin = document.getElementById('adminListaProductos');
    if (listaAdmin) {
      listaAdmin.innerHTML = state.productos
        .map((prod) => {
          const precio = obtenerPrecioUsd(prod);
          const bloqueado = Number(prod.bloqueado) === 1;
          return `
            <div class="quote-item" data-admin-id="${prod.id_producto}">
              <div style="flex:1 1 200px;">
                <strong>${prod.nombre}</strong>
                <div class="product-spec">${prod.codigo} · ${bloqueado ? 'BLOQUEADO (oculto para clientes)' : 'Habilitado'}</div>
              </div>
              <div class="hero-buttons">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  class="input-field admin-precio-input"
                  style="width:92px; padding:0.35rem 0.5rem;"
                  value="${Number(precio).toFixed(2)}"
                  aria-label="Precio USD de ${prod.nombre}"
                >
                <input
                  type="number"
                  step="1"
                  min="0"
                  class="input-field admin-stock-input"
                  style="width:76px; padding:0.35rem 0.5rem;"
                  value="${Number(prod.stock)}"
                  aria-label="Stock de ${prod.nombre}"
                >
                <button type="button" class="btn btn-secondary btn-sm btn-admin-guardar" data-id="${prod.id_producto}">Guardar</button>
                <button type="button" class="btn btn-outline-red btn-sm btn-admin-toggle" data-id="${prod.id_producto}">
                  ${bloqueado ? 'Habilitar' : 'Bloquear'}
                </button>
              </div>
            </div>
          `;
        })
        .join('');
    }

    const listaHistAdmin = document.getElementById('adminListaHistorial');
    if (listaHistAdmin) {
      if (!state.historial.length) {
        listaHistAdmin.innerHTML = '<p class="empty-msg">No hay pedidos registrados en el historial.</p>';
      } else {
        listaHistAdmin.innerHTML = state.historial
          .map(
            (ped) => `
              <div class="quote-item">
                <div>
                  <strong>#${ped.folio} — ${ped.cliente_nombre}</strong>
                  <div class="product-spec">Tel: ${ped.cliente_contacto} · ${ped.estado}</div>
                </div>
                <strong>${formatoUsd(ped.total_usd)}</strong>
              </div>
            `
          )
          .join('');
      }
    }
  }

  function inyectarAccesosAdmin() {
    const nav = document.querySelector('.bottom-nav');
    if (nav && !nav.querySelector('[data-vista="admin"]')) {
      const btnNav = document.createElement('button');
      btnNav.type = 'button';
      btnNav.className = 'bottom-nav-btn';
      btnNav.setAttribute('data-vista', 'admin');
      btnNav.innerHTML = '<span aria-hidden="true">🔐</span><span>Admin</span>';
      nav.appendChild(btnNav);
    }

    const drawerList = els.drawerMenu?.querySelector('.drawer-list');
    if (drawerList && !drawerList.querySelector('[data-vista="admin"]')) {
      const btnDrawer = document.createElement('button');
      btnDrawer.type = 'button';
      btnDrawer.className = 'drawer-item';
      btnDrawer.setAttribute('data-vista', 'admin');
      btnDrawer.textContent = '🔐 Panel Administrador ›';
      drawerList.appendChild(btnDrawer);
    }
  }

  function inyectarDatosSucursalEnDOM() {
    const infoTexto = `${state.sucursal.direccionCompleta} · Teléfono: ${state.sucursal.telefono}`;

    if (els.vistaContacto) {
      let bloqueSucursal = document.getElementById('infoSucursalOficial');
      if (!bloqueSucursal) {
        bloqueSucursal = document.createElement('section');
        bloqueSucursal.id = 'infoSucursalOficial';
        bloqueSucursal.className = 'audit-card';
        bloqueSucursal.innerHTML = `
          <h3>Punto de Venta y Contacto Oficial</h3>
          <p class="status-text" id="textoDireccionSucursal"></p>
          <p class="status-text" id="textoTelefonoSucursal"></p>
        `;
        els.vistaContacto.prepend(bloqueSucursal);
      }
      const dirEl = document.getElementById('textoDireccionSucursal');
      const telEl = document.getElementById('textoTelefonoSucursal');
      if (dirEl) dirEl.textContent = `Dirección: ${state.sucursal.direccionCompleta}`;
      if (telEl) telEl.textContent = `Teléfono / WhatsApp: ${state.sucursal.telefono}`;
    }

    const footerEl = document.querySelector('.site-footer');
    if (footerEl) {
      let linea = footerEl.querySelector('[data-sucursal-linea="1"]');
      if (!linea) {
        linea = document.createElement('div');
        linea.setAttribute('data-sucursal-linea', '1');
        linea.style.marginTop = '0.35rem';
        footerEl.appendChild(linea);
      }
      linea.textContent = infoTexto;
    }
  }

  function normalizarTextoBlacklist(texto) {
    return String(texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/0/g, 'o')
      .replace(/1/g, 'i')
      .replace(/3/g, 'e')
      .replace(/4/g, 'a')
      .replace(/5/g, 's')
      .replace(/@/g, 'a')
      .replace(/\$/g, 's');
  }

  function contieneBlacklist(texto) {
    const limpio = normalizarTextoBlacklist(texto);
    if (!limpio.trim()) return false;

    return BLACKLIST.some((termino) => {
      const clave = normalizarTextoBlacklist(termino).trim();
      if (!clave) return false;
      if (clave.includes('_') || /\d/.test(clave)) {
        return limpio.includes(clave);
      }
      const escapada = clave.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-z0-9])${escapada}([^a-z0-9]|$)`, 'i');
      return regex.test(limpio);
    });
  }

  function esSoloLetrasValido(texto, minLen = 2, maxLen = 100) {
    const limpio = String(texto || '').trim();
    if (limpio.length < minLen || limpio.length > maxLen) return false;
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(limpio);
  }

  function esMensajeAlfanumericoValido(texto, minLen = 4, maxLen = 500) {
    const limpio = String(texto || '').trim();
    if (limpio.length < minLen || limpio.length > maxLen) return false;
    return /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,!?-]+$/.test(limpio);
  }

  function esTelefonoValido(texto, minLen = 5, maxLen = 80) {
    const limpio = String(texto || '').trim();
    if (limpio.length < minLen || limpio.length > maxLen) return false;
    const tieneNumero = /[0-9]/.test(limpio);
    const formatoValido = /^[0-9+\-()\s]+$/.test(limpio);
    return tieneNumero && formatoValido;
  }

  function notificarCampoSoloLetras(campo, errorEl) {
    if (!campo || !errorEl) return;
    const valor = campo.value;
    const sinNumeros = valor.replace(/[0-9]/g, '');

    if (valor !== sinNumeros) {
      campo.value = sinNumeros;
      errorEl.textContent = 'No se admiten números aquí: ingresa letras para este campo.';
      return;
    }

    if (contieneBlacklist(valor)) {
      errorEl.textContent = 'Palabra bloqueada por la blacklist (ES/EN).';
      return;
    }

    if (valor.trim().length > 0 && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor)) {
      errorEl.textContent = 'No se ingresó una letra válida: usa solo letras y espacios.';
      return;
    }

    if (valor.trim().length === 0) {
      errorEl.textContent = 'Aún no has ingresado letras en este campo.';
      return;
    }

    errorEl.textContent = '';
  }

  function notificarCampoTelefono(campo, errorEl) {
    if (!campo || !errorEl) return;
    const valor = campo.value;
    const limpio = valor.trim();

    if (contieneBlacklist(valor)) {
      errorEl.textContent = 'Ese contacto está bloqueado por la blacklist (ES/EN).';
      return;
    }

    if (limpio.length === 0) {
      errorEl.textContent = 'No has ingresado ningún número en este campo.';
      return;
    }

    if (!/[0-9]/.test(limpio)) {
      errorEl.textContent = 'No se ha ingresado un número: escribe dígitos numéricos para el teléfono o contacto.';
      return;
    }

    if (!/^[0-9+\-()\s]+$/.test(limpio)) {
      errorEl.textContent = 'No se admiten letras aquí: usa solo números y símbolos de teléfono (+, -, paréntesis).';
      return;
    }

    errorEl.textContent = '';
  }

  function formatoUsd(valor) {
    return `$ ${Number(valor || 0).toFixed(2)}`;
  }

  function aplicarTema(tema) {
    const esOscuro = tema !== 'light';
    document.documentElement.setAttribute('data-theme', esOscuro ? 'dark' : 'light');
    if (els.btnTema) {
      els.btnTema.setAttribute('aria-pressed', String(esOscuro));
    }
    try {
      localStorage.setItem(STORAGE_KEYS.TEMA, esOscuro ? 'dark' : 'light');
    } catch (_) {}
  }

  function persistirCarrito() {
    try {
      localStorage.setItem(STORAGE_KEYS.CARRITO, JSON.stringify(state.carrito));
    } catch (_) {}
  }

  function persistirHistorial() {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORIAL, JSON.stringify(state.historial));
    } catch (_) {}
  }

  function hidratarEstado() {
    let tema = 'dark';
    try {
      tema = localStorage.getItem(STORAGE_KEYS.TEMA) || 'dark';
      const rawSucursal = localStorage.getItem(STORAGE_KEYS.SUCURSAL_ADMIN);
      if (rawSucursal) {
        const parsedSucursal = JSON.parse(rawSucursal);
        if (parsedSucursal && typeof parsedSucursal === 'object') {
          state.sucursal = { ...SUCURSAL_INFO, ...parsedSucursal };
        }
      }
      const rawCarrito = localStorage.getItem(STORAGE_KEYS.CARRITO);
      if (rawCarrito) {
        const parsed = JSON.parse(rawCarrito);
        if (Array.isArray(parsed)) {
          state.carrito = parsed.filter((item) => !contieneBlacklist(item.codigo));
        }
      }
      const rawHistorial = localStorage.getItem(STORAGE_KEYS.HISTORIAL);
      if (rawHistorial) {
        const parsedHist = JSON.parse(rawHistorial);
        if (Array.isArray(parsedHist)) {
          state.historial = parsedHist;
        }
      }
    } catch (_) {
      state.carrito = [];
      state.historial = [];
    }
    aplicarTema(tema);
    construirSeccionAdmin();
    inyectarAccesosAdmin();
    configurarBotonBienvenidaAdmin();
    inyectarDatosSucursalEnDOM();
    hidratarCotizacionDOM();
    hidratarHistorialDOM();
    renderAdminPanel();
  }

  function ocultarSplashInmediato() {
    if (state.splashTimeoutId !== null) {
      clearTimeout(state.splashTimeoutId);
      state.splashTimeoutId = null;
    }
    if (!els.splashScreen) return;
    els.splashScreen.classList.add('is-hidden');
    els.splashScreen.setAttribute('aria-hidden', 'true');
    els.splashScreen.hidden = true;
  }

  function mostrarSplash(duracionMs = 750, alTerminar = null) {
    if (!els.splashScreen) {
      if (typeof alTerminar === 'function') alTerminar();
      return;
    }
    if (state.splashTimeoutId !== null) {
      clearTimeout(state.splashTimeoutId);
      state.splashTimeoutId = null;
    }

    els.splashScreen.hidden = false;
    els.splashScreen.classList.remove('is-hidden');
    els.splashScreen.setAttribute('aria-hidden', 'false');

    state.splashTimeoutId = setTimeout(() => {
      els.splashScreen.classList.add('is-hidden');
      els.splashScreen.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        if (els.splashScreen.classList.contains('is-hidden')) {
          els.splashScreen.hidden = true;
        }
        if (typeof alTerminar === 'function') alTerminar();
      }, 280);
    }, duracionMs);
  }

  function mostrarBienvenida(visible) {
    if (els.welcomeScreen) {
      els.welcomeScreen.hidden = !visible;
      els.welcomeScreen.classList.toggle('active', visible);
    }
    if (els.appContainer) {
      els.appContainer.hidden = visible;
    }
  }

  function entrarAlCatalogo() {
    ocultarSplashInmediato();
    try {
      localStorage.setItem(STORAGE_KEYS.BIENVENIDA_VISTA, '1');
    } catch (_) {}
    mostrarBienvenida(false);
    cambiarVista('inicio');
  }

  function abrirIngresoAdministrador() {
    ocultarSplashInmediato();
    mostrarBienvenida(false);
    cambiarVista('admin');
    setTimeout(() => {
      const passInput = document.getElementById('adminPassInput');
      if (passInput && !state.adminAutenticado) {
        passInput.value = '';
        passInput.focus();
      }
    }, 60);
  }

  function cambiarVista(vista) {
    state.vistaActiva = vista;
    const vistaAdminEl = document.getElementById('vistaAdmin');

    const mapaVistas = {
      inicio: { el: els.vistaInicio, titulo: 'Aceros Import Silver' },
      catalogo: { el: els.vistaCatalogo, titulo: 'Catálogo de Acero' },
      cotizacion: { el: els.vistaCotizacion, titulo: 'Cotización y Pedido' },
      contacto: { el: els.vistaContacto, titulo: 'Contacto y Auditoría' },
      admin: { el: vistaAdminEl, titulo: 'Panel Administrador' }
    };

    Object.entries(mapaVistas).forEach(([clave, info]) => {
      if (info.el) {
        info.el.classList.toggle('active', clave === vista);
      }
    });

    if (vista === 'admin') {
      renderAdminPanel();
    }

    if (els.headerTituloVista && mapaVistas[vista]) {
      els.headerTituloVista.textContent = mapaVistas[vista].titulo;
    }

    document.querySelectorAll('.bottom-nav-btn[data-vista]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-vista') === vista);
    });

    cerrarDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function abrirDrawer() {
    if (els.drawerBackdrop) els.drawerBackdrop.hidden = false;
    if (els.drawerMenu) els.drawerMenu.hidden = false;
    if (els.btnAbrirMenu) els.btnAbrirMenu.setAttribute('aria-expanded', 'true');
  }

  function cerrarDrawer() {
    if (els.drawerBackdrop) els.drawerBackdrop.hidden = true;
    if (els.drawerMenu) els.drawerMenu.hidden = true;
    if (els.btnAbrirMenu) els.btnAbrirMenu.setAttribute('aria-expanded', 'false');
  }

  function obtenerPrecioUsd(prod) {
    if (!prod) return 0;
    if (typeof prod.precio_usd === 'number' && !Number.isNaN(prod.precio_usd)) {
      return Number(prod.precio_usd);
    }
    const base = CATALOGO_BASE.productos.find(
      (b) => b.codigo === prod.codigo || Number(b.id_producto) === Number(prod.id_producto)
    );
    return base ? Number(base.precio_usd) : 0;
  }

  async function cargarCatalogo() {
    let guardadoAdmin = null;
    try {
      const rawAdmin = localStorage.getItem(STORAGE_KEYS.CATALOGO_ADMIN);
      if (rawAdmin) {
        const parsedAdmin = JSON.parse(rawAdmin);
        if (Array.isArray(parsedAdmin) && parsedAdmin.length > 0) {
          guardadoAdmin = parsedAdmin;
        }
      }
    } catch (_) {}

    if (guardadoAdmin) {
      state.categorias = CATALOGO_BASE.categorias;
      state.productos = guardadoAdmin.map((p) => ({
        ...p,
        precio_usd: obtenerPrecioUsd(p)
      }));
      if (els.estadoCatalogo) {
        els.estadoCatalogo.textContent = 'Catálogo gestionado por administrador (precios en USD).';
      }
    } else {
      try {
        const resp = await fetch('./productos.json', { cache: 'no-store' });
        if (!resp.ok) throw new Error('Sin JSON externo');
        const data = await resp.json();
        state.categorias = Array.isArray(data.categorias) ? data.categorias : CATALOGO_BASE.categorias;
        const listaProd = Array.isArray(data.productos) ? data.productos : CATALOGO_BASE.productos;
        state.productos = listaProd.map((p) => ({
          ...p,
          precio_usd: obtenerPrecioUsd(p)
        }));
        if (els.estadoCatalogo) {
          els.estadoCatalogo.textContent = 'Catálogo sincronizado (precios en USD).';
        }
      } catch (_) {
        state.categorias = CATALOGO_BASE.categorias;
        state.productos = CATALOGO_BASE.productos.map((p) => ({ ...p }));
        if (els.estadoCatalogo) {
          els.estadoCatalogo.textContent = 'Catálogo activo desde memoria interna (precios en USD).';
        }
      }
    }

    renderCategoriasInicio();
    renderDrawerCategorias();
    renderFiltrosCategoria();
    renderProductos();
    if (state.adminAutenticado) renderAdminPanel();
  }

  function renderCategoriasInicio() {
    if (!els.gridCategoriasInicio) return;
    els.gridCategoriasInicio.innerHTML = state.categorias
      .map((cat) => {
        const tono = cat.tono === 'gold' ? 'tone-gold' : 'tone-red';
        const fallback = crearSvgRespaldo(cat.nombre);
        return `
          <button type="button" class="category-card ${tono}" data-categoria-ir="${cat.slug}">
            <div class="category-card-top">
              <span aria-hidden="true">🏗️</span>
              <span aria-hidden="true">🔩</span>
            </div>
            <img
              src="${obtenerImagenCategoria(cat.slug)}"
              data-fallback="${fallback}"
              onerror="if(this.dataset.fallback && this.src!==this.dataset.fallback){this.src=this.dataset.fallback;}"
              alt="Categoría ${cat.nombre} de Aceros Import Silver"
              class="category-card-img"
              loading="lazy"
            >
            <span class="category-pill">${cat.nombre} ›</span>
          </button>
        `;
      })
      .join('');
  }

  function renderDrawerCategorias() {
    if (!els.drawerCategorias) return;
    els.drawerCategorias.innerHTML = state.categorias
      .map(
        (cat) => `
          <button type="button" class="drawer-item" data-categoria-ir="${cat.slug}">
            • ${cat.nombre} ›
          </button>
        `
      )
      .join('');
  }

  function renderFiltrosCategoria() {
    if (!els.filtrosCategoria) return;
    const items = [
      `<button type="button" class="chip ${state.categoriaActiva === 'todas' ? 'active' : ''}" data-categoria="todas">Todas</button>`
    ];
    for (const cat of state.categorias) {
      const activa = state.categoriaActiva === cat.slug ? 'active' : '';
      items.push(
        `<button type="button" class="chip ${activa}" data-categoria="${cat.slug}">${cat.nombre}</button>`
      );
    }
    els.filtrosCategoria.innerHTML = items.join('');
  }

  function renderProductos() {
    if (!els.gridProductos) return;
    const texto = state.busqueda.trim().toLowerCase();

    const filtrados = state.productos.filter((prod) => {
      const bloqueado = Number(prod.bloqueado) === 1 || contieneBlacklist(prod.codigo);
      if (bloqueado && !state.adminAutenticado) return false;

      const coincideCat =
        state.categoriaActiva === 'todas' || prod.categoria_slug === state.categoriaActiva;
      const coincideTexto =
        !texto ||
        String(prod.nombre).toLowerCase().includes(texto) ||
        String(prod.codigo).toLowerCase().includes(texto) ||
        String(prod.especificacion).toLowerCase().includes(texto);
      const coincideDisp =
        state.disponibilidadActiva === 'todos' ||
        (state.disponibilidadActiva === 'stock' && Number(prod.stock) > 0) ||
        (state.disponibilidadActiva === 'agotado' && Number(prod.stock) <= 0);

      return coincideCat && coincideTexto && coincideDisp;
    });

    if (els.contadorProductos) {
      els.contadorProductos.textContent = `${filtrados.length} productos`;
    }

    if (filtrados.length === 0) {
      els.gridProductos.innerHTML = '<p class="empty-msg">No se encontraron materiales con esos filtros.</p>';
      return;
    }

    els.gridProductos.innerHTML = filtrados
      .map((prod) => {
        const bloqueado = Number(prod.bloqueado) === 1 || contieneBlacklist(prod.codigo);
        const sinStock = Number(prod.stock) <= 0;
        const deshabilitado = bloqueado || sinStock;
        const fallback = crearSvgRespaldo(prod.codigo);
        const precio = obtenerPrecioUsd(prod);

        return `
          <article class="product-card" data-id="${prod.id_producto}" data-codigo="${prod.codigo}">
            <img
              src="${obtenerImagenProducto(prod)}"
              data-fallback="${fallback}"
              onerror="if(this.dataset.fallback && this.src!==this.dataset.fallback){this.src=this.dataset.fallback;}"
              alt="${prod.nombre} - ${prod.especificacion}"
              class="product-img"
              loading="lazy"
            >
            <div class="product-meta">
              <span>${prod.codigo}</span>
              <span>${bloqueado ? 'Bloqueado' : sinStock ? 'Agotado' : `Stock: ${prod.stock}`}</span>
            </div>
            <h3 class="product-title">${prod.nombre}</h3>
            <p class="product-spec">${prod.especificacion}</p>
            <div class="product-bottom">
              <span class="product-price">${formatoUsd(precio)}</span>
              <div class="hero-buttons">
                <button type="button" class="btn btn-secondary btn-sm btn-detalle" data-id="${prod.id_producto}">
                  Ver
                </button>
                <button
                  type="button"
                  class="btn-plus btn-agregar"
                  data-id="${prod.id_producto}"
                  aria-label="Agregar ${prod.nombre} a la cotización"
                  ${deshabilitado ? 'disabled' : ''}
                >+</button>
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  function abrirModalDetalle(idProducto) {
    const prod = state.productos.find((p) => Number(p.id_producto) === Number(idProducto));
    if (!prod || !els.modalDetalle) return;

    state.productoDetalleId = prod.id_producto;
    const precio = obtenerPrecioUsd(prod);

    if (els.modalImagen) {
      const fallback = crearSvgRespaldo(prod.codigo);
      els.modalImagen.dataset.fallback = fallback;
      els.modalImagen.onerror = () => {
        if (els.modalImagen.dataset.fallback && els.modalImagen.src !== els.modalImagen.dataset.fallback) {
          els.modalImagen.src = els.modalImagen.dataset.fallback;
        }
      };
      els.modalImagen.src = obtenerImagenProducto(prod);
      els.modalImagen.alt = `${prod.nombre} - ${prod.especificacion}`;
    }
    if (els.modalCodigoCat) {
      els.modalCodigoCat.textContent = `Código: ${prod.codigo} · ${prod.categoria}`;
    }
    if (els.modalTitulo) els.modalTitulo.textContent = prod.nombre;
    if (els.modalEspecificacion) {
      els.modalEspecificacion.textContent = `${prod.especificacion} (${prod.unidad})`;
    }
    if (els.modalPrecioStock) {
      els.modalPrecioStock.textContent = `${formatoUsd(precio)} · Stock: ${prod.stock}`;
    }

    const bloqueado = Number(prod.bloqueado) === 1 || contieneBlacklist(prod.codigo);
    if (els.btnModalAgregar) {
      els.btnModalAgregar.disabled = bloqueado || Number(prod.stock) <= 0;
    }

    if (typeof els.modalDetalle.showModal === 'function') {
      els.modalDetalle.showModal();
    }
  }

  function agregarProducto(idProducto) {
    const prod = state.productos.find((p) => Number(p.id_producto) === Number(idProducto));
    if (!prod) return;
    if (Number(prod.bloqueado) === 1 || contieneBlacklist(prod.codigo)) {
      if (els.estadoPedido) els.estadoPedido.textContent = `Producto ${prod.codigo} bloqueado por administración.`;
      return;
    }
    if (Number(prod.stock) <= 0) return;

    const precio = obtenerPrecioUsd(prod);
    const existente = state.carrito.find((item) => Number(item.id_producto) === Number(prod.id_producto));
    if (existente) {
      if (existente.cantidad < Number(prod.stock)) existente.cantidad += 1;
      existente.precio_usd = precio;
    } else {
      state.carrito.push({
        id_producto: prod.id_producto,
        codigo: prod.codigo,
        nombre: prod.nombre,
        precio_usd: precio,
        cantidad: 1
      });
    }
    persistirCarrito();
    hidratarCotizacionDOM();
  }

  function cambiarCantidad(idProducto, delta) {
    const idx = state.carrito.findIndex((item) => Number(item.id_producto) === Number(idProducto));
    if (idx === -1) return;
    const nuevaCant = state.carrito[idx].cantidad + delta;
    if (nuevaCant <= 0) {
      state.carrito.splice(idx, 1);
    } else {
      const prodRef = state.productos.find((p) => Number(p.id_producto) === Number(idProducto));
      const maxStock = prodRef ? Number(prodRef.stock) : nuevaCant;
      state.carrito[idx].cantidad = Math.min(nuevaCant, maxStock);
    }
    persistirCarrito();
    hidratarCotizacionDOM();
  }

  function calcularTotal() {
    return state.carrito.reduce((acc, item) => {
      const precio = typeof item.precio_usd === 'number' ? item.precio_usd : obtenerPrecioUsd(item);
      return acc + Number(precio) * Number(item.cantidad);
    }, 0);
  }

  function hidratarCotizacionDOM() {
    const totalUnidades = state.carrito.reduce((acc, item) => acc + Number(item.cantidad), 0);
    if (els.contadorCarrito) els.contadorCarrito.textContent = String(totalUnidades);
    if (!els.listaCotizacion || !els.totalCotizacion) return;

    if (state.carrito.length === 0) {
      els.listaCotizacion.innerHTML = '<p class="empty-msg">Aún no agregaste materiales a tu cotización.</p>';
      els.totalCotizacion.textContent = formatoUsd(0);
      return;
    }

    els.listaCotizacion.innerHTML = state.carrito
      .map((item) => {
        const precio = typeof item.precio_usd === 'number' ? item.precio_usd : obtenerPrecioUsd(item);
        const subtotal = Number(precio) * Number(item.cantidad);
        return `
          <div class="quote-item" data-id="${item.id_producto}">
            <div>
              <strong>${item.nombre}</strong>
              <div class="product-spec">${item.codigo} · ${formatoUsd(precio)} c/u</div>
            </div>
            <div class="hero-buttons">
              <button type="button" class="btn btn-secondary btn-sm btn-qty" data-id="${item.id_producto}" data-delta="-1" aria-label="Restar unidad">-</button>
              <span><strong>${item.cantidad}</strong></span>
              <button type="button" class="btn btn-secondary btn-sm btn-qty" data-id="${item.id_producto}" data-delta="1" aria-label="Sumar unidad">+</button>
              <strong>${formatoUsd(subtotal)}</strong>
            </div>
          </div>
        `;
      })
      .join('');

    els.totalCotizacion.textContent = formatoUsd(calcularTotal());
  }

  function hidratarHistorialDOM() {
    if (!els.listaHistorial) return;
    if (!state.historial.length) {
      els.listaHistorial.innerHTML = '<p class="empty-msg">Sin pedidos confirmados aún.</p>';
      return;
    }
    els.listaHistorial.innerHTML = state.historial
      .map(
        (ped) => `
          <div class="quote-item">
            <div>
              <strong>#${ped.folio} — ${ped.cliente_nombre}</strong>
              <div class="product-spec">${ped.cliente_contacto} · ${ped.estado}</div>
            </div>
            <strong>${formatoUsd(ped.total_usd)}</strong>
          </div>
        `
      )
      .join('');
  }

  function construirMensajeWhatsApp(pedido) {
    const lineasItems = (pedido.items || []).map((item) => {
      const precio = typeof item.precio_usd === 'number' ? item.precio_usd : obtenerPrecioUsd(item);
      const subtotal = Number(precio) * Number(item.cantidad);
      return `• ${item.nombre} (${item.codigo}) x${item.cantidad} = ${formatoUsd(subtotal)}`;
    });

    const mensaje = [
      `*NUEVO PEDIDO — ACEROS IMPORT SILVER*`,
      `Folio: *#${pedido.folio}*`,
      `Cliente: *${pedido.cliente_nombre}*`,
      `Teléfono/Contacto: *${pedido.cliente_contacto}*`,
      ``,
      `*Detalle de materiales:*`,
      ...lineasItems,
      ``,
      `*Total estimado: ${formatoUsd(pedido.total_usd)}*`,
      `Punto de venta: ${state.sucursal.direccionCompleta}`,
      `WhatsApp empresa: ${state.sucursal.telefono}`
    ].join('\n');

    return `https://wa.me/${state.sucursal.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
  }

  function abrirWhatsAppConPedido(pedido) {
    const url = construirMensajeWhatsApp(pedido);
    const nuevaVentana = window.open(url, '_blank', 'noopener,noreferrer');
    if (!nuevaVentana) {
      window.location.href = url;
    }
  }

  function validarPedidoForm() {
    const nombre = (els.clienteNombre?.value || '').trim();
    const contacto = (els.clienteContacto?.value || '').trim();
    let ok = true;

    if (els.errorNombre) els.errorNombre.textContent = '';
    if (els.errorContacto) els.errorContacto.textContent = '';
    if (els.estadoPedido) els.estadoPedido.textContent = '';

    if (contieneBlacklist(nombre)) {
      if (els.errorNombre) {
        els.errorNombre.textContent = 'Palabra bloqueada por la blacklist (ES/EN).';
      }
      ok = false;
    } else if (!nombre) {
      if (els.errorNombre) {
        els.errorNombre.textContent = 'No has ingresado letras: escribe un nombre válido.';
      }
      ok = false;
    } else if (!esSoloLetrasValido(nombre, 2, 100)) {
      if (els.errorNombre) {
        els.errorNombre.textContent = 'Ingresa un nombre válido usando solo letras y espacios (2 a 100 caracteres).';
      }
      ok = false;
    }

    if (contieneBlacklist(contacto)) {
      if (els.errorContacto) {
        els.errorContacto.textContent = 'Ese contacto está bloqueado por la blacklist (ES/EN).';
      }
      ok = false;
    } else if (!contacto) {
      if (els.errorContacto) {
        els.errorContacto.textContent = 'No has ingresado ningún número: escribe un teléfono o contacto válido.';
      }
      ok = false;
    } else if (!/[0-9]/.test(contacto)) {
      if (els.errorContacto) {
        els.errorContacto.textContent = 'No se ha ingresado un número: el teléfono o contacto debe incluir dígitos.';
      }
      ok = false;
    } else if (!esTelefonoValido(contacto, 5, 80)) {
      if (els.errorContacto) {
        els.errorContacto.textContent = 'Ingresa un número de teléfono válido (mínimo 5 dígitos/caracteres permitidos).';
      }
      ok = false;
    }

    if (state.carrito.length === 0) {
      if (els.estadoPedido) {
        els.estadoPedido.textContent = 'Agrega al menos un producto antes de confirmar.';
      }
      ok = false;
    }

    if (!ok && els.estadoPedido && !els.estadoPedido.textContent) {
      els.estadoPedido.textContent = 'Revisa los campos marcados antes de continuar.';
    }

    return ok ? { cliente_nombre: nombre, cliente_contacto: contacto } : null;
  }

  function detenerCuentaRegresiva() {
    if (state.timerId !== null) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
    state.segundosRestantes = 8;
    if (els.btnConfirmarCuentaRegresiva) {
      els.btnConfirmarCuentaRegresiva.hidden = true;
      els.btnConfirmarCuentaRegresiva.textContent = 'Confirmar pedido (8s)';
    }
    if (els.btnCancelarCuentaRegresiva) {
      els.btnCancelarCuentaRegresiva.hidden = true;
    }
  }

  function iniciarCuentaRegresiva(payload) {
    detenerCuentaRegresiva();
    state.datosPedidoPendientes = payload;
    state.segundosRestantes = 8;

    if (els.btnConfirmarCuentaRegresiva) {
      els.btnConfirmarCuentaRegresiva.hidden = false;
      els.btnConfirmarCuentaRegresiva.textContent = `Confirmar pedido (${state.segundosRestantes}s)`;
    }
    if (els.btnCancelarCuentaRegresiva) {
      els.btnCancelarCuentaRegresiva.hidden = false;
    }
    if (els.estadoPedido) {
      els.estadoPedido.textContent = 'Pulsa "Confirmar pedido" antes de que termine la cuenta de 8 segundos para enviar a WhatsApp.';
    }

    state.timerId = setInterval(() => {
      state.segundosRestantes -= 1;
      if (state.segundosRestantes > 0) {
        if (els.btnConfirmarCuentaRegresiva) {
          els.btnConfirmarCuentaRegresiva.textContent = `Confirmar pedido (${state.segundosRestantes}s)`;
        }
      } else {
        detenerCuentaRegresiva();
        state.datosPedidoPendientes = null;
        if (els.estadoPedido) {
          els.estadoPedido.textContent = 'Tiempo de 8 segundos agotado. Vuelve a preparar la confirmación.';
        }
      }
    }, 1000);
  }

  function confirmarPedido() {
    if (!state.datosPedidoPendientes || state.carrito.length === 0) return;
    const total = calcularTotal();
    const folio = `AIS-${Date.now().toString().slice(-5)}`;
    const itemsSnapshot = state.carrito.map((item) => ({ ...item }));

    const pedidoConfirmado = {
      folio,
      cliente_nombre: state.datosPedidoPendientes.cliente_nombre,
      cliente_contacto: state.datosPedidoPendientes.cliente_contacto,
      total_usd: total,
      items: itemsSnapshot,
      estado: 'Enviado a WhatsApp'
    };

    state.historial.unshift(pedidoConfirmado);
    persistirHistorial();
    hidratarHistorialDOM();
    if (state.adminAutenticado) renderAdminPanel();

    detenerCuentaRegresiva();
    state.datosPedidoPendientes = null;
    state.carrito = [];
    persistirCarrito();
    hidratarCotizacionDOM();
    els.formPedido?.reset();

    if (els.estadoPedido) {
      els.estadoPedido.textContent = `Pedido ${folio} (${formatoUsd(total)}) listo. Abriendo WhatsApp (${state.sucursal.telefono})...`;
    }

    abrirWhatsAppConPedido(pedidoConfirmado);
  }

  function validarYEnviarContacto(e) {
    e.preventDefault();
    const nombre = (els.contactoNombre?.value || '').trim();
    const correo = (els.contactoCorreo?.value || '').trim();
    const mensaje = (els.contactoMensaje?.value || '').trim();
    let ok = true;

    if (els.errorContactoNombre) els.errorContactoNombre.textContent = '';
    if (els.errorContactoCorreo) els.errorContactoCorreo.textContent = '';
    if (els.errorContactoMensaje) els.errorContactoMensaje.textContent = '';
    if (els.estadoContacto) els.estadoContacto.textContent = '';

    if (contieneBlacklist(nombre)) {
      if (els.errorContactoNombre) {
        els.errorContactoNombre.textContent = 'Palabra bloqueada por la blacklist (ES/EN).';
      }
      ok = false;
    } else if (!nombre) {
      if (els.errorContactoNombre) {
        els.errorContactoNombre.textContent = 'No has ingresado letras: escribe tu nombre para enviar la consulta.';
      }
      ok = false;
    } else if (!esSoloLetrasValido(nombre, 2, 100)) {
      if (els.errorContactoNombre) {
        els.errorContactoNombre.textContent = 'Usa solo letras y espacios (2 a 100 caracteres).';
      }
      ok = false;
    }

    if (contieneBlacklist(correo) || correo.length < 5) {
      if (els.errorContactoCorreo) {
        els.errorContactoCorreo.textContent = 'Correo o teléfono inválido o bloqueado por blacklist (ES/EN).';
      }
      ok = false;
    }

    if (contieneBlacklist(mensaje)) {
      if (els.errorContactoMensaje) {
        els.errorContactoMensaje.textContent = 'Mensaje bloqueado por blacklist (ES/EN).';
      }
      ok = false;
    } else if (!esMensajeAlfanumericoValido(mensaje, 4, 500)) {
      if (els.errorContactoMensaje) {
        els.errorContactoMensaje.textContent = 'Escribe un mensaje válido con letras, números y espacios (mínimo 4 caracteres).';
      }
      ok = false;
    }

    if (!ok) {
      if (els.estadoContacto) {
        els.estadoContacto.textContent = 'Revisa los campos marcados: hay errores de formato o palabras en blacklist.';
      }
      return;
    }

    els.formContacto?.reset();
    if (els.estadoContacto) {
      els.estadoContacto.textContent = `Consulta registrada. Teléfono: ${state.sucursal.telefono} · ${state.sucursal.direccionCompleta}.`;
    }
  }

  function ejecutarSmokeTest() {
    const totalBotones = document.querySelectorAll('button').length;
    const imgsSinAlt = Array.from(document.querySelectorAll('img')).filter(
      (img) => !img.hasAttribute('alt') || img.getAttribute('alt').trim() === ''
    ).length;
    const enlacesVacios = Array.from(document.querySelectorAll('a')).filter((a) => {
      const href = (a.getAttribute('href') || '').trim();
      return href === '' || href === '#';
    }).length;

    if (els.resultadoAuditoria) {
      els.resultadoAuditoria.textContent =
        `Smoke Test DOM -> Botones: ${totalBotones} | Imágenes sin alt: ${imgsSinAlt} | Enlaces vacíos: ${enlacesVacios}`;
    }
  }

  function auditarA11Y() {
    const etiquetas = ['header', 'nav', 'main', 'section', 'article', 'footer'];
    const presentes = etiquetas.filter((tag) => document.querySelector(tag) !== null);
    const imgsSinAlt = Array.from(document.querySelectorAll('img')).filter(
      (img) => !img.hasAttribute('alt') || img.getAttribute('alt').trim() === ''
    ).length;

    if (els.resultadoAuditoria) {
      els.resultadoAuditoria.textContent =
        `Auditoría A11Y -> Etiquetas semánticas presentes (${presentes.length}/${etiquetas.length}): ${presentes.join(', ')} | Imágenes sin alt: ${imgsSinAlt}`;
    }
  }

  function registrarEventosAdmin() {
    const vistaAdmin = document.getElementById('vistaAdmin');
    if (!vistaAdmin) return;

    vistaAdmin.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('#btnIngresarAdmin')) {
        e.stopPropagation();
        const passInput = document.getElementById('adminPassInput');
        const errEl = document.getElementById('adminLoginError');
        if (!passInput || !errEl) return;

        if (passInput.value.trim() === ADMIN_PASSCODE) {
          state.adminAutenticado = true;
          passInput.value = '';
          errEl.textContent = '';
          renderProductos();
          renderAdminPanel();
        } else {
          state.adminAutenticado = false;
          errEl.textContent = 'Contraseña incorrecta.';
          renderAdminPanel();
        }
        return;
      }

      if (target.closest('#btnVolverClienteDesdeAdmin')) {
        e.stopPropagation();
        cambiarVista('inicio');
        return;
      }

      if (target.closest('#btnCerrarSesionAdmin')) {
        e.stopPropagation();
        state.adminAutenticado = false;
        renderProductos();
        renderAdminPanel();
        return;
      }

      if (target.closest('#btnCrearProductoAdmin')) {
        e.stopPropagation();
        const msgEl = document.getElementById('adminEstadoMsg');
        const codigo = (document.getElementById('nuevoProdCodigo')?.value || '').trim();
        const nombre = (document.getElementById('nuevoProdNombre')?.value || '').trim();
        const spec = (document.getElementById('nuevoProdSpec')?.value || '').trim();
        const slug = document.getElementById('nuevoProdCat')?.value || 'barras';
        const precio = Number(document.getElementById('nuevoProdPrecio')?.value);
        const stock = Number(document.getElementById('nuevoProdStock')?.value);

        if (!codigo || !nombre || !spec || Number.isNaN(precio) || precio <= 0 || Number.isNaN(stock) || stock < 0) {
          if (msgEl) msgEl.textContent = 'Completa código, nombre, especificación, precio (> 0) y stock (>= 0).';
          return;
        }

        const catObj = state.categorias.find((c) => c.slug === slug) || state.categorias[0];
        const maxId = state.productos.reduce((m, p) => Math.max(m, Number(p.id_producto) || 0), 0);

        state.productos.push({
          id_producto: maxId + 1,
          codigo,
          nombre,
          especificacion: spec,
          unidad: 'Unidad',
          categoria: catObj ? catObj.nombre : 'Barras y Fierros',
          categoria_slug: slug,
          precio_usd: precio,
          stock: Math.floor(stock),
          bloqueado: 0,
          ...(REFERENCIAS_POR_CATEGORIA[slug] || REFERENCIAS_POR_CATEGORIA.barras)
        });

        persistirCatalogoAdmin();
        renderProductos();
        renderAdminPanel();
        document.getElementById('nuevoProdCodigo').value = '';
        document.getElementById('nuevoProdNombre').value = '';
        document.getElementById('nuevoProdSpec').value = '';
        document.getElementById('nuevoProdPrecio').value = '';
        document.getElementById('nuevoProdStock').value = '';
        if (msgEl) msgEl.textContent = `Material ${codigo} agregado al catálogo.`;
        return;
      }

      if (target.closest('#btnRestaurarCatalogoAdmin')) {
        e.stopPropagation();
        try {
          localStorage.removeItem(STORAGE_KEYS.CATALOGO_ADMIN);
        } catch (_) {}
        cargarCatalogo();
        const msgEl = document.getElementById('adminEstadoMsg');
        if (msgEl) msgEl.textContent = 'Catálogo restaurado a valores base.';
        return;
      }

      if (target.closest('#btnLimpiarHistorialAdmin')) {
        e.stopPropagation();
        state.historial = [];
        persistirHistorial();
        hidratarHistorialDOM();
        renderAdminPanel();
        const msgEl = document.getElementById('adminEstadoMsg');
        if (msgEl) msgEl.textContent = 'Historial de pedidos limpiado.';
        return;
      }

      const btnGuardar = target.closest('.btn-admin-guardar');
      if (btnGuardar) {
        e.stopPropagation();
        const id = Number(btnGuardar.getAttribute('data-id'));
        const fila = btnGuardar.closest('[data-admin-id]');
        const precioVal = Number(fila?.querySelector('.admin-precio-input')?.value);
        const stockVal = Number(fila?.querySelector('.admin-stock-input')?.value);
        const prod = state.productos.find((p) => Number(p.id_producto) === id);

        if (prod && !Number.isNaN(precioVal) && precioVal >= 0 && !Number.isNaN(stockVal) && stockVal >= 0) {
          prod.precio_usd = precioVal;
          prod.stock = Math.floor(stockVal);
          persistirCatalogoAdmin();
          renderProductos();
          renderAdminPanel();
          const msgEl = document.getElementById('adminEstadoMsg');
          if (msgEl) msgEl.textContent = `Actualizado ${prod.codigo}: ${formatoUsd(prod.precio_usd)} · Stock ${prod.stock}.`;
        }
        return;
      }

      const btnToggle = target.closest('.btn-admin-toggle');
      if (btnToggle) {
        e.stopPropagation();
        const id = Number(btnToggle.getAttribute('data-id'));
        const prod = state.productos.find((p) => Number(p.id_producto) === id);
        if (prod) {
          prod.bloqueado = Number(prod.bloqueado) === 1 ? 0 : 1;
          persistirCatalogoAdmin();
          renderProductos();
          renderAdminPanel();
          const msgEl = document.getElementById('adminEstadoMsg');
          if (msgEl) {
            msgEl.textContent = `${prod.codigo} ahora está ${Number(prod.bloqueado) === 1 ? 'BLOQUEADO para clientes' : 'HABILITADO'}.`;
          }
        }
        return;
      }

      if (target.closest('#btnGuardarSucursalAdmin')) {
        e.stopPropagation();
        const wp = (document.getElementById('adminWhatsappInput')?.value || '').trim().replace(/[^0-9]/g, '');
        const tel = (document.getElementById('adminTelefonoInput')?.value || '').trim();
        const dir = (document.getElementById('adminDireccionInput')?.value || '').trim();
        const msgEl = document.getElementById('adminEstadoMsg');

        if (wp) state.sucursal.whatsappNumero = wp;
        if (tel) state.sucursal.telefono = tel;
        if (dir) state.sucursal.direccionCompleta = dir;

        persistirSucursalAdmin();
        inyectarDatosSucursalEnDOM();
        if (msgEl) msgEl.textContent = 'Datos de contacto y dirección actualizados.';
      }
    });

    document.getElementById('adminPassInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('btnIngresarAdmin')?.click();
      }
    });
  }

  function registrarEventos() {
    [
      { campo: els.contactoNombre, error: els.errorContactoNombre },
      { campo: els.clienteNombre, error: els.errorNombre }
    ].forEach(({ campo, error }) => {
      campo?.addEventListener('input', () => notificarCampoSoloLetras(campo, error));
      campo?.addEventListener('blur', () => {
        if (!campo.value.trim() && error) {
          error.textContent = 'No has ingresado ninguna letra en este campo.';
        }
      });
    });

    els.contactoMensaje?.addEventListener('input', () => {
      if (!els.errorContactoMensaje) return;
      if (contieneBlacklist(els.contactoMensaje.value)) {
        els.errorContactoMensaje.textContent = 'Mensaje bloqueado por blacklist (ES/EN).';
      } else {
        els.errorContactoMensaje.textContent = '';
      }
    });

    els.clienteContacto?.addEventListener('input', () => {
      notificarCampoTelefono(els.clienteContacto, els.errorContacto);
    });

    els.clienteContacto?.addEventListener('blur', () => {
      if (!els.clienteContacto.value.trim() && els.errorContacto) {
        els.errorContacto.textContent = 'No has ingresado ningún número en este campo.';
      }
    });

    els.btnExplorarCatalogo?.addEventListener('click', (e) => {
      e.stopPropagation();
      entrarAlCatalogo();
    });

    els.btnSaltarBienvenida?.addEventListener('click', (e) => {
      e.stopPropagation();
      abrirIngresoAdministrador();
    });

    els.btnVolverInicio?.addEventListener('click', (e) => {
      e.stopPropagation();
      cambiarVista('inicio');
    });

    els.btnBannerExplorar?.addEventListener('click', (e) => {
      e.stopPropagation();
      cambiarVista('catalogo');
    });

    els.btnBannerCotizar?.addEventListener('click', (e) => {
      e.stopPropagation();
      cambiarVista('cotizacion');
    });

    els.btnIrCotizacionTop?.addEventListener('click', (e) => {
      e.stopPropagation();
      cambiarVista('cotizacion');
    });

    els.btnTema?.addEventListener('click', (e) => {
      e.stopPropagation();
      const actual = document.documentElement.getAttribute('data-theme');
      aplicarTema(actual === 'dark' ? 'light' : 'dark');
    });

    els.btnAbrirMenu?.addEventListener('click', (e) => {
      e.stopPropagation();
      abrirDrawer();
    });

    els.btnCerrarMenu?.addEventListener('click', (e) => {
      e.stopPropagation();
      cerrarDrawer();
    });

    els.drawerBackdrop?.addEventListener('click', (e) => {
      e.stopPropagation();
      cerrarDrawer();
    });

    els.drawerMenu?.addEventListener('click', (e) => {
      const btnVista = e.target.closest('[data-vista]');
      if (btnVista) {
        e.stopPropagation();
        cambiarVista(btnVista.getAttribute('data-vista'));
        return;
      }
      const btnCat = e.target.closest('[data-categoria-ir]');
      if (btnCat) {
        e.stopPropagation();
        state.categoriaActiva = btnCat.getAttribute('data-categoria-ir') || 'todas';
        renderFiltrosCategoria();
        renderProductos();
        cambiarVista('catalogo');
      }
    });

    document.querySelector('.bottom-nav')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.bottom-nav-btn[data-vista]');
      if (!btn) return;
      e.stopPropagation();
      cambiarVista(btn.getAttribute('data-vista'));
    });

    els.gridCategoriasInicio?.addEventListener('click', (e) => {
      const card = e.target.closest('[data-categoria-ir]');
      if (!card) return;
      e.stopPropagation();
      state.categoriaActiva = card.getAttribute('data-categoria-ir') || 'todas';
      renderFiltrosCategoria();
      renderProductos();
      cambiarVista('catalogo');
    });

    els.filtrosCategoria?.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip[data-categoria]');
      if (!chip) return;
      e.stopPropagation();
      state.categoriaActiva = chip.getAttribute('data-categoria') || 'todas';
      renderFiltrosCategoria();
      renderProductos();
    });

    els.subfiltrosDisponibilidad?.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip[data-disp]');
      if (!chip) return;
      e.stopPropagation();
      state.disponibilidadActiva = chip.getAttribute('data-disp') || 'todos';
      els.subfiltrosDisponibilidad.querySelectorAll('.chip').forEach((c) => {
        c.classList.toggle('active', c === chip);
      });
      renderProductos();
    });

    els.inputBuscar?.addEventListener('input', (e) => {
      state.busqueda = e.target.value || '';
      renderProductos();
    });

    els.gridProductos?.addEventListener('click', (e) => {
      const btnAdd = e.target.closest('.btn-agregar');
      if (btnAdd) {
        e.stopPropagation();
        agregarProducto(btnAdd.getAttribute('data-id'));
        return;
      }
      const btnDet = e.target.closest('.btn-detalle');
      if (btnDet) {
        e.stopPropagation();
        abrirModalDetalle(btnDet.getAttribute('data-id'));
      }
    });

    els.btnModalAgregar?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.productoDetalleId !== null) {
        agregarProducto(state.productoDetalleId);
      }
      els.modalDetalle?.close();
    });

    els.btnCerrarModal?.addEventListener('click', (e) => {
      e.stopPropagation();
      els.modalDetalle?.close();
    });

    els.listaCotizacion?.addEventListener('click', (e) => {
      const btnQty = e.target.closest('.btn-qty');
      if (!btnQty) return;
      e.stopPropagation();
      cambiarCantidad(btnQty.getAttribute('data-id'), Number(btnQty.getAttribute('data-delta')));
    });

    els.formPedido?.addEventListener('submit', (e) => {
      e.preventDefault();
      const validado = validarPedidoForm();
      if (validado) iniciarCuentaRegresiva(validado);
    });

    els.btnConfirmarCuentaRegresiva?.addEventListener('click', (e) => {
      e.stopPropagation();
      confirmarPedido();
    });

    els.btnCancelarCuentaRegresiva?.addEventListener('click', (e) => {
      e.stopPropagation();
      detenerCuentaRegresiva();
      state.datosPedidoPendientes = null;
      if (els.estadoPedido) els.estadoPedido.textContent = 'Confirmación cancelada.';
    });

    els.formContacto?.addEventListener('submit', validarYEnviarContacto);

    els.btnVerBienvenida?.addEventListener('click', (e) => {
      e.stopPropagation();
      ocultarSplashInmediato();
      cerrarDrawer();
      mostrarBienvenida(true);
    });

    els.btnReproducirSplash?.addEventListener('click', (e) => {
      e.stopPropagation();
      cerrarDrawer();
      mostrarBienvenida(false);
      mostrarSplash(750, () => {
        mostrarBienvenida(true);
      });
    });

    els.btnSmokeTest?.addEventListener('click', (e) => {
      e.stopPropagation();
      ejecutarSmokeTest();
    });

    els.btnAuditarA11Y?.addEventListener('click', (e) => {
      e.stopPropagation();
      auditarA11Y();
    });

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      state.deferredPrompt = e;
      if (els.btnInstalarPWA) els.btnInstalarPWA.hidden = false;
    });

    els.btnInstalarPWA?.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!state.deferredPrompt) return;
      state.deferredPrompt.prompt();
      await state.deferredPrompt.userChoice;
      state.deferredPrompt = null;
      els.btnInstalarPWA.hidden = true;
    });

    window.addEventListener('appinstalled', () => {
      state.deferredPrompt = null;
      if (els.btnInstalarPWA) els.btnInstalarPWA.hidden = true;
    });

    registrarEventosAdmin();
  }

  function registrarSW() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      });
    }
  }

  hidratarEstado();
  registrarEventos();
  registrarSW();
  cargarCatalogo();
  mostrarBienvenida(false);
  mostrarSplash(700, () => {
    mostrarBienvenida(true);
  });
})();