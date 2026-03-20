"use client";
import dynamic from "next/dynamic";
import { formComponentMap } from "../form-config/formComponentMap";

export default function FormRenderer({
  formTypeId,
  pat,
  pat_contact,
  form_data,
  choice,
}) {
  const Component = formComponentMap[formTypeId];

  if (!Component) return null;

  return (
    <Component
      pat={pat}
      pat_contact={pat_contact}
      form_data={form_data}
      choice={choice}
    />
  );
}
