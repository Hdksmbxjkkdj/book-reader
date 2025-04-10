'use client'

import EPUBViewer from "@/app/components/Reader/page";
import dynamic from "next/dynamic"
// import EpubReader from "@/app/components/EpubReader/page"
const EpubReader = dynamic(() => import("@/app/components/EpubReader/page"), { ssr: false });

export default function Ebook() {
    return <>
    <EPUBViewer/>
        {/* <EpubReader key={Math.random()} url={"/ebadat.epub"}/> */}
    </>
}