import EpubReader from "@/app/components/EpubReader/page"

export default function Ebook() {
    return <>
        <EpubReader url={"/alice.epub"}/>
    </>
}