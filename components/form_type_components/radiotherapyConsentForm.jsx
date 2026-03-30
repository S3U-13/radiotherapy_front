"user client";
import { Image } from "@heroui/image";
import React from "react";

export default function RadiotherapyConsentForm({
  pat,
  pat_contact,
  form_data,
  choice,
}) {
  return (
    <div>
      <div className="w-full max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800/50 p-6 text-gray-800 dark:text-zinc-200">
        {/* Title Header */}

        {/* Patient Information Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[#111827] dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#111827] dark:bg-zinc-300 rounded-full inline-block"></span>
            ข้อมูลผู้ป่วย (Patient Information)
          </h2>
          <div className="bg-gray-50 dark:bg-zinc-800/40 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100 dark:border-zinc-800/50">
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-medium mb-1">
                ชื่อ-สกุล (Name)
              </p>
              <p className="text-md font-semibold text-[#111827] dark:text-zinc-100">
                {pat?.name || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-medium mb-1">
                อายุ (Age)
              </p>
              <p className="text-md font-semibold text-[#111827] dark:text-zinc-100">
                {pat?.age || "-"} ปี
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-medium mb-1">
                HN
              </p>
              <p className="text-md font-semibold text-[#111827] dark:text-zinc-100">
                {pat?.hn || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-medium mb-1">
                เจ็บป่วยด้วยโรคมะเร็ง
              </p>
              <p className="text-md font-semibold text-[#111827] dark:text-zinc-100">
                {pat?.disease || "-"}
              </p>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[#111827] dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#111827] dark:bg-zinc-300 rounded-full inline-block"></span>
            ข้อมูลญาติผู้ป่วย (Patient Contact)
          </h2>
          <div className="bg-gray-50 dark:bg-zinc-800/40 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100 dark:border-zinc-800/50">
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-medium mb-1">
                ชื่อ-สกุล (Name)
              </p>
              <p className="text-md font-semibold text-[#111827] dark:text-zinc-100">
                {pat_contact?.name || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-medium mb-1">
                มีความสัมพันธ์เป็น
              </p>
              <p className="text-md font-semibold text-[#111827] dark:text-zinc-100">
                {pat_contact?.relation || "-"}
              </p>
            </div>
          </div>
        </section>

        {/* Medical History Section */}

        {/* Consent Section */}
        <section className="mt-8 border-t border-gray-200 dark:border-zinc-800 pt-10">
          <h2 className="text-lg font-semibold text-[#111827] dark:text-zinc-100 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#111827] dark:bg-zinc-300 rounded-full inline-block"></span>
            การแสดงเจตนายินยอม (Declaration of Consent)
          </h2>

          <div className="bg-gray-50 dark:bg-zinc-800/40 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-zinc-800/50">
            <p className="text-base leading-relaxed text-gray-700 dark:text-zinc-300 text-justify indent-8 mb-2">
              ข้าพเจ้าเเละผู้เเทนของข้าพเจ้า เข้าใจถึงวิธีการรักษาด้วยรังสี คือ
              การฉายรังสีด้วยเครื่องฉายภาพนอกร่างกายผ่านตัวผู้ป่วยในท่านอนบนเตียงเฉพาะ
              โดยต้องสามารถนอนได้อย่างสงบเป็นเวลาอย่างน้อยประมาณ 15 นาที
            </p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-zinc-300 text-justify indent-8 mb-2">
              ข้าพเจ้าได้ทราบถึงประโยชน์ที่คาดว่าจะได้รับจากการรักษาด้วยรังสี
              เเละ ภาวะเเทรกซ้อนที่อาจเกิดจากการรักษาด้วยรังสี
              ทั้งที่อาจเกิดระหว่างการฉายรังสี
            </p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-zinc-300 text-justify indent-8 mb-6">
              ข้าพเจ้าเเละผู้เทนของข้าพเจ้าเข้าใจถึงข้อมูลอันเป็นประโยชน์ดังกล่าว
              เเละซักถามข้อมูลอันเป็นประโยชน์ต่อการตัดสินใจได้ครบถ่วนเเล้ว
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-8 justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-6 rounded-xl">
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg ${form_data.consent === 9 ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : ""}`}
              >
                <span
                  className={`text-2xl leading-none ${form_data.consent === 9 ? "text-green-600 dark:text-green-400" : "text-gray-300 dark:text-zinc-600"}`}
                >
                  {form_data.consent === 9 ? "☑" : "☐"}
                </span>
                <span
                  className={`text-base ${form_data.consent === 9 ? "text-green-700 dark:text-green-300 font-semibold" : "text-gray-600 dark:text-zinc-400"}`}
                >
                  ยินยอมให้ทำการตรวจ
                </span>
              </div>

              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg ${form_data.consent === 10 ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" : ""}`}
              >
                <span
                  className={`text-2xl leading-none ${form_data.consent === 10 ? "text-red-600 dark:text-red-400" : "text-gray-300 dark:text-zinc-600"}`}
                >
                  {form_data.consent === 10 ? "☑" : "☐"}
                </span>
                <span
                  className={`text-base ${form_data.consent === 10 ? "text-red-700 dark:text-red-300 font-semibold" : "text-gray-600 dark:text-zinc-400"}`}
                >
                  ไม่ยินยอมให้ทำการตรวจ
                </span>
              </div>
            </div>

            <p className="text-base text-gray-700 dark:text-zinc-300 mb-8 text-center">
              จึงได้ลงลายมือชื่อไว้เป็นหลักฐานสำคัญ
            </p>

            {/* Signature Placeholder */}
            <div className="space-y-6">
              <div className="flex justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4">
                <div className="flex flex-col items-center">
                  <Image
                    src={form_data.pat_sign}
                    alt=""
                    width={200}
                    height={100}
                  />
                  <div className="w-64 border-b border-gray-400 dark:border-zinc-500 mb-3"></div>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mb-1">
                    ({" "}
                    {pat_contact?.name ||
                      ".................................................."}{" "}
                    )
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 tracking-wider">
                    ผู้ป่วย / ตัวเเทนผู้ป่วย
                  </p>
                </div>
              </div>
              <div className="flex justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4">
                <div className="flex flex-col items-center">
                  <Image
                    src={form_data.doctor_sign}
                    alt=""
                    width={200}
                    height={100}
                  />
                  <div className="w-64 border-b border-gray-400 dark:border-zinc-500 mb-3"></div>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mb-1">
                    ({" "}
                    {pat_contact?.name ||
                      ".................................................."}{" "}
                    )
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 tracking-wider">
                    เเพทย์
                  </p>
                </div>
              </div>
              <div className="flex justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4">
                <div className="flex flex-col items-center">
                  <Image
                    src={form_data.staff_sign}
                    alt=""
                    width={200}
                    height={100}
                  />
                  <div className="w-64 border-b border-gray-400 dark:border-zinc-500 mb-3"></div>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mb-1">
                    ({" "}
                    {pat_contact?.name ||
                      ".................................................."}{" "}
                    )
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 tracking-wider">
                    นักรังสีการเเพทย์
                  </p>
                </div>
              </div>
              <div className="flex justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4">
                <div className="flex flex-col items-center">
                  <Image
                    src={form_data.nurse_sign}
                    alt=""
                    width={200}
                    height={100}
                  />
                  <div className="w-64 border-b border-gray-400 dark:border-zinc-500 mb-3"></div>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mb-1">
                    ({" "}
                    {pat_contact?.name ||
                      ".................................................."}{" "}
                    )
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 tracking-wider">
                    พยาบาล
                  </p>
                </div>
              </div>
              <div className="flex justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4">
                <div className="flex flex-col items-center">
                  <Image
                    src={form_data.witness_sign}
                    alt=""
                    width={200}
                    height={100}
                  />
                  <div className="w-64 border-b border-gray-400 dark:border-zinc-500 mb-3"></div>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mb-1">
                    ({" "}
                    {pat_contact?.name ||
                      ".................................................."}{" "}
                    )
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 tracking-wider">
                    พยาน
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
