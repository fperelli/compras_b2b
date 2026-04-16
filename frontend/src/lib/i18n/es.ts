/**
 * Traducciones en Español Latino (idioma por defecto de la plataforma)
 */
const es = {
  // Navegación
  nav: {
    dashboard: "Panel",
    negotiations: "Negociaciones",
    suppliers: "Proveedores",
    analytics: "Analítica",
    settings: "Configuración",
    docs: "Manual",
    user: "Usuario",
    role: "Jefe de Compras",
  },

  // Dashboard
  dashboard: {
    title: "Panel de Control",
    subtitle: "Resumen ejecutivo de operaciones de compras",
    activeNegotiations: "Negociaciones Activas",
    completedDeals: "Acuerdos Completados",
    avgSavings: "Ahorro Promedio",
    suppliersActive: "Proveedores Activos",
    recentActivity: "Actividad Reciente",
    noActivity: "Sin actividad reciente",
    newNegotiation: "Nueva Negociación",
    viewAll: "Ver todo",
  },

  // Negociaciones
  negotiations: {
    title: "Negociaciones",
    subtitle: "Gestión de operaciones de compra activas",
    new: "Nueva",
    status: {
      active: "Activa",
      pending: "Pendiente",
      completed: "Completada",
      cancelled: "Cancelada",
    },
    fields: {
      supplier: "Proveedor",
      category: "Categoría",
      volume: "Volumen",
      targetPrice: "Precio Objetivo",
      maxPrice: "Límite Máximo",
      status: "Estado",
      date: "Fecha",
    },
    empty: "No hay negociaciones activas",
    emptyHint: "Crea tu primera negociación para comenzar",
  },

  // Sala de negociación (detalle)
  negotiationDetail: {
    liveCase: "Caso en Vivo",
    strategyEngine: "Motor de Estrategia",
    engineOnline: "Motor en Línea",
    engineOffline: "Motor Fuera de Línea",
    auditTrail: "Historial de Auditoría",
    nextMove: "Próximo Movimiento Estratégico",
    approveResponse: "Aprobar Respuesta",
    approving: "Aprobando...",
    approved: "Aprobado",
    editSpecs: "Editar Especificaciones",
    aiGenerated: "Respuesta generada por IA según política de Arquitecto Inteligente",
    targetPrice: "Precio Objetivo",
    maxLimit: "Límite Máximo",
    negotiationStatus: "Estado de Negociación",
    analyzing: "Analizando...",
    retryAnalysis: "Reintentar Análisis",
    confirmSend: "Confirmar y Enviar",
    sending: "Enviando...",
    offerApproved: "Oferta aprobada. Notificación enviada al proveedor. Regresando...",
    systemFault: "Falla del Sistema",
    maintenance: "Mantenimiento",
    systemOffline: "Sistema Fuera de Línea",
    architectDelayed: "Arquitecto con Demora",
    forceConnection: "Forzar Conexión",
    loadingCore: "Cargando núcleo de datos...",
    contextIngestion: "Ingesta Contextual...",
    intelligenceActive: "Inteligencia Operacional Activa",
    intelligenceOffline: "Inteligencia Fuera de Línea",
  },

  // Arquitecto de Estrategia (chat)
  architect: {
    title: "Arquitecto de Estrategia",
    tabs: {
      strategy: "Estrategia",
      chat: "Chat",
      risk: "Riesgo",
    },
    coreNarrative: "Narrativa Central",
    aiSuggestion: "Sugerencia IA",
    tacticalHack: "Táctica Clave",
    identifyingLeverage: "Identificando palancas...",
    askPlaceholder: "Consulta al arquitecto sobre ajustes...",
    systemLocked: "Sistema bloqueado...",
    greeting: "Hola. He analizado el requerimiento de {{supplier}}. Mi recomendación es una oferta inicial de {{pricing}}. ¿En qué más puedo ayudarte con la estrategia?",
    errorResponse: "No pude procesar tu consulta. Asegúrate de que el modelo de IA esté disponible.",
    benchmarkAnalyzing: "Analizando benchmarks...",
  },

  // Proveedores
  suppliers: {
    title: "Proveedores",
    subtitle: "Directorio de proveedores certificados",
    addNew: "Agregar Proveedor",
    fields: {
      name: "Nombre",
      category: "Categoría",
      rating: "Calificación",
      country: "País",
      contact: "Contacto",
      status: "Estado",
    },
    status: {
      active: "Activo",
      inactive: "Inactivo",
      onboarding: "En proceso",
    },
    empty: "Sin proveedores registrados",
  },

  // Analítica
  analytics: {
    title: "Analítica",
    subtitle: "Métricas e indicadores de rendimiento de compras",
    savingsOverTime: "Ahorros en el Tiempo",
    negotiationsByCategory: "Negociaciones por Categoría",
    supplierPerformance: "Rendimiento de Proveedores",
    avgCycleTime: "Tiempo de Ciclo Promedio",
    days: "días",
  },

  // Configuración
  settings: {
    title: "Configuración",
    subtitle: "Parámetros del sistema y preferencias de la plataforma",
    tabs: {
      general: "General",
      rag: "Datos y RAG",
      notifications: "Notificaciones",
    },
    general: {
      companyName: "Nombre de la Empresa",
      tenantId: "ID del Tenant",
      defaultCurrency: "Moneda Predeterminada",
      language: "Idioma",
      saveChanges: "Guardar Cambios",
      saving: "Guardando...",
      saved: "Guardado",
    },
    rag: {
      title: "Políticas Corporativas (RAG)",
      description: "Carga archivos .md o .txt con tus políticas de compra. El agente de IA las usará como base de conocimiento.",
      dropZoneTitle: "Arrastra y suelta un archivo",
      dropZoneHint: "Formatos soportados: .md, .txt",
      uploading: "Subiendo...",
      uploadSuccess: "Política agregada exitosamente a la base de datos RAG",
      uploadError: "Error al subir el archivo",
      browseFiles: "Explorar Archivos",
      activePolicies: "Políticas Activas",
      loadingPolicies: "Cargando políticas...",
      noPolicies: "No hay políticas cargadas aún",
      deleteConfirm: "¿Eliminar {{name}}? Se re-indexará la base de datos RAG.",
      deleteError: "Error al eliminar la política",
    },
  },

  // Comunes
  common: {
    loading: "Cargando...",
    error: "Error",
    retry: "Reintentar",
    cancel: "Cancelar",
    save: "Guardar",
    delete: "Eliminar",
    edit: "Editar",
    view: "Ver",
    back: "Volver",
    backToDashboard: "Volver al Panel",
    search: "Buscar",
    filter: "Filtrar",
    export: "Exportar",
    noData: "Sin datos disponibles",
    language: "Idioma",
  },
} as const;

export default es;
export type TranslationKeys = typeof es;
