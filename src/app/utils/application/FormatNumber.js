export default function FormatNumber(number) {
  const formatedNumber = new Intl.NumberFormat("IR-fa", {
    style: "decimal",
  }).format(number);
  return formatedNumber;
}
