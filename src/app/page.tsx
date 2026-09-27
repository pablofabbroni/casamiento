import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Ceremony from "@/components/Ceremony";
import RSVP from "@/components/RSVP";
import Gallery from "@/components/Gallery";
import Gifts from "@/components/Gifts";
import Footer from "@/components/Footer";
import Music from "@/components/Music";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Countdown />
        <Ceremony />
        <RSVP />
        <Gallery />
        <Gifts />
      </main>
      <Footer />
      <Music />
    </>
  );
}