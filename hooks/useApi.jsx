const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://locahost:3000";

export const useApiRequest = () => {
  const apiRequest = async (endpoint, method = "GET", body = null) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const options = { method, headers };
    if (body && method !== "GET") options.body = JSON.stringify(body);

    try {
      const res = await fetch(`${API_URL}${endpoint}`, options);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error;
    }
  };

  // service
  const calculateAge = (birthdate) => {
    if (!birthdate) return "";

    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    // ถ้ายังไม่ถึงวันเกิดของปีนี้ ให้ลบ 1
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return `${age}`;
  };

  const prenameApi = () => apiRequest("/api/user/prename", "GET");
  const fetchForm = () => apiRequest("/api/user/form", "GET");
  const fetchChoice = () => apiRequest("/api/user/choice", "GET");
  const SearchHn = async (value, form, setPat) => {
    try {
      const data = await apiRequest(`/api/user/pat/${value}`, "GET");
      const hasName = data?.prename || data?.firstname || data?.lastname;

      const fullname = hasName
        ? `${data?.prename ?? ""}${data?.firstname ?? ""} ${data?.lastname ?? ""}`.trim()
        : "";
      form.setFieldValue("pat_name", fullname || "");
      form.setFieldValue("hn", data?.hn || "");
      form.setFieldValue(
        "pat_age",
        calculateAge(data?.birthdatetime || "") || "",
      );

      setPat(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  const SearchVisit = (hn) => apiRequest(`/api/user/pat_visit/${hn}`);
  const SearchVitalsign = (visitId) =>
    apiRequest(`/api/user/pat_vitalsign/${visitId}`);

  const FormList = () => apiRequest("/api/user/form-radio-therapy-list", "GET");
  const FormListByHn = (searchFormByHn) =>
    apiRequest(`/api/user/form-radio-therapy-list/${searchFormByHn}`, "GET");
  const DoctorCreateForm = async (value) => {
    try {
      const data = await apiRequest(
        "/api/user/doc-create-form-radio-therapy",
        "POST",
        value,
      );
      return data ?? null;
    } catch (error) {
      console.error(error);
    }
  };
  const PatFillOutForm = async (payload, id) => {
    try {
      const data = await apiRequest(
        `/api/user/edit-form-radio-therapy/${id}`,
        "PUT",
        payload,
      );
      return data ?? null;
    } catch (error) {
      console.error(error);
    }
  };

  const DataFormById = (selectIdForm) =>
    apiRequest(`/api/user/form-by-id/${selectIdForm}`, "GET");

  return {
    prenameApi,
    fetchForm,
    fetchChoice,
    SearchHn,
    SearchVisit,
    SearchVitalsign,
    FormList,
    DoctorCreateForm,
    FormListByHn,
    DataFormById,
    PatFillOutForm,
  };
};
