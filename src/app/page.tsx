import Link from 'next/link';
import Image from 'next/image';
import { ImagesBasePath } from '@/app/constants';
// import { cookies } from 'next/headers';
import { getTranslations, getProjects, getFractions } from '@/data/api';

export default async function HomeAlt() {
  // TODO: add cookies
  // const cookieStore = await cookies();
  const locale = 'pt' // (cookieStore.get('NEXT_LOCALE')?.value || 'pt') as 'pt' | 'en';
  const t = getTranslations(locale);
  const projects = await getProjects();
  const availableFractions = await getFractions({ status: 'available' });

  return (
    <div className="relative pb-20">
      {/* High impact full-viewport Hero */}
      <section className="relative h-[90vh] flex items-center justify-center bg-[#0d0d0d] px-6 overflow-hidden">
        {/* Background photo fallback */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={`${ImagesBasePath}/colina-verde-living-room.jpg`}
            alt="Fração Ilustre Hero Background"
            fill
            className="object-cover filter grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-[#101010]/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
          <p className="text-[#edb154] font-display uppercase tracking-widest text-xs md:text-sm mb-4">
            {t.common.slogan}
          </p>
          <h1 className="font-display text-4xl md:text-7xl uppercase leading-none tracking-tighter text-white max-w-4xl">
            CONSTRUÇÃO DE <span className="text-[#edb154]">VANGUARDA</span> EM VISEU
          </h1>
          <p className="text-zinc-400 max-w-xl text-base md:text-lg mt-6 font-light">
            {locale === 'pt'
              ? 'Casas sustentáveis e apartamentos premium desenhados ao detalhe. Mais de 30 anos de experiência transformados em lares para a sua família.'
              : 'Sustainable houses and premium apartments designed in detail. More than 30 years of experience turned into homes for your family.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href="/marketplace" className="btn-primary px-8 py-3 rounded uppercase font-display text-sm tracking-wider">
              {t.nav.marketplace}
            </Link>
            <Link href="/projects" className="btn-secondary px-8 py-3 rounded uppercase font-display text-sm tracking-wider">
              {t.nav.portfolio}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects / Asymmetrical grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl md:text-5xl uppercase text-white mb-12">
          {locale === 'pt' ? 'O Nosso Portfólio' : 'Our Portfolio'}
        </h2>
        <div className="grid grid-cols-12 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.slug}
              className={idx % 2 === 0 ? "asymmetrical-grid-left" : "asymmetrical-grid-right"}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="vanguard-image-container relative h-[350px] md:h-[450px] w-full rounded border border-white/10 mb-4">
                  {project.images[0] && (
                    <Image
                      src={project.images[0].url}
                      alt={project.images[0].alt[locale]}
                      fill
                      className="vanguard-image object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-[#101010]/80 border border-white/10 px-3 py-1 text-xs uppercase tracking-wider text-white">
                    {project.status === 'completed' ? t.common.sold : t.common.available}
                  </div>
                </div>
                <h3 className="font-display text-xl uppercase text-white group-hover:text-[#edb154] transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm mt-1">{project.location[locale]}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}