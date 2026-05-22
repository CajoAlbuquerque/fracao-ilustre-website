import { Fraction } from "./types";
import { ImagesBasePath } from '@/app/constants';

export const fractions: Fraction[] = [
  {
    id: "fi1-ap3a",
    projectSlug: "fracao-ilustre-1",
    reference: {
      pt: "Apartamento 3A (T3)",
      en: "Apartment 3A (3-bedroom)",
    },
    type: "apartment",
    typology: "T3",
    status: "available",
    floor: {
      pt: "3º Piso",
      en: "3rd Floor",
    },
    grossArea: 142,
    usefulArea: 120,
    energyCertificate: "A",
    features: {
      pt: [
        "Cozinha equipada em open-space",
        "Suite master com closet",
        "Ampla varanda de 18m² com churrasqueira",
        "Dois lugares de garagem subterrânea",
        "Ar condicionado central",
      ],
      en: [
        "Equipped open-space kitchen",
        "Master suite with walk-in closet",
        "Large 18sqm balcony with built-in barbecue",
        "Two underground garage spaces",
        "Central air conditioning",
      ],
    },
    description: {
      pt: "Espaçoso e luminoso apartamento T3, localizado no prestigiado edifício Fração Ilustre 1. Este imóvel destaca-se pelos seus acabamentos modernos de alta qualidade, excelente eficiência térmica e acústica, e um layout funcional pensado para a vida moderna da sua família.",
      en: "Spacious and bright 3-bedroom apartment, located in the prestigious Fração Ilustre 1 building. This property stands out for its high-quality modern finishes, excellent thermal and acoustic efficiency, and a functional layout designed for your family's modern living.",
    },
    floorPlan: {
      url: `${ImagesBasePath}/colina-verde-living-room.jpg`, // placeholder floor plan
      alt: {
        pt: "Planta baixa detalhada do Apartamento 3A mostrando a distribuição dos quartos e salas",
        en: "Detailed floor plan of Apartment 3A showing bedroom and living room layout",
      },
    },
    images: [
      {
        url: `${ImagesBasePath}/colina-verde-kitchen.jpg`,
        alt: {
          pt: "Cozinha moderna com ilha central e acabamentos em madeira escura",
          en: "Modern kitchen with center island and dark wood finishes",
        },
      },
      {
        url: `${ImagesBasePath}/colina-verde-living-room.jpg`,
        alt: {
          pt: "Sala de estar ampla integrada com a cozinha em plano aberto",
          en: "Spacious living room integrated with open-plan kitchen",
        },
      },
    ],
  },
  {
    id: "frag-mora",
    projectSlug: "fragosela",
    reference: {
      pt: "Moradia A (T4 Geminada)",
      en: "Villa A (4-bedroom Semi-Detached)",
    },
    type: "house",
    typology: "T4",
    status: "available",
    floor: {
      pt: "Dois pisos (R/C e 1º Andar)",
      en: "Two floors (Ground and 1st floor)",
    },
    grossArea: 220,
    usefulArea: 185,
    energyCertificate: "A+",
    features: {
      pt: [
        "Painéis solares fotovoltaicos para autoconsumo",
        "Bomba de calor de alta eficiência para climatização",
        "Jardim privativo de 150m² nas traseiras",
        "Garagem subterrânea privada com tomada para veículos elétricos",
        "Isolamento térmico de vanguarda (capoto premium)",
      ],
      en: [
        "Photovoltaic solar panels for self-consumption",
        "High-efficiency heat pump for climate control",
        "Private 150sqm backyard garden",
        "Private underground garage with EV charger outlet",
        "Vanguard thermal insulation (premium external wall system)",
      ],
    },
    description: {
      pt: "Moradia de vanguarda em Fragosela de Baixo. Projetada especificamente sob os pilares da sustentabilidade ambiental e eficiência de custos, esta moradia oferece um espaço interior luxuoso, jardim privativo para as crianças e toda a tranquilidade que uma família procura perto de Viseu.",
      en: "Vanguard villa in Fragosela de Baixo. Project designed specifically under the pillars of environmental sustainability and cost efficiency, this villa offers a luxurious interior, private garden for children, and all the tranquility a family seeks near Viseu.",
    },
    floorPlan: {
      url: `${ImagesBasePath}/colina-verde-bedroom.jpg`, // placeholder floor plan
      alt: {
        pt: "Planta baixa da Moradia A com indicação das áreas de estar e quartos",
        en: "Floor plan of Villa A with layout of living spaces and bedrooms",
      },
    },
    images: [], // will fall back to project images
  },
  {
    id: "frag-morb",
    projectSlug: "fragosela",
    reference: {
      pt: "Moradia B (T4 Geminada)",
      en: "Villa B (4-bedroom Semi-Detached)",
    },
    type: "house",
    typology: "T4",
    status: "reserved",
    floor: {
      pt: "Dois pisos (R/C e 1º Andar)",
      en: "Two floors (Ground and 1st floor)",
    },
    grossArea: 220,
    usefulArea: 185,
    energyCertificate: "A+",
    features: {
      pt: [
        "Painéis solares fotovoltaicos para autoconsumo",
        "Bomba de calor de alta eficiência para climatização",
        "Jardim privativo de 150m² nas traseiras",
        "Garagem subterrânea privada com tomada para veículos elétricos",
        "Isolamento térmico de vanguarda (capoto premium)",
      ],
      en: [
        "Photovoltaic solar panels for self-consumption",
        "High-efficiency heat pump for climate control",
        "Private 150sqm backyard garden",
        "Private underground garage with EV charger outlet",
        "Vanguard thermal insulation (premium external wall system)",
      ],
    },
    description: {
      pt: "A moradia gémea da Moradia A, com acabamentos premium idênticos e forte aposta na sustentabilidade e isolamento. Atualmente encontra-se sob reserva.",
      en: "The twin home of Villa A, featuring identical premium finishes and a strong focus on sustainability and insulation. Currently reserved.",
    },
    floorPlan: {
      url: `${ImagesBasePath}/colina-verde-bedroom.jpg`,
      alt: {
        pt: "Planta baixa da Moradia B com indicação das áreas de estar e quartos",
        en: "Floor plan of Villa B with layout of living spaces and bedrooms",
      },
    },
    images: [], // will fall back to project images
  },
];
