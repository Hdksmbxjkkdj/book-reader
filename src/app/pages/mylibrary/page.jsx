"use client";

import FormatNumber from "@/app/utils/application/FormatNumber";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyLibrary() {
  const [menu, setMenu] = useState(false);
  const user = {
    name: "علی قربانی",
    phone: "09935617912",
    cash: 0,
    books: [
      {
        id: 1,
        name: "کتاب صوتی کتابگرد ۹۷ | علی اصغر هنرمند",
        auther: "محسن پور رمضانی",
        image: "",
      },
      {
        id: 2,
        name: "کتاب صوتی کتاب شنبه (شماره بیست و سوم)",
        auther: "الهام نظری",
        image: "",
      },
      {
        id: 3,
        name: "کتاب صوتی کتابگرد ۹۸ | صادق داوری‌ فر",
        auther: "محسن پوررمضانی",
        image: "",
      },
    ],
    e_books: [
      {
        id: 1,
        name: "آلیس در سرزمین عجاییب (زبان اصلی)",
        auther: "لوییس کارول",
        image: "/alice.jpg",
      },
      {
        id: 2,
        name: "کتاب ۹ مرد موفق، ۹۰ رمز موفقیت",
        auther: "",
        image: "",
      },
    ],
  };
  const [doc, setDoc] = useState(null);
  useEffect(() => {
    setDoc(document.body);
  }, []);
  function hovering() {
    doc.classList.add("muted");
  }
  function unableHovering() {
    doc.classList.remove("muted");
  }
  function FirstWord(name) {
    return name[0];
  }
  return (
    <>
      <header className="!z-50 relative bg-white pt-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-6">
            <div>
              <img src="/logo.png" alt="logo" width={80} />
            </div>
            <div className="flex-grow">
              <div className="relative h-full rounded-full py-3 px-12 w-4/5 bg-gray-200">
                <button className="absolute right-4">
                  <svg
                    height="26px"
                    viewBox="0 -960 960 960"
                    width="26px"
                    fill="#353535"
                  >
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                </button>
                <input
                  className="bg-transparent w-full outline-none"
                  type="text"
                  placeholder="جست و جو در سایان"
                />
              </div>
            </div>
            <div
              className="relative"
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <Link
                href={"#"}
                className="rounded-full bg-gray-300/80 flex p-2 items-center gap-1 hover:bg-gray-300/100"
              >
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-orange-500 font-semibold text-xl">
                  {FirstWord(user.name)}
                </div>
                <p className="font-semibold">حساب کاربری</p>
                <div>
                  <svg
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                </div>
              </Link>
              {menu && (
                <div className="absolute left-0 !z-50 top-14">
                  <div className="bg-[#f5f5f5] p-4 shadow-lg rounded-2xl">
                    <ul className="w-[314px] flex flex-col gap-0">
                      <li className="hover:bg-gray-200 p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3 items-center">
                            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-orange-500 font-semibold text-xl">
                              {FirstWord(user.name)}
                            </div>
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p className="font-semibold">{user.phone}</p>
                            </div>
                          </div>
                          <div>
                            <svg
                              height="16px"
                              viewBox="0 -960 960 960"
                              width="16px"
                              fill="#5f6368"
                            >
                              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                            </svg>
                          </div>
                        </div>
                      </li>
                      <li className="hover:bg-gray-200 p-2">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold ">افزایش اعتبار</p>
                          <p className="font-semibold ">
                            (موجودی {FormatNumber(user.cash)} تومان)
                          </p>
                        </div>
                      </li>
                      <li className="hover:bg-gray-200 p-2">
                        <p className="font-semibold ">خرید اشتراک بینهایت</p>
                      </li>
                      <hr className="border-slate-400 my-2" />
                      <li className="hover:bg-gray-200 p-2">
                        <p className="text-xl ">کتاب های من</p>
                      </li>
                      <li className="hover:bg-gray-200 p-2">
                        <p className="text-xl ">رویش</p>
                      </li>
                      <li className="hover:bg-gray-200 p-2">
                        <p className="text-xl ">
                          تاریخچه پرداخت های الکترونیکی
                        </p>
                      </li>
                      <li className="hover:bg-gray-200 p-2">
                        <p className="text-xl ">کارنامه مطالعه</p>
                      </li>
                      <hr className="border-slate-400 my-2" />
                      <li className="hover:bg-gray-200 p-2">
                        <p className="text-xl ">ارتباط با پشتیبانی</p>
                      </li>
                      <li className="hover:bg-gray-200 p-2">
                        <p className="text-xl ">مدریت دستگاه ها</p>
                      </li>
                      <li className="hover:bg-gray-200 p-2">
                        <p className="text-xl ">خروج از حساب کاربری</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-scratch mt-4 pb-4 relative">
            <div className="flex gap-10">
              <div
                className="flex gap-2 items-center text-xl cursor-pointer group"
                onMouseEnter={hovering}
                onMouseLeave={unableHovering}
              >
                <svg
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
                </svg>
                <p>دسته بندی ها</p>
                <div className="group-hover:block hidden absolute h-[35rem] w-full bg-transparent top-10">
                  <div className="h-full w-full bg-white translate-y-6">
                    <div className="flex h-full p-4">
                      <div className="basis-1/4 h-full overflow-auto">
                        <ul className="flex flex-col gap-3">
                          <li className="line-clamp-1">کتاب رایگان</li>
                          <li className="line-clamp-1">کتاب صوتی</li>
                          <li className="line-clamp-1">کتاب الکترونیک</li>
                          <li className="line-clamp-1">رمان</li>
                          <li className="line-clamp-1">درسی</li>
                          <li className="line-clamp-1">دانشگاهی</li>
                          <li className="line-clamp-1">مهندسی</li>
                          <li className="line-clamp-1">پزشکی</li>
                        </ul>
                      </div>
                      <div className="basis-3/4 rounded-3xl border bg-gray-100 h-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center text-xl cursor-pointer relative">
                <svg
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" />
                </svg>
                <p>صوتی</p>
              </div>
              <div className="flex gap-2 items-center text-xl cursor-pointer relative">
                <svg
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M220-260q-92 0-156-64T0-480q0-92 64-156t156-64q37 0 71 13t61 37l68 62-60 54-62-56q-16-14-36-22t-42-8q-58 0-99 41t-41 99q0 58 41 99t99 41q22 0 42-8t36-22l310-280q27-24 61-37t71-13q92 0 156 64t64 156q0 92-64 156t-156 64q-37 0-71-13t-61-37l-68-62 60-54 62 56q16 14 36 22t42 8q58 0 99-41t41-99q0-58-41-99t-99-41q-22 0-42 8t-36 22L352-310q-27 24-61 37t-71 13Z" />
                </svg>
                <p>اشتراک بینهایت</p>
              </div>
            </div>
            <button className="rounded-full bg-gray-500 font-semibold text-white p-2 px-6 hover:bg-gray-600">
              نصب سایان
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-around items-center bg-gray-300 p-2 mt-4">
          <p className=" cursor-pointer font-semibold">کتاب الکترونیک</p>
          <p className=" cursor-pointer font-semibold">کتاب صوتی</p>
          <p className=" cursor-pointer font-semibold">نشان شده ها</p>
          <p className=" cursor-pointer font-semibold">سایان بینهایت</p>
        </div>
        <div className="flex mt-4 gap-4 flex-wrap">
          {user.books.map((book) => {
            return (
              <div
                className="rounded-md border border-gray-300 p-2 w-1/6 h-72"
                key={book.id}
              >
                <Link href={"/pages/vBook"}>
                  <img
                    className="w-full rounded-md h-3/5 object-cover object-center"
                    src={book.image ? book.image : "/defaultbook.jpg"}
                    alt="book"
                  />
                  <p className="font-semibold  line-clamp-2">{book.name}</p>
                  <p className="text-gray-500 text-sm mt-1">{book.auther}</p>
                </Link>
              </div>
            );
          })}
          {user.e_books.map((book) => {
            return (
              <div
                className="rounded-md border border-gray-300 p-2 w-1/6 h-72"
                key={book.id}
              >
                <Link href={"/pages/eBook"}>
                  <img
                    className="w-full rounded-md h-3/5 object-cover object-center"
                    src={book.image ? book.image : "/defaultbook.jpg"}
                    alt="book"
                  />
                  <p className="font-semibold  line-clamp-2">{book.name}</p>
                  <p className="text-gray-500 text-sm mt-1">{book.auther}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
