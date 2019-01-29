#include <stdio.h>

int power(int m, int n);

int power(int m, int n) {
  int i = 0, result = 1;
  for(i = 0; i < n; i++) {
    result = result * m;
  };
  return result;
}

int main() {
  int m = 5;
  int n = 3;
  printf("%D \n", power(m, n));

  return 0;
}
