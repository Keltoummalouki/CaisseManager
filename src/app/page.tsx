import NavBar from "@/components/Navbar"
import Fonctionalites from "@/components/Fonctionalites"
import Contact from "@/components/Contact"
import ClientsSection from "@/components/ClientsSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <NavBar />
      <Contact />
      <ClientsSection />
      <Fonctionalites />
      <Footer />
    </div>
  )
}
