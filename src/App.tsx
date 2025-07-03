import PageRoutes from "./routes/Routes";
import { Toaster } from 'sonner';


function App() {
  return (
    <>
      <PageRoutes />
      <Toaster position="top-right"
        richColors closeButton
        duration={2000}
      />
    </>
  );
}

export default App;