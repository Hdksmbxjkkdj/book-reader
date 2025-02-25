import Book from "./components/Book/page";
import EpubReader from "./components/EpubReader/page";

export default function Home() {
  return <>
    <Book url={"/pg28885.epub"}/>
    <EpubReader url={"/pg28885.epub"}/>
  </>;
}
