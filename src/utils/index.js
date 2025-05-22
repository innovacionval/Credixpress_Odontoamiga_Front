export const functionToMoney = (value) => {
  if (!value) return "0";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export const moneyToFunction = (value) => {
  if (!value) return 0;
  return Number(value.replace(/\./g, "").replace(/\$/g, ""));
};

export const dateSimulator = (date, day, quotes = 0, endDate = false) => {
  quotes = Number(quotes);
  if (!date) return "";
  const newDate = new Date(date);
  if (!endDate) {
    newDate.setMonth(newDate.getMonth() + 1);
  }else {
    newDate.setMonth(newDate.getMonth() + (quotes + 1));
  }
  newDate.setDate(day);

  return newDate.toISOString().split("T")[0];
};
