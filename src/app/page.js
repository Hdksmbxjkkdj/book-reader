import EpubReader from "./components/EpubReader/page";
import Waveform from "./components/VocalBook/page";
// import EpubReader from "./components/test/page";

export default function Home() {
  return <>
    <EpubReader url={"/alice.epub"}/>
    <Waveform url={"/test.mp3"} />
  </>;
}
