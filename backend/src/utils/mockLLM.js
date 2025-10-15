// Improved mock LLM analyzer for more realistic code feedback
function analyzeCode(codeText, filename = "file") {
  const lines = codeText.split("\n").length;
  const hasComments = /\/\//.test(codeText) || /#/.test(codeText);
  const hasTodo = /TODO|FIXME/i.test(codeText);
  const suggestions = [];

  // === General Overview ===
  const summary = [
    `📄 File: ${filename}`,
    `Total Lines: ${lines}`,
    hasComments ? "Contains comments ✅" : "No comments found ❌",
    hasTodo ? "Developer TODOs detected 🧩" : "No TODO markers",
  ].join(" | ");

  // === Detailed Suggestions ===

  // 1. Comments & Documentation
  if (!hasComments) {
    suggestions.push({
      severity: "Moderate",
      title: "Lack of documentation",
      detail:
        "This file lacks inline or function-level comments, which makes it harder to maintain. Clear comments help future developers understand intent.",
      suggestion:
        "Add JSDoc-style comments above major functions or classes describing purpose, inputs, and outputs.",
    });
  }

  // 2. Function Length / Modularity
  const longFunctions = codeText.match(/function|=>/g);
  if (lines > 200 || (longFunctions && longFunctions.length > 10)) {
    suggestions.push({
      severity: "Major",
      title: "Possible over-complexity",
      detail:
        "The file contains many or long functions. This may reduce readability and make testing difficult.",
      suggestion:
        "Consider refactoring larger functions into smaller reusable ones. Follow the 'Single Responsibility Principle'.",
    });
  }

  // 3. Code Style & Consistency
  if (/var\s+/.test(codeText)) {
    suggestions.push({
      severity: "Minor",
      title: "Old-style variable declarations",
      detail:
        "You are using 'var' in some places. Modern JavaScript prefers 'let' or 'const' for predictable scoping.",
      suggestion: "Replace 'var' with 'let' or 'const' where appropriate.",
    });
  }

  // 4. Error Handling
  if (!/try\s*{/.test(codeText) && /fetch|axios|await|then/.test(codeText)) {
    suggestions.push({
      severity: "Moderate",
      title: "Missing error handling",
      detail:
        "Your code seems to perform async or network operations but doesn't use try/catch blocks.",
      suggestion:
        "Wrap async logic in try/catch to gracefully handle errors and show meaningful messages.",
    });
  }

  // 5. Code Quality Insights
  const hasConsoleLogs = /console\.log/.test(codeText);
  if (hasConsoleLogs) {
    suggestions.push({
      severity: "Minor",
      title: "Debugging statements detected",
      detail:
        "The file contains console.log statements which might clutter production logs.",
      suggestion:
        "Remove or replace them with a proper logging library (e.g. Winston).",
    });
  }

  // 6. Security Patterns
  if (/eval\(|exec\(/.test(codeText)) {
    suggestions.push({
      severity: "Critical",
      title: "Potentially unsafe usage of eval/exec",
      detail:
        "Dynamic code execution detected. This can expose your app to code injection attacks.",
      suggestion:
        "Avoid eval/exec unless absolutely necessary. Consider safer parsing or templating alternatives.",
    });
  }

  // 7. Performance
  if (/for\s*\(/.test(codeText) && !/break|return/.test(codeText)) {
    suggestions.push({
      severity: "Minor",
      title: "Loop performance",
      detail:
        "Detected raw loops without early breaks or returns. This might impact performance in large datasets.",
      suggestion:
        "Review loops for efficiency — use map/filter/reduce or early termination where possible.",
    });
  }

  // Default friendly note
  if (suggestions.length === 0) {
    suggestions.push({
      severity: "Info",
      title: "Looks good!",
      detail:
        "No major issues detected. Code appears clean and well-structured.",
      suggestion:
        "You can still consider adding more documentation or test cases for robustness.",
    });
  }

  return {
    summary: `🧠 Code Analysis Report: ${summary}`,
    suggestions,
  };
}

module.exports = { analyzeCode };
