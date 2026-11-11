import { Header, Hero, Products, Capabilities, About, Contact, Footer } from "./components/Sections";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
