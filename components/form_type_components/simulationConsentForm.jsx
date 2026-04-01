"use client";
import { Image } from "@heroui/image";
import React from "react";

export default function SimulationConsentForm({
  pat,
  pat_contact,
  form_data,
  choice,
}) {
  const choice_disease = choice.filter((c) => c.option_group_id === 7);
  const choice_contrast = choice.filter((c) => c.option_group_id === 2);
  const choice_seafood = choice.filter((c) => c.option_group_id === 1);
  const choice_drug = choice.filter((c) => c.option_group_id === 3);

  const select_choice_disease =
    form_data.congenital_disease?.map((i) => i.condition_id) || [];

  const contrastHistoryIds = form_data?.contrast_history_id
    ? [form_data.contrast_history_id]
    : [];
  const contrastAllergyIds = form_data?.contrast_allergy_id
    ? [form_data.contrast_allergy_id]
    : [];
  const contrastAllergyId = form_data?.contrast_allergy_id;
  const seafoodAllergyIds = form_data?.seafood_allergy_id
    ? [form_data.seafood_allergy_id]
    : [];
  const seafoodAllergyId = form_data?.seafood_allergy_id;
  const drugIds = form_data?.drug_allergy_id ? [form_data.drug_allergy_id] : [];
  const drugId = form_data?.drug_allergy_id;

  return (
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
              น้ำหนัก (Weight)
            </p>
            <p className="text-md font-semibold text-[#111827] dark:text-zinc-100">
              {pat?.weight || "-"} กก.
            </p>
          </div>
        </div>
      </section>

      {/* Medical History Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#111827] dark:text-zinc-100 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#111827] dark:bg-zinc-300 rounded-full inline-block"></span>
          ประวัติทางการแพทย์และการคัดกรอง (Medical History)
        </h2>

        <div className="space-y-8 px-2">
          {/* Question 1 */}
          <div>
            <p className="font-medium text-[#111827] dark:text-zinc-100 mb-4 text-base">
              1. ท่านมีโรคประจำตัวดังต่อไปนี้หรือไม่
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 pl-4 sm:pl-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
              {choice_disease.map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-gray-800 dark:text-zinc-300">
                    {item.name}
                  </span>
                  <div className="flex gap-4 text-sm text-gray-600 dark:text-zinc-400">
                    {select_choice_disease.includes(item.id) ? (
                      <>
                        <span className="flex items-center gap-1.5 text-[#111827] dark:text-zinc-100 font-medium">
                          <span className="text-lg leading-none">☑</span> มี
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-lg leading-none text-gray-300 dark:text-zinc-600">
                            ☐
                          </span>{" "}
                          ไม่มี
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1.5">
                          <span className="text-lg leading-none text-gray-300 dark:text-zinc-600">
                            ☐
                          </span>{" "}
                          มี
                        </span>
                        <span className="flex items-center gap-1.5 text-[#111827] dark:text-zinc-100 font-medium">
                          <span className="text-lg leading-none">☑</span> ไม่มี
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <p className="font-medium text-[#111827] dark:text-zinc-100 mb-3 text-base">
              2. ท่านเคยได้รับการฉีดสารทึบรังสีมาก่อนหรือไม่
            </p>
            <div className="flex flex-wrap gap-6 pl-4 sm:pl-6">
              {choice_contrast.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span
                    className={`text-xl leading-none ${contrastHistoryIds.includes(item.id) ? "text-[#111827] dark:text-zinc-100" : "text-gray-300 dark:text-zinc-600"}`}
                  >
                    {contrastHistoryIds.includes(item.id) ? "☑" : "☐"}
                  </span>
                  <span
                    className={`text-sm ${contrastHistoryIds.includes(item.id) ? "text-[#111827] dark:text-zinc-100 font-medium" : "text-gray-600 dark:text-zinc-400"}`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <p className="font-medium text-[#111827] dark:text-zinc-100 mb-3 text-base">
              3. ถ้าเคยตรวจ ท่านเเพ้สารทึบรังสีหรือไม่
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 pl-4 sm:pl-6">
              {choice_contrast.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span
                    className={`text-xl leading-none ${contrastAllergyIds.includes(item.id) ? "text-[#111827] dark:text-zinc-100" : "text-gray-300 dark:text-zinc-600"}`}
                  >
                    {contrastAllergyIds.includes(item.id) ? "☑" : "☐"}
                  </span>
                  <span
                    className={`text-sm ${contrastAllergyIds.includes(item.id) ? "text-[#111827] dark:text-zinc-100 font-medium" : "text-gray-600 dark:text-zinc-400"}`}
                  >
                    {item.name}
                  </span>
                  {contrastAllergyIds.includes(item.id) &&
                    [3, 5].includes(contrastAllergyId) &&
                    form_data.contrast_allergy_symptom && (
                      <span className="ml-2 text-sm text-red-600 dark:text-red-400 font-medium underline underline-offset-4 decoration-red-200">
                        (อาการ: {form_data.contrast_allergy_symptom})
                      </span>
                    )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-[#111827] dark:text-zinc-100 mb-3 text-base">
              4. ท่านมีประวัติเเพ้อาหารทะเลหรือไม่
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 pl-4 sm:pl-6">
              {choice_seafood.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span
                    className={`text-xl leading-none ${seafoodAllergyIds.includes(item.id) ? "text-[#111827] dark:text-zinc-100" : "text-gray-300 dark:text-zinc-600"}`}
                  >
                    {seafoodAllergyIds.includes(item.id) ? "☑" : "☐"}
                  </span>
                  <span
                    className={`text-sm ${seafoodAllergyIds.includes(item.id) ? "text-[#111827] dark:text-zinc-100 font-medium" : "text-gray-600 dark:text-zinc-400"}`}
                  >
                    {item.name}
                  </span>
                  {seafoodAllergyIds.includes(item.id) &&
                    [1].includes(seafoodAllergyId) &&
                    form_data.seafood_allergy_symptom && (
                      <span className="ml-2 text-sm text-red-600 dark:text-red-400 font-medium underline underline-offset-4 decoration-red-200">
                        (อาการ: {form_data.seafood_allergy_symptom})
                      </span>
                    )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-[#111827] dark:text-zinc-100 mb-3 text-base">
              5. ท่านมีประวัติเเพ้ยาอื่นๆอีกหรือไม่
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 pl-4 sm:pl-6">
              {choice_drug.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span
                    className={`text-xl leading-none ${drugIds.includes(item.id) ? "text-[#111827] dark:text-zinc-100" : "text-gray-300 dark:text-zinc-600"}`}
                  >
                    {drugIds.includes(item.id) ? "☑" : "☐"}
                  </span>
                  <span
                    className={`text-sm ${drugIds.includes(item.id) ? "text-[#111827] dark:text-zinc-100 font-medium" : "text-gray-600 dark:text-zinc-400"}`}
                  >
                    {item.name}
                  </span>
                  {drugIds.includes(item.id) &&
                    [6, 8].includes(drugId) &&
                    form_data.drug && (
                      <span className="ml-2 text-sm text-red-600 dark:text-red-400 font-medium underline underline-offset-4 decoration-red-200">
                        (อาการ: {form_data.drug})
                      </span>
                    )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-[#111827] dark:text-zinc-100 mb-3 text-base">
              6.ข้าพเจ้าขอรับรองว่าไม่ได้อยู่ในระหว่างตั้งครรภ์
              ขณะได้รับการตรวจด้วยวิธีดังกล่าว
            </p>
            <div className="pl-6">
              <p>
                (โดยประจำเดือนมาครั้งล่าสุดวันที่...............................................)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consent Section */}
      <section className="mt-8 border-t border-gray-200 dark:border-zinc-800 pt-10">
        <h2 className="text-lg font-semibold text-[#111827] dark:text-zinc-100 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#111827] dark:bg-zinc-300 rounded-full inline-block"></span>
          การแสดงเจตนายินยอม (Declaration of Consent)
        </h2>

        <div className="bg-gray-50 dark:bg-zinc-800/40 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-zinc-800/50">
          <p className="text-base leading-relaxed text-gray-700 dark:text-zinc-300 mb-6 text-justify indent-8">
            ข้าพเจ้า{" "}
            <span className="font-semibold text-[#111827] dark:text-zinc-100 border-b border-gray-400 px-2">
              {pat_contact?.name || "-"}
            </span>{" "}
            สถานะเป็นผู้เกี่ยวข้องคือ{" "}
            <span className="font-semibold text-[#111827] dark:text-zinc-100 border-b border-gray-400 px-2">
              {pat_contact?.relation || "-"}
            </span>{" "}
            ของผู้ป่วย ชื่อ{" "}
            <span className="font-semibold text-[#111827] dark:text-zinc-100 border-b border-gray-400 px-2">
              {pat?.name || "-"}
            </span>{" "}
            ได้รับทราบคำอธิบายข้างต้น
            รวมทั้งรับทราบถึงผลเเทรกซ้อนที่อาจจะเกิดขึ้นจากการตรวจดังกล่าวโดยละเอียดแล้ว
            ข้าพเจ้าจึง...
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
                  {form_data?.doctor_name ||
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
  );
}
