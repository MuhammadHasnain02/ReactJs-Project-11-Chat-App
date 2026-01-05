import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RotatingLines } from "react-loader-spinner";

export default function PrivateRoute({ children }) {

    const { user, loading } = useAuth();

    // jab tak session check ho raha hai
    if (loading) {
        return (
            <div className="flex grow flex-col items-center justify-center">
                <RotatingLines
                    visible={true}
                    height="70"
                    width="70"
                    color="#4F39F6"
                    strokeWidth="5"
                    animationDuration="1"
                    ariaLabel="rotating-lines-loading"
                />
            </div>
        );
    }

    // agar user login nahi hai
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // agar user login hai
    return children;
  
}
