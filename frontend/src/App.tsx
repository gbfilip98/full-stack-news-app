import { NewsProvider } from "./context/NewsContext";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <NewsProvider>
      <AppRouter />
    </NewsProvider>
  );
};

export default App;
