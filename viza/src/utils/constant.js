export const valildateEmailLogin = (_, value) => {
  const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!value) {
    return Promise.reject("Email is required.");
  }
  if (!emailRegex.test(value)) {
    return Promise.reject("The input is not a valid email!");
  }
  return Promise.resolve();
};
export const WidthandHeightIcon = {
  width: "18",
  height: "18",
};

export const chooseState = [
  { value: "Andhra Pradesh" },
  { value: "Arunachal Pradesh" },
  { value: "Assam" },
  { value: "Bihar" },
  { value: "Chandigarh (UT)" },
  { value: "Chhattisgarh" },
  { value: "Dadra and Nagar Haveli (UT)" },
  { value: "Daman and Diu (UT)" },
  { value: "Delhi (NCT)" },
  { value: "Goa" },
  { value: "Gujarat" },
  { value: "Haryana" },
  { value: "Himachal Pradesh" },
  { value: "Jammu and Kashmir" },
  { value: "Jharkhand" },
  { value: "Karnataka" },
  { value: "Kerala" },
  { value: "Lakshadweep (UT)" },
  { value: "Madhya Pradesh" },
  { value: "Maharashtra" },
  { value: "Manipur" },
  { value: "Meghalaya" },
  { value: "Mizoram" },
  { value: "Nagaland" },
  { value: "Odisha" },
  { value: "Puducherry (UT)" },
  { value: "Punjab" },
  { value: "Rajasthan" },
  { value: "Sikkim" },
  { value: "Tamil Nadu" },
  { value: "Telangana" },
  { value: "Tripura" },
  { value: "Uttarakhand" },
  { value: "Uttar Pradesh" },
  { value: "West Bengal" },
];