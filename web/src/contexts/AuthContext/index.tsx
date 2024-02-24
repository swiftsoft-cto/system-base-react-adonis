// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../../services/api';

interface AuthContextData {
    isAuthenticated: boolean;
    userAccessLevel: number | null;
    validateToken: () => Promise<void>;
    loading: boolean;
    updateUserAccessLevel: (level: number) => void;
    setIsAuthenticated: (value: boolean) => void; // Adicione esta linha
}



interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Mantenha esta linha como está
    const [userAccessLevel, setUserAccessLevel] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);


    const updateUserAccessLevel = (level: number) => {
        setUserAccessLevel(level);
    };

    const validateToken = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        try {
            const response = await api.get('/validate-token');
            if (response.data.isValid) {
                setIsAuthenticated(true);
                setUserAccessLevel(response.data.id_profile);
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Erro ao validar o token:', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            userAccessLevel,
            loading,
            validateToken,
            updateUserAccessLevel,
            setIsAuthenticated, // Isso refere-se à função de atualização do useState
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
