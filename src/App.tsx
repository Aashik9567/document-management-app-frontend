import PageRoutes from "./routes/Routes";
import { Toaster } from 'sonner';


function App() {
  return (
    <>
      <PageRoutes />
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </>
  );
}

export default App;