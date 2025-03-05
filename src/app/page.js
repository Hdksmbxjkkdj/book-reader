import EpubReader from "./components/EpubReader/page";
// import EpubReader from "./components/test/page";

export default function Home() {
  return <>
    <EpubReader url={"/ebadat.epub"}/>
  </>;
}
