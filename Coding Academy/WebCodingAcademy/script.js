const navButtons = document.querySelectorAll('.nav-btn');
const navigationTriggers = document.querySelectorAll('[data-target]');
const panels = document.querySelectorAll('.panel');

navigationTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;

    navButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.target === targetId));

    panels.forEach((panel) => {
      const isActive = panel.id === targetId;
      panel.classList.toggle('hidden', !isActive);
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  });
});

const form = document.getElementById('registrationForm');
const resultCard = document.getElementById('resultCard');
const resultContent = document.getElementById('resultContent');
const languageOptions = [...document.querySelectorAll('input[name="language"]')];
const firstLanguageOption = languageOptions[0];

function validateLanguageSelection() {
  const hasSelection = languageOptions.some((option) => option.checked);
  firstLanguageOption.setCustomValidity(hasSelection ? '' : 'Pilih minimal satu bahasa pemrograman yang diminati.');
}

languageOptions.forEach((option) => {
  option.addEventListener('change', validateLanguageSelection);
});
validateLanguageSelection();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nik = document.getElementById('nik').value.trim();
  const nama = document.getElementById('nama').value.trim();
  const gender = document.getElementById('gender').value;
  const phone = document.getElementById('phone').value.trim();
  const alamat = document.getElementById('alamat').value.trim();

  const selectedLanguages = languageOptions.filter((item) => item.checked).map((item) => item.value);

  const confirmed = window.confirm('Apakah Anda sudah yakin untuk menyimpan?');

  if (!confirmed) {
    return;
  }

  const resultRows = [
    ['NIK', nik],
    ['Nama lengkap', nama],
    ['Jenis kelamin', gender],
    ['No HP', phone],
    ['Alamat', alamat],
    ['Bahasa pemrograman diminati', selectedLanguages.join(', ')],
  ];
  const resultList = document.createElement('ul');
  resultList.className = 'result-list';

  resultRows.forEach(([label, value]) => {
    const row = document.createElement('li');
    const heading = document.createElement('strong');
    const content = document.createElement('span');
    heading.textContent = label;
    content.textContent = value;
    row.append(heading, content);
    resultList.append(row);
  });

  resultContent.replaceChildren(resultList);

  resultCard.hidden = false;
  resultCard.classList.remove('hidden');
  form.reset();
  validateLanguageSelection();
});
