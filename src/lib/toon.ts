export function jsonToToon(json: any): string {
  if (json === null || json === undefined) return '';
  
  if (Array.isArray(json)) {
    return json.map(item => {
      if (typeof item === 'object' && item !== null) {
        return `(${jsonToToon(item)})`;
      }
      return String(item);
    }).join('|');
  }

  if (typeof json === 'object') {
    return Object.entries(json).map(([key, value]) => {
      let formattedValue = '';
      if (Array.isArray(value)) {
        formattedValue = value.map(item => {
           if (typeof item === 'object' && item !== null) {
             return `(${jsonToToon(item)})`;
           }
           return String(item);
        }).join('|');
      } else if (typeof value === 'object' && value !== null) {
        formattedValue = `(${jsonToToon(value)})`;
      } else {
        formattedValue = String(value);
      }
      return `${key}=${formattedValue}`;
    }).join('\n');
  }

  return String(json);
}

export function toonToJson(toon: string): any {
  if (!toon.trim()) return {};

  const parseValue = (val: string): any => {
    val = val.trim();
    // Handle nested object (surrounded by parens)
    if (val.startsWith('(') && val.endsWith(')')) {
      // Check if it's a balanced group at the ends
      let depth = 0;
      let isBalanced = true;
      for(let i=0; i<val.length-1; i++) {
          if(val[i] === '(') depth++;
          if(val[i] === ')') depth--;
          if(depth === 0 && i > 0) {
              isBalanced = false; // e.g. (a=1) (b=2) - not a single object
              break;
          }
      }
      if (isBalanced) return toonToJson(val.slice(1, -1));
    }
    
    // Handle arrays (split by | but respect parens)
    // We need a splitSafe for | too if arrays can contain objects with | inside? 
    // Our spec says arrays use |, objects use parens. 
    // If an object inside array has |, it is inside parens: `(a=1|b=2)` -> valid value? No, `a=1|b=2` is not key=value.
    // Wait, `jsonToToon` for array: `(jsonToToon(item))`. `jsonToToon` for object returns `k=v`.
    // So `[{a:1}, {b:2}]` -> `(a=1)|(b=2)`.
    // If we split by `|`, we get `(a=1)` and `(b=2)`. Safe.
    // But what if a string value contains `|`? We don't handle escaping yet. 
    // For "simple project", we assume no special chars in strings or we accept breakage.
    if (val.includes('|')) {
       // Simple split for now, robust would need to ignore | inside parens
       // Let's do a smart split for | as well just in case
       const items = splitSafe(val, '|');
       if (items.length > 1) return items.map(v => parseValue(v));
    }

    // Try to infer number or boolean
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (!isNaN(Number(val)) && val !== '') return Number(val);
    return val;
  };

  // Helper to split by delimiter ignoring content in parentheses
  const splitSafe = (str: string, delimiter: string): string[] => {
    const result: string[] = [];
    let current = '';
    let depth = 0;
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '(') depth++;
      else if (char === ')') depth--;
      
      if (char === delimiter && depth === 0) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  // Split lines but respect parentheses (for nested objects using \n)
  const lines = splitSafe(toon, '\n').filter(line => line.trim() !== '');
  const result: any = {};
  
  for (const line of lines) {
    const eqIndex = line.indexOf('=');
    if (eqIndex > -1) {
      const key = line.substring(0, eqIndex).trim();
      const valueStr = line.substring(eqIndex + 1).trim();
      result[key] = parseValue(valueStr);
    } else {
        // If we find a line without =, and we haven't found any = yet, maybe it's not an object?
        // But if we already found =, this might be garbage or a continuation?
        // For now, ignore lines without = unless it's the ONLY content (handled below)
    }
  }
  
  // If no keys found, treat as single value (primitive or array)
  if (Object.keys(result).length === 0 && toon.trim().length > 0) {
      // Check if it's an array
      if (toon.includes('|')) {
          const items = splitSafe(toon, '|');
          if (items.length > 1) return items.map(v => parseValue(v));
      }
      return parseValue(toon);
  }

  return result;
}

export function validateToon(toon: string): string | null {
  if (!toon) return null;
  
  const trimmed = toon.trim();
  
  // Check if it looks like JSON
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return "Input looks like JSON, not TOON";
  }
  
  // Check parentheses balance
  let depth = 0;
  for (const char of toon) {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (depth < 0) return "Unexpected closing parenthesis";
  }
  if (depth > 0) return "Unclosed parenthesis";
  
  return null; // Valid
}
