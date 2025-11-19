// UI Helper Functions

export function showError(msg: string, toastElement: HTMLElement) {
  toastElement.textContent = msg;
  toastElement.classList.add('visible');
  setTimeout(() => toastElement.classList.remove('visible'), 3000);
}

export function showSuccess(msg: string, toastElement: HTMLElement) {
  toastElement.textContent = msg;
  toastElement.classList.add('visible');
  setTimeout(() => toastElement.classList.remove('visible'), 1500);
}

export function countTokens(str: string): number {
  if (!str) return 0;
  const tokens = str.match(/[\w]+|[^\s\w]/g);
  return tokens ? tokens.length : 0;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
}

export async function pasteFromClipboard(): Promise<string | null> {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (err) {
    return null;
  }
}

export function generateRandomJSON(): object {
  return {
    id: Math.floor(Math.random() * 1000),
    user: {
      name: "User" + Math.floor(Math.random() * 100),
      active: Math.random() > 0.5,
      roles: ["admin", "editor"].slice(0, Math.floor(Math.random() * 2) + 1)
    },
    stats: [Math.random().toFixed(2), Math.random().toFixed(2)],
    createdAt: new Date().toISOString()
  };
}
