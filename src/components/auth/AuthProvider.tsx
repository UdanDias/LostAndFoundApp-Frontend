import { error } from "console";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// interface AuthContextType {
//     isAuthenticated: boolean,
//     login: (token: string) => void;
//     logout: () => void;
// }
interface AuthContextType {
    isAuthenticated: boolean;
    role: string | null;
    login: (token: string) => void;
    logout: () => void;
    authLoading: boolean; // NEW
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [authLoading, setAuthLoading] = useState(true); // NEW

    useEffect(() => {
        const token = localStorage.getItem("LFToken");
        const savedRole = localStorage.getItem("LFRole");

        if (token) {
            setIsAuthenticated(true);
            setRole(savedRole);
        }

        setAuthLoading(false); // mark loading complete
    }, []);

    const login = (token: string) => {
        localStorage.setItem("LFToken", token);
        setIsAuthenticated(true);

        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        const role = decodedPayload?.role || decodedPayload?.roles?.[0];
        const userId = decodedPayload?.userId;

        if (role) {
            localStorage.setItem("LFRole", role);
            setRole(role);
        }
        if (userId) {
            localStorage.setItem("LFUserId", userId);
        }
    };

    const logout = () => {
        localStorage.removeItem("LFToken");
        localStorage.removeItem("LFRole");
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, role, authLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("context should be  used within qan authProvider")
    }
    return context;

}
export { AuthProvider };
