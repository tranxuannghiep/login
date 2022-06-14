const x = "GCAGAGAG";
const y = "GCATCGCAGAGAGTATACAGTACGGCAGAGAG";

// câu 1: Brute Force
// Kiểm tra chạy 1-> n-m
// duyệt x, nếu toàn bộ x trùng 1 phần của y => in
// nếu không, thì dừng vòng lặp
const m = x.length;
const n = y.length;
let i, j;
for (i = 0; i <= n - m; i++) {
  for (j = 0; j < m && x[j] === y[j + i]; j++);
  if (j === m) console.log(i);
}
