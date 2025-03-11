import EpubReader from "./components/EpubReader/page";
import Waveform from "./components/VocalBook/page";
import MyLibrary from "./pages/mylibrary/page";
// import EpubReader from "./components/test/page";

export default function Home() {
  return <>
  <MyLibrary/>
    {/* <EpubReader url={"/alice.epub"}/>
    <Waveform url={"/test.mp3"} /> */}
  </>;
}
