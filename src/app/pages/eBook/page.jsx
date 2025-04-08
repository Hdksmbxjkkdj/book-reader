'use client'

import CustomEpubReader from "@/app/components/Reader/page";
import dynamic from "next/dynamic"
// import EpubReader from "@/app/components/EpubReader/page"
const EpubReader = dynamic(() => import("@/app/components/EpubReader/page"), { ssr: false });

export default function Ebook() {
    return <>
    <CustomEpubReader url={"/alice.epub"}/>
        {/* <EpubReader key={Math.random()} url={"/alice.epub"}/> */}
    </>
}