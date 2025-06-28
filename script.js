function calculateLevenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; 
  }
  for (let j = 0; j <= n; j++){
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } 
      else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // deletion
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        );
      }
    }
  }

  return dp;
}

function calculate() {
  const str1 = document.getElementById("str1").value;
  const str2 = document.getElementById("str2").value;

  // Calcuate the Levenshtein distance 
  const matrix = calculateLevenshtein(str1, str2);
  const distance = matrix[str1.length][str2.length];

  // Show input strings
  document.getElementById("showStr1").textContent = `String 1: ${str1}`;
  document.getElementById("showStr2").textContent = `String 2: ${str2}`;

  // Show Levenshtein Distance 
  document.getElementById("result").textContent = `Levenshtein Distance: ${distance}`;
  renderMatrix(matrix, str1, str2);
}

function renderMatrix(dp, str1, str2) {
  let html = "<table><tr><td></td><td></td>";

  for (let j = 0; j < str2.length; j++) {
    html += `<td>${str2[j]}</td>`;
  }
  html += "</tr>";

  for (let i = 0; i <= str1.length; i++) {
    html += "<tr>";
    html += `<td>${i === 0 ? "" : str1[i - 1]}</td>`;
    for (let j = 0; j <= str2.length; j++) {
      html += `<td>${dp[i][j]}</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  document.getElementById("matrix").innerHTML = html;
}
