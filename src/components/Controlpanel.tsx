import React from 'react';
import { Shield, Briefcase, Archive, Microscope, Settings, BookOpen, ArrowRight } from 'lucide-react';
import './Controlpanel.css';

interface ControlPanelProps {
  title: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ title }) => {
  return (
    <div className="control-panel-container">
      <div className="control-panel-welcome">
        <h1 className="control-panel-title">
          {title}
        </h1>
      </div>

      <div className="control-panel-card">
        <div className="control-panel-card-header">
          <div className="control-panel-icon-wrapper">
            <BookOpen size={24} />
          </div>
          <h2 className="control-panel-card-title">
            Guía de Inicio Rápido
          </h2>
        </div>
        <div className="control-panel-card-content">
          <ol className="control-panel-list">
            <li>Utiliza el menú lateral para navegar entre las diferentes áreas del sistema</li>
            <li>Haz clic en cada área para expandir y ver los módulos disponibles</li>
            <li>Selecciona un módulo específico para acceder a sus funcionalidades</li>
            <li>Usa el botón de tema en la parte superior para cambiar entre modo claro y oscuro, tiene un icono de sol y luna</li>
          </ol>
        </div>
      </div>
    
      <div className="control-panel-section">

        <h2 className="control-panel-section-title">
          Áreas del Sistema
        </h2>
        <div className="control-panel-grid">
          {/* Seguridad */}
          <div className="control-panel-module-card module-security">
            <div className="control-panel-module-header">
              <div className="control-panel-icon-wrapper">
                <Shield size={24} strokeWidth={2} />
              </div>
              <h3 className="control-panel-module-title">
                Seguridad
              </h3>
            </div>
            <p className="control-panel-module-description">
              Gestión de usuarios, perfiles y permisos del sistema
            </p>
          </div>

          <div className="control-panel-module-card module-admin">
            <div className="control-panel-module-header">
              <div className="control-panel-icon-wrapper">
                <Briefcase size={24} strokeWidth={2} />
              </div>
              <h3 className="control-panel-module-title">
                Administrativo
              </h3>
            </div>
            <p className="control-panel-module-description">
              Administración de capturadores y aprobaciones
            </p>
          </div>

          <div className="control-panel-module-card module-collection">
            <div className="control-panel-module-header">
              <div className="control-panel-icon-wrapper">
                <Archive size={24} strokeWidth={2} />
              </div>
              <h3 className="control-panel-module-title">
                Colección
              </h3>
            </div>
            <p className="control-panel-module-description">
              Gestión de especímenes y base de datos entomológica
            </p>
          </div>

          <div className="control-panel-module-card module-research">
            <div className="control-panel-module-header">
              <div className="control-panel-icon-wrapper">
                <Microscope size={24} strokeWidth={2} />
              </div>
              <h3 className="control-panel-module-title">
                Investigación
              </h3>
            </div>
            <p className="control-panel-module-description">
              Herramientas de análisis e investigación científica
            </p>
          </div>

          <div className="control-panel-module-card module-system">
            <div className="control-panel-module-header">
              <div className="control-panel-icon-wrapper">
                <Settings size={24} strokeWidth={2} />
              </div>
              <h3 className="control-panel-module-title">
                Sistema
              </h3>
            </div>
            <p className="control-panel-module-description">
              Configuración y mantenimiento del sistema
            </p>
          </div>
        </div>
      </div>

      <div className="control-panel-help-section">
        <div>
          <h3 className="control-panel-help-title">
            ¿Necesitas más ayuda?
          </h3>
          <p className="control-panel-help-text">
           Utiliza nuestra demostración guiada del sistema.
          </p>
        </div>
        <div className="control-panel-help-action">
          <button className="control-panel-help-button">
            Comenzar 
            <span className="control-panel-help-button-icon">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ControlPanel;
