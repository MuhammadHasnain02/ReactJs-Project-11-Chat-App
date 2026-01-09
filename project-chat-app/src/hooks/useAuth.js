import { useState , useEffect } from "react";
import { supabase } from "../supabase/config";

export function useAuth() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // initial session
        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
            setLoading(false);
        });

        // listener
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                if (_event === "SIGNED_OUT") {
                    navigate("/login");
                }
            }
        );

        return () => listener.subscription.unsubscribe();
        
    }, []);

    return { user, loading };

}

// =======================================================

// import { useState, useEffect } from "react";
// import { supabase } from "../supabase/config";
// import { useNavigate } from "react-router-dom";

// export function useAuth() {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // 1. Initial Session Check
//         const getInitialSession = async () => {
//             try {
//                 const { data: { session } } = await supabase.auth.getSession();
//                 setUser(session?.user ?? null);
//             } catch (error) {
//                 console.error("Error getting session:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getInitialSession();

//         // 2. Listener for Auth Changes (Google login yahan catch hoga)
//         const { data: listener } = supabase.auth.onAuthStateChange(
//             async (event, session) => {
//                 console.log("Auth Event:", event); // Debugging ke liye
                
//                 const currentUser = session?.user ?? null;
//                 setUser(currentUser);
//                 setLoading(false);

//                 if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
//                     // Agar user dashboard ke bajaye URL fragment par hai, toh move karein
//                     if (window.location.pathname === "/" || window.location.hash.includes("access_token")) {
//                         navigate("/dashboard");
//                     }
//                 }

//                 if (event === "SIGNED_OUT") {
//                     setUser(null);
//                     navigate("/login");
//                 }
//             }
//         );

//         return () => {
//             listener?.subscription.unsubscribe();
//         };
//     }, [navigate]);

//     return { user, loading };
// }