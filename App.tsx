import React, { useState, useEffect, useCallback } from 'react';
import { 
    iconMap,
    GithubIcon, 
    ExternalLinkIcon, 
    EmailIcon,
    InstagramIcon,
    EditIcon,
    TrashIcon,
    PlusIcon,
    StarIcon
} from './components/Icons';

// --- Type Definitions ---
type IconName = keyof typeof iconMap;

interface SpecialNote {
    iconName: IconName;
    text: string;
    color: 'red' | 'indigo' | 'yellow';
}

interface Project {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    iconName: IconName;
    iconBgColor: string;
    githubUrl?: string;
    liveUrl?: string;
    specialNote?: SpecialNote;
    featured?: boolean;
}

// --- Initial Data ---
const initialProjects: Project[] = [
    {
        iconName: 'MicIcon',
        iconBgColor: 'bg-indigo-600',
        title: 'ChitIQ',
        subtitle: 'Yapay Zeka Destekli İngilizce Konuşma Asistanı',
        description: 'ChitIQ, Can AKALIN tarafından geliştirilen ve lise öğrencilerinin İngilizce konuşma sınavlarına hazırlanmalarını sağlamak amacıyla "Türkiye Yüzyılı Maarif Modeli"ne uygun olarak tasarlanmış yenilikçi bir eğitim uygulamasıdır. Kullanıcıların konuşmalarını analiz ederek anlık puanlama ve detaylı geri bildirim sunar.',
        tags: ["Eğitim", "Yapay Zeka", "Gemini API", "React", "Maarif Modeli"],
        liveUrl: 'https://chitiq-v2-185961838379.us-west1.run.app',
        featured: true
    },
    {
        iconName: 'SheetIcon',
        iconBgColor: 'bg-emerald-600',
        title: 'OKULREHBER',
        subtitle: 'Dijital Rehberlik ve Bilgilendirme',
        description: 'Lise düzeyindeki eğitim kurumlarının dijital ekranlarında kullanılmak üzere tasarlanmış; MEB yönetmeliğine dayalı kuralları Google Gemini API desteğiyle sunan tam ekran dijital rehberlik uygulaması.',
        tags: ["Eğitim", "Dijital Pano", "Gemini API", "MEB"],
        liveUrl: 'https://okulrehber-185961838379.us-west1.run.app',
    },
    {
        iconName: 'DeskIcon',
        iconBgColor: 'bg-orange-500',
        title: 'Classmate Creator',
        subtitle: '9. Sınıf İngilizce İçerik Üreticisi',
        description: '9. Sınıf İngilizce dersi için öğrencilerin birbirlerini tanımalarına yönelik pratik yapabilecekleri, müfredata uygun içerikler oluşturan dijital bir araç.',
        tags: ["Eğitim", "İngilizce", "9. Sınıf", "Gemini API"],
        liveUrl: 'https://classmate-creator-9th-grade-english-185961838379.us-west1.run.app',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-rose-600',
        title: 'Atatürk Köşesi: Hikayeler',
        subtitle: 'Dijital Hikaye Kütüphanesi',
        description: 'Atatürk sevgisini aşılamak ve Cumhuriyet tarihini öğretmek amacıyla hazırlanan; görsel, işitsel ve metinsel içeriklerin harmanlandığı dijital hikaye anlatıcılığı uygulaması.',
        tags: ["Eğitim", "Tarih", "Atatürk", "Hikaye"],
        liveUrl: 'https://atat-rk-k-esi-hikayeler-185961838379.us-west1.run.app',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-red-600',
        title: "Atatürk'ün Hayatı",
        subtitle: 'Dijital İz Projesi',
        description: "Mustafa Kemal Atatürk'ü anmak ve fikirlerini gelecek nesillere aktarmak amacıyla hazırladığım interaktif bir yaşam öyküsü.",
        tags: ["Tarih", "Eğitim"],
        githubUrl: 'https://github.com/canakalin89/atam-dijital-iz',
        liveUrl: 'https://atam-dijital-iz.lovable.app/',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-red-700',
        title: 'İnkılap Tarihi Panosu',
        subtitle: 'İnteraktif Dijital Pano',
        description: 'İnkılap Tarihi dersleri için hazırlanmış interaktif bir dijital pano projesi. Görsel ve ilgi çekici bir öğrenim sağlar.',
        tags: ["Eğitim", "Tarih", "İnteraktif"],
        githubUrl: 'https://github.com/canakalin89/ata_pano',
        liveUrl: 'https://atam1923.netlify.app/',
    },
    {
        iconName: 'ClockIcon',
        iconBgColor: 'bg-purple-500',
        title: 'YKS Geri Sayım Sayacı',
        subtitle: 'Motivasyonel Geri Sayım',
        description: 'Üniversite sınavına hazırlanan öğrenciler için motivasyon sağlayan, hedeflere odaklanmaya yardımcı olan bir geri sayım aracı.',
        tags: ["Motivasyon", "Araç"],
        githubUrl: 'https://github.com/canakalin89/sayac_web',
        liveUrl: 'https://asalyks.netlify.app/',
    },
];

