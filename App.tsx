import React from 'react';
import {
    BookOpenIcon,
    EmailIcon,
    ExternalLinkIcon,
    GithubIcon,
    InstagramIcon,
    MicIcon,
    PuzzleIcon,
} from './components/Icons';

type Project = {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    actionLabel: string;
    liveUrl: string;
    repoUrl?: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const projects: Project[] = [
    {
        title: 'ChitIQ Codex',
        subtitle: 'Konuşma pratiği ve değerlendirme',
        description:
            'Öğrencilerin konuşma sınavlarına hazırlanmasını kolaylaştıran, pratik ve geri bildirim odaklı ChitIQ sürümü.',
        tags: ['AI', 'Speaking', 'Practice'],
        actionLabel: 'Uygulamayı Aç',
        liveUrl: 'https://chitiq-codex.vercel.app/',
        repoUrl: 'https://github.com/canakalin89/chitiq_codex',
        icon: MicIcon,
    },
    {
        title: 'PikselPano',
        subtitle: 'Dijital okul panosu',
        description:
            'Okul koridorları ve sınıflar için tasarlanmış, içeriklerin kolayca yönetildiği dijital pano uygulaması.',
        tags: ['Dijital Pano', 'Okul', 'Web'],
        actionLabel: 'Siteyi Aç',
        liveUrl: 'https://www.pikselpano.com',
        icon: BookOpenIcon,
    },
    {
        title: 'Gelişim Raporu Asistanı',
        subtitle: 'Chrome uzantısı',
        description:
            'Gelişim raporu formlarını not tabanlı veya manuel olarak otomatik doldurur ve temizler. Giriş gerektirmez.',
        tags: ['Chrome', 'Otomasyon', 'E-Okul'],
        actionLabel: "Chrome'a Ekle",
        liveUrl:
            'https://chromewebstore.google.com/detail/geli%C5%9Fim-raporu-asistan%C4%B1/ljcjidfmpfnilniagebhccolaidkpogb',
        repoUrl: 'https://github.com/canakalin89/gelisim-raporu-asistani',
        icon: PuzzleIcon,
    },
    {
        title: 'e-Okul Kolay Not Girişi',
        subtitle: 'Chrome uzantısı',
        description:
            "Excel'den kopyalanan notları e-Okul sistemine toplu olarak yapıştırmayı sağlar. Yazılı, dinleme, konuşma, performans ve proje notlarını destekler.",
        tags: ['Chrome', 'e-Okul', 'Otomasyon'],
        actionLabel: "Chrome'a Ekle",
        liveUrl:
            'https://chromewebstore.google.com/detail/e-okul-kolay-not-giri%C5%9Fi/lpaoecjpkjpppnpcihejkhkffpnbcmbm',
        icon: PuzzleIcon,
    },
    {
        title: 'e-Okul Oturum Koruyucu',
        subtitle: 'Chrome uzantısı',
        description:
            'e-Okul ve MEBBİS sistemlerinde uzun form doldurma sırasında oturumun düşmesini önler. Hafif, gizlilik odaklı çalışır.',
        tags: ['Chrome', 'e-Okul', 'MEBBİS'],
        actionLabel: "Chrome'a Ekle",
        liveUrl:
            'https://chromewebstore.google.com/detail/e-okul-oturum-koruyucu/ehjkenpogkehihbildjheldefddobbkm',
        icon: PuzzleIcon,
    },
    {
        title: 'Atatürk İlke ve İnkılapları Panosu',
        subtitle: 'Dijital okul panosu',
        description:
            "Atatürk'ün ilke ve inkılaplarını görsel bir zaman çizelgesi, canlı saat, TTS ve kiosk kullanımıyla sunar.",
        tags: ['Tarih', 'Kiosk', 'TTS'],
        actionLabel: 'Panoyu Aç',
        liveUrl: 'https://ata1923.netlify.app',
        repoUrl: 'https://github.com/canakalin89/ata_pano',
        icon: BookOpenIcon,
    },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const Icon = project.icon;

    return (
        <article className="project-card">
            <div className="flex items-start justify-between gap-4">
                <div className="project-icon">
                    <Icon className="h-5 w-5" />
                </div>
                <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className="card-body mt-6">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
            </div>

            <div className="mt-auto pt-6">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                        <ExternalLinkIcon className="h-4 w-4" />
                        {project.actionLabel}
                    </a>
                    {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                            <GithubIcon className="h-4 w-4" />
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};

const App: React.FC = () => {
    return (
        <div className="min-h-screen text-slate-100">
            <nav className="nav">
                <div className="nav-inner">
                    <a href="/" className="nav-brand">CAN HOCA</a>
                    <div className="nav-links">
                        <a href="mailto:canakalin59@gmail.com" className="icon-link" title="E-posta">
                            <EmailIcon className="h-4 w-4" />
                        </a>
                        <a
                            href="https://www.instagram.com/can_akalin"
                            target="_blank"
                            rel="noreferrer"
                            className="icon-link"
                            title="Instagram"
                        >
                            <InstagramIcon className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </nav>

            <header className="container hero">
                <div>
                    <p className="eyebrow">Can Akalın</p>
                    <h1 className="hero-title mt-5 max-w-3xl text-4xl font-extrabold sm:text-5xl md:text-7xl">
                        Eğitim için sade, hızlı ve işe yarayan araçlar.
                    </h1>
                </div>
                <div className="hero-note">
                    <p>
                        Sınıf, okul ve öğretmen iş akışları için geliştirilen küçük ama etkili uygulamalar.
                        Odak noktası net: pratik kullanım, temiz arayüz ve gerçek ihtiyaçlar.
                    </p>
                </div>
            </header>

            <main className="container" style={{ paddingBottom: '6rem' }}>
                <div className="section-heading">
                    <p>Seçili Projeler</p>
                    <span>{projects.length} proje</span>
                </div>

                <section className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </section>
            </main>

            <footer className="footer">
                &copy; 2026 Can Akalın
            </footer>
        </div>
    );
};

export default App;
