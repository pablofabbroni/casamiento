import Hero from "@/components/Hero";
import Ceremony from "@/components/Ceremony";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import Gifts from "@/components/Gifts";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Music from "@/components/Music";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Ceremony />
        <Countdown />
        <RSVP />
        <Gifts />
        <Gallery />
      </main>
      <Footer />
      <Music />
    </>
  );
}