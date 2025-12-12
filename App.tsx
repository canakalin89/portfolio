import React, { useState, useEffect, useCallback } from 'react';
import { 
    iconMap,
    GithubIcon, 
    ExternalLinkIcon, 
    EmailIcon,
    InstagramIcon,
    EditIcon,
    TrashIcon,
    PlusIcon
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
        iconBgColor: 'bg-violet-600',
        title: 'ChitIQ',
        subtitle: 'Yapay Zeka Destekli İngilizce Konuşma Asistanı',
        description: 'ChitIQ, Can AKALIN tarafından geliştirilen ve özellikle lise öğrencilerinin İngilizce konuşma sınavlarına hazırlanmalarını sağlamak amacıyla "Türkiye Yüzyılı Maarif Modeli"ne uygun olarak tasarlanmış, React ve Google Gemini yapay zeka teknolojileriyle güçlendirilmiş yenilikçi bir eğitim uygulamasıdır. Kullanıcıların seçtikleri veya serbest konulardaki konuşmalarını kaydedip analiz eden bu asistan; Uyum, Organizasyon, Sunum, Dil Kullanımı ve Yaratıcılık olmak üzere beş temel kriter üzerinden anlık puanlama, detaylı geri bildirim, ses dökümü (transkripsiyon) ve gelişim takibi sunarak dil öğrenim sürecini akıllı, etkileşimli ve veriye dayalı bir deneyime dönüştürür.',
        tags: ["Eğitim", "Yapay Zeka", "Gemini API", "React", "Maarif Modeli"],
        liveUrl: 'https://chitiq-v2-185961838379.us-west1.run.app',
        featured: true
    },
    {
        iconName: 'SheetIcon',
        iconBgColor: 'bg-indigo-600',
        title: 'OKULREHBER',
        subtitle: 'Dijital Rehberlik ve Bilgilendirme',
        description: 'Lise düzeyindeki eğitim kurumlarının dijital ekranlarında (kiosk/akıllı tahta) kullanılmak üzere tasarlanmış; MEB yönetmeliğine dayalı kuralları Google Gemini API desteğiyle sunan, Instagram hikayesi tarzı görsel efektlerle zenginleştirilmiş tam ekran dijital rehberlik uygulaması.',
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
        iconBgColor: 'bg-red-600',
        title: "Atatürk'ün Hayatı",
        subtitle: 'Dijital İz Projesi',
        description: "Mustafa Kemal Atatürk'ü anmak ve değerli fikirlerini gelecek nesillere aktarmak amacıyla hazırladığım özel bir proje.",
        tags: ["Tarih", "Eğitim"],
        githubUrl: 'https://github.com/canakalin89/atam-dijital-iz',
        liveUrl: 'https://atam-dijital-iz.lovable.app/',
        specialNote: {
            iconName: 'HeartIcon',
            text: "Bu proje, Atatürk'ün anısına saygı ve sevgiyle hazırlanmıştır.",
            color: 'red'
        }
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-red-700',
        title: 'İnkılap Tarihi Panosu',
        subtitle: 'İnteraktif Dijital Pano',
        description: 'İnkılap Tarihi dersleri için hazırlanmış interaktif bir dijital pano projesi. Öğrenmeyi görsel ve ilgi çekici hale getirir.',
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

const Header: React.FC = () => (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="font-bold text-xl text-slate-900">
                    Can Akalın
                </div>
                <nav className="space-x-8">
                    <a href="#projects" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Projeler</a>
                    <a href="#contact" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">İletişim</a>
                </nav>
            </div>
        </div>
    </header>
);

const Hero: React.FC = () => (
    <section className="bg-white">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Can Akalın</h1>
            <p className="mt-4 text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                İngilizce Öğretmeni & Hobi Geliştirici
            </p>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                İngilizce öğretmeni olarak çalışırken karşılaştığım sorunlara pratik çözümler üretmeye çalışıyorum. Geliştirdiğim bu basit araçların diğer öğretmen arkadaşlarımın da işini kolaylaştıracağını umuyorum.
            </p>
            <div className="mt-8">
                <a href="#projects" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                    Projelerimi Keşfet
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
    const noteColorClasses = {
        red: 'bg-red-50 border-red-400 text-red-700',
        indigo: 'bg-indigo-50 border-indigo-400 text-indigo-700',
        yellow: 'bg-yellow-50 border-yellow-400 text-yellow-700',
    };

    const MainIcon = iconMap[project.iconName] || iconMap.StarIcon;
    const NoteIcon = project.specialNote ? (iconMap[project.specialNote.iconName] || iconMap.WarningIcon) : null;
    const isFeatured = project.featured;
    
    return (
        <div className={`project-card bg-white rounded-2xl shadow-md overflow-hidden flex flex-col relative ${isFeatured ? 'md:col-span-2 lg:col-span-3 border-2 border-indigo-100 ring-4 ring-indigo-50/50' : ''}`}>
             {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button onClick={() => onEdit(project)} className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
                        <EditIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(project.title)} className="p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            )}
            
            <div className={`p-6 flex-grow ${isFeatured ? 'lg:flex lg:gap-8' : ''}`}>
                <div className={isFeatured ? 'lg:w-1/3 flex flex-col' : ''}>
                    <div className="flex items-center mb-4">
                        <div className={`flex-shrink-0 ${isFeatured ? 'w-16 h-16' : 'w-12 h-12'} ${project.iconBgColor} rounded-xl flex items-center justify-center mr-4 shadow-sm`}>
                            <MainIcon className={`${isFeatured ? 'w-8 h-8' : 'w-6 h-6'} text-white`} />
                        </div>
                        <div>
                            <h3 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-bold text-slate-900`}>{project.title}</h3>
                            <p className={`${isFeatured ? 'text-lg' : 'text-sm'} font-medium text-blue-600`}>{project.subtitle}</p>
                        </div>
                    </div>
                    {isFeatured && (
                         <div className="hidden lg:flex flex-col gap-3 mt-4">
                            {/* Desktop Buttons for Featured */}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200">
                                    <GithubIcon className="w-5 h-5 mr-2" /> GitHub
                                </a>
                            )}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg shadow-blue-100">
                                    <ExternalLinkIcon className="w-5 h-5 mr-2" /> Uygulamayı Dene
                                </a>
                            )}
                         </div>
                    )}
                </div>

                <div className={isFeatured ? 'lg:w-2/3 flex flex-col' : ''}>
                    <p className={`text-slate-600 mb-4 leading-relaxed ${isFeatured ? 'text-lg' : 'text-sm'} flex-grow`}>{project.description}</p>
                    {project.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map(tag => (
                                <span key={tag} className={`bg-slate-100 text-slate-600 ${isFeatured ? 'text-sm px-3 py-1' : 'text-xs px-2.5 py-1'} font-semibold rounded-full`}>{tag}</span>
                            ))}
                        </div>
                    )}
                    {project.specialNote && NoteIcon && (
                        <div className={`border-l-4 p-3 mb-4 ${noteColorClasses[project.specialNote.color]}`}>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <NoteIcon className={`h-5 w-5 ${noteColorClasses[project.specialNote.color].replace('bg-', 'text-').split(' ')[0]}`} />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">{project.specialNote.text}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom buttons - Show on mobile for featured, always for normal */}
            <div className={`px-6 pb-6 mt-auto ${isFeatured ? 'lg:hidden' : ''}`}>
                 <div className="flex flex-col sm:flex-row gap-3">
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-lg font-semibold text-center transition-colors duration-200 flex items-center justify-center text-sm">
                            <GithubIcon className="w-5 h-5 mr-2" /> GitHub
                        </a>
                    )}
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`flex-1 ${project.githubUrl ? 'bg-blue-600 hover:bg-blue-700' : 'w-full bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2.5 rounded-lg font-semibold text-center transition-colors duration-200 flex items-center justify-center text-sm`}>
                            <ExternalLinkIcon className="w-5 h-5 mr-2" /> {project.githubUrl ? 'Web Sitesi' : 'Uygulamayı Dene'}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

interface ProjectsProps {
    projects: Project[];
    isAdmin: boolean;
    onEdit: (project: Project) => void;
    onDelete: (title: string) => void;
    onAdd: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, isAdmin, onEdit, onDelete, onAdd }) => (
    <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900">Projelerim</h2>
                 {isAdmin && (
                    <button onClick={onAdd} className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-green-700 transition">
                        <PlusIcon className="w-5 h-5" /> Yeni Proje Ekle
                    </button>
                )}
                <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-1 rounded-full font-semibold text-sm mt-4">
                    <iconMap.StarIcon className="w-4 h-4 mr-2 text-amber-500" />
                    Tüm projeler yapay zeka desteği ile geliştirilmiştir
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(p => <ProjectCard key={p.title} project={p} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />)}
            </div>
        </div>
    </section>
);

const Contact: React.FC = () => (
    <section id="contact" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">İletişime Geçin</h2>
            <p className="text-lg text-gray-600 mb-8">Projeler hakkında merak ettiklerinizi sorabilir veya deneyimlerinizi paylaşabilirsiniz.</p>
            <div className="inline-flex flex-col sm:flex-row gap-4">
                <a href="mailto:canakalin59@gmail.com" className="contact-link group flex items-center justify-center bg-slate-100 hover:bg-blue-500 hover:text-white text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-200">
                    <EmailIcon className="w-6 h-6 mr-3 text-slate-500 group-hover:text-white transition-colors" />
                    <span>canakalin59@gmail.com</span>
                </a>
                <a href="https://www.instagram.com/can_akalin" target="_blank" rel="noopener noreferrer" className="contact-link group flex items-center justify-center bg-slate-100 hover:bg-pink-500 hover:text-white text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-200">
                    <InstagramIcon className="w-6 h-6 mr-3 text-slate-500 group-hover:text-white transition-colors" />
                    <span>@can_akalin</span>
                </a>
            </div>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="bg-slate-900 text-slate-400 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="mailto:canakalin59@gmail.com" className="hover:text-white transition-colors"><EmailIcon className="w-6 h-6" /></a>
                <a href="https://github.com/canakalin89" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><GithubIcon className="w-6 h-6" /></a>
                <a href="https://www.instagram.com/can_akalin" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><InstagramIcon className="w-6 h-6" /></a>
            </div>
            <p>© 2024 Can Akalın. Eğitim hayatımı kolaylaştıran araçları sizlerle paylaşıyorum.</p>
        </div>
    </footer>
);

interface ProjectFormProps {
    project: Project | null;
    onSave: (project: Project) => void;
    onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onClose }) => {
    const [formData, setFormData] = useState<Omit<Project, 'tags'> & { tags: string }>({
        title: '',
        subtitle: '',
        description: '',
        tags: '',
        iconName: 'StarIcon',
        iconBgColor: 'bg-gray-500',
        githubUrl: '',
        liveUrl: '',
    });

    useEffect(() => {
        if (project) {
            setFormData({ ...project, tags: project.tags.join(', ') });
        } else {
            setFormData({
                title: '', subtitle: '', description: '', tags: '',
                iconName: 'StarIcon', iconBgColor: 'bg-gray-500', githubUrl: '', liveUrl: ''
            });
        }
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) });
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-2xl font-bold mb-6">{project ? 'Proje Düzenle' : 'Yeni Proje Ekle'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Başlık" required className="p-2 border rounded col-span-2" />
                        <input name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Alt Başlık" required className="p-2 border rounded col-span-2" />
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Açıklama" required className="p-2 border rounded col-span-2 h-24" />
                        <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Etiketler (virgülle ayırın)" className="p-2 border rounded col-span-2" />
                        <select name="iconName" value={formData.iconName} onChange={handleChange} className="p-2 border rounded">
                            {Object.keys(iconMap).map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                        <input name="iconBgColor" value={formData.iconBgColor} onChange={handleChange} placeholder="İkon Arkaplan Rengi (örn: bg-blue-500)" className="p-2 border rounded" />
                        <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="p-2 border rounded col-span-2" />
                        <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} placeholder="Web Sitesi URL" className="p-2 border rounded col-span-2" />
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">İptal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    useEffect(() => {
        try {
            // Using v7 to force update the initial projects list
            const storedProjects = localStorage.getItem('portfolioProjects_v7');
            if (storedProjects) {
                setProjects(JSON.parse(storedProjects));
            } else {
                setProjects(initialProjects);
                localStorage.setItem('portfolioProjects_v7', JSON.stringify(initialProjects));
            }
        } catch (error) {
            console.error("Failed to parse projects from localStorage", error);
            setProjects(initialProjects);
        }
    }, []);

    useEffect(() => {
        if (projects.length > 0) {
           localStorage.setItem('portfolioProjects_v7', JSON.stringify(projects));
        }
    }, [projects]);
    
    const handleKeydown = useCallback((e: KeyboardEvent) => {
        if (e.ctrlKey && e.altKey && e.key === 'p') {
            e.preventDefault();
            setIsAdmin(prev => !prev);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [handleKeydown]);

    const handleAdd = () => {
        setProjectToEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (project: Project) => {
        setProjectToEdit(project);
        setIsModalOpen(true);
    };

    const handleDelete = (title: string) => {
        if (window.confirm(`'${title}' projesini silmek istediğinizden emin misiniz?`)) {
            setProjects(prev => prev.filter(p => p.title !== title));
        }
    };

    const handleSave = (projectData: Project) => {
        if (projectToEdit) {
            setProjects(prev => prev.map(p => p.title === projectToEdit.title ? projectData : p));
        } else {
            setProjects(prev => [...prev, projectData]);
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <Header />
            <main>
                <Hero />
                <Projects projects={projects} isAdmin={isAdmin} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
                <Contact />
            </main>
            <Footer />
            {isModalOpen && <ProjectForm project={projectToEdit} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default App;