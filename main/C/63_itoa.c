#include <stdio.h>
#include "62_strReverse.c"

void itoa(int n, char s[]) {
  int i, sign;
  if ((sign = n) < 0) {
    n = -n;
  }
  i = 0;
  do {
    s[i ++] = n % 10 + '0';
  } while ((n /= 10) > 0);
  if (sign < 0) {
    s[i ++] = '-';
  }
  s[i] = '\0';
  reverse(s);
  printf("%s \n", s);
}

int main() {
  char s[0];
  itoa(-123, s);
  return 0;
}