// --- Components ---

const BackgroundBlobs: React.FC = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
);

const Header: React.FC = () => (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                    CA
                </div>
                <span className="font-bold text-xl tracking-tight text-white">Can Akalın</span>
            </div>
            <nav className="hidden md:flex gap-8">
                <a href="#projects" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Fikirlerim</a>
                <a href="#contact" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">İletişim</a>
            </nav>
        </div>
    </header>
);

const Hero: React.FC = () => (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 text-center">
        <div className="max-w-4xl w-full space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                Eğitimi <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Yapay Zeka</span> ile Şekillendiriyorum
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Yapay zekanın sunduğu imkanları kullanarak eğitim süreçlerini daha etkili hale getirecek fikirler geliştiriyor ve bu projeleri meslektaşlarımla paylaşıyorum.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a href="#projects" className="px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:scale-105 transition shadow-xl shadow-white/5 w-full sm:w-auto">
                    Çalışmalarımı İncele
                </a>
                <a href="#contact" className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl border border-white/5 hover:bg-slate-700 transition w-full sm:w-auto">
                    İletişime Geç
                </a>
            </div>
        </div>
    </section>
);

interface ProjectCardProps {
    project: Project;
    isAdmin: boolean;
    onEdit: (project: Project) => void;
    onDelete: (title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isAdmin, onEdit, onDelete }) => {
    const MainIcon = iconMap[project.iconName] || iconMap.StarIcon;
    const isFeatured = project.featured;
    
    return (
        <div className={`glass-card group rounded-3xl overflow-hidden flex flex-col relative transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 ${isFeatured ? 'md:col-span-2' : ''}`}>
             {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <button onClick={() => onEdit(project)} className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
                        <EditIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(project.title)} className="p-2 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            )}
            
            <div className={`p-8 flex flex-col h-full ${isFeatured ? 'md:flex-row md:gap-10 md:items-center' : ''}`}>
                <div className={`${isFeatured ? 'md:w-1/3' : 'mb-6'}`}>
                    <div className={`w-16 h-16 ${project.iconBgColor} rounded-2xl flex items-center justify-center shadow-2xl mb-4 group-hover:scale-110 transition-transform duration-500`}>
                        <MainIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-indigo-400 font-semibold text-sm mb-4">{project.subtitle}</p>
                    
                    {isFeatured && (
                         <div className="hidden md:flex flex-col gap-3 mt-6">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center accent-gradient text-white px-6 py-3 rounded-2xl font-bold transition-all hover:opacity-90 shadow-lg shadow-indigo-500/20">
                                    <ExternalLinkIcon className="w-5 h-5 mr-2" /> Uygulamayı Başlat
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl font-bold transition-all hover:bg-white/10">
                                    <GithubIcon className="w-5 h-5 mr-2" /> Kaynak Kod
                                </a>
                            )}
                         </div>
                    )}
                </div>

                <div className={`${isFeatured ? 'md:w-2/3' : 'flex-grow flex flex-col'}`}>
                    <p className="text-slate-400 mb-6 leading-relaxed text-base">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    {!isFeatured && (
                        <div className="flex gap-3 mt-8">
                             {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 accent-gradient text-white px-4 py-3 rounded-2xl font-bold text-center text-sm transition-all hover:opacity-90">
                                    Dene
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 text-white rounded-2xl transition-all hover:bg-white/10">
                                    <GithubIcon className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Projects: React.FC<{ projects: Project[]; isAdmin: boolean; onEdit: any; onDelete: any; onAdd: any }> = ({ projects, isAdmin, onEdit, onDelete, onAdd }) => (
    <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Fikirlerim ve Ürettiklerim</h2>
                    <p className="text-slate-400 max-w-xl text-lg">
                        Eğitimi daha keyifli ve kolay hale getirmek için yapay zeka desteğiyle hayata geçirdiğim projelerim.
                    </p>
                </div>
                {isAdmin && (
                    <button onClick={onAdd} className="flex items-center gap-2 bg-indigo-500 text-white font-bold px-6 py-3 rounded-2xl hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/20">
                        <PlusIcon className="w-5 h-5" /> Yeni Ekle
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {projects.map((p, idx) => <ProjectCard key={p.title + idx} project={p} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />)}
            </div>
        </div>
    </section>
);

const Contact: React.FC = () => (
    <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto glass-card rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 accent-gradient rounded-full filter blur-[100px] opacity-10"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Yeni Bir Fikriniz mi Var?</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                Eğitim teknolojileri veya iş birlikleri hakkında konuşmak isterseniz bana her zaman ulaşabilirsiniz.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="mailto:canakalin59@gmail.com" className="flex items-center justify-center w-full md:w-auto bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold transition-transform hover:scale-105">
                    <EmailIcon className="w-6 h-6 mr-3" /> canakalin59@gmail.com
                </a>
                <a href="https://www.instagram.com/can_akalin" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full md:w-auto bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold transition-transform hover:scale-105 border border-white/5">
                    <InstagramIcon className="w-6 h-6 mr-3" /> @can_akalin
                </a>
            </div>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 accent-gradient rounded-lg flex items-center justify-center font-bold text-white text-xs">CA</div>
                <span className="text-slate-400 text-sm font-medium">© 2025 Can Akalın.</span>
            </div>
            <div className="flex gap-6">
                <a href="https://github.com/canakalin89" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <GithubIcon className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/can_akalin" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <InstagramIcon className="w-6 h-6" />
                </a>
            </div>
        </div>
    </footer>
);

// --- Admin Components ---
const ProjectForm: React.FC<{ project: Project | null; onSave: any; onClose: any }> = ({ project, onSave, onClose }) => {
    const [formData, setFormData] = useState<Omit<Project, 'tags'> & { tags: string }>({
        title: '', subtitle: '', description: '', tags: '',
        iconName: 'StarIcon', iconBgColor: 'bg-indigo-600', githubUrl: '', liveUrl: '',
        featured: false
    });

    useEffect(() => {
        if (project) setFormData({ ...project, tags: project.tags.join(', ') });
    }, [project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) });
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex justify-center items-center p-6">
            <div className="glass-card rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <form onSubmit={handleSubmit} className="p-10 space-y-6">
                    <h2 className="text-3xl font-bold text-white mb-8">{project ? 'Projeyi Düzenle' : 'Yeni Proje'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Proje Başlığı</label>
                            <input name="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Örn: ChitIQ" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Alt Başlık</label>
                            <input name="subtitle" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="Kısa açıklayıcı metin" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Açıklama</label>
                            <textarea name="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Proje detayları..." required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">İkon Seçimi</label>
                            <select name="iconName" value={formData.iconName} onChange={e => setFormData({...formData, iconName: e.target.value as IconName})} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                {Object.keys(iconMap).map(name => <option key={name} value={name}>{name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">İkon Rengi</label>
                            <input name="iconBgColor" value={formData.iconBgColor} onChange={e => setFormData({...formData, iconBgColor: e.target.value})} placeholder="bg-indigo-600" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Canlı Uygulama URL</label>
                            <input name="liveUrl" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                        <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded border-white/10" id="feat" />
                        <label htmlFor="feat" className="text-white font-medium">Öne Çıkarılmış Proje (Geniş görünür)</label>
                    </div>
                    <div className="flex justify-end gap-4 mt-10">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-slate-400 font-bold hover:text-white transition">Vazgeç</button>
                        <button type="submit" className="px-10 py-3 accent-gradient text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 transition">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- App Root ---

const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    const STORAGE_KEY = 'portfolioProjects_v11';

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setProjects(JSON.parse(stored));
        } else {
            setProjects(initialProjects);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
        }
    }, []);

    useEffect(() => {
        if (projects.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }, [projects]);
    
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.altKey && e.key === 'p') {
                e.preventDefault();
                setIsAdmin(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    const handleSave = (projectData: Project) => {
        if (projectToEdit) {
            setProjects(prev => prev.map(p => p.title === projectToEdit.title ? projectData : p));
        } else {
            setProjects(prev => [...prev, projectData]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen">
            <BackgroundBlobs />
            <Header />
            <main>
                <Hero />
                <Projects 
                    projects={projects} 
                    isAdmin={isAdmin} 
                    onAdd={() => { setProjectToEdit(null); setIsModalOpen(true); }} 
                    onEdit={(p: Project) => { setProjectToEdit(p); setIsModalOpen(true); }} 
                    onDelete={(title: string) => window.confirm('Silmek istediğine emin misin?') && setProjects(prev => prev.filter(p => p.title !== title))} 
                />
                <Contact />
            </main>
            <Footer />
            {isModalOpen && <ProjectForm project={projectToEdit} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default App;