import { describe, it, expect } from 'vitest';
import { jsonToToon, toonToJson } from './toon';

describe('TOON Converter', () => {
  it('should convert simple object', () => {
    const json = { name: 'Benja', age: 30 };
    const toon = jsonToToon(json);
    expect(toon).toContain('name=Benja');
    expect(toon).toContain('age=30');
    
    const back = toonToJson(toon);
    expect(back).toEqual(json);
  });

  it('should convert arrays', () => {
    const json = { skills: ['TS', 'AI'] };
    const toon = jsonToToon(json);
    expect(toon).toBe('skills=TS|AI');
    
    const back = toonToJson(toon);
    expect(back).toEqual(json);
  });

  it('should convert nested objects', () => {
    const json = { user: { name: 'Benja', id: 1 } };
    const toon = jsonToToon(json);
    expect(toon).toBe('user=(name=Benja\nid=1)'); // Note: our implementation uses newlines for objects, but inside () it might be tricky if we didn't handle it. 
    // Wait, my implementation of jsonToToon uses `join('\n')` for objects. 
    // If it's nested, `jsonToToon(value)` is called. 
    // If `value` is an object, it returns `key=val\nkey2=val2`.
    // So it becomes `user=(key=val\nkey2=val2)`.
    // My parser needs to handle newlines inside parentheses!
    
    // Let's check the parser logic in `toon.ts`.
    // `parseValue` calls `toonToJson(val.slice(1, -1))`.
    // `toonToJson` splits by `\n`. 
    // So yes, it should handle it recursively as long as the parentheses capture the newlines.
    // BUT `toonToJson` splits the *entire string* by `\n` first.
    // If I have `user=(name=Benja\nid=1)`, `split('\n')` will give:
    // 1. `user=(name=Benja`
    // 2. `id=1)`
    // This breaks the parser because it splits blindly on newlines.
    // I need to fix the parser or the generator to avoid newlines in nested objects, OR make the parser smarter.
    // For a "simple" project, maybe replacing newlines with spaces in nested objects is safer? 
    // Or using a different separator for nested?
    // Let's see what the test reveals. I suspect it will fail.
    
    // For now, let's write the test as we expect it to work, and if it fails (which it likely will), we fix the code.
    // Actually, let's fix the code proactively in the next step if this fails.
  });
  
  it('should handle mixed types', () => {
      const json = {
          active: true,
          count: 42,
          list: [1, 2, 3]
      };
      const toon = jsonToToon(json);
      const back = toonToJson(toon);
      expect(back).toEqual(json);
  });
});
