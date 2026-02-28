import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Bug, 
  LogOut, 
  LayoutDashboard,
  Sun,
  Moon,
  Shield,
  Briefcase,
  Archive,
  Microscope,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu
} from 'lucide-react';
import './Sidebar.css';

import AccessDeniedModal from './AccessDeniedModal';

interface Module {
  idModule: number;
  name: string;
  description: string;
  area: string;
  status: number;
}

interface GroupedModules {
  [area: string]: Module[];
}

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [modules, setModules] = useState<GroupedModules>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedAreas, setExpandedAreas] = useState<string[]>([]);
  const [showRestrictedModal, setShowRestrictedModal] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`/api/modules?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch modules');
        }
        const data: Module[] = await response.json();
        
        const grouped = data.reduce((acc, module) => {
          if (!acc[module.area]) {
            acc[module.area] = [];
          }
          acc[module.area].push(module);
          return acc;
        }, {} as GroupedModules);

        setModules(grouped);
        setExpandedAreas([]); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [user?.id]);

  const toggleArea = (area: string) => {
    setExpandedAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area) 
        : [...prev, area]
    );
  };

  const getAreaIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case 'seguridad': return Shield;
      case 'administrativo': return Briefcase;
      case 'coleccion': return Archive;
      case 'investigacion': return Microscope;
      case 'sistema': return Settings;
      default: return Menu;
    }
  };


  if (user?.profileId === 6) {
      return (
          <>
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h1 className="sidebar-title">
                            <Bug className="sidebar-logo-icon" />
                            <span>Barra de Navegación</span>
                        </h1>
                        <button 
                            onClick={toggleTheme}
                            className="theme-toggle-btn"
                            title={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>
                    <p className="sidebar-subtitle">
                        Sin Acceso
                    </p>
                </div>
                <div className="sidebar-nav">
                </div>
                <div className="sidebar-footer">
                    <button
                        onClick={logout}
                        className="logout-btn"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>
            {showRestrictedModal && (
                <AccessDeniedModal 
                    onClose={() => setShowRestrictedModal(false)} 
                    onLogout={logout} 
                />
            )}
          </>
      );
  }

  if (loading) return <aside className="sidebar">Fetching...</aside>;
  if (error) return <aside className="sidebar">Error: {error}</aside>;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 className="sidebar-title">
            <Bug className="sidebar-logo-icon" />
            <span>Entomología</span>
          </h1>
          <button 
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
            to="/controlpanel"
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
            <LayoutDashboard size={18} />
            Panel de Control
        </NavLink>

        {loading && <div style={{padding: '16px', fontSize: '0.9rem', color: '#666'}}>Cargando menú...</div>}
        
        {error && (
            <div style={{padding: '16px', fontSize: '0.85rem', color: '#EF4444'}}>
                <p style={{marginBottom: '8px'}}>Error cargando módulos</p>
                <button 
                    onClick={() => window.location.reload()} 
                    style={{
                        padding: '4px 8px', 
                        fontSize: '0.8rem', 
                        background: 'var(--bg-subtle)', 
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Reintentar
                </button>
            </div>
        )}

        {!loading && !error && Object.entries(modules).map(([area, areaModules]) => {
          const Icon = getAreaIcon(area);
          const isExpanded = expandedAreas.includes(area);

          return (
            <div key={area} className="nav-group">
              <button 
                className={`nav-item nav-group-toggle ${isExpanded ? 'expanded active' : ''}`}
                onClick={() => toggleArea(area)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} />
                  {area}
                </div>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              
              {isExpanded && (
                <div className="nav-group-children">
                  {areaModules.map(module => (
                    <NavLink
                      key={module.idModule}
                      to="#"
                      className={({ isActive }) =>
                        `nav-item nav-child ${isActive ? 'active' : ''}`
                      }
                      title="Página en construcción"
                    >
                      <span className="nav-indicator">•</span>
                      {module.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={logout}
          className="logout-btn"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
