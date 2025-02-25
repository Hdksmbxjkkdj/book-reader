import EpubReader from "./components/EpubReader/page";

export default function Home() {
  return <>
    <EpubReader url={"/ebadat.epub"}/>
    {/* <EpubReader url={"/pg28885.epub"}/> */}
  </>;
}
