import dynamic from "next/dynamic";

const loading = () => <p>Loading form...</p>;

export const formComponentMap = {
  1: dynamic(() => import("../form_type_components/simulationConsentForm"), {
    loading,
  }),
  2: dynamic(() => import("../form_type_components/radiotherapyConsentForm"), {
    loading,
  }),
  3: dynamic(() => import("../form_type_components/brachytherapyConsentForm"), {
    loading,
  }),
};
