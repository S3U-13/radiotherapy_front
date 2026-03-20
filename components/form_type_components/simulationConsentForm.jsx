"use client";
import React from "react";

export default function SimulationConsentForm({
  pat,
  pat_contact,
  form_data,
  choice,
}) {
  const choice_disease = choice.filter((c) => c.option_group_id === 7);
  const choice_contrast = choice.filter((c) => c.option_group_id === 2);

  const select_choice_disease = form_data.congenital_disease.map(
    (i) => i.condition_id,
  );
  const contrastHistoryIds = form_data?.contrast_history_id
    ? [form_data.contrast_history_id]
    : [];
  const contrastAllergyIds = form_data?.contrast_allergy_id
    ? [form_data.contrast_allergy_id]
    : [];
  const contrastAllergyId = form_data?.contrast_allergy_id;

  return (
    <div>
      <section>
        <div>
          <p>ชื่อ-สกุล ผู้ป่วย {pat.name}</p>
          <p>อายุ {pat.age}</p>
          <p>HN {pat.hn}</p>
          <p>น้ำหนัก {pat.weight}</p>
        </div>
      </section>
      <section>
        <p>1.ท่านมีโรคประจำตัวดังต่อไปนี้หรือไม่</p>
        <div className="grid grid-cols-2 px-4">
          {choice_disease.map((item) => (
            <p key={item.id}>
              {" "}
              {item.name}{" "}
              {select_choice_disease.includes(item.id)
                ? "☑ มี ☐ ไม่มี"
                : "☐ มี ☑ ไม่มี"}
            </p>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          {" "}
          <p>2.ท่านเคยได้รับการฉีดสารทึบรังสีมาก่อนหรือไม่</p>
          {choice_contrast.map((item) => (
            <p key={item.id}>
              {" "}
              {contrastHistoryIds.includes(item.id) ? "☑" : "☐"}
              {item.name}
            </p>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          {" "}
          <p>3.ถ้าเคยตรวจท่านเเพ้สารทึบรังสีหรือไม่</p>
          {choice_contrast.map((item) => (
            <p key={item.id}>
              {" "}
              {contrastAllergyIds.includes(item.id) ? "☑" : "☐"}
              {item.name}
              {[3, 5].includes(contrastAllergyId)
                ? form_data.contrast_allergy_symptom
                : ""}
            </p>
          ))}
        </div>
      </section>
      <section>
        <p>ข้าพเจ้า {pat_contact.name} ผู้ป่วย/ตัวเเทนผู้ป่วย</p>
        <p>โดยเกี่ยวข้องเป็น {pat_contact.relation} ของผู้ป่วย</p>
        <p>
          ชื่อ {pat.name} ได้รับทราบคำอธิบายข้างต้น
          รวมทั้งผลเเทรกซ้อนที่อาจจะเกิดขึ้นจากการตรวจดังกล่าว โดยข้าพเจ้า
        </p>
        <div>
          <p>
            {form_data.consent === 9 ? "☑ ยินยอมให้ตรวจ" : "☐ ยินยอมให้ตรวจ"}
          </p>
          <p>
            {form_data.consent === 10
              ? "☑ ไม่ยินยอมให้ทำการตรวจ"
              : "☐ ไม่ยินยอมให้ทำการตรวจ"}
          </p>
          <p>จึงได้ลงลายมือชื่อไว้เป็นหลักฐาน</p>
        </div>
      </section>
    </div>
  );
}
