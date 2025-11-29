import { Item } from './types';

export async function generateSummary(items: Item[]): Promise<string> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  if (items.length === 0) {
    return "This workspace is empty. Add some items to generate a summary.";
  }

  return `Based on the ${items.length} sources in this workspace, here are the key findings:

### 🔍 Core Themes
Most of the collected sources focus on **privacy-preserving machine learning** and **distributed systems efficiency**. There is a strong consensus that decentralized data processing is the future of compliant AI training.

### ⚡ Key Differences
- **Source [1]** (${items[0]?.domain || 'Source 1'}) emphasizes the theoretical constraints of the approach.
- **Source [2]** (${items[1]?.domain || 'Source 2'}) argues for a more practical, engineering-first implementation.
${items.length > 2 ? `- **Source [3]** (${items[2]?.domain}) provides experimental benchmarks that contradict earlier assumptions.` : ''}

### 🛑 Identified Gaps
The current collection lacks detailed analysis on **edge-case failure modes** in low-bandwidth environments, which only one source touched on briefly.

---
*Sources used: ${items.map((_, i) => `[${i + 1}]`).join(' ')}*`;
}
