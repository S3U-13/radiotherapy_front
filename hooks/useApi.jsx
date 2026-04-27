const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://locahost:3000";

export const useApiRequest = () => {
  const apiRequest = async (endpoint, method = "GET", body = null) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const options = {
      method,
      headers,
      credentials: "include", // ส่ง cookie HttpOnly อัตโนมัติ
    };
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

  const FormList = (page, limit, debounceSearch, status) =>
    apiRequest(
      `/api/user/form-radio-therapy-list?page=${page}&limit=${limit}&search=${debounceSearch}&status=${status}`,
      "GET",
    );
  const FormListByHn = (searchFormByHn) =>
    apiRequest(`/api/user/form-radio-therapy-list/${searchFormByHn}`, "GET");
  const DoctorCreateForm = async (value) => {
    try {
      const data = await apiRequest(
        "/api/user/create-form-radio-therapy",
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

  const Relation = () => apiRequest("/api/user/relation", "GET");

  // auth
  const meApi = async () => apiRequest("/api/me", "GET");
  const logoutApi = async () => apiRequest("/api/logout", "POST");

  const staffList = () => apiRequest("/api/user/manage-staff-index", "GET");

  const fetchDataUsers = (page, limit, debounceSearch) =>
    apiRequest(
      `/api/user/get-user-manage-staff?page=${page}&limit=${limit}&search=${debounceSearch}`,
      "GET",
    );

  const addOrDeleteStaff = async (payload) => {
    try {
      const data = await apiRequest(
        "/api/user/add-or-delete-manage-staff",
        "PUT",
        payload,
      );
      return data ?? null;
    } catch (error) {
      console.error(error);
    }
  };

  // signature
  const getSignature = () => apiRequest("/api/user/get-signature", "GET");

  const userAddSignature = async (value) => {
    try {
      const data = await apiRequest(
        "/api/user/user-add-or-edit-signature",
        "PUT",
        value,
      );
      return data ?? null;
    } catch (error) {
      console.error(error);
    }
  };

  const confirmSignModal = async (value) => {
    try {
      const data = await apiRequest(
        "/api/user/confirm-signature",
        "POST",
        value,
      );
      return data ?? null;
    } catch (error) {
      console.error(error);
    }
  };

  // fetch doctor
  const fetchDoctor = () =>
    apiRequest("/api/user/doctors-group-radio-therapy", "GET");

  // fetch count warn
  const fetchCountWarnPending = (type) =>
    apiRequest(`/api/user/count-warn?type=${type}`, "GET");

  const changeStatusWarn = (id, status) =>
    apiRequest(`/api/user/change-status-warn/${id}`, "PUT", {
      status,
    });

  const previewPDF = async (id) => {
    const res = await fetch(`${API_URL}/api/user/preview-generate-pdf/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    return await res.blob(); // 👈 ใช้ blob เท่านั้น
  };

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
    Relation,
    meApi,
    logoutApi,
    staffList,
    fetchDataUsers,
    addOrDeleteStaff,
    changeStatusWarn,
    // signature
    getSignature,
    userAddSignature,
    confirmSignModal,

    // fetch
    fetchDoctor,
    fetchCountWarnPending,
    previewPDF,
  };
};
