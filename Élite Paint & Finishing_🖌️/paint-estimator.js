
(() => {
  const form = document.getElementById("paintEstimateForm");
  if (!form) return;

  const $ = id => document.getElementById(id);

  const money = value =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);

  function calculate() {
    const area = Math.max(0, Number($("paintArea").value) || 0);
    const rate = Number($("paintService").value) || 0;
    const condition = Number($("paintCondition").value) || 1;
    const coats = Number($("paintCoats").value) || 1;

    const labor = area * rate * condition;
    const liters = Math.ceil(area * coats / 10);

    const materials = $("paintMaterials").value === "yes"
      ? liters * (Number($("paintType").value) || 0)
      : 0;

    $("paintLabor").textContent = money(labor);
    $("paintMaterialCost").textContent = money(materials);
    $("paintTotal").textContent = money(labor + materials);

    return { area, coats, labor, materials, total: labor + materials };
  }

  form.addEventListener("input", calculate);
  form.addEventListener("change", calculate);

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const r = calculate();

    if (r.area <= 0) {
      $("paintArea").focus();
      return;
    }

    const service = $("paintService");
    const condition = $("paintCondition");
    const type = $("paintType");

    const date = $("paintDate").value;
    const formattedDate = date
      ? new Date(date + "T12:00:00").toLocaleDateString("pt-BR")
      : "A combinar";

    const message = [
      "Olá! Gostaria de solicitar um orçamento à Élite Paint & Finishing.",
      "",
      "Nome: " + ($("paintName").value.trim() || "Não informado"),
      "Local: " + $("paintLocation").value.trim(),
      "Serviço: " + service.options[service.selectedIndex].text,
      "Área: " + r.area + " m²",
      "Condição da parede: " + condition.options[condition.selectedIndex].text,
      "Demãos: " + r.coats,
      "Materiais: " + ($("paintMaterials").value === "yes"
        ? type.options[type.selectedIndex].text
        : "Somente mão de obra"),
      "Data desejada: " + formattedDate,
      "Período: " + $("paintPeriod").value,
      "",
      "Mão de obra: " + money(r.labor),
      "Materiais: " + money(r.materials),
      "TOTAL ESTIMADO: " + money(r.total),
      "",
      "Valor sujeito à avaliação do profissional."
    ].join("\n");

    const url =
      "https://wa.me/5531975231969?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  });

  calculate();
})();
    
