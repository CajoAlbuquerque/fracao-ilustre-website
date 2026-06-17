export interface TranslationDictionary {
  nav: {
    home: string;
    portfolio: string;
    marketplace: string;
    about: string;
    contact: string;
  };
  home: {
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    description: string;
    portfolioTitle: string;
  };
  common: {
    slogan: string;
    available: string;
    reserved: string;
    sold: string;
    apartment: string;
    house: string;
    shop: string;
    office: string;
    area: string;
    typology: string;
    type: string;
    floor: string;
    energy: string;
    viewDetails: string;
    inquireWhatsApp: string;
    inquireEmail: string;
    callUs: string;
    backToMarket: string;
    backToPortfolio: string;
    details: string;
    features: string;
    status: string;
    completion: string;
    availableFractions: string;
  };
  about: {
    title: string;
    subtitle: string;
    foundersTitle: string;
    foundersStory: string;
    qualityTitle: string;
    qualityText: string;
    metrics: {
      experience: string;
      completed: string;
      construction: string;
      personalized: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    submitBtn: string;
    successMsg: string;
  };
  catalog: {
    filters: string;
    all: string;
    clearFilters: string;
    noResults: string;
  };
}

export const translations: { pt: TranslationDictionary; en: TranslationDictionary } = {
  pt: {
    nav: {
      home: "Início",
      portfolio: "Portfólio",
      marketplace: "Frações Disponíveis",
      about: "Sobre Nós",
      contact: "Contactos",
    },
    home: {
      heroTitle1: "CONSTRUÇÃO DE",
      heroTitle2: "VANGUARDA",
      heroTitle3: "EM VISEU",
      description: "Casas sustentáveis e apartamentos premium desenhados ao detalhe. Mais de 30 anos de experiência transformados em lares para a sua família.",
      portfolioTitle: "O Nosso Portfólio",
    },
    common: {
      slogan: "de família para família",
      available: "Disponível",
      reserved: "Reservado",
      sold: "Vendido",
      apartment: "Apartamento",
      house: "Moradia",
      shop: "Loja",
      office: "Escritório",
      area: "Área",
      typology: "Tipologia",
      type: "Tipo",
      floor: "Piso",
      energy: "Classe Energética",
      viewDetails: "Ver Detalhes",
      inquireWhatsApp: "Inquirir por WhatsApp",
      inquireEmail: "Enviar Mensagem",
      callUs: "Ligar para Nós",
      backToMarket: "Voltar às Frações",
      backToPortfolio: "Voltar ao Portfólio",
      details: "Detalhes",
      features: "Características",
      status: "Estado",
      completion: "Conclusão",
      availableFractions: "Frações Disponíveis",
    },
    about: {
      title: "Sobre Nós",
      subtitle: "Uma herança de qualidade, engenharia rigorosa e compromisso familiar.",
      foundersTitle: "De Família para Família",
      foundersStory: "Fundada por Jorge (Engenheiro Civil, Politécnico de Coimbra) e Luísa (Engenheira Mecânica e Gestora, Faculdade de Coimbra), a Fração Ilustre nasceu para traduzir mais de 30 anos de experiência acumulada no setor em casas reais e prontas a habitar. Combinamos o rigor técnico da engenharia com uma postura próxima dos nossos clientes, tratando cada projeto com a dedicação e o carinho com que construiríamos uma casa para um filho.",
      qualityTitle: "Construção de Vanguarda e Qualidade Absoluta",
      qualityText: "Para nós, a construção civil não é apenas empilhar tijolos — é criar soluções habitacionais eficientes e sustentáveis. Focamo-nos na sustentabilidade regional de Viseu através da introdução de painéis solares fotovoltaicos, bombas de calor modernas de alta performance e isolamentos térmico-acústicos de vanguarda que reduzem custos e aumentam a qualidade de vida. Cada detalhe das nossas obras é fiscalizado de perto pelos fundadores, garantindo padrões de construção que poucas empresas conseguem igualar.",
      metrics: {
        experience: "Anos de Experiência na Construção",
        completed: "Apartamentos Premium Concluídos",
        construction: "Moradias Sustentáveis em Construção",
        personalized: "Cuidado e Acompanhamento Personalizado",
      },
    },
    contact: {
      title: "Entre em Contacto",
      subtitle: "Estamos aqui para esclarecer todas as suas dúvidas sobre os nossos projetos ou frações.",
      nameLabel: "Nome Completo",
      emailLabel: "Endereço de E-mail",
      phoneLabel: "Número de Telemóvel",
      messageLabel: "Mensagem ou Dúvidas",
      submitBtn: "Enviar Pedido de Informação",
      successMsg: "Obrigado! O seu pedido de informação foi enviado com sucesso. Entraremos em contacto brevemente.",
    },
    catalog: {
      filters: "Filtros",
      all: "Todos",
      clearFilters: "Limpar Filtros",
      noResults: "Não foram encontradas frações com os filtros selecionados.",
    },
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      marketplace: "Available Units",
      about: "About Us",
      contact: "Contacts",
    },
    home: {
      heroTitle1: "CONSTRUCTION OF",
      heroTitle2: "VANGUARD",
      heroTitle3: "IN VISEU",
      description: "Sustainable houses and premium apartments designed in detail. More than 30 years of experience turned into homes for your family.",
      portfolioTitle: "Our Portfolio",
    },
    common: {
      slogan: "from family to family",
      available: "Available",
      reserved: "Reserved",
      sold: "Sold",
      apartment: "Apartment",
      house: "Villa",
      shop: "Shop",
      office: "Office",
      area: "Area",
      typology: "Typology",
      type: "Type",
      floor: "Floor",
      energy: "Energy Certificate",
      viewDetails: "View Details",
      inquireWhatsApp: "Inquire on WhatsApp",
      inquireEmail: "Send Message",
      callUs: "Call Us",
      backToMarket: "Back to Units",
      backToPortfolio: "Back to Portfolio",
      details: "Details",
      features: "Features",
      status: "Status",
      completion: "Completion",
      availableFractions: "Available Units",
    },
    about: {
      title: "About Us",
      subtitle: "A heritage of quality, rigorous engineering, and family commitment.",
      foundersTitle: "From Family to Family",
      foundersStory: "Founded by Jorge (Civil Engineer, Politécnico de Coimbra) and Luísa (Mechanical Engineer and Manager, Faculty of Coimbra), Fração Ilustre was born to translate more than 30 years of construction experience into actual, premium homes. We combine technical engineering rigor with an approachable client relationship, treating each project with the same care and devotion we would show if we were building a home for our own child.",
      qualityTitle: "Vanguard Construction & Absolute Quality",
      qualityText: "For us, construction is not just about stacking bricks — it is about creating efficient, sustainable housing solutions. We focus on Viseu's regional sustainability by integrating photovoltaic solar panels, high-performance modern heat pumps, and cutting-edge thermal and acoustic insulation that cut costs and raise standard of living. Every detail of our work is closely inspected by the founders, guaranteeing construction standards that few companies can match.",
      metrics: {
        experience: "Years of Construction Experience",
        completed: "Premium Apartments Completed",
        construction: "Sustainable Houses Under Construction",
        personalized: "Personalized Support & Care",
      },
    },
    contact: {
      title: "Get in Touch",
      subtitle: "We are here to answer any questions you might have about our projects or units.",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      messageLabel: "Message or Questions",
      submitBtn: "Send Request Information",
      successMsg: "Thank you! Your inquiry was successfully sent. We will get in touch shortly.",
    },
    catalog: {
      filters: "Filters",
      all: "All",
      clearFilters: "Clear Filters",
      noResults: "No units found matching the selected filters.",
    },
  },
};
