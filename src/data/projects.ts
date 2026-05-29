import { Project } from "./types";
import { ImagesBasePath } from '@/config/constants';

export const projects: Project[] = [
  {
    slug: "fracao-ilustre-1",
    title: "Fração Ilustre 1",
    location: {
      pt: "Travessa da Colina Verde 3, nº 4, Viseu",
      en: "Travessa da Colina Verde 3, No. 4, Viseu",
    },
    description: {
      pt: "O nosso primeiro grande marco. Um edifício residencial de prestígio concluído no final de 2024, que combina uma arquitetura moderna de vanguarda com acabamentos premium de alta qualidade. Composto por 18 frações, este projeto foi um enorme sucesso de vendas, validando o nosso compromisso com a excelência.",
      en: "Our first major milestone. A prestigious residential building completed in late 2024, combining modern vanguard architecture with high-quality premium finishes. Consisting of 18 units, this project was a huge sales success, validating our commitment to excellence.",
    },
    status: "completed",
    completionDate: "2024-12-31",
    features: {
      pt: [
        "Localização residencial nobre",
        "Acabamentos e isolamentos de qualidade superior",
        "Luz natural abundante e amplas janelas",
        "Edifício moderno com elevador e garagens fechadas",
      ],
      en: [
        "Prime residential location",
        "Superior quality finishes and insulation",
        "Abundant natural light and large windows",
        "Modern building with elevator and closed garages",
      ],
    },
    images: [
      {
        url: `${ImagesBasePath}/colina-verde-kitchen.jpg`,
        alt: {
          pt: "Cozinha premium da Fração Ilustre 1 com acabamentos modernos em madeira e pedra",
          en: "Premium kitchen of Fração Ilustre 1 with modern wood and stone finishes",
        },
      },
      {
        url: `${ImagesBasePath}/colina-verde-living-room.jpg`,
        alt: {
          pt: "Sala de estar ampla da Fração Ilustre 1 com iluminação embutida e grandes janelas",
          en: "Spacious living room of Fração Ilustre 1 with recessed lighting and large windows",
        },
      },
    ],
  },
  {
    slug: "fragosela",
    title: "Fragosela",
    location: {
      pt: "Fragosela de Baixo, Viseu",
      en: "Fragosela de Baixo, Viseu",
    },
    description: {
      pt: "Atualmente em fase de construção, este projeto consiste em duas moradias geminadas de vanguarda. Focadas no futuro e na sustentabilidade, estas habitações unem o design contemporâneo à eficiência energética extrema, incluindo jardins amplos e garagens subterrâneas.",
      en: "Currently under construction, this project consists of two cutting-edge semi-detached houses. Focused on the future and sustainability, these dwellings merge contemporary design with extreme energy efficiency, featuring spacious gardens and underground garages.",
    },
    status: "under_construction",
    completionDate: "2027-03-31",
    features: {
      pt: [
        "Painéis solares fotovoltaicos e térmicos de alta performance",
        "Bomba de calor moderna para aquecimento eficiente",
        "Jardim e espaço exterior privativo de grandes dimensões",
        "Garagem subterrânea com carregamento elétrico",
      ],
      en: [
        "High-performance photovoltaic and thermal solar panels",
        "Modern heat pump for efficient heating",
        "Large private garden and outdoor space",
        "Underground garage with electric vehicle charging",
      ],
    },
    images: [
      {
        url: `${ImagesBasePath}/colina-verde-bedroom.jpg`,
        alt: {
          pt: "Quarto luminoso com design minimalista e acabamentos em madeira natural",
          en: "Luminous bedroom with minimalist design and natural wood finishes",
        },
      },
    ],
  },
];
