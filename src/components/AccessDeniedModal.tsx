import React from 'react';
import { LogOut, X } from 'lucide-react';

interface AccessDeniedModalProps {
    onClose: () => void;
    onLogout: () => void;
}

const AccessDeniedModal: React.FC<AccessDeniedModalProps> = ({ onClose, onLogout }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <div style={{
                position: 'relative',
                backgroundColor: 'var(--bg-card, #fff)',
                padding: '30px',
                borderRadius: '12px',
                maxWidth: '400px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                color: 'var(--text-color, #333)'
            }}>


                <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#EF4444' }}>Acceso Denegado</h2>
                <p style={{ marginBottom: '25px', fontSize: '1.1rem', lineHeight: '1.5' }}>
                    Su perfil o perfiles han sido eliminados o desactivados. <br/><br/>
                    <strong>Por favor, contáctese con su administrador.</strong>
                </p>

                <button
                    onClick={onLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#EF4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 500
                    }}
                >
                    <LogOut size={18} />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default AccessDeniedModal;
