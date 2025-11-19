import { jsonToToon, toonToJson, validateToon } from './lib/toon';
import { showError, showSuccess, countTokens, copyToClipboard, pasteFromClipboard, generateRandomJSON } from './lib/helpers';
import { initTheme, toggleTheme } from './lib/theme';

// DOM Elements
const jsonInput = document.getElementById('jsonInput') as HTMLTextAreaElement;
const toonInput = document.getElementById('toonInput') as HTMLTextAreaElement;
const toToonBtn = document.getElementById('toToonBtn') as HTMLButtonElement;
const toJsonBtn = document.getElementById('toJsonBtn') as HTMLButtonElement;
const randomBtn = document.getElementById('randomBtn') as HTMLButtonElement;
const swapBtn = document.getElementById('swapBtn') as HTMLButtonElement;
const errorToast = document.getElementById('errorToast') as HTMLDivElement;
const successToast = document.getElementById('successToast') as HTMLDivElement;
const jsonTokenCount = document.getElementById('jsonTokenCount') as HTMLSpanElement;
const toonTokenCount = document.getElementById('toonTokenCount') as HTMLSpanElement;
const jsonPanel = document.getElementById('jsonPanel') as HTMLDivElement;
const toonPanel = document.getElementById('toonPanel') as HTMLDivElement;
const container = document.querySelector('.container') as HTMLDivElement;
const clearAllBtn = document.getElementById('clearAllBtn') as HTMLButtonElement;
const jsonCopyBtn = document.getElementById('jsonCopyBtn') as HTMLButtonElement;
const jsonPasteBtn = document.getElementById('jsonPasteBtn') as HTMLButtonElement;
const toonCopyBtn = document.getElementById('toonCopyBtn') as HTMLButtonElement;
const toonPasteBtn = document.getElementById('toonPasteBtn') as HTMLButtonElement;
const themeToggle = document.getElementById('themeToggle') as HTMLDivElement;
const sunIcon = document.getElementById('sunIcon') as HTMLSpanElement;
const moonIcon = document.getElementById('moonIcon') as HTMLSpanElement;
const controlsPanel = document.getElementById('controlsPanel') as HTMLDivElement;

// Initialize
initTheme();
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

function updateCounters() {
    jsonTokenCount.textContent = `${countTokens(jsonInput.value)} tokens`;
    toonTokenCount.textContent = `${countTokens(toonInput.value)} tokens`;
}

function validateInputs() {
    const jsonVal = jsonInput.value.trim();
    let isJsonValid = false;
    if (jsonVal) {
        try {
            JSON.parse(jsonVal);
            isJsonValid = true;
        } catch (e) {
            isJsonValid = false;
        }
    }
    toToonBtn.disabled = !isJsonValid;
    jsonCopyBtn.disabled = !jsonVal;

    const toonVal = toonInput.value.trim();
    let isToonValid = true;
    if (toonVal) {
        const error = validateToon(toonVal);
        if (error) {
            isToonValid = false;
        }
    }
    toJsonBtn.disabled = !toonVal || !isToonValid;
    toonCopyBtn.disabled = !toonVal;
}

validateInputs();

// Convert JSON -> TOON
toToonBtn.addEventListener('click', () => {
  try {
    const jsonStr = jsonInput.value;
    if (!jsonStr.trim()) return;
    const obj = JSON.parse(jsonStr);
    const toon = jsonToToon(obj);
    toonInput.value = toon;
    updateCounters();
    validateInputs();
    errorToast.classList.remove('visible');
    showSuccess('Converted ✓', successToast);
  } catch (e) {
    showError('Invalid JSON: ' + (e as Error).message, errorToast);
  }
});

// Convert TOON -> JSON
toJsonBtn.addEventListener('click', () => {
  try {
    const toonStr = toonInput.value;
    if (!toonStr.trim()) return;
    
    const validationError = validateToon(toonStr);
    if (validationError) {
        throw new Error(validationError);
    }

    const obj = toonToJson(toonStr);
    jsonInput.value = JSON.stringify(obj, null, 2);
    updateCounters();
    validateInputs();
    errorToast.classList.remove('visible');
    showSuccess('Converted ✓', successToast);
  } catch (e) {
    showError('Conversion Error: ' + (e as Error).message, errorToast);
  }
});

// Real-time validation for JSON
jsonInput.addEventListener('input', () => {
  updateCounters();
  validateInputs();
  const val = jsonInput.value.trim();
  if (!val) {
      errorToast.classList.remove('visible');
      return;
  }
  try {
    JSON.parse(val);
    errorToast.classList.remove('visible');
  } catch (e) {
    showError('Invalid JSON syntax', errorToast);
  }
});

toonInput.addEventListener('input', () => {
    updateCounters();
    validateInputs();
    const val = toonInput.value.trim();
    if (!val) {
        errorToast.classList.remove('visible');
        return;
    }
    const error = validateToon(val);
    if (error) {
        showError('Invalid TOON: ' + error, errorToast);
    } else {
        errorToast.classList.remove('visible');
    }
});

// Random JSON Generator
randomBtn.addEventListener('click', () => {
  const randomData = generateRandomJSON();
  jsonInput.value = JSON.stringify(randomData, null, 2);
  toonInput.value = ''; 
  updateCounters();
  validateInputs();
});

// Swap Panels
swapBtn.addEventListener('click', () => {
    const first = container.firstElementChild;
    
    if (first === jsonPanel) {
        container.appendChild(jsonPanel);
        container.insertBefore(toonPanel, container.firstElementChild);
        controlsPanel.insertBefore(toJsonBtn, toToonBtn);
        toJsonBtn.innerHTML = 'TOON &rarr; JSON';
        toToonBtn.innerHTML = 'JSON &larr; TOON';
    } else {
        container.insertBefore(jsonPanel, container.firstElementChild);
        container.appendChild(toonPanel);
        controlsPanel.insertBefore(toToonBtn, toJsonBtn);
        toToonBtn.innerHTML = 'JSON &rarr; TOON';
        toJsonBtn.innerHTML = 'TOON &larr; JSON';
    }
});

// Clear All
clearAllBtn.addEventListener('click', () => {
    jsonInput.value = '';
    toonInput.value = '';
    updateCounters();
    validateInputs();
    errorToast.classList.remove('visible');
});

// Copy/Paste
jsonCopyBtn.addEventListener('click', async () => {
    const success = await copyToClipboard(jsonInput.value);
    if (success) {
        showSuccess('Copied ✓', successToast);
    } else {
        showError('Failed to copy', errorToast);
    }
});

jsonPasteBtn.addEventListener('click', async () => {
    const text = await pasteFromClipboard();
    if (text) {
        jsonInput.value = text;
        updateCounters();
        validateInputs();
        showSuccess('Pasted ✓', successToast);
    } else {
        showError('Failed to paste (permission denied?)', errorToast);
    }
});

toonCopyBtn.addEventListener('click', async () => {
    const success = await copyToClipboard(toonInput.value);
    if (success) {
        showSuccess('Copied ✓', successToast);
    } else {
        showError('Failed to copy', errorToast);
    }
});

toonPasteBtn.addEventListener('click', async () => {
    const text = await pasteFromClipboard();
    if (text) {
        toonInput.value = text;
        updateCounters();
        validateInputs();
        showSuccess('Pasted ✓', successToast);
    } else {
        showError('Failed to paste (permission denied?)', errorToast);
    }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const newTheme = toggleTheme();
    
    if (newTheme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
});
