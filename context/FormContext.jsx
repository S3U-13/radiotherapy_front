import { createContext, useContext, useRef, useState, useMemo } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { useWarn } from "@/context/WarnContext"; // 👈 เพิ่ม

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const { DataFormById, FormListByHn, changeStatusWarn } = useApiRequest();
  const { loadDataCountWarn } = useWarn(); // 👈 ดึงมาใช้ตรงนี้
  const modalRef = useRef(null);

  const [formId, setFormId] = useState(null);
  const [modalEditForm1, setModalEditForm1] = useState(false);
  const [modalEditForm2, setModalEditForm2] = useState(false);
  const [modalEditForm3, setModalEditForm3] = useState(false);
  const [patFormData, setPatFormData] = useState(null);
  const [selectIdForm, setSelectIdForm] = useState(null);
  const [formPatList, setFormPatList] = useState([]);

  // ✅ memo object กัน re-render
  const FormByFormId = useMemo(
    () => ({
      1: setModalEditForm1,
      2: setModalEditForm2,
      3: setModalEditForm3,
    }),
    [],
  );

  // ✅ ไม่ block UI
  const loadForm = async (id) => {
    setFormId(id);
    setSelectIdForm(id);
    setPatFormData(null); // ให้ modal แสดง loading

    try {
      const res = await DataFormById(id);
      setPatFormData(res);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      const data = await FormListByHn();
      setFormPatList(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectIdForm = async (
    form_id,
    action_id,
    status,
    form_status,
    form_type_id,
  ) => {
    try {
      // 🔥 เปิด form ก่อน (UX ดี)
      loadForm(form_id);
      FormByFormId[form_type_id]?.(true);

      // 🔥 ยิง update status (ไม่ต้อง await ก็ได้)
      if (form_status === "pending") {
        const data = await changeStatusWarn(action_id, status);
        if (data) {
          loadDataCountWarn();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ memo context value (สำคัญมาก)
  const value = useMemo(
    () => ({
      formId,
      patFormData,
      loadForm,
      selectIdForm,
      modalRef,
      modalEditForm1,
      setModalEditForm1,
      modalEditForm2,
      setModalEditForm2,
      modalEditForm3,
      setModalEditForm3,
      fetchData,
      FormByFormId,
      handleSelectIdForm,
    }),
    [
      formId,
      patFormData,
      selectIdForm,
      modalEditForm1,
      modalEditForm2,
      modalEditForm3,
    ],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useForm = () => useContext(FormContext);
