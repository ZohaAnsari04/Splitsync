import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Debugging: log when the app is mounted
console.log("App is mounting");

createRoot(document.getElementById("root")!).render(<App />);