/**
 * English translations (optional language — switch via language toggle)
 */
const en = {
  // Navigation
  nav: {
    dashboard: "Dashboard",
    negotiations: "Negotiations",
    suppliers: "Suppliers",
    analytics: "Analytics",
    settings: "Settings",
    docs: "Manual",
    user: "User",
    role: "Chief Procurement",
  },

  // Dashboard
  dashboard: {
    title: "Control Panel",
    subtitle: "Executive summary of procurement operations",
    activeNegotiations: "Active Negotiations",
    completedDeals: "Completed Deals",
    avgSavings: "Avg. Savings",
    suppliersActive: "Active Suppliers",
    recentActivity: "Recent Activity",
    noActivity: "No recent activity",
    newNegotiation: "New Negotiation",
    viewAll: "View all",
  },

  // Negotiations
  negotiations: {
    title: "Negotiations",
    subtitle: "Active procurement operations management",
    new: "New",
    status: {
      active: "Active",
      pending: "Pending",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    fields: {
      supplier: "Supplier",
      category: "Category",
      volume: "Volume",
      targetPrice: "Target Price",
      maxPrice: "Max Limit",
      status: "Status",
      date: "Date",
    },
    empty: "No active negotiations",
    emptyHint: "Create your first negotiation to get started",
  },

  // Negotiation detail screen
  negotiationDetail: {
    liveCase: "Live Case",
    strategyEngine: "Strategy Engine",
    engineOnline: "Engine Online",
    engineOffline: "Engine Offline",
    auditTrail: "Audit Trail",
    nextMove: "Next Strategic Move",
    approveResponse: "Approve Response",
    approving: "Approving...",
    approved: "Approved",
    editSpecs: "Edit Specs",
    aiGenerated: "AI generated response based on the 'Intelligent Architect' policy",
    targetPrice: "Target Price",
    maxLimit: "Maximum Limit",
    negotiationStatus: "Negotiation Status",
    analyzing: "Analyzing...",
    retryAnalysis: "Retry Analysis",
    confirmSend: "Confirm & Send",
    sending: "Sending...",
    offerApproved: "Offer Approved. Notification sent to supplier. Returning...",
    systemFault: "System Fault",
    maintenance: "Maintenance",
    systemOffline: "System Offline",
    architectDelayed: "Architect Delayed",
    forceConnection: "Force Connection",
    loadingCore: "Loading data-driven core...",
    contextIngestion: "Contextual Ingestion...",
    intelligenceActive: "Operational Intelligence Active",
    intelligenceOffline: "Intelligence Offline",
  },

  // Strategy Architect (chat)
  architect: {
    title: "Strategy Architect",
    tabs: {
      strategy: "Strategy",
      chat: "Chat",
      risk: "Risk",
    },
    coreNarrative: "Core Narrative",
    aiSuggestion: "AI Suggestion",
    tacticalHack: "Tactical Hack",
    identifyingLeverage: "Identifying leverage...",
    askPlaceholder: "Ask architect for adjustments...",
    systemLocked: "System locked...",
    greeting: "Hello. I've analyzed the {{supplier}} requirement. My recommendation is an initial offer of {{pricing}}. How else can I help with the strategy?",
    errorResponse: "Could not process your query. Make sure the AI model is available.",
    benchmarkAnalyzing: "Analyzing benchmarks...",
  },

  // Suppliers
  suppliers: {
    title: "Suppliers",
    subtitle: "Certified supplier directory",
    addNew: "Add Supplier",
    fields: {
      name: "Name",
      category: "Category",
      rating: "Rating",
      country: "Country",
      contact: "Contact",
      status: "Status",
    },
    status: {
      active: "Active",
      inactive: "Inactive",
      onboarding: "Onboarding",
    },
    empty: "No suppliers registered",
  },

  // Analytics
  analytics: {
    title: "Analytics",
    subtitle: "Procurement performance metrics and KPIs",
    savingsOverTime: "Savings Over Time",
    negotiationsByCategory: "Negotiations by Category",
    supplierPerformance: "Supplier Performance",
    avgCycleTime: "Avg. Cycle Time",
    days: "days",
  },

  // Settings
  settings: {
    title: "Settings",
    subtitle: "System parameters and platform preferences",
    tabs: {
      general: "General",
      rag: "Data & RAG",
      notifications: "Notifications",
    },
    general: {
      companyName: "Company Name",
      tenantId: "Tenant ID",
      defaultCurrency: "Default Currency",
      language: "Language",
      saveChanges: "Save Changes",
      saving: "Saving...",
      saved: "Saved",
    },
    rag: {
      title: "Corporate Policies (RAG)",
      description: "Upload .md or .txt files with your procurement policies. The AI agent will use them as a knowledge base.",
      dropZoneTitle: "Drag and drop a file",
      dropZoneHint: "Supported formats: .md, .txt",
      uploading: "Uploading...",
      uploadSuccess: "Policy successfully added to RAG database",
      uploadError: "Error uploading file",
      browseFiles: "Browse Files",
      activePolicies: "Active Policies",
      loadingPolicies: "Loading policies...",
      noPolicies: "No policies uploaded yet",
      deleteConfirm: "Delete {{name}}? This will re-index the RAG database.",
      deleteError: "Error deleting policy",
    },
  },

  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    retry: "Retry",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    back: "Back",
    backToDashboard: "Back to Dashboard",
    search: "Search",
    filter: "Filter",
    export: "Export",
    noData: "No data available",
    language: "Language",
  },
} as const;

export default en;
