const getSelectOptions = (value, data) => {
  if (value === data) {
    return [
      { value: true, selected: true, label: "Yes" },
      { value: false, selected: false, label: "No" }
    ];
  } else {
    return [
      { value: false, selected: true, label: "No" },
      { value: true, selected: false, label: "Yes" }
    ];
  }
};

export default getSelectOptions;
